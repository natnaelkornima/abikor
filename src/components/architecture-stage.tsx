"use client";

import React, { useState } from "react";
import { portfolio } from "@/data/portfolio";

export function ArchitectureStage() {
  const { architectures } = portfolio;
  const [selectedArch, setSelectedArch] = useState<"ai" | "web">("ai");
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="w-full select-none">
      {/* Architecture Type Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedArch("ai")}
            className={`rounded-[4px] border px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors duration-140 ${
              selectedArch === "ai"
                ? "border-white/30 bg-[#ededed] text-black font-semibold"
                : "border-[#303030] bg-[#1c1c1c] text-[#8e8e8e] hover:border-white/20 hover:text-[#ededed]"
            }`}
          >
            01 // Deterministic AI &amp; RAG
          </button>
          <button
            type="button"
            onClick={() => setSelectedArch("web")}
            className={`rounded-[4px] border px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors duration-140 ${
              selectedArch === "web"
                ? "border-white/30 bg-[#ededed] text-black font-semibold"
                : "border-[#303030] bg-[#1c1c1c] text-[#8e8e8e] hover:border-white/20 hover:text-[#ededed]"
            }`}
          >
            02 // High-Throughput Web
          </button>
        </div>

        <div className="font-mono text-[11px] text-[#6e6e6e] hidden sm:block">
          {architectures[selectedArch]?.spec || "FORK-JOIN RETRIEVAL & CONCURRENCY MATRIX"}
        </div>
      </div>

      {/* High-Quality Animated 2D Blueprint Diagram (Exact Match to Blog Figure) */}
      <figure
        className="auth not-prose mx-auto my-2 w-full max-w-[620px] select-none"
        data-hold={isPaused ? "true" : "false"}
      >
        <style>{`
          .auth {
            --face: #18181c;
            --edge: #2c2c36;
            --dot: #2d2d38;
            --part: #3a3a46;
            --lit: #8e8e98;
            --path: #ededed;
            --ink: #ededed;
            --muted: #737373;
            --code: #a3a3a3;
            --ghost: #4a4a4a;
            --cap: #767676;
            --accent: #e56b40;
          }
          .auth svg { display: block; width: 100%; height: auto; overflow: visible; }
          .auth :is(path, line, rect, circle) { vector-effect: non-scaling-stroke; stroke-linecap: round; stroke-linejoin: round; }
          .auth .panel { fill: var(--face); stroke: var(--edge); stroke-width: 1.1; transition: stroke .2s ease, fill .2s ease; }
          .auth .panel:hover { stroke: #525260; fill: #1c1c22; }
          .auth .wire { fill: none; stroke: var(--part); stroke-width: 1.2; }
          .auth .head { fill: none; stroke: var(--lit); stroke-width: 1.2; }
          .auth .drawn, .auth .pulse { vector-effect: none; }
          .auth .pulse { fill: none; stroke: var(--path); stroke-width: 3.2; }
          .auth .tag { fill: var(--muted); font: 8px/1 var(--font-geist-mono), ui-monospace, monospace; text-transform: uppercase; letter-spacing: .08em; }
          .auth .title { fill: var(--ink); font: 600 12px/1.2 var(--font-geist-sans), ui-sans-serif, system-ui; letter-spacing: -.01em; }
          .auth .note { fill: var(--muted); font: 9px/1.2 var(--font-geist-sans), ui-sans-serif, system-ui; }
          .auth .code { fill: var(--code); font: 9px/1.2 var(--font-geist-mono), ui-monospace, monospace; }
          .auth .readout { fill: var(--ink); font: 9.5px/1.2 var(--font-geist-mono), ui-monospace, monospace; font-variant-numeric: tabular-nums; }
          .auth .dotgrid { fill: var(--dot); }
          .auth .m { animation-timing-function: cubic-bezier(.65,0,.35,1); animation-iteration-count: infinite; animation-fill-mode: both; }
          .auth[data-hold="true"] .m { animation-play-state: paused; }
          @media (hover: hover) and (pointer: fine) {
            .auth svg:hover .m { animation-play-state: paused; }
          }
          @media (prefers-reduced-motion: reduce) {
            .auth .m { animation: none !important; }
          }

          /* Traveling Animated Wire Pulses */
          @keyframes r-pulse-in { 0%,14% { opacity: 0; stroke-dashoffset: 0.02; } 18%,26% { opacity: 1; } 28%,100% { opacity: 0; stroke-dashoffset: -1; } }
          .auth .r-pulse-in { animation: r-pulse-in 8s infinite; }

          @keyframes r-fork-wire { 0%,26% { stroke-dashoffset: 1; } 38%,100% { stroke-dashoffset: 0; } }
          .auth .r-fork-wire { animation: r-fork-wire 8s infinite; }

          @keyframes r-fork-pulse { 0%,34% { opacity: 0; stroke-dashoffset: 0.02; } 38%,48% { opacity: 1; } 50%,100% { opacity: 0; stroke-dashoffset: -1; } }
          .auth .r-fork-pulse { animation: r-fork-pulse 8s infinite; }

          @keyframes r-join-wire { 0%,54% { stroke-dashoffset: 1; } 66%,100% { stroke-dashoffset: 0; } }
          .auth .r-join-wire { animation: r-join-wire 8s infinite; }

          @keyframes r-join-pulse { 0%,62% { opacity: 0; stroke-dashoffset: 0.02; } 66%,76% { opacity: 1; } 78%,100% { opacity: 0; stroke-dashoffset: -1; } }
          .auth .r-join-pulse { animation: r-join-pulse 8s infinite; }

          /* Live Readout Cycling Steps */
          @keyframes r-r1 { 0%,24% { opacity: 1; } 25%,100% { opacity: 0; } }
          .auth .r-r1 { animation: r-r1 8s infinite; }
          @keyframes r-r2 { 0%,24% { opacity: 0; } 25%,48% { opacity: 1; } 49%,100% { opacity: 0; } }
          .auth .r-r2 { animation: r-r2 8s infinite; }
          @keyframes r-r3 { 0%,48% { opacity: 0; } 49%,72% { opacity: 1; } 73%,100% { opacity: 0; } }
          .auth .r-r3 { animation: r-r3 8s infinite; }
          @keyframes r-r4 { 0%,72% { opacity: 0; } 73%,100% { opacity: 1; } }
          .auth .r-r4 { animation: r-r4 8s infinite; }
        `}</style>

        {/* Outer Container matching the #151515 page tone seamlessly */}
        <div className="rounded-lg border border-[#262626] bg-[#151515] p-3 sm:p-4">
          <svg viewBox="0 0 460 260" role="img" aria-label="Systems Architecture Flow">
            <defs>
              {/* Subtle Dot Grid Background Pattern */}
              <pattern id="arch-dots" width="12" height="12" patternUnits="userSpaceOnUse">
                <circle cx="6" cy="6" r="0.75" className="dotgrid" />
              </pattern>
              <radialGradient id="arch-fade" cx="50%" cy="50%" r="60%">
                <stop offset="0.3" stopColor="#fff" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
              <mask id="arch-mask">
                <rect width="460" height="260" fill="url(#arch-fade)" />
              </mask>
            </defs>

            {/* Background Grid */}
            <rect width="460" height="260" fill="url(#arch-dots)" mask="url(#arch-mask)" />

            {/* Top Telemetry Header */}
            <g>
              <text x="20" y="16" className="tag">POINT TO HOLD</text>
              {selectedArch === "ai" ? (
                <>
                  <text x="440" y="16" textAnchor="end" className="readout m r-r1">
                    Top-5 grounded context (MRR +38%)
                  </text>
                  <text x="440" y="16" textAnchor="end" className="readout m r-r2">
                    Dual fork &rarr; BM25 Keywords + HNSW
                  </text>
                  <text x="440" y="16" textAnchor="end" className="readout m r-r3">
                    Reciprocal Rank fusion combiner
                  </text>
                  <text x="440" y="16" textAnchor="end" className="readout m r-r4">
                    Top-5 grounded context (MRR +38%)
                  </text>
                </>
              ) : (
                <>
                  <text x="440" y="16" textAnchor="end" className="readout m r-r1">
                    Edge Ingestion &rarr; P99 &lt; 1.2ms (40k req/s)
                  </text>
                  <text x="440" y="16" textAnchor="end" className="readout m r-r2">
                    Dual fork &rarr; Redis FIFO + Memory Cache
                  </text>
                  <text x="440" y="16" textAnchor="end" className="readout m r-r3">
                    Worker Pool &rarr; 64 Concurrency (0% loss)
                  </text>
                  <text x="440" y="16" textAnchor="end" className="readout m r-r4">
                    PostgreSQL WAL &rarr; ACID Commits Persisted
                  </text>
                </>
              )}
            </g>

            {/* Diagram Body */}
            <g transform="translate(0 22)">
              {selectedArch === "ai" ? (
                /* ================== AI & RAG ARCHITECTURE ================== */
                <>
                  {/* Left Node: User Query & Semantic Cache */}
                  <g className="cursor-pointer">
                    <rect x="20" y="65" width="118" height="105" rx="8" className="panel" />
                    <text x="32" y="85" className="tag">USER QUERY</text>
                    <text x="32" y="103" className="title">Semantic Cache</text>
                    <text x="32" y="121" className="code">Cosine 0.92</text>
                    <text x="32" y="137" className="code">41.8% hit rate</text>
                    <text x="32" y="151" className="code">Sub-15ms hit</text>
                  </g>

                  {/* Fork Wire: Left Node -> Top Middle Node (BM25) */}
                  <g>
                    <path
                      d="M138 100 H158 Q166 100 166 92 V60 Q166 52 174 52 H180"
                      pathLength="1"
                      className="wire drawn m r-fork-wire"
                      style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }}
                    />
                    <path d="M176 48.5 L180 52 L176 55.5" className="head" />
                    <path
                      d="M138 100 H158 Q166 100 166 92 V60 Q166 52 174 52 H180"
                      pathLength="1"
                      className="pulse m r-fork-pulse"
                      stroke="#d4d4d4"
                      style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }}
                    />
                  </g>

                  {/* Fork Wire: Left Node -> Bottom Middle Node (HNSW) */}
                  <g>
                    <path
                      d="M138 135 H158 Q166 135 166 143 V175 Q166 183 174 183 H180"
                      pathLength="1"
                      className="wire drawn m r-fork-wire"
                      style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }}
                    />
                    <path d="M176 179.5 L180 183 L176 186.5" className="head" />
                    <path
                      d="M138 135 H158 Q166 135 166 143 V175 Q166 183 174 183 H180"
                      pathLength="1"
                      className="pulse m r-fork-pulse"
                      stroke="#d4d4d4"
                      style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }}
                    />
                  </g>

                  {/* Middle Top Node: Lexical Index (BM25) */}
                  <g className="cursor-pointer">
                    <rect x="180" y="25" width="124" height="62" rx="6" className="panel" />
                    <text x="190" y="44" className="tag">LEXICAL INDEX</text>
                    <text x="190" y="61" className="title">BM25 Keywords</text>
                    <text x="190" y="76" className="code">Exact SKUs / IDs</text>
                  </g>

                  {/* Middle Bottom Node: Dense Index (HNSW) */}
                  <g className="cursor-pointer">
                    <rect x="180" y="150" width="124" height="62" rx="6" className="panel" />
                    <text x="190" y="168" className="tag">DENSE INDEX</text>
                    <text x="190" y="185" className="title">HNSW Vectors</text>
                    <text x="190" y="200" className="code">Dense vectors</text>
                  </g>

                  {/* Join Wire: Top Middle Node (BM25) -> Right Node */}
                  <g>
                    <path
                      d="M304 52 H314 Q322 52 322 60 V102 Q322 110 330 110 H338"
                      pathLength="1"
                      className="wire drawn m r-join-wire"
                      style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }}
                    />
                    <path d="M334 106.5 L338 110 L334 113.5" className="head" />
                    <path
                      d="M304 52 H314 Q322 52 322 60 V102 Q322 110 330 110 H338"
                      pathLength="1"
                      className="pulse m r-join-pulse"
                      stroke="#d4d4d4"
                      style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }}
                    />
                  </g>

                  {/* Join Wire: Bottom Middle Node (HNSW) -> Right Node */}
                  <g>
                    <path
                      d="M304 183 H314 Q322 183 322 175 V125 Q322 117 330 117 H338"
                      pathLength="1"
                      className="wire drawn m r-join-wire"
                      style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }}
                    />
                    <path d="M334 113.5 L338 117 L334 120.5" className="head" />
                    <path
                      d="M304 183 H314 Q322 183 322 175 V125 Q322 117 330 117 H338"
                      pathLength="1"
                      className="pulse m r-join-pulse"
                      stroke="#d4d4d4"
                      style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }}
                    />
                  </g>

                  {/* Right Node: Fusion Matrix (RRF Combiner) */}
                  <g className="cursor-pointer">
                    <rect x="338" y="65" width="102" height="105" rx="8" className="panel" />
                    <text x="348" y="85" className="tag">FUSION MATRIX</text>
                    <text x="348" y="103" className="title">RRF Combiner</text>
                    <text x="348" y="121" className="code">1/(k+rank)</text>
                    <text x="348" y="137" className="code">MRR: +38%</text>
                    <text x="348" y="151" className="code">Top-5 context</text>
                  </g>
                </>
              ) : (
                /* ================== HIGH-THROUGHPUT WEB ARCHITECTURE ================== */
                <>
                  {/* Left Node: Ingestion Gateway */}
                  <g className="cursor-pointer">
                    <rect x="20" y="65" width="118" height="105" rx="8" className="panel" />
                    <text x="32" y="85" className="tag">INGESTION</text>
                    <text x="32" y="103" className="title">Fastify Gateway</text>
                    <text x="32" y="121" className="code">HTTP/3 · Edge</text>
                    <text x="32" y="137" className="code">40k req/s</text>
                    <text x="32" y="151" className="code">p99 &lt; 1.2ms</text>
                  </g>

                  {/* Fork Wire: Left Node -> Top Middle Node (Redis Ring) */}
                  <g>
                    <path
                      d="M138 100 H158 Q166 100 166 92 V60 Q166 52 174 52 H180"
                      pathLength="1"
                      className="wire drawn m r-fork-wire"
                      style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }}
                    />
                    <path d="M176 48.5 L180 52 L176 55.5" className="head" />
                    <path
                      d="M138 100 H158 Q166 100 166 92 V60 Q166 52 174 52 H180"
                      pathLength="1"
                      className="pulse m r-fork-pulse"
                      stroke="#d4d4d4"
                      style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }}
                    />
                  </g>

                  {/* Fork Wire: Left Node -> Bottom Middle Node (Fast Path) */}
                  <g>
                    <path
                      d="M138 135 H158 Q166 135 166 143 V175 Q166 183 174 183 H180"
                      pathLength="1"
                      className="wire drawn m r-fork-wire"
                      style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }}
                    />
                    <path d="M176 179.5 L180 183 L176 186.5" className="head" />
                    <path
                      d="M138 135 H158 Q166 135 166 143 V175 Q166 183 174 183 H180"
                      pathLength="1"
                      className="pulse m r-fork-pulse"
                      stroke="#d4d4d4"
                      style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }}
                    />
                  </g>

                  {/* Middle Top Node: Async Buffer (Redis) */}
                  <g className="cursor-pointer">
                    <rect x="180" y="25" width="124" height="62" rx="6" className="panel" />
                    <text x="190" y="44" className="tag">ASYNC BUFFER</text>
                    <text x="190" y="61" className="title">Redis FIFO Ring</text>
                    <text x="190" y="76" className="code">BullMQ Streams</text>
                  </g>

                  {/* Middle Bottom Node: Fast Path (In-Memory Cache) */}
                  <g className="cursor-pointer">
                    <rect x="180" y="150" width="124" height="62" rx="6" className="panel" />
                    <text x="190" y="168" className="tag">FAST PATH</text>
                    <text x="190" y="185" className="title">In-Memory Cache</text>
                    <text x="190" y="200" className="code">Sub-millisecond</text>
                  </g>

                  {/* Join Wire: Top Middle Node (Redis) -> Right Node */}
                  <g>
                    <path
                      d="M304 52 H314 Q322 52 322 60 V102 Q322 110 330 110 H338"
                      pathLength="1"
                      className="wire drawn m r-join-wire"
                      style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }}
                    />
                    <path d="M334 106.5 L338 110 L334 113.5" className="head" />
                    <path
                      d="M304 52 H314 Q322 52 322 60 V102 Q322 110 330 110 H338"
                      pathLength="1"
                      className="pulse m r-join-pulse"
                      stroke="#d4d4d4"
                      style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }}
                    />
                  </g>

                  {/* Join Wire: Bottom Middle Node (Cache) -> Right Node */}
                  <g>
                    <path
                      d="M304 183 H314 Q322 183 322 175 V125 Q322 117 330 117 H338"
                      pathLength="1"
                      className="wire drawn m r-join-wire"
                      style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }}
                    />
                    <path d="M334 113.5 L338 117 L334 120.5" className="head" />
                    <path
                      d="M304 183 H314 Q322 183 322 175 V125 Q322 117 330 117 H338"
                      pathLength="1"
                      className="pulse m r-join-pulse"
                      stroke="#d4d4d4"
                      style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }}
                    />
                  </g>

                  {/* Right Node: Storage / Persistence (PostgreSQL Cluster) */}
                  <g className="cursor-pointer">
                    <rect x="338" y="65" width="102" height="105" rx="8" className="panel" />
                    <text x="348" y="85" className="tag">PERSISTENCE</text>
                    <text x="348" y="103" className="title">Postgres Cluster</text>
                    <text x="348" y="121" className="code">WAL replication</text>
                    <text x="348" y="137" className="code">Pool: 120 binds</text>
                    <text x="348" y="151" className="code">ACID: Verified ✓</text>
                  </g>
                </>
              )}
            </g>
          </svg>
        </div>

        {/* Technical Caption Bar with Pause/Play Motion Toggle */}
        <figcaption className="mt-3">
          <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-wider text-[#767676]">
            <span>
              {selectedArch === "ai"
                ? "Fig. 04 — Reciprocal Rank Fusion: Merging sparse exact keywords and dense semantics"
                : "Fig. 04 — Asynchronous Pipeline: Ingestion decoupled from persistence via dual-path buffers"}
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
