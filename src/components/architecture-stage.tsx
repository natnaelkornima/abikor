"use client";

import React, { useState, useEffect } from "react";
import { portfolio } from "@/data/portfolio";

export function ArchitectureStage() {
  const { architectures } = portfolio;
  const [selectedArch, setSelectedArch] = useState<"web" | "ai">("web");
  const [isPaused, setIsPaused] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Auto-step highlighting when not paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === null ? 0 : (prev + 1) % 4));
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const webNodes = [
    {
      num: "01",
      tag: "INGESTION",
      title: "Edge Gateway",
      tech: "Fastify + Proxy",
      dot: "#4ade80",
      metric1: "P99 < 1.2ms",
      metric2: "40k req/s",
      badge: "CACHE: 98%",
      color: "#4ade80",
    },
    {
      num: "02",
      tag: "EVENT BUS",
      title: "Redis Ring",
      tech: "FIFO Streams",
      dot: "#38bdf8",
      metric1: "Zero drops",
      metric2: "BullMQ queue",
      badge: "RING: ACTIVE",
      color: "#38bdf8",
    },
    {
      num: "03",
      tag: "COMPUTE",
      title: "Worker Core",
      tech: "Async Workers",
      dot: "#e56b40",
      metric1: "Concurrency: 64",
      metric2: "Retry & Backoff",
      badge: "JOB: PASS",
      color: "#e56b40",
    },
    {
      num: "04",
      tag: "STORAGE",
      title: "PostgreSQL",
      tech: "ACID Cluster",
      dot: "#a855f7",
      metric1: "WAL replication",
      metric2: "Pool: 120 binds",
      badge: "ACID: OK",
      color: "#a855f7",
    },
  ];

  const aiNodes = [
    {
      num: "01",
      tag: "GATEWAY",
      title: "FastAPI Core",
      tech: "Token Firewall",
      dot: "#4ade80",
      metric1: "Sanitizer pass",
      metric2: "Injection block",
      badge: "RATE: 120/s",
      color: "#4ade80",
    },
    {
      num: "02",
      tag: "RETRIEVAL",
      title: "Hybrid RAG",
      tech: "Qdrant + BM25",
      dot: "#38bdf8",
      metric1: "RRF score fusion",
      metric2: "Top-k: 8 chunks",
      badge: "RECALL: 94%",
      color: "#38bdf8",
    },
    {
      num: "03",
      tag: "REASONING",
      title: "LLM Runner",
      tech: "Structured Mode",
      dot: "#e56b40",
      metric1: "JSON grammar",
      metric2: "Deterministic",
      badge: "P99: 240ms",
      color: "#e56b40",
    },
    {
      num: "04",
      tag: "VALIDATION",
      title: "Guardrails",
      tech: "Pydantic DTO",
      dot: "#a855f7",
      metric1: "Type assertion",
      metric2: "Schema check",
      badge: "VALID: 100%",
      color: "#a855f7",
    },
  ];

  const currentNodes = selectedArch === "web" ? webNodes : aiNodes;

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
            01 // High-Throughput Web
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
          {architectures[selectedArch]?.spec || "FLOW // 4-STAGE DETERMINISTIC PIPELINE"}
        </div>
      </div>

      {/* High-Quality Animated 2D Vector Blueprint Diagram (Matching Blog Style) */}
      <figure
        className="auth not-prose mx-auto my-2 w-full max-w-[720px] select-none"
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
          .arch-stage .panel { fill: var(--face); stroke: var(--edge); stroke-width: 1.2; transition: stroke .3s, fill .3s; }
          .arch-stage .panel.active { stroke: #ededed; fill: #16161c; }
          .arch-stage .wire { fill: none; stroke: var(--part); stroke-width: 1.2; }
          .arch-stage .head { fill: none; stroke: #8e8e98; stroke-width: 1.2; }
          .arch-stage .drawn, .arch-stage .pulse { vector-effect: none; }
          .arch-stage .pulse { fill: none; stroke: var(--path); stroke-width: 3.2; }
          .arch-stage .tag { fill: var(--muted); font: 8px/1 var(--font-geist-mono), ui-monospace, monospace; text-transform: uppercase; letter-spacing: .08em; }
          .arch-stage .title { fill: var(--ink); font: 500 12px/1.2 var(--font-geist-sans), ui-sans-serif, system-ui; letter-spacing: -.01em; }
          .arch-stage .note { fill: var(--muted); font: 9.5px/1.2 var(--font-geist-sans), ui-sans-serif, system-ui; }
          .arch-stage .code { fill: var(--code); font: 9px/1.2 var(--font-geist-mono), ui-monospace, monospace; }
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
          @keyframes ap-wire1 { 0%,8% { stroke-dashoffset: 1; } 18%,100% { stroke-dashoffset: 0; } }
          .arch-stage .ap-wire1 { animation: ap-wire1 8s infinite; }
          @keyframes ap-pulse1 { 0%,10% { opacity: 0; stroke-dashoffset: 0.02; } 16%,25% { opacity: 1; } 27%,100% { opacity: 0; stroke-dashoffset: -1; } }
          .arch-stage .ap-pulse1 { animation: ap-pulse1 8s infinite; }

          @keyframes ap-wire2 { 0%,30% { stroke-dashoffset: 1; } 40%,100% { stroke-dashoffset: 0; } }
          .arch-stage .ap-wire2 { animation: ap-wire2 8s infinite; }
          @keyframes ap-pulse2 { 0%,33% { opacity: 0; stroke-dashoffset: 0.02; } 39%,48% { opacity: 1; } 50%,100% { opacity: 0; stroke-dashoffset: -1; } }
          .arch-stage .ap-pulse2 { animation: ap-pulse2 8s infinite; }

          @keyframes ap-wire3 { 0%,55% { stroke-dashoffset: 1; } 65%,100% { stroke-dashoffset: 0; } }
          .arch-stage .ap-wire3 { animation: ap-wire3 8s infinite; }
          @keyframes ap-pulse3 { 0%,58% { opacity: 0; stroke-dashoffset: 0.02; } 64%,73% { opacity: 1; } 75%,100% { opacity: 0; stroke-dashoffset: -1; } }
          .arch-stage .ap-pulse3 { animation: ap-pulse3 8s infinite; }

          /* Node Border Activations */
          @keyframes ap-n1 { 0%,22% { stroke: #4ade80; } 26%,100% { stroke: var(--edge); } }
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
          <svg viewBox="0 0 680 230" role="img" aria-label="Systems Architecture Flow Engine">
            <defs>
              <pattern id="arch-dots" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="7" cy="7" r="0.75" fill="#22222c" />
              </pattern>
              <radialGradient id="arch-fade" cx="50%" cy="50%" r="65%">
                <stop offset="0.35" stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <mask id="arch-mask">
                <rect width="680" height="230" fill="url(#arch-fade)" />
              </mask>
            </defs>

            <rect width="680" height="230" fill="url(#arch-dots)" mask="url(#arch-mask)" />

            {/* Top Telemetry Bar */}
            <g>
              <text x="24" y="20" className="tag hint">Point to hold</text>
              {selectedArch === "web" ? (
                <>
                  <text x="656" y="20" textAnchor="end" className="note readout m ap-r1">
                    01/04: Client Edge &rarr; Fastify Gateway (P99 &lt; 1.2ms)
                  </text>
                  <text x="656" y="20" textAnchor="end" className="note readout m ap-r2">
                    02/04: Redis FIFO Queue &rarr; Priority Ring Enqueued
                  </text>
                  <text x="656" y="20" textAnchor="end" className="note readout m ap-r3">
                    03/04: BullMQ Workers &rarr; Concurrency 64 (0% Loss)
                  </text>
                  <text x="656" y="20" textAnchor="end" className="note readout m ap-r4">
                    04/04: PostgreSQL WAL &rarr; ACID Commits Persisted
                  </text>
                </>
              ) : (
                <>
                  <text x="656" y="20" textAnchor="end" className="note readout m ap-r1">
                    01/04: FastAPI Gate &rarr; Prompt Injection Sanitizer Pass
                  </text>
                  <text x="656" y="20" textAnchor="end" className="note readout m ap-r2">
                    02/04: Hybrid RAG &rarr; Qdrant Dense + BM25 Sparse Fusion
                  </text>
                  <text x="656" y="20" textAnchor="end" className="note readout m ap-r3">
                    03/04: LLM Reasoning Core &rarr; Deterministic JSON Grammars
                  </text>
                  <text x="656" y="20" textAnchor="end" className="note readout m ap-r4">
                    04/04: Pydantic Guardrails &rarr; Strict Schema Validation
                  </text>
                </>
              )}
            </g>

            {/* 4 Connected Rectangular Stages with Conduits & Traveling Pulses */}
            {/*
              Geometry Calculation:
              Total width: 680
              Nodes: 4 nodes, width = 125 each (total 500)
              Conduits: 3 conduits, width = 46 each (total 138)
              Total diagram span = 500 + 138 = 638
              Left margin: (680 - 638) / 2 = 21 -> x = 21
              Node 1: 21 -> 146
              Conduit 1: 146 -> 192 (length 46)
              Node 2: 192 -> 317
              Conduit 2: 317 -> 363 (length 46)
              Node 3: 363 -> 488
              Conduit 3: 488 -> 534 (length 46)
              Node 4: 534 -> 659
              Right margin: 680 - 659 = 21. Perfectly aligned and symmetric!
            */}
            <g transform="translate(0 34)">
              {/* STAGE 1: RECTANGULAR NODE */}
              <g className="cursor-pointer" onClick={() => setActiveStep(0)}>
                <rect
                  x="21"
                  y="12"
                  width="125"
                  height="150"
                  rx="8"
                  className={`panel ${activeStep === 0 ? "active" : "m ap-n1"}`}
                />
                <text x="33" y="34" className="tag">{currentNodes[0].num} // {currentNodes[0].tag}</text>
                <text x="33" y="54" className="title">{currentNodes[0].title}</text>
                <text x="33" y="70" className="code">{currentNodes[0].tech}</text>

                {/* Inner Spec Chip */}
                <rect x="29" y="82" width="109" height="66" rx="4" fill="#141418" stroke="#252530" strokeWidth="1" />
                <circle cx="41" cy="99" r="2.5" fill={currentNodes[0].dot} />
                <text x="49" y="102" className="note">{currentNodes[0].metric1}</text>
                <text x="41" y="122" className="code">{currentNodes[0].metric2}</text>
                <text x="41" y="138" className="code" fill={currentNodes[0].color}>{currentNodes[0].badge}</text>
              </g>

              {/* CONDUIT 1 -> 2 WITH TRAVELING ARROW & PULSE */}
              <g>
                <path
                  d="M146 87 H192"
                  pathLength="1"
                  className="wire drawn m ap-wire1"
                  style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }}
                />
                <path d="M188 83.5 L192 87 L188 90.5" className="head" />
                <path
                  d="M146 87 H192"
                  pathLength="1"
                  className="pulse m ap-pulse1"
                  stroke={currentNodes[1].color}
                  style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }}
                />
              </g>

              {/* STAGE 2: RECTANGULAR NODE */}
              <g className="cursor-pointer" onClick={() => setActiveStep(1)}>
                <rect
                  x="192"
                  y="12"
                  width="125"
                  height="150"
                  rx="8"
                  className={`panel ${activeStep === 1 ? "active" : "m ap-n2"}`}
                />
                <text x="204" y="34" className="tag">{currentNodes[1].num} // {currentNodes[1].tag}</text>
                <text x="204" y="54" className="title">{currentNodes[1].title}</text>
                <text x="204" y="70" className="code">{currentNodes[1].tech}</text>

                {/* Inner Spec Chip */}
                <rect x="200" y="82" width="109" height="66" rx="4" fill="#141418" stroke="#252530" strokeWidth="1" />
                <circle cx="212" cy="99" r="2.5" fill={currentNodes[1].dot} />
                <text x="220" y="102" className="note">{currentNodes[1].metric1}</text>
                <text x="212" y="122" className="code">{currentNodes[1].metric2}</text>
                <text x="212" y="138" className="code" fill={currentNodes[1].color}>{currentNodes[1].badge}</text>
              </g>

              {/* CONDUIT 2 -> 3 WITH TRAVELING ARROW & PULSE */}
              <g>
                <path
                  d="M317 87 H363"
                  pathLength="1"
                  className="wire drawn m ap-wire2"
                  style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }}
                />
                <path d="M359 83.5 L363 87 L359 90.5" className="head" />
                <path
                  d="M317 87 H363"
                  pathLength="1"
                  className="pulse m ap-pulse2"
                  stroke={currentNodes[2].color}
                  style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }}
                />
              </g>

              {/* STAGE 3: RECTANGULAR NODE */}
              <g className="cursor-pointer" onClick={() => setActiveStep(2)}>
                <rect
                  x="363"
                  y="12"
                  width="125"
                  height="150"
                  rx="8"
                  className={`panel ${activeStep === 2 ? "active" : "m ap-n3"}`}
                />
                <text x="375" y="34" className="tag">{currentNodes[2].num} // {currentNodes[2].tag}</text>
                <text x="375" y="54" className="title">{currentNodes[2].title}</text>
                <text x="375" y="70" className="code">{currentNodes[2].tech}</text>

                {/* Inner Spec Chip */}
                <rect x="371" y="82" width="109" height="66" rx="4" fill="#141418" stroke="#252530" strokeWidth="1" />
                <circle cx="383" cy="99" r="2.5" fill={currentNodes[2].dot} />
                <text x="391" y="102" className="note">{currentNodes[2].metric1}</text>
                <text x="383" y="122" className="code">{currentNodes[2].metric2}</text>
                <text x="383" y="138" className="code" fill={currentNodes[2].color}>{currentNodes[2].badge}</text>
              </g>

              {/* CONDUIT 3 -> 4 WITH TRAVELING ARROW & PULSE */}
              <g>
                <path
                  d="M488 87 H534"
                  pathLength="1"
                  className="wire drawn m ap-wire3"
                  style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }}
                />
                <path d="M530 83.5 L534 87 L530 90.5" className="head" />
                <path
                  d="M488 87 H534"
                  pathLength="1"
                  className="pulse m ap-pulse3"
                  stroke={currentNodes[3].color}
                  style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }}
                />
              </g>

              {/* STAGE 4: RECTANGULAR NODE */}
              <g className="cursor-pointer" onClick={() => setActiveStep(3)}>
                <rect
                  x="534"
                  y="12"
                  width="125"
                  height="150"
                  rx="8"
                  className={`panel ${activeStep === 3 ? "active" : "m ap-n4"}`}
                />
                <text x="546" y="34" className="tag">{currentNodes[3].num} // {currentNodes[3].tag}</text>
                <text x="546" y="54" className="title">{currentNodes[3].title}</text>
                <text x="546" y="70" className="code">{currentNodes[3].tech}</text>

                {/* Inner Spec Chip */}
                <rect x="542" y="82" width="109" height="66" rx="4" fill="#141418" stroke="#252530" strokeWidth="1" />
                <circle cx="554" cy="99" r="2.5" fill={currentNodes[3].dot} />
                <text x="562" y="102" className="note">{currentNodes[3].metric1}</text>
                <text x="554" y="122" className="code">{currentNodes[3].metric2}</text>
                <text x="554" y="138" className="code" fill={currentNodes[3].color}>{currentNodes[3].badge}</text>
              </g>
            </g>
          </svg>
        </div>

        {/* Technical Caption Bar with Pause/Play Motion Toggle */}
        <figcaption className="mt-3">
          <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-wider text-[#767676]">
            <span>
              Fig. 04 — Systems Architecture: {selectedArch === "web" ? "Distributed Ingestion & Storage Pipeline" : "Deterministic Hybrid RAG & Verification Engine"}
            </span>
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="text-[#8e8e8e] hover:text-[#ededed] transition-colors cursor-pointer py-1"
            >
              {isPaused ? "Play motion" : "Pause motion"}
            </button>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
