"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyEmailButtonProps {
  email: string;
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy email", err);
    }
  };

  return (
    <>
      <button
        onClick={handleCopy}
        className="k-inline inline-flex items-center gap-1.5 font-mono text-[11px] text-[#b7b7b7] hover:text-[#ededed] cursor-pointer select-none [-webkit-tap-highlight-color:transparent] transition-[color,transform] duration-150 ease-out motion-safe:enabled:active:scale-[0.96]"
        data-label="Email // Click to Copy"
        aria-label="Copy email address"
      >
        {/* Contextual Icon cross-fade: both icons stay in DOM, cross-faded over 300ms cubic-bezier(0.2, 0, 0, 1) */}
        <span className="relative flex h-3.5 w-3.5 items-center justify-center">
          <Copy
            className={`absolute inset-0 h-3.5 w-3.5 text-[#6e6e6e] stroke-[1.5] transition-[opacity,transform,filter] duration-300 [transition-timing-function:cubic-bezier(0.2,0,0,1)] motion-reduce:transition-opacity ${
              copied
                ? "opacity-0 motion-safe:scale-[0.25] motion-safe:blur-[4px]"
                : "opacity-100 motion-safe:scale-100 motion-safe:blur-0"
            }`}
          />
          <Check
            className={`absolute inset-0 h-3.5 w-3.5 text-green-400 stroke-[1.5] transition-[opacity,transform,filter] duration-300 [transition-timing-function:cubic-bezier(0.2,0,0,1)] motion-reduce:transition-opacity ${
              copied
                ? "opacity-100 motion-safe:scale-100 motion-safe:blur-0"
                : "opacity-0 motion-safe:scale-[0.25] motion-safe:blur-[4px]"
            }`}
          />
        </span>
        <span className="transition-colors duration-150">
          {copied ? "Copied to Clipboard" : "Copy Email"}
        </span>
      </button>

      {/* Floating toast notification with exact enter (300ms, 12px Y, 4px blur) and exit (150ms, -12px Y, 4px blur) */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-[5px] border border-white/20 bg-[#1f1f1f] px-3.5 py-2 font-mono text-xs text-[#ededed] shadow-2xl transition-[opacity,transform,filter] ${
          copied
            ? "translate-y-0 opacity-100 blur-0 duration-300 ease-out"
            : "pointer-events-none opacity-0 motion-safe:-translate-y-3 motion-safe:blur-[4px] duration-150 ease-out"
        }`}
      >
        <Check className="h-4 w-4 text-green-400 stroke-[1.5]" />
        <span>Copied {email}</span>
      </div>
    </>
  );
}
