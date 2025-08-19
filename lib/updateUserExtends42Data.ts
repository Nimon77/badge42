import collection from "lodash-es/collection";
import prisma from "../db";
import { Coalition, get42User, get42UserCoalition, User, clearUserCache } from "./api/42api";

export type Extends42Data = User & {
  synced_at: number;
  coalitions: Coalition[];
};

export const EXPIRE_TIME = 12 * 60 * 60;

export class UserNotFound extends Error {
  constructor() {
    super();
    this.name = "UserNotFound";
    this.message = "User Not Found. invaild id or email...";
  }
}

const getUser = async (where: { id: string } | { email: string }) =>
  await prisma.user.findUnique({
    where,
    include: {
      accounts: true,
    },
  });

export type UserType = Awaited<ReturnType<typeof getUser>> & {
  extended42Data: Extends42Data;
};

export const updateUserExtends42Data: (
  where: { id: string } | { email: string }
) => Promise<UserType> = async (where) => {
  let user = (await getUser(where)) as unknown as UserType;

  if (!user) throw new UserNotFound();

  const accounts = collection.keyBy(user.accounts, "provider");
  if (!accounts["42-school"]) return user;

  // Check if user data needs updating
  const now = Date.now();
  const shouldUpdate = !user.extended42Data || 
    new Date(user.extended42Data.anonymize_date).valueOf() <= now ||
    user.extended42Data.synced_at + EXPIRE_TIME * 1000 <= now; // Use <= instead of > for consistency

  if (!shouldUpdate) {
    return user;
  }

  const ftSchoolAccountId = accounts["42-school"].providerAccountId;

  try {
    const [{ data: extended42Data }, { data: coalitions }] = await Promise.all([
      get42User(ftSchoolAccountId),
      get42UserCoalition(ftSchoolAccountId),
    ]);

    // Clear cache before updating to ensure fresh data on next request
    clearUserCache(ftSchoolAccountId);

    user = (await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        extended42Data: {
          ...extended42Data,
          coalitions,
          synced_at: now,
        },
      },
      include: {
        accounts: true,
      },
    })) as unknown as UserType;
  } catch (error) {
    console.error("Failed to update user 42 data:", error);
    // Return existing user data if update fails
    if (user.extended42Data) {
      return user;
    }
    throw error;
  }

  return user;
};
