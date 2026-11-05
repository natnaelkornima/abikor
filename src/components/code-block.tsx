"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  language: string;
  snippet: string;
  filename?: string;
}

export function CodeBlock({ language, snippet, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const lines = snippet.trim().split("\n");

  return (
    <div className="not-prose my-6 overflow-hidden rounded-lg border border-[#23232c] bg-[#0c0d12] shadow-sm">
      {/* Sleek Vercel / Cursor Header Bar */}
      <div className="flex h-10 items-center justify-between border-b border-[#1f2028] bg-[#121319] px-4 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          {/* Subtle OS dots */}
          <div className="flex items-center gap-1.5 opacity-60">
            <span className="size-2 rounded-full bg-[#353540]" />
            <span className="size-2 rounded-full bg-[#353540]" />
            <span className="size-2 rounded-full bg-[#353540]" />
          </div>
          <span className="ml-2 uppercase tracking-wider text-[#8a8a96]">
            {filename || language}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded border border-[#2d2e38] bg-[#181922] px-2.5 py-1 text-[10.5px] uppercase tracking-wider text-[#8a8a96] transition-colors hover:border-[#454655] hover:bg-[#20212c] hover:text-[#ededed]"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="size-3 text-[#4ade80]" />
              <span className="text-[#4ade80]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="size-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Editor Window with Line Numbers */}
      <div className="relative overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-[#d4d4d8]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-[#15161f]/50">
                <td className="w-8 select-none pr-4 text-right font-mono text-[11px] text-[#424250] align-top">
                  {idx + 1}
                </td>
                <td className="whitespace-pre font-mono text-[12.5px] text-[#e0e0e4]">
                  {renderHighlightedLine(line)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Light-weight, zero-dependency token highlighting for TS/JS/Lua/JSON
function renderHighlightedLine(line: string) {
  // Comments
  if (line.trim().startsWith("//") || line.trim().startsWith("--")) {
    return <span className="italic text-[#636372]">{line}</span>;
  }

  // Keywords and symbols highlighting
  const tokens = line.split(/(\s+|[(),={};:[\]<>`'.])/g);
  return tokens.map((token, i) => {
    if (
      [
        "import",
        "export",
        "from",
        "const",
        "let",
        "var",
        "function",
        "class",
        "interface",
        "type",
        "async",
        "await",
        "return",
        "if",
        "else",
        "new",
        "try",
        "catch",
        "extends",
        "implements",
        "local",
        "then",
        "end",
      ].includes(token)
    ) {
      return (
        <span key={i} className="font-medium text-[#ededed]">
          {token}
        </span>
      );
    }
    if (["string", "number", "boolean", "void", "Promise", "null", "undefined"].includes(token)) {
      return (
        <span key={i} className="text-[#60a5fa]">
          {token}
        </span>
      );
    }
    if (token.startsWith('"') || token.startsWith("'") || token.startsWith("`")) {
      return (
        <span key={i} className="text-[#a1a1aa]">
          {token}
        </span>
      );
    }
    if (/^\d+$/.test(token)) {
      return (
        <span key={i} className="text-[#e56b40]">
          {token}
        </span>
      );
    }
    return token;
  });
}

