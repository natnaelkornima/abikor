"use client";

import React, { useState, useEffect } from "react";
import { portfolio } from "@/data/portfolio";

export function ArchitectureStage() {
  const { architectures } = portfolio;
  const [selectedArch, setSelectedArch] = useState<"web" | "ai">("web");
  const [isPaused, setIsPaused] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Auto-step highlighting synchronized with pulse animations
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === null ? 0 : (prev + 1) % 4));
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Clean, high-signal node definitions with minimal text and rich technical detail
  const webStages = [
    {
      num: "01",
      tag: "INGESTION",
      title: "Edge Gateway",
      protocol: "Fastify / HTTP3",
      accent: "#4ade80",
      metricTop: "p99: 1.2ms",
      metricBot: "40k req/s",
      state: "CACHE HIT 98%",
    },
    {
      num: "02",
      tag: "BUFFER",
      title: "Redis Streams",
      protocol: "FIFO Event Ring",
      accent: "#38bdf8",
      metricTop: "Zero loss",
      metricBot: "BullMQ queue",
      state: "RING ACTIVE",
    },
    {
      num: "03",
      tag: "COMPUTE",
      title: "Worker Core",
      protocol: "Async Pool",
      accent: "#e56b40",
      metricTop: "Threads: 64",
      metricBot: "Retry & backoff",
      state: "JOB PASS",
    },
    {
      num: "04",
      tag: "STORAGE",
      title: "PostgreSQL",
      protocol: "WAL Cluster",
      accent: "#a855f7",
      metricTop: "120 binds",
      metricBot: "ACID verify",
      state: "SYNCED ✓",
    },
  ];

  const aiStages = [
    {
      num: "01",
      tag: "GATEWAY",
      title: "FastAPI Core",
      protocol: "Token Firewall",
      accent: "#4ade80",
      metricTop: "Sanitize pass",
      metricBot: "Rate: 120/s",
      state: "SECURE ✓",
    },
    {
      num: "02",
      tag: "RETRIEVAL",
      title: "Hybrid RAG",
      protocol: "Dense + Sparse",
      accent: "#38bdf8",
      metricTop: "Qdrant + BM25",
      metricBot: "Top-k: 8 chunks",
      state: "RECALL 94%",
    },
    {
      num: "03",
      tag: "REASONING",
      title: "LLM Engine",
      protocol: "JSON Grammars",
      accent: "#e56b40",
      metricTop: "Deterministic",
      metricBot: "p99: 240ms",
      state: "INFERENCE OK",
    },
    {
      num: "04",
      tag: "VALIDATION",
      title: "Guardrails",
      protocol: "Pydantic DTO",
      accent: "#a855f7",
      metricTop: "Strict schema",
      metricBot: "100% invariant",
      state: "VERIFIED ✓",
    },
  ];

  const currentStages = selectedArch === "web" ? webStages : aiStages;

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

      {/* High-Quality Animated 2D Vector Blueprint Diagram Matching Blog Style */}
      <figure
        className="arch-fig not-prose mx-auto my-2 w-full max-w-[720px] select-none"
        data-hold={isPaused ? "true" : "false"}
      >
        <style>{`
          .arch-fig {
            --face: #101014;
            --edge: #26262e;
            --dot: #252530;
            --wire: #3e3e4a;
            --path: #e6e6e6;
            --ink: #ededed;
            --muted: #767676;
            --code: #a3a3a3;
            --panel-bg: #141419;
            --inner-bg: #191920;
          }
          .arch-fig svg { display: block; width: 100%; height: auto; overflow: visible; }
          .arch-fig :is(path, line, rect, circle) { vector-effect: non-scaling-stroke; stroke-linecap: round; stroke-linejoin: round; }
          
          /* Rectangular Node Panels */
          .arch-fig .node-panel {
            fill: var(--panel-bg);
            stroke: var(--edge);
            stroke-width: 1.2;
            transition: stroke .25s ease, fill .25s ease, filter .25s ease;
          }
          .arch-fig .node-panel:hover {
            fill: #171720;
            stroke: #484856;
          }
          .arch-fig .node-panel.active {
            stroke: #ededed;
            fill: #191924;
          }
          
          /* Wire Conduits & Arrowheads */
          .arch-fig .wire-base {
            fill: none;
            stroke: var(--wire);
            stroke-width: 1.2;
          }
          .arch-fig .arrow-head {
            fill: none;
            stroke: #8a8a98;
            stroke-width: 1.2;
          }
          .arch-fig .pulse {
            vector-effect: none;
            fill: none;
            stroke-width: 3;
            stroke-linecap: round;
          }

          /* Typography */
          .arch-fig .tag {
            fill: var(--muted);
            font: 8px/1 var(--font-geist-mono), ui-monospace, monospace;
            text-transform: uppercase;
            letter-spacing: .08em;
          }
          .arch-fig .title {
            fill: var(--ink);
            font: 500 12px/1.2 var(--font-geist-sans), ui-sans-serif, system-ui;
            letter-spacing: -.01em;
          }
          .arch-fig .code {
            fill: var(--code);
            font: 9px/1.2 var(--font-geist-mono), ui-monospace, monospace;
          }
          .arch-fig .metric {
            fill: #b3b3bc;
            font: 8.5px/1.2 var(--font-geist-mono), ui-monospace, monospace;
          }
          .arch-fig .readout {
            fill: var(--ink);
            font: 9.5px/1.2 var(--font-geist-mono), ui-monospace, monospace;
            font-variant-numeric: tabular-nums;
          }

          /* Animation Timers & Controls */
          .arch-fig .m {
            animation-timing-function: cubic-bezier(.65, 0, .35, 1);
            animation-iteration-count: infinite;
            animation-fill-mode: both;
          }
          .arch-fig[data-hold="true"] .m { animation-play-state: paused; }
          @media (hover: hover) and (pointer: fine) {
            .arch-fig svg:hover .m { animation-play-state: paused; }
          }
          @media (prefers-reduced-motion: reduce) {
            .arch-fig .m { animation: none !important; }
          }

          /* Traveling Arrow Packet Pulses across 3 conduits (8s loop) */
          @keyframes ap-pulse1 {
            0%, 6% { opacity: 0; stroke-dashoffset: 0.05; }
            12%, 22% { opacity: 1; }
            28%, 100% { opacity: 0; stroke-dashoffset: -1; }
          }
          .arch-fig .ap-pulse1 { animation: ap-pulse1 8s infinite; }

          @keyframes ap-pulse2 {
            0%, 31% { opacity: 0; stroke-dashoffset: 0.05; }
            37%, 47% { opacity: 1; }
            53%, 100% { opacity: 0; stroke-dashoffset: -1; }
          }
          .arch-fig .ap-pulse2 { animation: ap-pulse2 8s infinite; }

          @keyframes ap-pulse3 {
            0%, 56% { opacity: 0; stroke-dashoffset: 0.05; }
            62%, 72% { opacity: 1; }
            78%, 100% { opacity: 0; stroke-dashoffset: -1; }
          }
          .arch-fig .ap-pulse3 { animation: ap-pulse3 8s infinite; }

          /* Synchronized Border Pulses */
          @keyframes ap-border1 {
            0%, 20% { stroke: #4ade80; }
            26%, 100% { stroke: var(--edge); }
          }
          .arch-fig .ap-border1 { animation: ap-border1 8s infinite; }

          @keyframes ap-border2 {
            0%, 25% { stroke: var(--edge); }
            31%, 49% { stroke: #38bdf8; }
            54%, 100% { stroke: var(--edge); }
          }
          .arch-fig .ap-border2 { animation: ap-border2 8s infinite; }

          @keyframes ap-border3 {
            0%, 50% { stroke: var(--edge); }
            56%, 74% { stroke: #e56b40; }
            79%, 100% { stroke: var(--edge); }
          }
          .arch-fig .ap-border3 { animation: ap-border3 8s infinite; }

          @keyframes ap-border4 {
            0%, 75% { stroke: var(--edge); }
            81%, 97% { stroke: #a855f7; }
            100% { stroke: var(--edge); }
          }
          .arch-fig .ap-border4 { animation: ap-border4 8s infinite; }

          /* Live Top Status Telemetry */
          @keyframes ap-stat1 { 0%, 24% { opacity: 1; } 25%, 100% { opacity: 0; } }
          .arch-fig .ap-stat1 { animation: ap-stat1 8s infinite; }
          @keyframes ap-stat2 { 0%, 24% { opacity: 0; } 25%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
          .arch-fig .ap-stat2 { animation: ap-stat2 8s infinite; }
          @keyframes ap-stat3 { 0%, 49% { opacity: 0; } 50%, 74% { opacity: 1; } 75%, 100% { opacity: 0; } }
          .arch-fig .ap-stat3 { animation: ap-stat3 8s infinite; }
          @keyframes ap-stat4 { 0%, 74% { opacity: 0; } 75%, 100% { opacity: 1; } }
          .arch-fig .ap-stat4 { animation: ap-stat4 8s infinite; }
        `}</style>

        <div className="arch-fig rounded-lg border border-[#24242c] bg-[#0c0c0f] p-4">
          <svg viewBox="0 0 680 230" role="img" aria-label="Systems Architecture Flow Blueprint">
            <defs>
              {/* Dot Grid Background Pattern */}
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

            {/* Background Grid */}
            <rect width="680" height="230" fill="url(#arch-dots)" mask="url(#arch-mask)" />

            {/* Top Telemetry Header */}
            <g>
              <text x="20" y="20" className="tag">
                POINT TO HOLD &middot; CLICK STAGE TO INSPECT
              </text>
              {selectedArch === "web" ? (
                <>
                  <text x="660" y="20" textAnchor="end" className="readout m ap-stat1">
                    01/04: Fastify Edge &rarr; P99 &lt; 1.2ms (40k req/s)
                  </text>
                  <text x="660" y="20" textAnchor="end" className="readout m ap-stat2">
                    02/04: Redis Ring &rarr; Zero-drop FIFO queue buffer
                  </text>
                  <text x="660" y="20" textAnchor="end" className="readout m ap-stat3">
                    03/04: BullMQ Workers &rarr; Concurrency 64 workers
                  </text>
                  <text x="660" y="20" textAnchor="end" className="readout m ap-stat4">
                    04/04: PostgreSQL WAL &rarr; ACID Commits persisted
                  </text>
                </>
              ) : (
                <>
                  <text x="660" y="20" textAnchor="end" className="readout m ap-stat1">
                    01/04: FastAPI Gate &rarr; Prompt Injection Firewall
                  </text>
                  <text x="660" y="20" textAnchor="end" className="readout m ap-stat2">
                    02/04: Hybrid RAG &rarr; Dense + Sparse Fusion (94% recall)
                  </text>
                  <text x="660" y="20" textAnchor="end" className="readout m ap-stat3">
                    03/04: LLM Engine &rarr; Structured JSON grammar output
                  </text>
                  <text x="660" y="20" textAnchor="end" className="readout m ap-stat4">
                    04/04: Guardrails &rarr; Strict schema assertions
                  </text>
                </>
              )}
            </g>

            {/*
              =================================================================
              GEOMETRICALLY ALIGNED 4 RECTANGULAR NODES & CONNECTING ARROWS
              =================================================================
              Total diagram width: 680
              Nodes: 4 nodes, width = 124px each -> 4 * 124 = 496px
              Conduits: 3 conduits, width = 48px each -> 3 * 48 = 144px
              Total diagram span = 496 + 144 = 640px
              Left margin: (680 - 640) / 2 = 20px
              
              Node 1: X = 20 -> 144
              Arrow 1: X = 144 -> 192 (length 48, Center Y = 120)
              Node 2: X = 192 -> 316
              Arrow 2: X = 316 -> 364 (length 48, Center Y = 120)
              Node 3: X = 364 -> 488
              Arrow 3: X = 488 -> 536 (length 48, Center Y = 120)
              Node 4: X = 536 -> 660
              Right margin = 680 - 660 = 20px (Perfect symmetry!)
              
              Node Top: Y = 46, Node Height: 148, Node Center Y: 120
            */}

            {/* ================= STAGE 1: RECTANGULAR NODE ================= */}
            <g className="cursor-pointer" onClick={() => setActiveStep(0)}>
              <rect
                x="20"
                y="46"
                width="124"
                height="148"
                rx="8"
                className={`node-panel ${activeStep === 0 ? "active" : "m ap-border1"}`}
              />
              <text x="32" y="68" className="tag">{currentStages[0].num} // {currentStages[0].tag}</text>
              <text x="32" y="87" className="title">{currentStages[0].title}</text>
              <text x="32" y="103" className="code">{currentStages[0].protocol}</text>

              {/* Inset Visual Card */}
              <rect x="28" y="112" width="108" height="68" rx="5" fill="#131317" stroke="#252530" strokeWidth="1" />
              <circle cx="39" cy="128" r="2.5" fill={currentStages[0].accent} />
              <text x="47" y="131" className="metric">{currentStages[0].metricTop}</text>
              <line x1="36" y1="141" x2="128" y2="141" stroke="#202028" strokeDasharray="2 2" />
              <text x="39" y="153" className="metric">{currentStages[0].metricBot}</text>
              <rect x="36" y="160" width="92" height="13" rx="2" fill="#181822" />
              <text x="82" y="170" textAnchor="middle" className="code" fill={currentStages[0].accent}>
                {currentStages[0].state}
              </text>
            </g>

            {/* ================= ARROW 1 -> 2 WITH TRAVELING PULSE ================= */}
            <g>
              {/* Base line */}
              <line x1="144" y1="120" x2="192" y2="120" className="wire-base" />
              {/* Arrow Head */}
              <path d="M187 116.5 L192 120 L187 123.5" className="arrow-head" />
              {/* Glowing Traveling Pulse */}
              <path
                d="M144 120 H192"
                pathLength="1"
                className="pulse m ap-pulse1"
                stroke={currentStages[1].accent}
                style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }}
              />
            </g>

            {/* ================= STAGE 2: RECTANGULAR NODE ================= */}
            <g className="cursor-pointer" onClick={() => setActiveStep(1)}>
              <rect
                x="192"
                y="46"
                width="124"
                height="148"
                rx="8"
                className={`node-panel ${activeStep === 1 ? "active" : "m ap-border2"}`}
              />
              <text x="204" y="68" className="tag">{currentStages[1].num} // {currentStages[1].tag}</text>
              <text x="204" y="87" className="title">{currentStages[1].title}</text>
              <text x="204" y="103" className="code">{currentStages[1].protocol}</text>

              {/* Inset Visual Card: Queue Slot Matrix */}
              <rect x="200" y="112" width="108" height="68" rx="5" fill="#131317" stroke="#252530" strokeWidth="1" />
              {/* 3 Visual Queue Buffers */}
              {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(206, ${119 + i * 18})`}>
                  <rect width="96" height="14" rx="2.5" fill="#181822" stroke="#232330" strokeWidth="0.8" />
                  <circle cx="7" cy="7" r="2" fill={i === 0 ? currentStages[1].accent : "#606070"} />
                  <text x="14" y="10" className="metric" fill={i === 0 ? "#ededed" : "#767682"}>
                    {i === 0 ? "buf.p0 (active)" : i === 1 ? "buf.p1 (stream)" : "buf.p2 (ready)"}
                  </text>
                </g>
              ))}
            </g>

            {/* ================= ARROW 2 -> 3 WITH TRAVELING PULSE ================= */}
            <g>
              <line x1="316" y1="120" x2="364" y2="120" className="wire-base" />
              <path d="M359 116.5 L364 120 L359 123.5" className="arrow-head" />
              <path
                d="M316 120 H364"
                pathLength="1"
                className="pulse m ap-pulse2"
                stroke={currentStages[2].accent}
                style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }}
              />
            </g>

            {/* ================= STAGE 3: RECTANGULAR NODE ================= */}
            <g className="cursor-pointer" onClick={() => setActiveStep(2)}>
              <rect
                x="364"
                y="46"
                width="124"
                height="148"
                rx="8"
                className={`node-panel ${activeStep === 2 ? "active" : "m ap-border3"}`}
              />
              <text x="376" y="68" className="tag">{currentStages[2].num} // {currentStages[2].tag}</text>
              <text x="376" y="87" className="title">{currentStages[2].title}</text>
              <text x="376" y="103" className="code">{currentStages[2].protocol}</text>

              {/* Inset Visual Card: Worker Core Grid */}
              <rect x="372" y="112" width="108" height="68" rx="5" fill="#131317" stroke="#252530" strokeWidth="1" />
              <circle cx="383" cy="128" r="2.5" fill={currentStages[2].accent} />
              <text x="391" y="131" className="metric">{currentStages[2].metricTop}</text>
              <line x1="380" y1="141" x2="472" y2="141" stroke="#202028" strokeDasharray="2 2" />
              <text x="383" y="153" className="metric">{currentStages[2].metricBot}</text>
              <rect x="380" y="160" width="92" height="13" rx="2" fill="#181822" />
              <text x="426" y="170" textAnchor="middle" className="code" fill={currentStages[2].accent}>
                {currentStages[2].state}
              </text>
            </g>

            {/* ================= ARROW 3 -> 4 WITH TRAVELING PULSE ================= */}
            <g>
              <line x1="488" y1="120" x2="536" y2="120" className="wire-base" />
              <path d="M531 116.5 L536 120 L531 123.5" className="arrow-head" />
              <path
                d="M488 120 H536"
                pathLength="1"
                className="pulse m ap-pulse3"
                stroke={currentStages[3].accent}
                style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }}
              />
            </g>

            {/* ================= STAGE 4: RECTANGULAR NODE ================= */}
            <g className="cursor-pointer" onClick={() => setActiveStep(3)}>
              <rect
                x="536"
                y="46"
                width="124"
                height="148"
                rx="8"
                className={`node-panel ${activeStep === 3 ? "active" : "m ap-border4"}`}
              />
              <text x="548" y="68" className="tag">{currentStages[3].num} // {currentStages[3].tag}</text>
              <text x="548" y="87" className="title">{currentStages[3].title}</text>
              <text x="548" y="103" className="code">{currentStages[3].protocol}</text>

              {/* Inset Visual Card: ACID Verification Database */}
              <rect x="544" y="112" width="108" height="68" rx="5" fill="#131317" stroke="#252530" strokeWidth="1" />
              <circle cx="555" cy="128" r="2.5" fill={currentStages[3].accent} />
              <text x="563" y="131" className="metric">{currentStages[3].metricTop}</text>
              <line x1="552" y1="141" x2="644" y2="141" stroke="#202028" strokeDasharray="2 2" />
              <text x="555" y="153" className="metric">{currentStages[3].metricBot}</text>
              <rect x="552" y="160" width="92" height="13" rx="2" fill="#181822" />
              <text x="598" y="170" textAnchor="middle" className="code" fill={currentStages[3].accent}>
                {currentStages[3].state}
              </text>
            </g>
          </svg>
        </div>

        {/* Caption Bar with Pause/Play Motion Toggle */}
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
