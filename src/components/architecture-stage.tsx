"use client";

import React, { useState } from "react";
import { portfolio } from "@/data/portfolio";

export function ArchitectureStage() {
  const { architectures } = portfolio;
  const [selectedArch, setSelectedArch] = useState<"web" | "ai">("web");
  const [isPaused, setIsPaused] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const currentArch = architectures[selectedArch];

  return (
    <div className="w-full select-none">
      {/* Architecture Type Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedArch("web");
              setActiveStep(null);
            }}
            className={`rounded-[4px] border px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors duration-140 ${
              selectedArch === "web"
                ? "border-white/30 bg-[#ededed] text-black font-semibold"
                : "border-[#303030] bg-[#1c1c1c] text-[#8e8e8e] hover:border-white/20 hover:text-[#ededed]"
            }`}
          >
            01 // Distributed Web
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedArch("ai");
              setActiveStep(null);
            }}
            className={`rounded-[4px] border px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors duration-140 ${
              selectedArch === "ai"
                ? "border-white/30 bg-[#ededed] text-black font-semibold"
                : "border-[#303030] bg-[#1c1c1c] text-[#8e8e8e] hover:border-white/20 hover:text-[#ededed]"
            }`}
          >
            02 // Deterministic AI &amp; RAG
          </button>
        </div>

        <div className="font-mono text-[11px] text-[#6e6e6e] hidden sm:block">
          {currentArch.spec}
        </div>
      </div>

      {/* High-Quality Animated 2D Vector Blueprint Diagram (Matching Blog Style) */}
      <figure
        className="auth not-prose mx-auto my-2 w-full max-w-[712px] select-none"
        data-hold={isPaused ? "true" : "false"}
      >
        <style>{`
          .arch-stage {
            --face: #111114;
            --edge: #26262e;
            --dot: #252530;
            --part: #3a3a46;
            --path: #d4d4d4;
            --ink: #e6e6e6;
            --muted: #767676;
            --code: #a3a3a3;
          }
          .arch-stage svg { display: block; width: 100%; height: auto; overflow: visible; }
          .arch-stage :is(path, line, rect, circle) { vector-effect: non-scaling-stroke; stroke-linecap: round; stroke-linejoin: round; }
          .arch-stage .panel { fill: var(--face); stroke: var(--edge); stroke-width: 1; transition: stroke .3s, fill .3s; }
          .arch-stage .panel.active { stroke: #ededed; fill: #16161c; }
          .arch-stage .wire { fill: none; stroke: var(--part); stroke-width: 1.2; }
          .arch-stage .head { fill: none; stroke: #70707c; stroke-width: 1; }
          .arch-stage .drawn, .arch-stage .pulse { vector-effect: none; }
          .arch-stage .pulse { fill: none; stroke: var(--path); stroke-width: 3.4; }
          .arch-stage .tag { fill: var(--muted); font: 8.5px/1 var(--font-geist-mono), ui-monospace, monospace; text-transform: uppercase; letter-spacing: .06em; }
          .arch-stage .title { fill: var(--ink); font: 500 12.5px/1.2 var(--font-geist-sans), ui-sans-serif, system-ui; letter-spacing: -.01em; }
          .arch-stage .note { fill: var(--muted); font: 10px/1.2 var(--font-geist-sans), ui-sans-serif, system-ui; }
          .arch-stage .code { fill: var(--code); font: 9.5px/1.2 var(--font-geist-mono), ui-monospace, monospace; }
          .arch-stage .readout { fill: var(--ink); font: 9.5px/1.2 var(--font-geist-mono), ui-monospace, monospace; font-variant-numeric: tabular-nums; }
          .arch-stage .m { animation-timing-function: cubic-bezier(.65,0,.35,1); animation-iteration-count: infinite; animation-fill-mode: both; }
          .arch-stage[data-hold="true"] .m { animation-play-state: paused; }
          @media (hover: hover) and (pointer: fine) {
            .arch-stage svg:hover .m { animation-play-state: paused; }
          }
          @media (prefers-reduced-motion: reduce) {
            .arch-stage .m { animation: none !important; }
          }

          /* Sequential 4-Stage Traveling Pulse Keyframes */
          @keyframes ap-wire1 { 0%,10% { stroke-dashoffset: 1; } 20%,100% { stroke-dashoffset: 0; } }
          .arch-stage .ap-wire1 { animation: ap-wire1 8s infinite; }
          @keyframes ap-pulse1 { 0%,12% { opacity: 0; stroke-dashoffset: 0.02; } 18%,26% { opacity: 1; } 28%,100% { opacity: 0; stroke-dashoffset: -1; } }
          .arch-stage .ap-pulse1 { animation: ap-pulse1 8s infinite; }

          @keyframes ap-wire2 { 0%,32% { stroke-dashoffset: 1; } 42%,100% { stroke-dashoffset: 0; } }
          .arch-stage .ap-wire2 { animation: ap-wire2 8s infinite; }
          @keyframes ap-pulse2 { 0%,36% { opacity: 0; stroke-dashoffset: 0.02; } 42%,50% { opacity: 1; } 52%,100% { opacity: 0; stroke-dashoffset: -1; } }
          .arch-stage .ap-pulse2 { animation: ap-pulse2 8s infinite; }

          @keyframes ap-wire3 { 0%,54% { stroke-dashoffset: 1; } 64%,100% { stroke-dashoffset: 0; } }
          .arch-stage .ap-wire3 { animation: ap-wire3 8s infinite; }
          @keyframes ap-pulse3 { 0%,58% { opacity: 0; stroke-dashoffset: 0.02; } 64%,72% { opacity: 1; } 74%,100% { opacity: 0; stroke-dashoffset: -1; } }
          .arch-stage .ap-pulse3 { animation: ap-pulse3 8s infinite; }

          /* Node Border Activations */
          @keyframes ap-n1 { 0%,22% { stroke: #4ade80; } 28%,100% { stroke: var(--edge); } }
          .arch-stage .ap-n1 { animation: ap-n1 8s infinite; }
          @keyframes ap-n2 { 0%,24% { stroke: var(--edge); } 28%,48% { stroke: #38bdf8; } 52%,100% { stroke: var(--edge); } }
          .arch-stage .ap-n2 { animation: ap-n2 8s infinite; }
          @keyframes ap-n3 { 0%,48% { stroke: var(--edge); } 52%,72% { stroke: #e56b40; } 76%,100% { stroke: var(--edge); } }
          .arch-stage .ap-n3 { animation: ap-n3 8s infinite; }
          @keyframes ap-n4 { 0%,72% { stroke: var(--edge); } 76%,96% { stroke: #a855f7; } 100% { stroke: var(--edge); } }
          .arch-stage .ap-n4 { animation: ap-n4 8s infinite; }

          /* Live Readout Text Steps */
          @keyframes ap-r1 { 0%,24% { opacity: 1; } 25%,100% { opacity: 0; } }
          .arch-stage .ap-r1 { animation: ap-r1 8s infinite; }
          @keyframes ap-r2 { 0%,24% { opacity: 0; } 25%,48% { opacity: 1; } 49%,100% { opacity: 0; } }
          .arch-stage .ap-r2 { animation: ap-r2 8s infinite; }
          @keyframes ap-r3 { 0%,48% { opacity: 0; } 49%,72% { opacity: 1; } 73%,100% { opacity: 0; } }
          .arch-stage .ap-r3 { animation: ap-r3 8s infinite; }
          @keyframes ap-r4 { 0%,72% { opacity: 0; } 73%,100% { opacity: 1; } }
          .arch-stage .ap-r4 { animation: ap-r4 8s infinite; }
        `}</style>

        <div className="arch-stage rounded-lg border border-[#24242c] bg-[#0c0c0f] p-4">
          <svg viewBox="0 0 680 250" role="img" aria-label="Systems Architecture Flow Engine">
            <defs>
              <pattern id="arch-dots" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="7" cy="7" r="0.75" fill="#22222c" />
              </pattern>
              <radialGradient id="arch-fade" cx="50%" cy="50%" r="65%">
                <stop offset="0.35" stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <mask id="arch-mask">
                <rect width="680" height="250" fill="url(#arch-fade)" />
              </mask>
            </defs>

            <rect width="680" height="250" fill="url(#arch-dots)" mask="url(#arch-mask)" />

            {/* Top Telemetry Bar */}
            <g>
              <text x="24" y="20" className="tag hint">Point to hold</text>
              {selectedArch === "web" ? (
                <>
                  <text x="656" y="20" textAnchor="end" className="note readout m ap-r1">
                    01/04: Client &rarr; Next.js Edge (Cache 98%)
                  </text>
                  <text x="656" y="20" textAnchor="end" className="note readout m ap-r2">
                    02/04: Fastify API Gateway &rarr; sub-1ms JWT rate-limit
                  </text>
                  <text x="656" y="20" textAnchor="end" className="note readout m ap-r3">
                    03/04: BullMQ + Redis FIFO ring (50k jobs/s)
                  </text>
                  <text x="656" y="20" textAnchor="end" className="note readout m ap-r4">
                    04/04: PostgreSQL ACID persist &rarr; replica cache sync
                  </text>
                </>
              ) : (
                <>
                  <text x="656" y="20" textAnchor="end" className="note readout m ap-r1">
                    01/04: FastAPI gateway &rarr; prompt injection sanitizer
                  </text>
                  <text x="656" y="20" textAnchor="end" className="note readout m ap-r2">
                    02/04: RRF hybrid retrieval &rarr; Qdrant + BM25 fusion
                  </text>
                  <text x="656" y="20" textAnchor="end" className="note readout m ap-r3">
                    03/04: LLM reasoning core &rarr; structured JSON mode
                  </text>
                  <text x="656" y="20" textAnchor="end" className="note readout m ap-r4">
                    04/04: Pydantic runtime validator &rarr; verified DTO
                  </text>
                </>
              )}
            </g>

            {/* 4 Connected Stages with Conduits & Traveling Pulses */}
            <g transform="translate(0 32)">
              {/* STAGE 1: NODE */}
              <g className="cursor-pointer" onClick={() => setActiveStep(0)}>
                <rect
                  x="24"
                  y="20"
                  width="130"
                  height="150"
                  rx="8"
                  className={`panel ${activeStep === 0 ? "active" : "m ap-n1"}`}
                />
                <text x="36" y="44" className="tag">
                  {selectedArch === "web" ? "01 // EDGE" : "01 // SANITIZE"}
                </text>
                <text x="36" y="64" className="title">
                  {selectedArch === "web" ? "Next.js Edge" : "Input Gate"}
                </text>
                <text x="36" y="82" className="code">
                  {selectedArch === "web" ? "Client Layer" : "FastAPI Firewall"}
                </text>

                {/* Inner Spec Box */}
                <rect x="34" y="96" width="110" height="58" rx="4" fill="#141418" stroke="#252530" strokeWidth="1" />
                <circle cx="44" cy="115" r="2.5" fill="#4ade80" />
                <text x="52" y="118" className="note">
                  {selectedArch === "web" ? "Optimistic UI" : "Token boundary"}
                </text>
                <text x="44" y="138" className="code" fill="#4ade80">
                  {selectedArch === "web" ? "CACHE: 98%" : "PASS: 100%"}
                </text>
              </g>

              {/* CONDUIT 1 -> 2 */}
              <g>
                <path d="M154 95 H194" pathLength="1" className="wire drawn m ap-wire1" style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }} />
                <path d="M190 91.5 L194 95 L190 98.5" className="head" />
                <path d="M154 95 H194" pathLength="1" className="pulse m ap-pulse1" stroke="#38bdf8" style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }} />
              </g>

              {/* STAGE 2: NODE */}
              <g className="cursor-pointer" onClick={() => setActiveStep(1)}>
                <rect
                  x="194"
                  y="20"
                  width="134"
                  height="150"
                  rx="8"
                  className={`panel ${activeStep === 1 ? "active" : "m ap-n2"}`}
                />
                <text x="206" y="44" className="tag">
                  {selectedArch === "web" ? "02 // GATEWAY" : "02 // RETRIEVAL"}
                </text>
                <text x="206" y="64" className="title">
                  {selectedArch === "web" ? "Fastify API" : "Hybrid RAG"}
                </text>
                <text x="206" y="82" className="code">
                  {selectedArch === "web" ? "Security Core" : "Qdrant + BM25"}
                </text>

                {/* Inner Spec Box */}
                <rect x="204" y="96" width="114" height="58" rx="4" fill="#141418" stroke="#252530" strokeWidth="1" />
                <circle cx="214" cy="115" r="2.5" fill="#38bdf8" />
                <text x="222" y="118" className="note">
                  {selectedArch === "web" ? "Rate-limit pass" : "Dense & Sparse"}
                </text>
                <text x="214" y="138" className="code" fill="#38bdf8">
                  {selectedArch === "web" ? "P99 < 1.2MS" : "RRF FUSION"}
                </text>
              </g>

              {/* CONDUIT 2 -> 3 */}
              <g>
                <path d="M328 95 H368" pathLength="1" className="wire drawn m ap-wire2" style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }} />
                <path d="M364 91.5 L368 95 L364 98.5" className="head" />
                <path d="M328 95 H368" pathLength="1" className="pulse m ap-pulse2" stroke="#e56b40" style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }} />
              </g>

              {/* STAGE 3: NODE */}
              <g className="cursor-pointer" onClick={() => setActiveStep(2)}>
                <rect
                  x="368"
                  y="20"
                  width="134"
                  height="150"
                  rx="8"
                  className={`panel ${activeStep === 2 ? "active" : "m ap-n3"}`}
                />
                <text x="380" y="44" className="tag">
                  {selectedArch === "web" ? "03 // QUEUES" : "03 // INFERENCE"}
                </text>
                <text x="380" y="64" className="title">
                  {selectedArch === "web" ? "BullMQ Ring" : "Model Core"}
                </text>
                <text x="380" y="82" className="code">
                  {selectedArch === "web" ? "Redis Brokers" : "vLLM Engine"}
                </text>

                {/* Inner Spec Box */}
                <rect x="378" y="96" width="114" height="58" rx="4" fill="#141418" stroke="#252530" strokeWidth="1" />
                <circle cx="388" cy="115" r="2.5" fill="#e56b40" />
                <text x="396" y="118" className="note">
                  {selectedArch === "web" ? "Idempotent ring" : "Structured JSON"}
                </text>
                <text x="388" y="138" className="code" fill="#e56b40">
                  {selectedArch === "web" ? "BURST BUFFER" : "ZERO-LEAK"}
                </text>
              </g>

              {/* CONDUIT 3 -> 4 */}
              <g>
                <path d="M502 95 H542" pathLength="1" className="wire drawn m ap-wire3" style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }} />
                <path d="M538 91.5 L542 95 L538 98.5" className="head" />
                <path d="M502 95 H542" pathLength="1" className="pulse m ap-pulse3" stroke="#a855f7" style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }} />
              </g>

              {/* STAGE 4: NODE */}
              <g className="cursor-pointer" onClick={() => setActiveStep(3)}>
                <rect
                  x="542"
                  y="20"
                  width="124"
                  height="150"
                  rx="8"
                  className={`panel ${activeStep === 3 ? "active" : "m ap-n4"}`}
                />
                <text x="554" y="44" className="tag">
                  {selectedArch === "web" ? "04 // DATA" : "04 // GUARDRAIL"}
                </text>
                <text x="554" y="64" className="title">
                  {selectedArch === "web" ? "PostgreSQL" : "Pydantic Fences"}
                </text>
                <text x="554" y="82" className="code">
                  {selectedArch === "web" ? "ACID Store" : "Runtime Shield"}
                </text>

                {/* Inner Spec Box */}
                <rect x="552" y="96" width="104" height="58" rx="4" fill="#141418" stroke="#252530" strokeWidth="1" />
                <circle cx="562" cy="115" r="2.5" fill="#a855f7" />
                <text x="570" y="118" className="note">
                  {selectedArch === "web" ? "ACID Cluster" : "Schema Guard"}
                </text>
                <text x="562" y="138" className="code" fill="#a855f7">
                  {selectedArch === "web" ? "100% RELIABLE" : "STRICT DTO"}
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Caption Bar with Pause Toggle */}
        <div className="auth-cap mt-3 flex items-center justify-between text-[10px] font-mono text-[#767676]">
          <span>
            FIG. 04 // {currentArch.name.toUpperCase()} (CLICK STAGE TO INSPECT)
          </span>
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="hover:text-[#ededed] transition-colors"
          >
            {isPaused ? "PLAY MOTION" : "PAUSE MOTION"}
          </button>
        </div>
      </figure>

      {/* Layer Deep-Dive Breakdown Grid */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {currentArch.layers.map((layer, idx) => {
          const isSelected = activeStep === idx;
          return (
            <div
              key={layer.step}
              onClick={() => setActiveStep(isSelected ? null : idx)}
              className={`rounded-md border p-3.5 transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "border-[#ededed]/40 bg-[#17171d]"
                  : "border-[#26262e] bg-[#121216] hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10.5px] text-[#6e6e6e]">
                  {layer.step}
                </span>
                <span className="font-mono text-[10px] text-[#ededed] bg-[#22222a] px-1.5 py-0.5 rounded">
                  {layer.metric}
                </span>
              </div>
              <h3 className="mt-1.5 text-[14px] font-medium text-[#ededed]">
                {layer.layer}
              </h3>
              <div className="mt-0.5 font-mono text-[11px] text-[#a3a3a3]">
                {layer.tech}
              </div>
              <p className="mt-2 text-[12.5px] leading-relaxed text-[#8a8a92]">
                {layer.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
