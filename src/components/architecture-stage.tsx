"use client";

import React, { useState } from "react";
import { portfolio } from "@/data/portfolio";

export function ArchitectureStage() {
  const [activeArch, setActiveArch] = useState<"web" | "ai">("web");
  const current = portfolio.architectures[activeArch];

  return (
    <figure className="mt-4 overflow-hidden rounded-[6px] border border-[#2a2a2a] bg-[#191919]">
      <div className="flex items-center justify-between border-b border-[#2a2a2a] bg-[#202020] px-3.5 py-2 font-mono text-[11px] text-[#929292]">
        <span className="truncate pr-2">{current.spec}</span>
        <div className="flex gap-1.5 shrink-0">
          <button
            onClick={() => setActiveArch("web")}
            className={`rounded-[3px] border px-2 py-0.5 font-mono text-[11px] select-none [-webkit-tap-highlight-color:transparent] transition-[color,background-color,border-color,transform] duration-150 ease-out motion-safe:enabled:active:scale-[0.96] ${
              activeArch === "web"
                ? "border-white/10 bg-[#292929] text-[#ededed]"
                : "border-transparent text-[#6e6e6e] hover:text-[#b7b7b7]"
            }`}
            data-label="Architecture // Web Blueprint"
          >
            Web Architecture
          </button>
          <button
            onClick={() => setActiveArch("ai")}
            className={`rounded-[3px] border px-2 py-0.5 font-mono text-[11px] select-none [-webkit-tap-highlight-color:transparent] transition-[color,background-color,border-color,transform] duration-150 ease-out motion-safe:enabled:active:scale-[0.96] ${
              activeArch === "ai"
                ? "border-white/10 bg-[#292929] text-[#ededed]"
                : "border-transparent text-[#6e6e6e] hover:text-[#b7b7b7]"
            }`}
            data-label="Architecture // Deterministic AI Blueprint"
          >
            Deterministic AI
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          {current.layers.map((layer) => (
            <div
              key={layer.step}
              className="rounded-[4px] border border-[#282828] bg-[#1d1d1d] p-3.5 transition-[border-color,background-color] duration-150 ease-out hover:border-white/20 hover:bg-[#242424]"
            >
              <div className="font-mono text-[10px] uppercase text-[#6e6e6e]">
                {layer.step}
              </div>
              <div className="mt-1 text-[13px] font-medium text-[#ededed]">
                {layer.layer}
              </div>
              <div className="mt-1 font-mono text-[10.5px] text-[#929292]">
                {layer.tech}
              </div>
              <span className="mt-2 inline-block rounded-[3px] bg-teal-500/10 px-1.5 py-0.5 font-mono text-[10px] text-teal-400">
                {layer.metric}
              </span>
              <p className="mt-2 text-[12px] leading-relaxed text-[#b7b7b7]">
                {layer.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}
