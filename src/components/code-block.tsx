"use client";

import React, { useState } from "react";
import { Check, Copy, FileCode } from "lucide-react";

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
    <div className="not-prose my-7 overflow-hidden rounded-xl border border-[#262626] bg-[#151515] shadow-sm transition-all">
      {/* Sleek Vercel / shadcn Header Bar */}
      <div className="flex h-10 items-center justify-between border-b border-[#262626] bg-[#181818] px-3.5 select-none">
        <div className="flex items-center gap-2">
          {/* Subtle OS dots */}
          <div className="flex items-center gap-1.5 opacity-60">
            <span className="size-2 rounded-full bg-[#363636]" />
            <span className="size-2 rounded-full bg-[#363636]" />
            <span className="size-2 rounded-full bg-[#363636]" />
          </div>
          <div className="mx-2 h-3.5 w-px bg-[#262626]" />
          <div className="flex items-center gap-1.5 font-mono text-[11.5px] text-[#a1a1aa]">
            <FileCode className="size-3.5 text-[#71717a]" />
            <span className="font-medium text-[#ededed]">{filename || language}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block rounded border border-[#2a2a2a] bg-[#202020] px-2 py-0.5 text-[9.5px] font-mono uppercase tracking-wider text-[#888888]">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex h-7 items-center gap-1.5 rounded-md border px-2.5 font-mono text-[11px] transition-all duration-150 cursor-pointer active:scale-95 ${
              copied
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-medium"
                : "border-[#2e2e2e] bg-[#202020] text-[#a1a1aa] hover:border-[#383838] hover:bg-[#282828] hover:text-[#ededed]"
            }`}
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="size-3 text-emerald-400 stroke-[2.5]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3 stroke-[2]" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Editor Window with Line Numbers */}
      <div className="relative overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.7] text-[#ededed] bg-[#151515]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-[#1a1a1a]/70 transition-colors duration-100">
                <td className="w-9 select-none pr-4 text-right font-mono text-[11px] text-[#4a4a52] align-top">
                  {idx + 1}
                </td>
                <td className="whitespace-pre font-mono text-[12.5px]">
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

// Token categories & vocabulary
const KEYWORDS = new Set([
  "import", "export", "from", "as", "default",
  "const", "let", "var", "function", "class", "interface", "type", "enum",
  "async", "await", "return", "if", "else", "switch", "case", "break", "continue",
  "for", "while", "do", "new", "try", "catch", "finally", "throw",
  "extends", "implements", "instanceof", "typeof", "void", "delete",
  "this", "super", "private", "public", "protected", "readonly",
  "local", "then", "end", "nil", "or", "and", "not", "strict", "refine"
]);

const TYPES = new Set([
  "string", "number", "boolean", "any", "unknown", "never", "void",
  "Promise", "Record", "Map", "Set", "Array", "Date", "Error", "User", "PgPool",
  "ScoredItem", "UserRepositoryPort", "UpgradeSubscriptionUseCase", "AudioWorkletProcessor",
  "BiquadFilterProcessor", "UserMapper"
]);

const BOOLEANS = new Set(["true", "false", "null", "undefined"]);

// Tokenizer regular expression
const TOKEN_REGEX = /(\/\/[^\r\n]*|--[^\r\n]*)|("(?:\\[\s\S]|[^"\\\r\n])*"|\x27(?:\\[\s\S]|[^\x27\\\r\n])*\x27|`(?:\\[\s\S]|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\())|(\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*:))|([a-zA-Z_$][a-zA-Z0-9_$]*)|(\s+)|([^\s\w$])/g;

function renderHighlightedLine(line: string) {
  if (!line) return <span>{"\n"}</span>;

  const elements: React.ReactNode[] = [];
  TOKEN_REGEX.lastIndex = 0;

  let match: RegExpExecArray | null;
  let keyIndex = 0;

  while ((match = TOKEN_REGEX.exec(line)) !== null) {
    const [, comment, str, num, fn, prop, word, space, punct] = match;
    const key = keyIndex++;

    if (comment) {
      elements.push(
        <span key={key} className="italic text-[#71717a]">
          {comment}
        </span>
      );
    } else if (str) {
      elements.push(
        <span key={key} className="text-[#86efac]">
          {str}
        </span>
      );
    } else if (num) {
      elements.push(
        <span key={key} className="text-[#fb923c]">
          {num}
        </span>
      );
    } else if (fn) {
      if (KEYWORDS.has(fn)) {
        elements.push(
          <span key={key} className="font-medium text-[#f43f5e]">
            {fn}
          </span>
        );
      } else {
        elements.push(
          <span key={key} className="text-[#60a5fa]">
            {fn}
          </span>
        );
      }
    } else if (prop) {
      if (KEYWORDS.has(prop)) {
        elements.push(
          <span key={key} className="font-medium text-[#f43f5e]">
            {prop}
          </span>
        );
      } else {
        elements.push(
          <span key={key} className="text-[#93c5fd]">
            {prop}
          </span>
        );
      }
    } else if (word) {
      if (KEYWORDS.has(word)) {
        elements.push(
          <span key={key} className="font-medium text-[#f43f5e]">
            {word}
          </span>
        );
      } else if (TYPES.has(word)) {
        elements.push(
          <span key={key} className="text-[#38bdf8]">
            {word}
          </span>
        );
      } else if (BOOLEANS.has(word)) {
        elements.push(
          <span key={key} className="text-[#facc15] font-medium">
            {word}
          </span>
        );
      } else {
        elements.push(
          <span key={key} className="text-[#ededed]">
            {word}
          </span>
        );
      }
    } else if (space) {
      elements.push(<span key={key}>{space}</span>);
    } else if (punct) {
      elements.push(
        <span key={key} className="text-[#8e8e99]">
          {punct}
        </span>
      );
    }
  }

  return elements;
}
