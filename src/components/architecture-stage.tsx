"use client";

import React, { useState } from "react";
import { portfolio } from "@/data/portfolio";

export function ArchitectureStage() {
  const [activeArch, setActiveArch] = useState<"web" | "ai">("web");
  const current = portfolio.architectures[activeArch];

  return (
    <figure className="k-iso">
      {/* Top Header Bar */}
      <div className="k-iso__bar">
        <span>Test Rig // Distributed Pipeline Blueprint</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveArch("web")}
            className={`rounded-[3px] border px-2 py-0.5 font-mono text-[10.5px] uppercase transition-colors ${
              activeArch === "web"
                ? "border-white/20 bg-[#282828] text-[#ededed]"
                : "border-transparent text-[#6e6e6e] hover:text-[#b7b7b7]"
            }`}
          >
            Web Architecture
          </button>
          <button
            type="button"
            onClick={() => setActiveArch("ai")}
            className={`rounded-[3px] border px-2 py-0.5 font-mono text-[10.5px] uppercase transition-colors ${
              activeArch === "ai"
                ? "border-white/20 bg-[#282828] text-[#ededed]"
                : "border-transparent text-[#6e6e6e] hover:text-[#b7b7b7]"
            }`}
          >
            Deterministic AI
          </button>
        </div>
      </div>

      {/* Isometric Stage Canvas */}
      <div className="k-iso__stage p-4 sm:p-6 flex flex-col justify-between">
        {/* Isometric SVG Pipeline Header */}
        <svg
          viewBox="0 0 600 70"
          className="w-full h-14 select-none mb-3"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="pipe-glow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Main Bus Tube */}
          <line
            x1="40"
            y1="35"
            x2="560"
            y2="35"
            stroke="#262626"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1="40"
            y1="35"
            x2="560"
            y2="35"
            stroke="url(#pipe-glow)"
            strokeWidth="2"
            strokeDasharray="4 8"
            className="animate-pulse"
          />

          {/* 4 Stage Nodes */}
          {[60, 220, 380, 540].map((cx, idx) => (
            <g key={cx}>
              <circle cx={cx} cy={35} r="14" fill="#181818" stroke="#383838" strokeWidth="1.5" />
              <circle cx={cx} cy={35} r="6" fill="#2dd4bf" className="animate-ping" style={{ animationDuration: "2.5s", animationDelay: `${idx * 0.4}s` }} />
              <circle cx={cx} cy={35} r="5" fill="#181818" stroke="#2dd4bf" strokeWidth="1.5" />
              <text
                x={cx}
                y={62}
                fill="#6e6e6e"
                fontSize="9"
                fontFamily="var(--font-geist-mono)"
                textAnchor="middle"
              >
                0{idx + 1} // STAGE
              </text>
            </g>
          ))}
        </svg>

        {/* 4 Pipeline Stage Detail Blocks */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-4">
          {current.layers.map((layer) => (
            <div
              key={layer.step}
              className="rounded-[4px] border border-[#2a2a2a] bg-[#161616] p-3 transition-colors duration-150 hover:border-white/20 hover:bg-[#1a1a1a]"
            >
              <div className="font-mono text-[9.5px] uppercase text-[#6e6e6e]">
                {layer.step}
              </div>
              <div className="mt-1 text-[13px] font-medium text-[#ededed]">
                {layer.layer}
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-[#929292]">
                {layer.tech}
              </div>
              <span className="mt-2 inline-block rounded-[3px] bg-teal-500/10 px-1.5 py-0.5 font-mono text-[9.5px] text-teal-400">
                {layer.metric}
              </span>
              <p className="mt-2 text-[11.5px] leading-relaxed text-[#b7b7b7]">
                {layer.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Readout */}
      <figcaption className="k-iso__bar">
        <span>Click tabs to switch architectural topology</span>
        <span className="k-iso__readout text-teal-400">{current.spec}</span>
      </figcaption>
    </figure>
  );
}
