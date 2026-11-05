"use client";

import React, { useState } from "react";

interface Article2DFigureProps {
  figureType: string;
  title?: string;
}

export function Article2DFigure({ figureType, title }: Article2DFigureProps) {
  const [isPaused, setIsPaused] = useState(false);

  const key =
    figureType === "queue-dispatcher" || figureType === "decoupling-sms-gateways"
      ? "queue"
      : figureType === "schema-guardrail" || figureType === "deterministic-schema-guardrails"
      ? "schema"
      : figureType === "audio-synth" || figureType === "web-audio-api-edge"
      ? "audio"
      : figureType === "hexagonal-ports" || figureType === "hexagonal-architecture-typescript"
      ? "hex"
      : "rag";

  return (
    <figure
      className="auth not-prose mx-auto my-10 max-w-[560px] select-none"
      data-hold={isPaused ? "true" : "false"}
    >
      <style>{`
        .auth {
          --face: #111111;
          --edge: #2c2c2c;
          --dot: #2e2e2e;
          --part: #3a3a3a;
          --lit: #6b6b6b;
          --path: #d4d4d4;
          --ink: #e6e6e6;
          --muted: #767676;
          --code: #a3a3a3;
          --ghost: #4a4a4a;
          --cap: #767676;
          --accent: #e56b40;
        }
        .auth svg { display: block; width: 100%; height: auto; overflow: visible; }
        .auth :is(path, line, rect, circle) { vector-effect: non-scaling-stroke; stroke-linecap: round; stroke-linejoin: round; }
        .auth .panel { fill: var(--face); stroke: var(--edge); stroke-width: 1; }
        .auth .lit { fill: none; stroke: var(--path); stroke-width: 1.2; stroke-dasharray: 1 2.5; }
        .auth .edge { fill: none; stroke: var(--path); stroke-width: 1.2; }
        .auth .ghost { fill: none; stroke: var(--part); stroke-width: 1; stroke-dasharray: 3 3; }
        .auth .wire { fill: none; stroke: var(--part); stroke-width: 1; }
        .auth .head { fill: none; stroke: var(--lit); stroke-width: 1; }
        .auth .drawn, .auth .pulse { vector-effect: none; }
        .auth .pulse { fill: none; stroke: var(--path); stroke-width: 3.4; }
        .auth .tag { fill: var(--muted); font: 8px/1 var(--font-geist-mono), ui-monospace, monospace; text-transform: uppercase; letter-spacing: .06em; }
        .auth .title { fill: var(--ink); font: 500 11.5px/1.2 var(--font-geist-sans), ui-sans-serif, system-ui; letter-spacing: -.01em; }
        .auth .note { fill: var(--muted); font: 9.5px/1.2 var(--font-geist-sans), ui-sans-serif, system-ui; }
        .auth .code { fill: var(--code); font: 9px/1.2 var(--font-geist-mono), ui-monospace, monospace; }
        .auth .readout { fill: var(--ink); font: 9.5px/1.2 var(--font-geist-mono), ui-monospace, monospace; font-variant-numeric: tabular-nums; }
        .auth .off { fill: var(--ghost); }
        .auth .dotgrid { fill: var(--dot); }
        .auth .m { animation-timing-function: cubic-bezier(.65,0,.35,1); animation-iteration-count: infinite; animation-fill-mode: both; }
        .auth[data-hold="true"] .m { animation-play-state: paused; }
        .auth .hint { display: none; }
        @media (hover: hover) and (pointer: fine) {
          .auth .hint { display: inline; }
          .auth svg:hover .m { animation-play-state: paused; }
        }
        @media (prefers-reduced-motion: reduce) {
          .auth .m { animation: none !important; }
          .auth .hint, .auth-toggle { display: none; }
        }
        .auth-cap { display: flex; justify-content: space-between; align-items: center; gap: 16px; color: var(--cap); font: 9px/1.6 var(--font-geist-mono), ui-monospace, monospace; text-transform: uppercase; letter-spacing: .04em; }
        .auth-toggle { min-height: 28px; padding: 4px 0; border: 0; background: none; color: var(--muted); font: inherit; text-transform: inherit; letter-spacing: inherit; white-space: nowrap; cursor: pointer; }
        .auth-toggle:hover { color: var(--ink); }
        .auth-toggle:focus-visible { outline: 1px dashed currentColor; outline-offset: 4px; }
      `}</style>

      {key === "queue" && <QueuePipelineFigure isPaused={isPaused} onToggle={() => setIsPaused(!isPaused)} />}
      {key === "schema" && <SchemaDiverterFigure isPaused={isPaused} onToggle={() => setIsPaused(!isPaused)} />}
      {key === "audio" && <AudioGraphFigure isPaused={isPaused} onToggle={() => setIsPaused(!isPaused)} />}
      {key === "hex" && <HexagonalConcentricFigure isPaused={isPaused} onToggle={() => setIsPaused(!isPaused)} />}
      {key === "rag" && <ForkJoinRetrievalFigure isPaused={isPaused} onToggle={() => setIsPaused(!isPaused)} />}
    </figure>
  );
}

// =========================================================================
// 1. DECOUPLING SMS GATEWAYS: Horizontal Conveyor & Rate Limiter Pipeline
// =========================================================================
function QueuePipelineFigure({ isPaused, onToggle }: { isPaused: boolean; onToggle: () => void }) {
  return (
    <>
      <style>{`
        @keyframes q-b0{0%,15%{opacity:0}18%,30%{opacity:1}33%,100%{opacity:0}}
        .auth .q-b0{animation:q-b0 8s infinite;}
        @keyframes q-wire1{0%,15%{stroke-dashoffset:1}23%,100%{stroke-dashoffset:0}}
        .auth .q-wire1{animation:q-wire1 8s infinite;}
        @keyframes q-pulse1{0%,20%{opacity:0;stroke-dashoffset:0.02}22%,29%{opacity:1}30%,100%{opacity:0;stroke-dashoffset:-1}}
        .auth .q-pulse1{animation:q-pulse1 8s infinite;}
        @keyframes q-wire2{0%,32%{stroke-dashoffset:1}40%,100%{stroke-dashoffset:0}}
        .auth .q-wire2{animation:q-wire2 8s infinite;}
        @keyframes q-pulse2{0%,38%{opacity:0;stroke-dashoffset:0.02}40%,47%{opacity:1}48%,100%{opacity:0;stroke-dashoffset:-1}}
        .auth .q-pulse2{animation:q-pulse2 8s infinite;}
        @keyframes q-r1{0%,17%{opacity:1}18%,100%{opacity:0}}
        .auth .q-r1{animation:q-r1 8s infinite;}
        @keyframes q-r2{0%,17%{opacity:0}18%,32%{opacity:1}33%,100%{opacity:0}}
        .auth .q-r2{animation:q-r2 8s infinite;}
        @keyframes q-r3{0%,32%{opacity:0}33%,50%{opacity:1}51%,100%{opacity:0}}
        .auth .q-r3{animation:q-r3 8s infinite;}
        @keyframes q-r4{0%,50%{opacity:0}51%,100%{opacity:1}}
        .auth .q-r4{animation:q-r4 8s infinite;}
      `}</style>
      <svg viewBox="0 0 460 260" role="img" aria-label="Decoupled Fastify Ingestion Pipeline">
        <defs>
          <pattern id="q-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="0.75" className="dotgrid" /></pattern>
          <radialGradient id="q-fade" cx="50%" cy="50%" r="60%"><stop offset="0.3" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
          <mask id="q-mask"><rect width="460" height="260" fill="url(#q-fade)" /></mask>
        </defs>
        <rect width="460" height="260" fill="url(#q-dots)" mask="url(#q-mask)" />
        <g>
          <text x="20" y="16" className="tag hint">Point to hold</text>
          <text x="440" y="16" textAnchor="end" className="note readout m q-r1">50k broadcast dispatch</text>
          <text x="440" y="16" textAnchor="end" className="note readout m q-r2">Fastify enqueues to Redis (202)</text>
          <text x="440" y="16" textAnchor="end" className="note readout m q-r3">BullMQ worker acquires token</text>
          <text x="440" y="16" textAnchor="end" className="note readout m q-r4">Rate limit: 120 req/s</text>
        </g>

        {/* 3 Pipeline Stages */}
        <g transform="translate(0 24)">
          {/* Stage 1: Fastify Ingestion Gateway */}
          <g>
            <rect x="20" y="45" width="118" height="135" rx="8" className="panel" />
            <text x="32" y="66" className="tag">Stage 01</text>
            <text x="32" y="84" className="title">Fastify API</text>
            <text x="32" y="101" className="code">POST /dispatch</text>
            <rect x="28" y="112" width="102" height="56" rx="4" fill="#161619" stroke="#2c2c34" strokeWidth="1" />
            <text x="36" y="128" className="note">idempotent ✓</text>
            <text x="36" y="144" className="note">valid schema ✓</text>
            <text x="36" y="158" className="code" fill="#e56b40">p99: 21.4ms</text>
          </g>

          {/* Wire 1: Fastify to Queue */}
          <g>
            <path d="M138 112 H168" pathLength="1" className="wire drawn m q-wire1" style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }} />
            <path d="M164 108.5 L168 112 L164 115.5" className="head" />
            <path d="M138 112 H168" pathLength="1" className="pulse m q-pulse1" style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }} />
          </g>

          {/* Stage 2: Redis FIFO Ring */}
          <g>
            <rect x="168" y="25" width="130" height="175" rx="8" className="panel" />
            <text x="180" y="46" className="tag">Stage 02</text>
            <text x="180" y="64" className="title">Redis BullMQ</text>
            <text x="180" y="81" className="code">Priority Ring</text>
            {/* Slot Matrix */}
            {[0, 1, 2, 3].map((row) => (
              <g key={row} transform={`translate(176 ${90 + row * 24})`}>
                <rect width="114" height="19" rx="3" fill="#16161a" stroke="#2e2e38" strokeWidth="1" />
                <circle cx="10" cy="9.5" r="2.5" fill={row === 0 ? "#e56b40" : "#71717a"} />
                <text x="18" y="13" className="code">
                  {row === 0 ? "otp.p0 (0ms)" : `batch_${row} (queued)`}
                </text>
              </g>
            ))}
          </g>

          {/* Wire 2: Queue to Worker */}
          <g>
            <path d="M298 112 H328" pathLength="1" className="wire drawn m q-wire2" style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }} />
            <path d="M324 108.5 L328 112 L324 115.5" className="head" />
            <path d="M298 112 H328" pathLength="1" className="pulse m q-pulse2" style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }} />
          </g>

          {/* Stage 3: Token Bucket Limiter & Telecom Binds */}
          <g>
            <rect x="328" y="45" width="112" height="135" rx="8" className="panel" />
            <text x="340" y="66" className="tag">Stage 03</text>
            <text x="340" y="84" className="title">Token Bucket</text>
            <text x="340" y="101" className="code">SMPP Binds</text>
            <rect x="336" y="112" width="96" height="56" rx="4" fill="#161619" stroke="#2c2c34" strokeWidth="1" />
            <text x="344" y="128" className="note">Rate: 120/s</text>
            <text x="344" y="144" className="note">Carrier: OK</text>
            <text x="344" y="158" className="code" fill="#4ade80">Loss: 0.00%</text>
          </g>
        </g>
      </svg>
      <figcaption className="mt-4">
        <div className="auth-cap">
          <span>Fig. 01 — Asynchronous Pipeline: Ingestion decoupled from carrier delivery</span>
          <button type="button" onClick={onToggle} className="auth-toggle">
            {isPaused ? "Play motion" : "Pause motion"}
          </button>
        </div>
        <p className="mt-1 text-sm text-[#8a8a92] font-sans leading-relaxed">
          The HTTP edge releases requests in 21ms via 202 Accepted. Redis buffers backpressure, and workers consume at safe carrier ceilings.
        </p>
      </figcaption>
    </>
  );
}

// =========================================================================
// 2. DETERMINISTIC SCHEMA GUARDRAILS: Diverter Gate & Verification Chamber
// =========================================================================
function SchemaDiverterFigure({ isPaused, onToggle }: { isPaused: boolean; onToggle: () => void }) {
  return (
    <>
      <style>{`
        @keyframes s-wire{0%,15%{stroke-dashoffset:1}25%,100%{stroke-dashoffset:0}}
        .auth .s-wire{animation:s-wire 8s infinite;}
        @keyframes s-pulse{0%,20%{opacity:0;stroke-dashoffset:0.02}24%,32%{opacity:1}34%,100%{opacity:0;stroke-dashoffset:-1}}
        .auth .s-pulse{animation:s-pulse 8s infinite;}
        @keyframes s-divert{0%,35%{stroke-dashoffset:1}45%,100%{stroke-dashoffset:0}}
        .auth .s-divert{animation:s-divert 8s infinite;}
        @keyframes s-pass{0%,50%{stroke-dashoffset:1}60%,100%{stroke-dashoffset:0}}
        .auth .s-pass{animation:s-pass 8s infinite;}
        @keyframes s-r1{0%,20%{opacity:1}21%,100%{opacity:0}}
        .auth .s-r1{animation:s-r1 8s infinite;}
        @keyframes s-r2{0%,20%{opacity:0}21%,45%{opacity:1}46%,100%{opacity:0}}
        .auth .s-r2{animation:s-r2 8s infinite;}
        @keyframes s-r3{0%,45%{opacity:0}46%,70%{opacity:1}71%,100%{opacity:0}}
        .auth .s-r3{animation:s-r3 8s infinite;}
        @keyframes s-r4{0%,70%{opacity:0}71%,100%{opacity:1}}
        .auth .s-r4{animation:s-r4 8s infinite;}
      `}</style>
      <svg viewBox="0 0 460 260" role="img" aria-label="AST Guardrail Diverter Gate">
        <defs>
          <pattern id="s-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="0.75" className="dotgrid" /></pattern>
          <radialGradient id="s-fade" cx="50%" cy="50%" r="60%"><stop offset="0.3" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
          <mask id="s-mask"><rect width="460" height="260" fill="url(#s-fade)" /></mask>
        </defs>
        <rect width="460" height="260" fill="url(#s-dots)" mask="url(#s-mask)" />
        <g>
          <text x="20" y="16" className="tag hint">Point to hold</text>
          <text x="440" y="16" textAnchor="end" className="note readout m s-r1">Token stream arrives</text>
          <text x="440" y="16" textAnchor="end" className="note readout m s-r2">AST anomaly detected</text>
          <text x="440" y="16" textAnchor="end" className="note readout m s-r3">Malformed token diverted</text>
          <text x="440" y="16" textAnchor="end" className="note readout m s-r4">Verified schema &rarr; DTO</text>
        </g>

        {/* Input -> Gate -> Diverted (Top) / Passed (Bottom) */}
        <g transform="translate(0 20)">
          {/* LLM Source */}
          <g>
            <rect x="20" y="80" width="112" height="90" rx="8" className="panel" />
            <text x="32" y="100" className="tag">Source</text>
            <text x="32" y="118" className="title">LLM Tokens</text>
            <text x="32" y="136" className="code">{"{ key: 'raw' }"}</text>
            <text x="32" y="152" className="note">Untrusted stream</text>
          </g>

          {/* Wire to Gate */}
          <path d="M132 125 H165" pathLength="1" className="wire drawn m s-wire" style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }} />
          <path d="M161 121.5 L165 125 L161 128.5" className="head" />
          <path d="M132 125 H165" pathLength="1" className="pulse m s-pulse" style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }} />

          {/* Central AST Scanner Gate */}
          <g>
            <rect x="165" y="60" width="130" height="130" rx="8" className="panel" />
            <text x="177" y="80" className="tag">Inspection Gate</text>
            <text x="177" y="98" className="title">Zod AST Guard</text>
            <text x="177" y="115" className="code">Syntax Parser</text>
            <line x1="175" y1="124" x2="285" y2="124" stroke="#333" strokeDasharray="2 2" />
            <text x="177" y="140" className="note">recursive AST</text>
            <text x="177" y="156" className="note">invariants check</text>
            <text x="177" y="171" className="code" fill="#e56b40">strict types</text>
          </g>

          {/* Diverted Path: Upward to Quarantine */}
          <path d="M295 95 H315 Q325 95 325 87 V46 Q325 38 335 38 H345" pathLength="1" className="wire drawn m s-divert" stroke="#e56b40" style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }} />
          <path d="M341 34.5 L345 38 L341 41.5" className="head" stroke="#e56b40" />
          <g>
            <rect x="345" y="20" width="95" height="52" rx="6" className="panel" stroke="#e56b40" />
            <text x="355" y="38" className="tag" fill="#e56b40">Quarantine</text>
            <text x="355" y="54" className="code">Rejected 422</text>
          </g>

          {/* Passed Path: Straight to Domain Entity */}
          <path d="M295 155 H315 Q325 155 325 163 V195 Q325 203 335 203 H345" pathLength="1" className="wire drawn m s-pass" stroke="#4ade80" style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }} />
          <path d="M341 199.5 L345 203 L341 206.5" className="head" stroke="#4ade80" />
          <g>
            <rect x="345" y="175" width="95" height="58" rx="6" className="panel" stroke="#4ade80" />
            <text x="355" y="193" className="tag" fill="#4ade80">Domain DTO</text>
            <text x="355" y="210" className="title">Verified DTO</text>
            <text x="355" y="224" className="code">100% Invariant</text>
          </g>
        </g>
      </svg>
      <figcaption className="mt-4">
        <div className="auth-cap">
          <span>Fig. 01 — Structural Invariant: The AST gate verifies before state mutation</span>
          <button type="button" onClick={onToggle} className="auth-toggle">
            {isPaused ? "Play motion" : "Pause motion"}
          </button>
        </div>
        <p className="mt-1 text-sm text-[#8a8a92] font-sans leading-relaxed">
          Untrusted LLM tokens are checked for mathematical invariants and coerced into pure domain objects before reaching persistence.
        </p>
      </figcaption>
    </>
  );
}

// =========================================================================
// 3. WEB AUDIO API: DSP Signal Chain & Oscilloscope Display
// =========================================================================
function AudioGraphFigure({ isPaused, onToggle }: { isPaused: boolean; onToggle: () => void }) {
  return (
    <>
      <style>{`
        @keyframes a-wire{0%,15%{stroke-dashoffset:1}28%,100%{stroke-dashoffset:0}}
        .auth .a-wire{animation:a-wire 8s infinite;}
        @keyframes a-pulse{0%,20%{opacity:0;stroke-dashoffset:0.02}25%,35%{opacity:1}36%,100%{opacity:0;stroke-dashoffset:-1}}
        .auth .a-pulse{animation:a-pulse 8s infinite;}
      `}</style>
      <svg viewBox="0 0 460 260" role="img" aria-label="Web Audio DSP Signal Graph">
        <defs>
          <pattern id="a-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="0.75" className="dotgrid" /></pattern>
          <radialGradient id="a-fade" cx="50%" cy="50%" r="60%"><stop offset="0.3" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
          <mask id="a-mask"><rect width="460" height="260" fill="url(#a-fade)" /></mask>
        </defs>
        <rect width="460" height="260" fill="url(#a-dots)" mask="url(#a-mask)" />
        <g>
          <text x="20" y="16" className="tag hint">Point to hold</text>
          <text x="440" y="16" textAnchor="end" className="note readout">AudioWorklet DSP: 128 frames (P99 2.7ms)</text>
        </g>

        <g transform="translate(0 24)">
          {/* Node 1: Oscillator Node */}
          <g>
            <rect x="20" y="50" width="118" height="125" rx="8" className="panel" />
            <text x="32" y="70" className="tag">Audio Generator</text>
            <text x="32" y="88" className="title">OscillatorNode</text>
            <text x="32" y="105" className="code">440 Hz Sine</text>
            <rect x="28" y="116" width="102" height="46" rx="4" fill="#161619" stroke="#2c2c34" strokeWidth="1" />
            <text x="36" y="132" className="note">Sample: 48kHz</text>
            <text x="36" y="148" className="code" fill="#e56b40">Buffer: 128 fr</text>
          </g>

          {/* Wire 1 -> Filter */}
          <path d="M138 112 H168" pathLength="1" className="wire drawn m a-wire" style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }} />
          <path d="M164 108.5 L168 112 L164 115.5" className="head" />
          <path d="M138 112 H168" pathLength="1" className="pulse m a-pulse" style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }} />

          {/* Node 2: Biquad Filter */}
          <g>
            <rect x="168" y="40" width="124" height="145" rx="8" className="panel" />
            <text x="180" y="60" className="tag">DSP Worklet</text>
            <text x="180" y="78" className="title">BiquadFilter</text>
            <text x="180" y="95" className="code">Lowpass 1.8kHz</text>
            <rect x="176" y="106" width="108" height="66" rx="4" fill="#161619" stroke="#2c2c34" strokeWidth="1" />
            <path d="M182 142 H 222 Q 242 142, 258 118" fill="none" stroke="#e56b40" strokeWidth="1.5" />
            <text x="182" y="158" className="note">Resonance Q: 4.2</text>
          </g>

          {/* Wire 2 -> Oscilloscope */}
          <path d="M292 112 H322" pathLength="1" className="wire drawn m a-wire" style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }} />
          <path d="M318 108.5 L322 112 L318 115.5" className="head" />

          {/* Node 3: Oscilloscope Output Screen */}
          <g>
            <rect x="322" y="50" width="118" height="125" rx="8" className="panel" />
            <text x="334" y="70" className="tag">Hardware DAC</text>
            <text x="334" y="88" className="title">Oscilloscope</text>
            {/* Screen */}
            <rect x="330" y="100" width="102" height="62" rx="4" fill="#0c0d10" stroke="#22232a" strokeWidth="1" />
            <line x1="330" y1="131" x2="432" y2="131" stroke="#1d1e26" strokeDasharray="2 2" />
            <path d="M 336 131 Q 352 112, 368 131 T 400 131 T 426 131" fill="none" stroke="#4ade80" strokeWidth="1.5" />
          </g>
        </g>
      </svg>
      <figcaption className="mt-4">
        <div className="auth-cap">
          <span>Fig. 01 — Dedicated Thread: AudioWorklet DSP eliminates main-thread glitches</span>
          <button type="button" onClick={onToggle} className="auth-toggle">
            {isPaused ? "Play motion" : "Pause motion"}
          </button>
        </div>
        <p className="mt-1 text-sm text-[#8a8a92] font-sans leading-relaxed">
          Isolating digital signal computation on an audio worklet prevents React component re-renders from starving audio output frames.
        </p>
      </figcaption>
    </>
  );
}

// =========================================================================
// 4. HEXAGONAL ARCHITECTURE: Concentric Domain Core & Satellite Adapters
// =========================================================================
function HexagonalConcentricFigure({ isPaused, onToggle }: { isPaused: boolean; onToggle: () => void }) {
  return (
    <>
      <svg viewBox="0 0 460 260" role="img" aria-label="Hexagonal Architecture Concentric Boundaries">
        <defs>
          <pattern id="h-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="0.75" className="dotgrid" /></pattern>
          <radialGradient id="h-fade" cx="50%" cy="50%" r="60%"><stop offset="0.3" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
          <mask id="h-mask"><rect width="460" height="260" fill="url(#h-fade)" /></mask>
        </defs>
        <rect width="460" height="260" fill="url(#h-dots)" mask="url(#h-mask)" />
        <g>
          <text x="20" y="16" className="tag hint">Point to hold</text>
          <text x="440" y="16" textAnchor="end" className="note readout">Domain Core: Zero external dependencies</text>
        </g>

        {/* Center Hexagon Core with Surrounding Adapters */}
        <g transform="translate(0 22)">
          {/* Center Domain Core */}
          <g>
            <rect x="158" y="65" width="144" height="105" rx="8" className="panel" stroke="#e56b40" strokeWidth="1.5" />
            <text x="170" y="86" className="tag" fill="#e56b40">Domain Core</text>
            <text x="170" y="104" className="title">Pure Entities</text>
            <text x="170" y="122" className="code">Zero Imports</text>
            <text x="170" y="138" className="note">100% Invariant</text>
            <text x="170" y="152" className="note" fill="#4ade80">Unit Isolated</text>
          </g>

          {/* Left Adapter: Driving HTTP */}
          <g>
            <rect x="20" y="82" width="108" height="70" rx="6" className="panel" />
            <text x="30" y="100" className="tag">Driving Port</text>
            <text x="30" y="118" className="title">Fastify Route</text>
            <text x="30" y="134" className="code">HTTP Inbound</text>
          </g>
          <path d="M128 117 H158" className="wire" stroke="#d4d4d4" strokeWidth="1.2" />

          {/* Right Adapter: PostgreSQL DB */}
          <g>
            <rect x="332" y="42" width="108" height="68" rx="6" className="panel" />
            <text x="342" y="60" className="tag">Driven Port</text>
            <text x="342" y="78" className="title">PgUserRepo</text>
            <text x="342" y="94" className="code">Postgres DB</text>
          </g>
          <path d="M302 92 H332" className="wire" stroke="#d4d4d4" strokeWidth="1.2" />

          {/* Bottom Right Adapter: In-Memory Mock */}
          <g>
            <rect x="332" y="122" width="108" height="68" rx="6" className="panel" />
            <text x="342" y="140" className="tag">Driven Port</text>
            <text x="342" y="158" className="title">MockUserRepo</text>
            <text x="342" y="174" className="code">Mock Memory</text>
          </g>
          <path d="M302 142 H332" className="wire" stroke="#d4d4d4" strokeWidth="1.2" />
        </g>
      </svg>
      <figcaption className="mt-4">
        <div className="auth-cap">
          <span>Fig. 01 — Dependency Inversion: Adapters depend on core ports, never vice versa</span>
          <button type="button" onClick={onToggle} className="auth-toggle">
            {isPaused ? "Play motion" : "Pause motion"}
          </button>
        </div>
        <p className="mt-1 text-sm text-[#8a8a92] font-sans leading-relaxed">
          The domain boundary isolates business rules from databases, HTTP frameworks, and external SDKs, enabling instant in-memory unit tests.
        </p>
      </figcaption>
    </>
  );
}

// =========================================================================
// 5. RRF & SEMANTIC CACHING: Fork-Join Dual Retrieval Matrix
// =========================================================================
function ForkJoinRetrievalFigure({ isPaused, onToggle }: { isPaused: boolean; onToggle: () => void }) {
  return (
    <>
      <svg viewBox="0 0 460 260" role="img" aria-label="Reciprocal Rank Fusion Hybrid Search">
        <defs>
          <pattern id="r-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="0.75" className="dotgrid" /></pattern>
          <radialGradient id="r-fade" cx="50%" cy="50%" r="60%"><stop offset="0.3" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
          <mask id="r-mask"><rect width="460" height="260" fill="url(#r-fade)" /></mask>
        </defs>
        <rect width="460" height="260" fill="url(#r-dots)" mask="url(#r-mask)" />
        <g>
          <text x="20" y="16" className="tag hint">Point to hold</text>
          <text x="440" y="16" textAnchor="end" className="note readout">Hybrid RRF: BM25 + HNSW fusion</text>
        </g>

        <g transform="translate(0 22)">
          {/* Query & Semantic Cache Node */}
          <g>
            <rect x="20" y="65" width="118" height="105" rx="8" className="panel" />
            <text x="32" y="85" className="tag">User Query</text>
            <text x="32" y="103" className="title">Semantic Cache</text>
            <text x="32" y="121" className="code">Cosine 0.92</text>
            <text x="32" y="137" className="note" fill="#4ade80">41.8% hit rate</text>
            <text x="32" y="151" className="note">Sub-15ms hit</text>
          </g>

          {/* Fork into BM25 (top) and Vector (bottom) */}
          <path d="M138 100 H158 Q166 100 166 92 V60 Q166 52 174 52 H180" className="wire" stroke="#d4d4d4" strokeWidth="1.2" />
          <path d="M138 135 H158 Q166 135 166 143 V175 Q166 183 174 183 H180" className="wire" stroke="#d4d4d4" strokeWidth="1.2" />

          {/* Branch A: BM25 Sparse Search */}
          <g>
            <rect x="180" y="25" width="124" height="62" rx="6" className="panel" />
            <text x="190" y="44" className="tag">Lexical Index</text>
            <text x="190" y="61" className="title">BM25 Keywords</text>
            <text x="190" y="76" className="code">Exact SKUs / IDs</text>
          </g>

          {/* Branch B: HNSW Dense Vectors */}
          <g>
            <rect x="180" y="150" width="124" height="62" rx="6" className="panel" />
            <text x="190" y="168" className="tag">Dense Index</text>
            <text x="190" y="185" className="title">HNSW Vectors</text>
            <text x="190" y="200" className="code">Dense vectors</text>
          </g>

          {/* Join into RRF Combiner */}
          <path d="M304 52 H314 Q322 52 322 60 V102 Q322 110 330 110 H338" className="wire" stroke="#d4d4d4" strokeWidth="1.2" />
          <path d="M304 183 H314 Q322 183 322 175 V125 Q322 117 330 117 H338" className="wire" stroke="#d4d4d4" strokeWidth="1.2" />

          {/* RRF Combiner Node */}
          <g>
            <rect x="338" y="65" width="102" height="105" rx="8" className="panel" stroke="#4ade80" strokeWidth="1.2" />
            <text x="348" y="85" className="tag" fill="#4ade80">Fusion Matrix</text>
            <text x="348" y="103" className="title">RRF Combiner</text>
            <text x="348" y="121" className="code">1/(k+rank)</text>
            <text x="348" y="137" className="note">MRR: +38%</text>
            <text x="348" y="151" className="code" fill="#4ade80">Top-5 context</text>
          </g>
        </g>
      </svg>
      <figcaption className="mt-4">
        <div className="auth-cap">
          <span>Fig. 01 — Reciprocal Rank Fusion: Merging sparse exact keywords and dense semantics</span>
          <button type="button" onClick={onToggle} className="auth-toggle">
            {isPaused ? "Play motion" : "Pause motion"}
          </button>
        </div>
        <p className="mt-1 text-sm text-[#8a8a92] font-sans leading-relaxed">
          Reciprocal Rank Fusion bypasses score normalization by combining rank reciprocals, maximizing context recall for LLM generation.
        </p>
      </figcaption>
    </>
  );
}
