"use client";

import React, { useState } from "react";

interface KinfishDiagramProps {
  figureType: "decoupling-sms-gateways" | "deterministic-schema-guardrails" | "web-audio-api-edge" | "hexagonal-architecture-typescript" | "rrf-semantic-caching-rag";
  title?: string;
}

interface DiagramSpec {
  figNumber: string;
  captionTitle: string;
  captionDesc: string;
  topCard: { tag: string; title: string; note: string };
  bottomCard: { tag: string; title: string; note1: string; note2: string };
  readouts: [string, string, string, string, string, string];
  doors: [
    { code: string; locked: string; open: string },
    { code: string; locked: string; open: string },
    { code: string; locked: string; open: string },
    { code: string; locked: string; open: string }
  ];
}

const SPECS: Record<string, DiagramSpec> = {
  "decoupling-sms-gateways": {
    figNumber: "01",
    captionTitle: "Decoupling: Ingestion never waits on telecom delivery",
    captionDesc: "The HTTP client receives a 202 Accepted receipt in under 22ms. Outbound carrier dispatch runs through rate-governed worker rings.",
    topCard: { tag: "Signed in", title: "District Admin", note: "role: sender" },
    bottomCard: { tag: "Fastify API", title: "Ingestion Edge", note1: "task: enqueue 50k", note2: "broadcast sms" },
    readouts: [
      "Admin triggers 50k flash broadcast",
      "Fastify reserves atomic idempotency key",
      "Opened 1 of 4 doors (202 Accepted)",
      "Opened 2 of 4 doors (OTP bypass)",
      "Opened 3 of 4 doors (Bulk queue)",
      "Client unblocked: workers chew rate limit",
    ],
    doors: [
      { code: "otp.priority", locked: "locked", open: "priority ✓ 0ms" },
      { code: "bulk.queue", locked: "locked", open: "redis ✓ enqueued" },
      { code: "telecom.bind", locked: "locked", open: "120/s ✓ token bucket" },
      { code: "202.accepted", locked: "locked", open: "sub-22ms ✓ receipt" },
    ],
  },

  "deterministic-schema-guardrails": {
    figNumber: "01",
    captionTitle: "Determinism: The AST gate verifies before state mutation",
    captionDesc: "Non-deterministic model output is lexically stripped, syntax-corrected, and structurally validated before touching core domain state.",
    topCard: { tag: "Signed in", title: "Language Model", note: "stream: JSON tokens" },
    bottomCard: { tag: "Zod AST Guard", title: "Structural Gate", note1: "task: sanitize &", note2: "validate DTO" },
    readouts: [
      "Model outputs non-deterministic JSON stream",
      "AST parser intercepts raw stream",
      "Opened 1 of 4 doors (code fences)",
      "Opened 2 of 4 doors (trailing commas)",
      "Opened 3 of 4 doors (sum invariant)",
      "Emitted 100% deterministic, type-safe entity",
    ],
    doors: [
      { code: "markdown.fences", locked: "unverified", open: "stripped ✓ clean" },
      { code: "syntax.errors", locked: "unverified", open: "normalized ✓ JSON" },
      { code: "sum.invariants", locked: "unverified", open: "verified ✓ valid" },
      { code: "domain.entity", locked: "locked", open: "type-safe ✓ DTO" },
    ],
  },

  "web-audio-api-edge": {
    figNumber: "01",
    captionTitle: "AudioWorklet: Off-thread DSP eliminates garbage collection pops",
    captionDesc: "Sound generation is isolated on a dedicated real-time audio thread, bypassing main-thread React reconciliation and garbage collection.",
    topCard: { tag: "Hardware Clock", title: "AudioContext", note: "clock: 48,000 Hz" },
    bottomCard: { tag: "AudioWorklet", title: "Dedicated Thread", note1: "task: process 128", note2: "audio frames" },
    readouts: [
      "AudioContext clock initializes hardware bind",
      "Worklet thread isolates DSP from main loop",
      "Opened 1 of 4 doors (sine oscillator)",
      "Opened 2 of 4 doors (biquad lowpass)",
      "Opened 3 of 4 doors (ring buffer)",
      "Delivered to DAC with zero audio pops (2.7ms)",
    ],
    doors: [
      { code: "sine.oscillator", locked: "idle", open: "440 Hz ✓ generated" },
      { code: "biquad.filter", locked: "idle", open: "1.8 kHz ✓ lowpass" },
      { code: "ring.buffer", locked: "idle", open: "zero-alloc ✓ circular" },
      { code: "dac.speakers", locked: "idle", open: "latency 2.7ms ✓ 0 pops" },
    ],
  },

  "hexagonal-architecture-typescript": {
    figNumber: "01",
    captionTitle: "Ports & Adapters: Core rules never import infrastructure",
    captionDesc: "The core domain defines abstract port interfaces. Infrastructure adapters satisfy ports with zero framework leakage into business rules.",
    topCard: { tag: "Inbound HTTP", title: "Fastify Route", note: "protocol: POST /upgrade" },
    bottomCard: { tag: "Domain Core", title: "Pure TypeScript", note1: "task: upgradeSubscription", note2: "zero framework imports" },
    readouts: [
      "Inbound request arrives at Fastify controller",
      "Domain core executes pure business rules",
      "Opened 1 of 4 doors (UserRepoPort)",
      "Opened 2 of 4 doors (Postgres Pool)",
      "Opened 3 of 4 doors (EventBusPort)",
      "Hot-swappable with in-memory test double",
    ],
    doors: [
      { code: "UserRepoPort", locked: "abstract", open: "pure interface ✓" },
      { code: "PgUserRepo", locked: "standby", open: "production pool ✓" },
      { code: "EventBusPort", locked: "abstract", open: "decoupled ✓" },
      { code: "MockUserRepo", locked: "standby", open: "unit test double ✓" },
    ],
  },

  "rrf-semantic-caching-rag": {
    figNumber: "01",
    captionTitle: "RRF: Rank positions replace brittle score normalization",
    captionDesc: "Semantic vector caching bypasses 41% of LLM queries, while Reciprocal Rank Fusion unifies sparse BM25 and dense embeddings.",
    topCard: { tag: "User Prompt", title: "Search Query", note: "query: NGINX gateway timeout" },
    bottomCard: { tag: "Hybrid Retriever", title: "RRF Orchestrator", note1: "task: semantic &", note2: "lexical fusion" },
    readouts: [
      "User query received by search orchestrator",
      "Evaluating Redis semantic vector cache",
      "Opened 1 of 4 doors (Semantic Cache)",
      "Opened 2 of 4 doors (BM25 Inverted)",
      "Opened 3 of 4 doors (Dense Embeddings)",
      "Reciprocal Rank Fusion delivers verified top-5",
    ],
    doors: [
      { code: "semantic.cache", locked: "checking", open: "0.92 cosim ✓ hit" },
      { code: "bm25.sparse", locked: "idle", open: "exact error tokens ✓" },
      { code: "hnsw.dense", locked: "idle", open: "vector intent ✓" },
      { code: "rrf.fusion", locked: "idle", open: "fused top-5 ✓ context" },
    ],
  },
};

const FIGURE_TYPE_MAP: Record<string, string> = {
  "queue-dispatcher": "decoupling-sms-gateways",
  "schema-guardrail": "deterministic-schema-guardrails",
  "audio-synth": "web-audio-api-edge",
  "hexagonal-ports": "hexagonal-architecture-typescript",
  "rrf-retrieval": "rrf-semantic-caching-rag",
  "decoupling-sms-gateways": "decoupling-sms-gateways",
  "deterministic-schema-guardrails": "deterministic-schema-guardrails",
  "web-audio-api-edge": "web-audio-api-edge",
  "hexagonal-architecture-typescript": "hexagonal-architecture-typescript",
  "rrf-semantic-caching-rag": "rrf-semantic-caching-rag",
};

export function Article2DFigure({
  figureType,
  title,
}: {
  figureType: string;
  title?: string;
}) {
  const [isPaused, setIsPaused] = useState(false);
  const normalizedKey = FIGURE_TYPE_MAP[figureType] || "decoupling-sms-gateways";
  const spec = SPECS[normalizedKey] || SPECS["decoupling-sms-gateways"];

  // Unique prefix for this figure's CSS animations
  const p = normalizedKey.replace(/[^a-z]/g, "").slice(0, 6);

  return (
    <figure
      className="auth not-prose mx-auto my-10 max-w-[540px] select-none"
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
        }
        .auth svg { display: block; width: 100%; height: auto; overflow: visible; }
        .auth :is(path, line, rect, circle) { vector-effect: non-scaling-stroke; stroke-linecap: round; stroke-linejoin: round; }
        .auth .panel { fill: var(--face); stroke: var(--edge); stroke-width: 1; }
        .auth .lit { fill: none; stroke: var(--lit); stroke-width: 1; stroke-dasharray: 1 2.5; }
        .auth .edge { fill: none; stroke: var(--path); stroke-width: 1; }
        .auth .ghost { fill: none; stroke: var(--part); stroke-width: 1; stroke-dasharray: 3 3; }
        .auth .wire { fill: none; stroke: var(--part); stroke-width: 1; }
        .auth .head { fill: none; stroke: var(--lit); stroke-width: 1; }
        .auth .drawn, .auth .pulse { vector-effect: none; }
        .auth .pulse { fill: none; stroke: var(--path); stroke-width: 3.4; }
        .auth .tag { fill: var(--muted); font: 9px/1 var(--font-geist-mono), ui-monospace, monospace; text-transform: uppercase; letter-spacing: .06em; }
        .auth .title { fill: var(--ink); font: 500 13px/1 var(--font-geist-sans), ui-sans-serif, system-ui; letter-spacing: -.01em; }
        .auth .note { fill: var(--muted); font: 11px/1 var(--font-geist-sans), ui-sans-serif, system-ui; }
        .auth .code { fill: var(--code); font: 11px/1 var(--font-geist-mono), ui-monospace, monospace; }
        .auth .readout { fill: var(--ink); font-variant-numeric: tabular-nums; }
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

        /* 9-second loop keyframes exactly from kinfish.dev */
        @keyframes ${p}-b0{0.000%{opacity:0}15.556%{opacity:0}18.333%{opacity:1}30.000%{opacity:1}32.778%{opacity:0}100.000%{opacity:0}}
        .auth .${p}-b0{animation-name:${p}-b0;animation-duration:9s;}
        
        @keyframes ${p}-b1{0.000%{opacity:1}15.556%{opacity:1}18.333%{opacity:0}30.000%{opacity:0}32.778%{opacity:1}100.000%{opacity:1}}
        .auth .${p}-b1{animation-name:${p}-b1;animation-duration:9s;}

        @keyframes ${p}-b2{0.000%{stroke-dashoffset:0}15.556%{stroke-dashoffset:0}22.222%{stroke-dashoffset:1}23.333%{stroke-dashoffset:1}30.000%{stroke-dashoffset:0}100.000%{stroke-dashoffset:0}}
        .auth .${p}-b2{animation-name:${p}-b2;animation-duration:9s;}

        @keyframes ${p}-b3{0.000%{opacity:0;stroke-dashoffset:0.02}23.333%{opacity:0;stroke-dashoffset:0.02}24.222%{opacity:1}29.333%{opacity:1}30.000%{opacity:0;stroke-dashoffset:-1}100.000%{opacity:0;stroke-dashoffset:-1}}
        .auth .${p}-b3{animation-name:${p}-b3;animation-duration:9s;}

        @keyframes ${p}-b4{0.000%{opacity:1}15.556%{opacity:1}18.333%{opacity:0}28.889%{opacity:0}31.667%{opacity:1}100.000%{opacity:1}}
        .auth .${p}-b4{animation-name:${p}-b4;animation-duration:9s;}

        /* Wire 1 (Door 1: Top) */
        @keyframes ${p}-b5{0.000%{stroke-dashoffset:0}15.556%{stroke-dashoffset:0}22.222%{stroke-dashoffset:1}42.778%{stroke-dashoffset:1}49.444%{stroke-dashoffset:0}100.000%{stroke-dashoffset:0}}
        .auth .${p}-b5{animation-name:${p}-b5;animation-duration:9s;}

        @keyframes ${p}-b6{0.000%{opacity:0;stroke-dashoffset:0.02}42.778%{opacity:0;stroke-dashoffset:0.02}43.667%{opacity:1}48.778%{opacity:1}49.444%{opacity:0;stroke-dashoffset:-1}100.000%{opacity:0;stroke-dashoffset:-1}}
        .auth .${p}-b6{animation-name:${p}-b6;animation-duration:9s;}

        @keyframes ${p}-b7{0.000%{opacity:1}15.556%{opacity:1}18.333%{opacity:0}48.333%{opacity:0}51.111%{opacity:1}100.000%{opacity:1}}
        .auth .${p}-b7{animation-name:${p}-b7;animation-duration:9s;}

        @keyframes ${p}-b8{0.000%{opacity:0}49.444%{opacity:0}52.222%{opacity:0.9}55.556%{opacity:0.9}58.333%{opacity:0}100.000%{opacity:0}}
        .auth .${p}-b8{animation-name:${p}-b8;animation-duration:9s;}

        @keyframes ${p}-b9{0.000%{opacity:0}17.222%{opacity:0}20.000%{opacity:1}49.444%{opacity:1}52.222%{opacity:0}100.000%{opacity:0}}
        .auth .${p}-b9{animation-name:${p}-b9;animation-duration:9s;}

        @keyframes ${p}-b10{0.000%{opacity:1}15.556%{opacity:1}18.333%{opacity:0}51.111%{opacity:0}53.889%{opacity:1}100.000%{opacity:1}}
        .auth .${p}-b10{animation-name:${p}-b10;animation-duration:9s;}

        /* Wire 2 (Door 2: Middle Upper) */
        @keyframes ${p}-b11{0.000%{stroke-dashoffset:0}15.556%{stroke-dashoffset:0}22.222%{stroke-dashoffset:1}51.111%{stroke-dashoffset:1}57.778%{stroke-dashoffset:0}100.000%{stroke-dashoffset:0}}
        .auth .${p}-b11{animation-name:${p}-b11;animation-duration:9s;}

        @keyframes ${p}-b12{0.000%{opacity:0;stroke-dashoffset:0.02}51.111%{opacity:0;stroke-dashoffset:0.02}52.000%{opacity:1}57.111%{opacity:1}57.778%{opacity:0;stroke-dashoffset:-1}100.000%{opacity:0;stroke-dashoffset:-1}}
        .auth .${p}-b12{animation-name:${p}-b12;animation-duration:9s;}

        @keyframes ${p}-b13{0.000%{opacity:1}15.556%{opacity:1}18.333%{opacity:0}56.667%{opacity:0}59.444%{opacity:1}100.000%{opacity:1}}
        .auth .${p}-b13{animation-name:${p}-b13;animation-duration:9s;}

        @keyframes ${p}-b14{0.000%{opacity:0}57.778%{opacity:0}60.556%{opacity:0.9}63.889%{opacity:0.9}66.667%{opacity:0}100.000%{opacity:0}}
        .auth .${p}-b14{animation-name:${p}-b14;animation-duration:9s;}

        @keyframes ${p}-b15{0.000%{opacity:0}17.222%{opacity:0}20.000%{opacity:1}57.778%{opacity:1}60.556%{opacity:0}100.000%{opacity:0}}
        .auth .${p}-b15{animation-name:${p}-b15;animation-duration:9s;}

        @keyframes ${p}-b16{0.000%{opacity:1}15.556%{opacity:1}18.333%{opacity:0}59.444%{opacity:0}62.222%{opacity:1}100.000%{opacity:1}}
        .auth .${p}-b16{animation-name:${p}-b16;animation-duration:9s;}

        /* Wire 3 (Door 3: Middle Lower) */
        @keyframes ${p}-b17{0.000%{stroke-dashoffset:0}15.556%{stroke-dashoffset:0}22.222%{stroke-dashoffset:1}59.444%{stroke-dashoffset:1}66.111%{stroke-dashoffset:0}100.000%{stroke-dashoffset:0}}
        .auth .${p}-b17{animation-name:${p}-b17;animation-duration:9s;}

        @keyframes ${p}-b18{0.000%{opacity:0;stroke-dashoffset:0.02}59.444%{opacity:0;stroke-dashoffset:0.02}60.333%{opacity:1}65.444%{opacity:1}66.111%{opacity:0;stroke-dashoffset:-1}100.000%{opacity:0;stroke-dashoffset:-1}}
        .auth .${p}-b18{animation-name:${p}-b18;animation-duration:9s;}

        @keyframes ${p}-b19{0.000%{opacity:1}15.556%{opacity:1}18.333%{opacity:0}65.000%{opacity:0}67.778%{opacity:1}100.000%{opacity:1}}
        .auth .${p}-b19{animation-name:${p}-b19;animation-duration:9s;}

        @keyframes ${p}-b20{0.000%{opacity:0}66.111%{opacity:0}68.889%{opacity:0.9}72.222%{opacity:0.9}75.000%{opacity:0}100.000%{opacity:0}}
        .auth .${p}-b20{animation-name:${p}-b20;animation-duration:9s;}

        @keyframes ${p}-b21{0.000%{opacity:0}17.222%{opacity:0}20.000%{opacity:1}66.111%{opacity:1}68.889%{opacity:0}100.000%{opacity:0}}
        .auth .${p}-b21{animation-name:${p}-b21;animation-duration:9s;}

        @keyframes ${p}-b22{0.000%{opacity:1}15.556%{opacity:1}18.333%{opacity:0}67.778%{opacity:0}70.556%{opacity:1}100.000%{opacity:1}}
        .auth .${p}-b22{animation-name:${p}-b22;animation-duration:9s;}

        /* Wire 4 (Door 4: Bottom) */
        @keyframes ${p}-b23{0.000%{stroke-dashoffset:0}15.556%{stroke-dashoffset:0}22.222%{stroke-dashoffset:1}34.444%{stroke-dashoffset:1}41.111%{stroke-dashoffset:0}100.000%{stroke-dashoffset:0}}
        .auth .${p}-b23{animation-name:${p}-b23;animation-duration:9s;}

        @keyframes ${p}-b24{0.000%{opacity:0;stroke-dashoffset:0.02}34.444%{opacity:0;stroke-dashoffset:0.02}35.333%{opacity:1}40.444%{opacity:1}41.111%{opacity:0;stroke-dashoffset:-1}100.000%{opacity:0;stroke-dashoffset:-1}}
        .auth .${p}-b24{animation-name:${p}-b24;animation-duration:9s;}

        @keyframes ${p}-b25{0.000%{opacity:1}15.556%{opacity:1}18.333%{opacity:0}40.000%{opacity:0}42.778%{opacity:1}100.000%{opacity:1}}
        .auth .${p}-b25{animation-name:${p}-b25;animation-duration:9s;}

        @keyframes ${p}-b26{0.000%{opacity:0}41.111%{opacity:0}43.889%{opacity:0.9}47.222%{opacity:0.9}50.000%{opacity:0}100.000%{opacity:0}}
        .auth .${p}-b26{animation-name:${p}-b26;animation-duration:9s;}

        @keyframes ${p}-b27{0.000%{opacity:0}17.222%{opacity:0}20.000%{opacity:1}41.111%{opacity:1}43.889%{opacity:0}100.000%{opacity:0}}
        .auth .${p}-b27{animation-name:${p}-b27;animation-duration:9s;}

        @keyframes ${p}-b28{0.000%{opacity:1}15.556%{opacity:1}18.333%{opacity:0}42.778%{opacity:0}45.556%{opacity:1}100.000%{opacity:1}}
        .auth .${p}-b28{animation-name:${p}-b28;animation-duration:9s;}

        /* Synced Readout Text Transitions */
        @keyframes ${p}-b29{0.000%{opacity:0}17.222%{opacity:0}20.000%{opacity:1}30.000%{opacity:1}32.778%{opacity:0}100.000%{opacity:0}}
        .auth .${p}-b29{animation-name:${p}-b29;animation-duration:9s;}

        @keyframes ${p}-b30{0.000%{opacity:0}31.667%{opacity:0}34.444%{opacity:1}41.111%{opacity:1}43.889%{opacity:0}100.000%{opacity:0}}
        .auth .${p}-b30{animation-name:${p}-b30;animation-duration:9s;}

        @keyframes ${p}-b31{0.000%{opacity:0}42.778%{opacity:0}45.556%{opacity:1}49.444%{opacity:1}52.222%{opacity:0}100.000%{opacity:0}}
        .auth .${p}-b31{animation-name:${p}-b31;animation-duration:9s;}

        @keyframes ${p}-b32{0.000%{opacity:0}51.111%{opacity:0}53.889%{opacity:1}57.778%{opacity:1}60.556%{opacity:0}100.000%{opacity:0}}
        .auth .${p}-b32{animation-name:${p}-b32;animation-duration:9s;}

        @keyframes ${p}-b33{0.000%{opacity:0}59.444%{opacity:0}62.222%{opacity:1}66.111%{opacity:1}68.889%{opacity:0}100.000%{opacity:0}}
        .auth .${p}-b33{animation-name:${p}-b33;animation-duration:9s;}

        @keyframes ${p}-b34{0.000%{opacity:1}15.556%{opacity:1}18.333%{opacity:0}67.778%{opacity:0}70.556%{opacity:1}100.000%{opacity:1}}
        .auth .${p}-b34{animation-name:${p}-b34;animation-duration:9s;}
      `}</style>

      {/* Main SVG Structure matching kinfish.dev */}
      <svg
        viewBox="0 0 440 302"
        role="img"
        aria-label={spec.captionTitle}
      >
        <defs>
          <pattern id={`auth-dots-${p}`} width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="6" r="0.75" className="dotgrid" />
          </pattern>
          <radialGradient id={`auth-fade-${p}`} cx="50%" cy="55%" r="60%">
            <stop offset="0.35" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={`auth-mask-${p}`}>
            <rect width="440" height="302" fill={`url(#auth-fade-${p})`} />
          </mask>
        </defs>

        {/* Dotted Background */}
        <rect width="440" height="302" fill={`url(#auth-dots-${p})`} mask={`url(#auth-mask-${p})`} />

        {/* Top Header Row with Hint and Synced Readouts */}
        <g>
          <text x="20" y="15" className="tag hint">Point to hold</text>
          <text x="420" y="15" textAnchor="end" className={`note readout m ${p}-b29`} style={{ opacity: 0 }}>
            {spec.readouts[0]}
          </text>
          <text x="420" y="15" textAnchor="end" className={`note readout m ${p}-b30`} style={{ opacity: 0 }}>
            {spec.readouts[1]}
          </text>
          <text x="420" y="15" textAnchor="end" className={`note readout m ${p}-b31`} style={{ opacity: 0 }}>
            {spec.readouts[2]}
          </text>
          <text x="420" y="15" textAnchor="end" className={`note readout m ${p}-b32`} style={{ opacity: 0 }}>
            {spec.readouts[3]}
          </text>
          <text x="420" y="15" textAnchor="end" className={`note readout m ${p}-b33`} style={{ opacity: 0 }}>
            {spec.readouts[4]}
          </text>
          <text x="420" y="15" textAnchor="end" className={`note readout m ${p}-b34`} style={{ opacity: 1 }}>
            {spec.readouts[5]}
          </text>
        </g>

        {/* Interior Structure */}
        <g transform="translate(0 28)">
          {/* Top Left Card */}
          <g>
            <rect x="20" y="24" width="130" height="64" rx="8" className="panel" />
            <rect x="23" y="27" width="124" height="58" rx="6" className={`lit m ${p}-b0`} style={{ opacity: 0 }} />
            <text x="32" y="42" className="tag">{spec.topCard.tag}</text>
            <text x="32" y="60" className="title">{spec.topCard.title}</text>
            <text x="32" y="77" className="note">{spec.topCard.note}</text>
          </g>

          {/* Wire connecting Top to Bottom Card */}
          <g>
            <path d="M85 88 V136" pathLength="1" className={`wire drawn m ${p}-b2`} style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }} />
            <path d="M81.5 132 L85 136 L88.5 132" className={`head m ${p}-b4`} style={{ opacity: 1 }} />
            <path d="M85 88 V136" pathLength="1" className={`pulse m ${p}-b3`} style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }} />
          </g>

          {/* Bottom Left Card */}
          <g>
            <rect x="20" y="138" width="130" height="92" rx="8" className="panel" />
            <rect x="23" y="141" width="124" height="86" rx="6" className={`lit m ${p}-b1`} style={{ opacity: 1 }} />
            <text x="32" y="156" className="tag">{spec.bottomCard.tag}</text>
            <text x="32" y="174" className="title">{spec.bottomCard.title}</text>
            <text x="32" y="194" className="note">{spec.bottomCard.note1}</text>
            <text x="32" y="209" className="note">{spec.bottomCard.note2}</text>
          </g>

          {/* Branch 1: Top Door (~/.ssh / Door 1) */}
          <g>
            <g>
              <path d="M150 184 H190 Q198 184 198 176 V55 Q198 47 206 47 H288" pathLength="1" className={`wire drawn m ${p}-b5`} style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }} />
              <path d="M284 43.5 L288 47 L284 50.5" className={`head m ${p}-b7`} style={{ opacity: 1 }} />
              <path d="M150 184 H190 Q198 184 198 176 V55 Q198 47 206 47 H288" pathLength="1" className={`pulse m ${p}-b6`} style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }} />
            </g>
            <g>
              <rect x="290" y="24" width="130" height="46" rx="8" className="panel" />
              <rect x="290" y="24" width="130" height="46" rx="8" className={`edge m ${p}-b8`} style={{ opacity: 0 }} />
              <text x="302" y="44" className="code">{spec.doors[0].code}</text>
              <text x="302" y="60" className={`note m ${p}-b9`} style={{ opacity: 0 }}>{spec.doors[0].locked}</text>
              <text x="302" y="60" className={`note m ${p}-b10`} style={{ opacity: 1 }}>{spec.doors[0].open}</text>
            </g>
          </g>

          {/* Branch 2: Upper Middle Door (billing.db / Door 2) */}
          <g>
            <g>
              <path d="M150 184 H204 Q212 184 212 176 V115 Q212 107 220 107 H288" pathLength="1" className={`wire drawn m ${p}-b11`} style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }} />
              <path d="M284 103.5 L288 107 L284 110.5" className={`head m ${p}-b13`} style={{ opacity: 1 }} />
              <path d="M150 184 H204 Q212 184 212 176 V115 Q212 107 220 107 H288" pathLength="1" className={`pulse m ${p}-b12`} style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }} />
            </g>
            <g>
              <rect x="290" y="84" width="130" height="46" rx="8" className="panel" />
              <rect x="290" y="84" width="130" height="46" rx="8" className={`edge m ${p}-b14`} style={{ opacity: 0 }} />
              <text x="302" y="104" className="code">{spec.doors[1].code}</text>
              <text x="302" y="120" className={`note m ${p}-b15`} style={{ opacity: 0 }}>{spec.doors[1].locked}</text>
              <text x="302" y="120" className={`note m ${p}-b16`} style={{ opacity: 1 }}>{spec.doors[1].open}</text>
            </g>
          </g>

          {/* Branch 3: Lower Middle Door (Gmail inbox / Door 3) */}
          <g>
            <g>
              <path d="M150 184 H218 Q226 184 226 176 V175 Q226 167 234 167 H288" pathLength="1" className={`wire drawn m ${p}-b17`} style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }} />
              <path d="M284 163.5 L288 167 L284 170.5" className={`head m ${p}-b19`} style={{ opacity: 1 }} />
              <path d="M150 184 H218 Q226 184 226 176 V175 Q226 167 234 167 H288" pathLength="1" className={`pulse m ${p}-b18`} style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }} />
            </g>
            <g>
              <rect x="290" y="144" width="130" height="46" rx="8" className="panel" />
              <rect x="290" y="144" width="130" height="46" rx="8" className={`edge m ${p}-b20`} style={{ opacity: 0 }} />
              <text x="302" y="164" className="code">{spec.doors[2].code}</text>
              <text x="302" y="180" className={`note m ${p}-b21`} style={{ opacity: 0 }}>{spec.doors[2].locked}</text>
              <text x="302" y="180" className={`note m ${p}-b22`} style={{ opacity: 1 }}>{spec.doors[2].open}</text>
            </g>
          </g>

          {/* Branch 4: Bottom Door (today.csv / Door 4) */}
          <g>
            <g>
              <path d="M150 184 H232 Q240 184 240 192 V219 Q240 227 248 227 H288" pathLength="1" className={`wire drawn m ${p}-b23`} style={{ strokeDasharray: "1 1", strokeDashoffset: 0 }} />
              <path d="M284 223.5 L288 227 L284 230.5" className={`head m ${p}-b25`} style={{ opacity: 1 }} />
              <path d="M150 184 H232 Q240 184 240 192 V219 Q240 227 248 227 H288" pathLength="1" className={`pulse m ${p}-b24`} style={{ strokeDasharray: "0.001 2", strokeDashoffset: -1, opacity: 0 }} />
            </g>
            <g>
              <rect x="290" y="204" width="130" height="46" rx="8" className="panel" />
              <rect x="290" y="204" width="130" height="46" rx="8" className={`edge m ${p}-b26`} style={{ opacity: 0 }} />
              <text x="302" y="224" className="code">{spec.doors[3].code}</text>
              <text x="302" y="240" className={`note m ${p}-b27`} style={{ opacity: 0 }}>{spec.doors[3].locked}</text>
              <text x="302" y="240" className={`note m ${p}-b28`} style={{ opacity: 1 }}>{spec.doors[3].open}</text>
            </g>
          </g>
        </g>
      </svg>

      {/* Caption Bar matching kinfish.dev */}
      <figcaption className="mt-4">
        <div className="auth-cap">
          <span>
            Fig. {spec.figNumber} — {spec.captionTitle}
          </span>
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="auth-toggle"
            aria-pressed={isPaused}
          >
            {isPaused ? "Play motion" : "Pause motion"}
          </button>
        </div>
        <p className="mt-1 text-sm text-[#8a8a92] font-sans leading-relaxed">
          {spec.captionDesc}
        </p>
      </figcaption>
    </figure>
  );
}
