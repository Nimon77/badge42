# Development Guide

## Prerequisites

- Node.js 18+
- Yarn package manager
- PostgreSQL database
- 42 Intra API credentials
- GitHub OAuth app credentials

## Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/Nimon77/badge42.git
   cd badge42
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.sample .env
   # Edit .env with your credentials
   ```

4. **Generate Prisma client**

   ```bash
   yarn db:generate
   ```

5. **Set up database**

   ```bash
   yarn db:push
   ```

6. **Start development server**
   ```bash
   yarn dev
   ```

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build production application
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting
- `yarn type-check` - Run TypeScript type checking

### Database Scripts

- `yarn db:generate` - Generate Prisma client
- `yarn db:migrate` - Run database migrations
- `yarn db:push` - Push schema changes to database
- `yarn db:reset` - Reset database
- `yarn db:studio` - Open Prisma Studio

## Development Workflow

### Code Quality

This project uses several tools to maintain code quality:

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

### Git Hooks

Pre-commit hooks automatically run:

- ESLint with auto-fix
- Prettier formatting
- Type checking

### Architecture

```
badge42/
├── components/          # React components
│   ├── badge/          # Badge generation components
│   └── ...
├── lib/                # Utility libraries
│   ├── api/           # 42 API integration
│   ├── auth/          # Authentication logic
│   └── ...
├── pages/             # Next.js pages and API routes
│   ├── api/           # API endpoints
│   └── ...
├── public/            # Static assets
├── scripts/           # Build and utility scripts
├── styles/            # Global styles
└── types/             # TypeScript type definitions
```

## API Endpoints

### Badge Generation

- `GET /api/v2/[userId]/stats` - Generate user stats badge
- `GET /api/v2/[userId]/project/[projectId]` - Generate project score badge

### User Management

- `GET /api/v2/me` - Get current user data
- `PUT /api/v2/me` - Update user preferences

## Environment Variables

Required environment variables:

```env
# Database
DATABASE_URL="postgres://user:password@localhost:5432/badge42"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# 42 API
FORTY_TWO_CLIENT_ID="your-42-client-id"
FORTY_TWO_CLIENT_SECRET="your-42-client-secret"

# GitHub OAuth
GITHUB_ID="your-github-app-id"
GITHUB_SECRET="your-github-app-secret"
```

## Deployment

### Docker

1. **Build image**

   ```bash
   docker build -t badge42 .
   ```

2. **Run with docker-compose**
   ```bash
   docker-compose up -d
   ```

### Manual Deployment

1. **Build application**

   ```bash
   yarn build
   ```

2. **Start production server**
   ```bash
   yarn start
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Format code with Prettier
- Write meaningful commit messages
- Add JSDoc comments for complex functions

## Troubleshooting

### Common Issues

**Build fails with Prisma errors**

```bash
yarn db:generate
```

**Type errors after dependency updates**

```bash
yarn type-check
```

**Docker build fails**

- Check that all environment variables are set
- Ensure Docker daemon is running
- Clear Docker cache: `docker system prune`

### Performance Tips

- Use Next.js Image component for optimized images
- Leverage API route caching
- Monitor bundle size with `yarn build`
- Use dynamic imports for large components

## Support

- Check existing [GitHub Issues](https://github.com/Nimon77/badge42/issues)
- Create new issue with detailed description
- Join community discussions
