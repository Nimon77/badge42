import React, { useState, useEffect } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

export interface CodeProps {
  code: string;
}

const Code: React.FC<CodeProps> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
    }
  };

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <div className="relative group">
      <div className="items-center bg-neutral-100 p-3 rounded overflow-y-hidden hover:overflow-y-auto">
        <code className="font-mono text-xs whitespace-nowrap">{code}</code>
      </div>
      <button
        onClick={handleCopy}
        className="hidden group-hover:block transition-colors absolute right-2 top-2 p-2 border shadow rounded bg-neutral-100 hover:bg-neutral-50"
      >
        {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
      </button>
    </div>
  );
};

export default Code;
