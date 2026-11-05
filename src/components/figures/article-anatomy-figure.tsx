"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  computeIsoBounds,
  IsoFigureContainer,
  IsoBox,
  IsoPlane,
  IsoScrews,
  f2,
} from "@/lib/iso";

interface ArticleAnatomyFigureProps {
  figureType: "queue-dispatcher" | "schema-guardrail" | "audio-synth" | "hexagonal-ports" | "rrf-retrieval";
  title?: string;
}

export function ArticleAnatomyFigure({ figureType, title }: ArticleAnatomyFigureProps) {
  switch (figureType) {
    case "queue-dispatcher":
      return <QueueDispatcherFigure title={title} />;
    case "schema-guardrail":
      return <SchemaGuardrailFigure title={title} />;
    case "audio-synth":
      return <AudioSynthFigure title={title} />;
    case "hexagonal-ports":
      return <HexagonalPortsFigure title={title} />;
    case "rrf-retrieval":
      return <RrfRetrievalFigure title={title} />;
    default:
      return <QueueDispatcherFigure title={title} />;
  }
}

// -------------------------------------------------------------
// 1. QUEUE DISPATCHER & TOKEN BUCKET FIGURE (SMS Gateways)
// -------------------------------------------------------------
function QueueDispatcherFigure({ title }: { title?: string }) {
  const [isThrottled, setIsThrottled] = useState(false);
  const [burstCount, setBurstCount] = useState(0);
  const [packetOffset, setPacketOffset] = useState(0);
  const [meterLevel, setMeterLevel] = useState(7);
  const [qps, setQps] = useState(1420);
  const animRef = useRef<number>(0);

  useEffect(() => {
    let last = performance.now();
    const loop = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      const speed = isThrottled ? 18 : 65 + (burstCount > 0 ? 40 : 0);
      setPacketOffset((prev) => (prev + delta * speed) % 180);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [isThrottled, burstCount]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (burstCount > 0) {
        setBurstCount((b) => Math.max(0, b - 1));
      }
      const baseQps = isThrottled ? 240 : 1380 + Math.floor(Math.random() * 120);
      setQps(baseQps + burstCount * 280);
      setMeterLevel(isThrottled ? 3 : Math.min(12, 6 + Math.floor(Math.random() * 5) + (burstCount > 0 ? 3 : 0)));
    }, 400);
    return () => clearInterval(timer);
  }, [isThrottled, burstCount]);

  const k = computeIsoBounds([
    [0, 0, 0],
    [320, 160, 90],
  ]);

  const packets = [0, 45, 90, 135].map((base) => (base + packetOffset) % 180);

  return (
    <IsoFigureContainer
      name="Fig 01. / Ingestion Decoupling & Token Bucket Dispatcher"
      hint="Click 'BURST' or toggle rate limiter to simulate asynchronous backpressure"
      readout={`INGEST: ${qps} req/s · BUFFER: ${isThrottled ? "241" : "12"} msgs · STATUS: ${isThrottled ? "BACKPRESSURE ACTIVE" : "OPTIMAL"}`}
      power={true}
      viewBox={k.viewBox}
      label="Isometric diagram showing Fastify ingestion API, Redis queue buffer conveyor, and BullMQ worker token bucket"
    >
      {/* Background Grid Accent Lines */}
      <line className="detail" x1="20" y1="210" x2="300" y2="40" strokeDasharray="3 3" />
      <line className="detail" x1="120" y1="270" x2="400" y2="110" strokeDasharray="3 3" />

      {/* 1. Fastify Ingestion Gateway Box */}
      <IsoBox k={k} at={[20, 40, 0]} size={[70, 70, 45]} r={4} />
      <IsoPlane t={k.TOP(20, 40, 45)}>
        <rect className="face recess" x="8" y="8" width="54" height="54" rx="4" />
        <text className="label" x="35" y="24" fontSize="5.5" textAnchor="middle" letterSpacing="0.08em">
          FASTIFY
        </text>
        <text className="ink" x="35" y="34" fontSize="4.8" textAnchor="middle">
          API INGEST
        </text>
        <circle className="accent" cx="35" cy="46" r="3.5" />
        <circle className="accent" cx="35" cy="46" r="6" fill="none" stroke="var(--iso-accent-hi)" strokeWidth="0.8" opacity="0.6" />
      </IsoPlane>

      {/* 2. Redis BullMQ Queue Conveyor Path */}
      <IsoBox k={k} at={[110, 50, 0]} size={[95, 50, 24]} r={3} />
      <IsoPlane t={k.TOP(110, 50, 24)}>
        <rect className="face recess" x="6" y="6" width="83" height="38" rx="2" />
        {/* Conveyor rollers */}
        {[14, 26, 38, 50, 62, 74].map((rx) => (
          <line key={rx} className="detail" x1={rx} y1="8" x2={rx} y2="42" strokeWidth="1" />
        ))}
        <text className="label" x="47" y="14" fontSize="4.5" textAnchor="middle" letterSpacing="0.1em">
          REDIS FIFO BUFFER
        </text>
        {/* Animated Packets traversing the conveyor */}
        {packets.map((p, i) => {
          if (p < 5 || p > 80) return null;
          return (
            <g key={i} transform={`translate(${p}, 25)`}>
              <rect x="-4" y="-4" width="8" height="8" rx="1.5" fill="var(--iso-accent-hi)" stroke="#151515" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="1.2" fill="#151515" />
            </g>
          );
        })}
      </IsoPlane>

      {/* Connecting Wire from Ingest to Queue */}
      <path
        className="wire hot"
        d={`M ${k.P(90, 75, 25).map(f2).join(" ")} L ${k.P(110, 75, 25).map(f2).join(" ")}`}
      />

      {/* 3. Token Bucket Rate Limiter Box */}
      <IsoBox k={k} at={[225, 35, 0]} size={[80, 80, 55]} r={5} />
      <IsoPlane t={k.TOP(225, 35, 55)}>
        <rect className="face recess" x="8" y="8" width="64" height="64" rx="4" />
        <text className="label" x="40" y="22" fontSize="5.2" textAnchor="middle" letterSpacing="0.08em">
          TOKEN BUCKET
        </text>
        <text className="ink" x="40" y="31" fontSize="4.5" textAnchor="middle">
          WORKER CLUSTER
        </text>

        {/* Dynamic VU meter bar */}
        <g transform="translate(18, 38)">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((seg) => (
            <rect
              key={seg}
              x={seg * 3.8}
              y="0"
              width="2.8"
              height="8"
              rx="0.6"
              fill={seg < meterLevel ? (seg > 9 ? "var(--iso-accent-hi)" : "var(--iso-accent)") : "#26262e"}
            />
          ))}
        </g>
        <text className="label" x="40" y="58" fontSize="4.2" textAnchor="middle">
          {isThrottled ? "THROTTLED (10 req/s)" : "BURST CAPACITY (120 req/s)"}
        </text>
      </IsoPlane>

      {/* Connecting Wire from Queue to Workers */}
      <path
        className="wire hot"
        d={`M ${k.P(205, 75, 25).map(f2).join(" ")} L ${k.P(225, 75, 25).map(f2).join(" ")}`}
      />

      {/* 4. Interactive Action Buttons */}
      {/* Burst Button */}
      <g
        className="press"
        role="button"
        tabIndex={0}
        onClick={() => setBurstCount((b) => b + 3)}
      >
        <IsoBox k={k} at={[70, 130, 0]} size={[60, 26, 12]} r={2} className="press" />
        <IsoPlane t={k.TOP(70, 130, 12)}>
          <text className="label" x="30" y="16" fontSize="5" textAnchor="middle" fontWeight="bold">
            + BURST (5k)
          </text>
        </IsoPlane>
      </g>

      {/* Throttle Toggle Button */}
      <g
        className="press"
        role="button"
        tabIndex={0}
        onClick={() => setIsThrottled((t) => !t)}
      >
        <IsoBox k={k} at={[145, 130, 0]} size={[75, 26, 12]} r={2} className={isThrottled ? "press lit latched" : "press"} />
        <IsoPlane t={k.TOP(145, 130, 12)}>
          <text className="label" x="37.5" y="16" fontSize="5" textAnchor="middle" fontWeight="bold">
            {isThrottled ? "UNTHROTTLE" : "SIMULATE THROTTLE"}
          </text>
        </IsoPlane>
      </g>

      {/* Screws on baseplate */}
      <IsoScrews
        at={[
          k.P(10, 10, 0),
          k.P(310, 10, 0),
          k.P(10, 150, 0),
          k.P(310, 150, 0),
        ]}
      />
    </IsoFigureContainer>
  );
}

// -------------------------------------------------------------
// 2. SCHEMA GUARDRAIL & AST GATE FIGURE
// -------------------------------------------------------------
function SchemaGuardrailFigure({ title }: { title?: string }) {
  const [hasError, setHasError] = useState(false);
  const [scanPulse, setScanPulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setScanPulse((p) => (p + 1) % 100);
    }, 45);
    return () => clearInterval(timer);
  }, []);

  const k = computeIsoBounds([
    [0, 0, 0],
    [320, 160, 90],
  ]);

  return (
    <IsoFigureContainer
      name="Fig 02. / Deterministic AST Sanitizer & Schema Verification Gate"
      hint="Click 'INJECT MALFORMED' to witness AST token inspection & divergence rejection"
      readout={hasError ? "MALFORMED AST DETECTED · GATE LOCKED · REJECTED 422" : "PARSER OK · AST VALIDATED · SCHEMA COERCION PASSED"}
      power={!hasError}
      viewBox={k.viewBox}
      label="Isometric AST validator showing parser scanner, verification gate, and typed entity receptacle"
    >
      {/* 1. Raw LLM Stream Generator Block */}
      <IsoBox k={k} at={[25, 40, 0]} size={[70, 70, 50]} r={3} />
      <IsoPlane t={k.TOP(25, 40, 50)}>
        <rect className="face recess" x="6" y="6" width="58" height="58" rx="3" />
        <text className="label" x="35" y="20" fontSize="5" textAnchor="middle">
          LLM GENERATOR
        </text>
        <text className="ink" x="35" y="29" fontSize="4.4" textAnchor="middle">
          STREAM BUFFER
        </text>
        <g transform="translate(14, 38)">
          <text fill={hasError ? "#e56b40" : "#8a8a96"} fontSize="4.2" fontFamily="monospace">
            {hasError ? "{ err: NaN, bad: [ }" : '{"valid": true, id: 1}'}
          </text>
        </g>
      </IsoPlane>

      {/* 2. Optical Scanning AST Beam Gate */}
      <IsoBox k={k} at={[125, 30, 0]} size={[70, 90, 65]} r={4} />
      <IsoPlane t={k.TOP(125, 30, 65)}>
        <rect className="face recess" x="6" y="6" width="58" height="78" rx="3" />
        <text className="label" x="35" y="20" fontSize="5.2" textAnchor="middle">
          ZOD / AST GUARD
        </text>
        <text className="ink" x="35" y="29" fontSize="4.5" textAnchor="middle">
          TYPE SANITIZER
        </text>
        {/* Scanner Beam Animation */}
        <line
          x1="10"
          y1={35 + (scanPulse % 35)}
          x2="60"
          y2={35 + (scanPulse % 35)}
          stroke={hasError ? "var(--iso-accent-hi)" : "#52a8ff"}
          strokeWidth="1.8"
        />
        <text className="label" x="35" y="74" fontSize="4.2" textAnchor="middle">
          {hasError ? "! TYPE MISMATCH !" : "RECURSIVE AST SCAN"}
        </text>
      </IsoPlane>

      {/* 3. Verified Output Receptacle */}
      <IsoBox k={k} at={[225, 45, 0]} size={[70, 65, 40]} r={3} />
      <IsoPlane t={k.TOP(225, 45, 40)}>
        <rect className="face recess" x="6" y="6" width="58" height="53" rx="3" />
        <text className="label" x="35" y="20" fontSize="5.2" textAnchor="middle">
          DOMAIN RECEPTACLE
        </text>
        <text className="ink" x="35" y="30" fontSize="4.2" textAnchor="middle">
          {hasError ? "[DROPPED]" : "SAFE DTO DISPATCHED"}
        </text>
        <circle
          cx="35"
          cy="42"
          r="4"
          fill={hasError ? "#3a2020" : "var(--iso-accent)"}
        />
      </IsoPlane>

      {/* Laser lines */}
      <line
        className="wire hot"
        x1={k.P(95, 75, 25)[0]}
        y1={k.P(95, 75, 25)[1]}
        x2={k.P(125, 75, 25)[0]}
        y2={k.P(125, 75, 25)[1]}
      />
      <line
        className="wire hot"
        x1={k.P(195, 75, 25)[0]}
        y1={k.P(195, 75, 25)[1]}
        x2={k.P(225, 75, 25)[0]}
        y2={k.P(225, 75, 25)[1]}
      />

      {/* Controls */}
      <g
        className="press"
        role="button"
        tabIndex={0}
        onClick={() => setHasError((e) => !e)}
      >
        <IsoBox k={k} at={[110, 130, 0]} size={[100, 26, 12]} r={2} className={hasError ? "press lit latched" : "press"} />
        <IsoPlane t={k.TOP(110, 130, 12)}>
          <text className="label" x="50" y="16" fontSize="5" textAnchor="middle" fontWeight="bold">
            {hasError ? "RESET NORMAL PAYLOAD" : "INJECT MALFORMED JSON"}
          </text>
        </IsoPlane>
      </g>
    </IsoFigureContainer>
  );
}

// -------------------------------------------------------------
// 3. AUDIO SYNTH & DSP PIPELINE FIGURE (Web Audio API)
// -------------------------------------------------------------
function AudioSynthFigure({ title }: { title?: string }) {
  const [freq, setFreq] = useState(440);
  const [waveOffset, setWaveOffset] = useState(0);

  useEffect(() => {
    let anim: number;
    const step = () => {
      setWaveOffset((w) => (w + 0.15) % (Math.PI * 2));
      anim = requestAnimationFrame(step);
    };
    anim = requestAnimationFrame(step);
    return () => cancelAnimationFrame(anim);
  }, []);

  const k = computeIsoBounds([
    [0, 0, 0],
    [320, 160, 90],
  ]);

  // Compute oscilloscope sine points
  const wavePoints = Array.from({ length: 40 }, (_, i) => {
    const x = 8 + (i / 39) * 64;
    const y = 30 + Math.sin(i * 0.45 + waveOffset) * (freq > 500 ? 14 : 9);
    return `${i === 0 ? "M" : "L"} ${f2(x)} ${f2(y)}`;
  }).join(" ");

  return (
    <IsoFigureContainer
      name="Fig 03. / Web Audio API Edge DSP Synthesis Graph"
      hint="Click 'TUNE FREQUENCY' to modulate oscillator biquad resonant filter"
      readout={`OSC FREQ: ${freq} Hz · CUTOFF: ${(freq * 3.2).toFixed(0)} Hz · SAMPLE RATE: 48 kHz · LATENCY: 2.7 ms`}
      power={true}
      viewBox={k.viewBox}
      label="Web Audio DSP oscillator synth graph with oscilloscope output and gain node"
    >
      {/* 1. Dual Oscillator Block */}
      <IsoBox k={k} at={[25, 45, 0]} size={[65, 65, 45]} r={3} />
      <IsoPlane t={k.TOP(25, 45, 45)}>
        <rect className="face recess" x="6" y="6" width="53" height="53" rx="3" />
        <text className="label" x="32" y="18" fontSize="5" textAnchor="middle">
          OSC NODE
        </text>
        <text className="ink" x="32" y="27" fontSize="4.4" textAnchor="middle">
          {freq} HZ SINE
        </text>
        <circle cx="32" cy="38" r="8" className="face" />
        <line x1="32" y1="38" x2="38" y2="34" stroke="var(--iso-accent-hi)" strokeWidth="1.2" />
      </IsoPlane>

      {/* 2. Biquad Filter & Gain Block */}
      <IsoBox k={k} at={[115, 40, 0]} size={[75, 75, 55]} r={4} />
      <IsoPlane t={k.TOP(115, 40, 55)}>
        <rect className="face recess" x="6" y="6" width="63" height="63" rx="3" />
        <text className="label" x="37" y="18" fontSize="5.2" textAnchor="middle">
          BIQUAD FILTER
        </text>
        <text className="ink" x="37" y="27" fontSize="4.5" textAnchor="middle">
          LOWPASS RESONANCE
        </text>
        <rect className="face" x="14" y="34" width="46" height="20" rx="2" />
        <text className="label" x="37" y="47" fontSize="4.2" textAnchor="middle">
          Q = 4.2 · GAIN 0dB
        </text>
      </IsoPlane>

      {/* 3. Oscilloscope Visualizer Box */}
      <IsoBox k={k} at={[215, 35, 0]} size={[85, 85, 50]} r={4} />
      <IsoPlane t={k.TOP(215, 35, 50)}>
        <rect className="face recess" x="6" y="6" width="73" height="73" rx="3" />
        <text className="label" x="42" y="16" fontSize="5.2" textAnchor="middle">
          OSCILLOSCOPE
        </text>
        <g transform="translate(4, 18)">
          <rect x="0" y="0" width="65" height="46" rx="2" fill="#0c0e12" stroke="#252730" strokeWidth="0.8" />
          {/* Oscilloscope Grid */}
          <line x1="32.5" y1="0" x2="32.5" y2="46" stroke="#1d2029" strokeWidth="0.6" strokeDasharray="1 2" />
          <line x1="0" y1="23" x2="65" y2="23" stroke="#1d2029" strokeWidth="0.6" strokeDasharray="1 2" />
          {/* Animated Wave */}
          <path d={wavePoints} fill="none" stroke="var(--iso-accent-hi)" strokeWidth="1.2" />
        </g>
      </IsoPlane>

      {/* Audio Patch Cables */}
      <line
        className="wire hot"
        x1={k.P(90, 77, 22)[0]}
        y1={k.P(90, 77, 22)[1]}
        x2={k.P(115, 77, 22)[0]}
        y2={k.P(115, 77, 22)[1]}
      />
      <line
        className="wire hot"
        x1={k.P(190, 77, 27)[0]}
        y1={k.P(190, 77, 27)[1]}
        x2={k.P(215, 77, 27)[0]}
        y2={k.P(215, 77, 27)[1]}
      />

      {/* Button to cycle frequencies */}
      <g
        className="press"
        role="button"
        tabIndex={0}
        onClick={() => setFreq((f) => (f === 440 ? 880 : f === 880 ? 220 : 440))}
      >
        <IsoBox k={k} at={[110, 130, 0]} size={[100, 26, 12]} r={2} className="press" />
        <IsoPlane t={k.TOP(110, 130, 12)}>
          <text className="label" x="50" y="16" fontSize="5" textAnchor="middle" fontWeight="bold">
            TUNE FREQUENCY ({freq} Hz)
          </text>
        </IsoPlane>
      </g>
    </IsoFigureContainer>
  );
}

// -------------------------------------------------------------
// 4. HEXAGONAL ARCHITECTURE PORTS & ADAPTERS FIGURE
// -------------------------------------------------------------
function HexagonalPortsFigure({ title }: { title?: string }) {
  const [useMock, setUseMock] = useState(false);

  const k = computeIsoBounds([
    [0, 0, 0],
    [320, 160, 90],
  ]);

  return (
    <IsoFigureContainer
      name="Fig 04. / Hexagonal Architecture Ports & Adapters Isolation Matrix"
      hint="Click 'SWAP ADAPTER' to hot-swap DB repository with zero domain mutation"
      readout={`CORE DOMAIN: PURE TYPESCRIPT · ADAPTER: ${useMock ? "IN-MEMORY MOCK REPO" : "POSTGRESQL POOL"} · BOUNDARY: 100% DECOUPLED`}
      power={true}
      viewBox={k.viewBox}
      label="Hexagonal architecture ports and adapters diagram with central core and hot-swappable secondary adapters"
    >
      {/* 1. Primary Inbound Adapter (Fastify) */}
      <IsoBox k={k} at={[20, 50, 0]} size={[60, 55, 40]} r={3} />
      <IsoPlane t={k.TOP(20, 50, 40)}>
        <rect className="face recess" x="5" y="5" width="50" height="45" rx="2" />
        <text className="label" x="30" y="18" fontSize="4.8" textAnchor="middle">
          HTTP DRIVER
        </text>
        <text className="ink" x="30" y="27" fontSize="4.2" textAnchor="middle">
          PRIMARY PORT
        </text>
      </IsoPlane>

      {/* 2. Central Core Domain (Hexagonal Core) */}
      <IsoBox k={k} at={[110, 35, 0]} size={[100, 85, 55]} r={6} />
      <IsoPlane t={k.TOP(110, 35, 55)}>
        <rect className="face recess" x="6" y="6" width="88" height="73" rx="4" />
        <text className="label" x="50" y="20" fontSize="5.5" textAnchor="middle" fontWeight="bold">
          DOMAIN ENTITIES
        </text>
        <text className="ink" x="50" y="30" fontSize="4.6" textAnchor="middle">
          PURE BUSINESS LOGIC
        </text>
        <rect className="face" x="18" y="40" width="64" height="26" rx="2" />
        <text className="label" x="50" y="54" fontSize="4.2" textAnchor="middle">
          ZERO DB / HTTP IMPORTS
        </text>
      </IsoPlane>

      {/* 3. Secondary Outbound Adapters (Postgres vs Mock) */}
      <IsoBox k={k} at={[235, 45, 0]} size={[65, 65, 45]} r={3} />
      <IsoPlane t={k.TOP(235, 45, 45)}>
        <rect className="face recess" x="5" y="5" width="55" height="55" rx="3" />
        <text className="label" x="32" y="18" fontSize="4.8" textAnchor="middle">
          {useMock ? "TEST HARNESS" : "STORAGE REPO"}
        </text>
        <text className="ink" x="32" y="28" fontSize="4.2" textAnchor="middle">
          {useMock ? "IN-MEMORY ADAPTER" : "POSTGRESQL POOL"}
        </text>
        <circle
          cx="32"
          cy="42"
          r="4.5"
          fill={useMock ? "#52a8ff" : "var(--iso-accent)"}
        />
      </IsoPlane>

      {/* Port Interfaces */}
      <line
        className="wire hot"
        x1={k.P(80, 77, 20)[0]}
        y1={k.P(80, 77, 20)[1]}
        x2={k.P(110, 77, 20)[0]}
        y2={k.P(110, 77, 20)[1]}
      />
      <line
        className="wire hot"
        x1={k.P(210, 77, 25)[0]}
        y1={k.P(210, 77, 25)[1]}
        x2={k.P(235, 77, 25)[0]}
        y2={k.P(235, 77, 25)[1]}
      />

      {/* Button to swap adapter */}
      <g
        className="press"
        role="button"
        tabIndex={0}
        onClick={() => setUseMock((m) => !m)}
      >
        <IsoBox k={k} at={[105, 130, 0]} size={[110, 26, 12]} r={2} className="press" />
        <IsoPlane t={k.TOP(105, 130, 12)}>
          <text className="label" x="55" y="16" fontSize="5" textAnchor="middle" fontWeight="bold">
            SWAP ADAPTER: {useMock ? "USE POSTGRES" : "USE IN-MEMORY MOCK"}
          </text>
        </IsoPlane>
      </g>
    </IsoFigureContainer>
  );
}

// -------------------------------------------------------------
// 5. RECIPROCAL RANK FUSION & SEMANTIC CACHING FIGURE (RAG)
// -------------------------------------------------------------
function RrfRetrievalFigure({ title }: { title?: string }) {
  const [cacheHit, setCacheHit] = useState(true);

  const k = computeIsoBounds([
    [0, 0, 0],
    [320, 160, 90],
  ]);

  return (
    <IsoFigureContainer
      name="Fig 05. / Hybrid Reciprocal Rank Fusion & Semantic Cache Pipeline"
      hint="Click 'FLUSH CACHE' to toggle semantic embedding cache bypass"
      readout={`CACHE: ${cacheHit ? "SEMANTIC HIT (0.94 COSIM)" : "MISS / FULL PIPELINE"} · RRF FUSION: k=60 · CONTEXT TOKENS: 1,840`}
      power={true}
      viewBox={k.viewBox}
      label="Reciprocal Rank Fusion hybrid retrieval architecture with semantic caching and vector indexing"
    >
      {/* 1. Query Embedder Node */}
      <IsoBox k={k} at={[20, 45, 0]} size={[60, 60, 42]} r={3} />
      <IsoPlane t={k.TOP(20, 45, 42)}>
        <rect className="face recess" x="5" y="5" width="50" height="50" rx="2" />
        <text className="label" x="30" y="18" fontSize="4.8" textAnchor="middle">
          USER QUERY
        </text>
        <text className="ink" x="30" y="27" fontSize="4.2" textAnchor="middle">
          EMBEDDING NODE
        </text>
        <circle cx="30" cy="38" r="3.5" fill="var(--iso-accent)" />
      </IsoPlane>

      {/* 2. Dual Retrieval Paths (BM25 Sparse + HNSW Dense) */}
      {/* BM25 Sparse */}
      <IsoBox k={k} at={[105, 15, 0]} size={[85, 45, 30]} r={3} />
      <IsoPlane t={k.TOP(105, 15, 30)}>
        <rect className="face recess" x="5" y="5" width="75" height="35" rx="2" />
        <text className="label" x="42" y="16" fontSize="4.6" textAnchor="middle">
          BM25 KEYWORD RETRIEVAL
        </text>
        <text className="ink" x="42" y="26" fontSize="4" textAnchor="middle">
          EXACT TOKEN MATCH
        </text>
      </IsoPlane>

      {/* HNSW Dense Vector */}
      <IsoBox k={k} at={[105, 75, 0]} size={[85, 55, 35]} r={3} />
      <IsoPlane t={k.TOP(105, 75, 35)}>
        <rect className="face recess" x="5" y="5" width="75" height="45" rx="2" />
        <text className="label" x="42" y="18" fontSize="4.6" textAnchor="middle">
          HNSW DENSE VECTORS
        </text>
        <text className="ink" x="42" y="28" fontSize="4" textAnchor="middle">
          COSINE SIMILARITY
        </text>
        <rect className="face" x="15" y="34" width="55" height="6" rx="1" fill="var(--iso-accent)" />
      </IsoPlane>

      {/* 3. Reciprocal Rank Fusion Combiner */}
      <IsoBox k={k} at={[220, 35, 0]} size={[80, 85, 55]} r={4} />
      <IsoPlane t={k.TOP(220, 35, 55)}>
        <rect className="face recess" x="6" y="6" width="68" height="73" rx="3" />
        <text className="label" x="40" y="20" fontSize="5.2" textAnchor="middle">
          RRF COMBINER
        </text>
        <text className="ink" x="40" y="30" fontSize="4.5" textAnchor="middle">
          RANK SCORE MATRIX
        </text>
        <rect className="face" x="12" y="40" width="56" height="26" rx="2" />
        <text className="label" x="40" y="52" fontSize="4" textAnchor="middle">
          ∑ 1 / (k + rank_i)
        </text>
      </IsoPlane>

      {/* Bus connections */}
      <line
        className="wire hot"
        x1={k.P(80, 75, 20)[0]}
        y1={k.P(80, 75, 20)[1]}
        x2={k.P(105, 37, 15)[0]}
        y2={k.P(105, 37, 15)[1]}
      />
      <line
        className="wire hot"
        x1={k.P(80, 75, 20)[0]}
        y1={k.P(80, 75, 20)[1]}
        x2={k.P(105, 102, 17)[0]}
        y2={k.P(105, 102, 17)[1]}
      />
      <line
        className="wire hot"
        x1={k.P(190, 37, 15)[0]}
        y1={k.P(190, 37, 15)[1]}
        x2={k.P(220, 77, 27)[0]}
        y2={k.P(220, 77, 27)[1]}
      />
      <line
        className="wire hot"
        x1={k.P(190, 102, 17)[0]}
        y1={k.P(190, 102, 17)[1]}
        x2={k.P(220, 77, 27)[0]}
        y2={k.P(220, 77, 27)[1]}
      />

      {/* Button to toggle semantic cache */}
      <g
        className="press"
        role="button"
        tabIndex={0}
        onClick={() => setCacheHit((c) => !c)}
      >
        <IsoBox k={k} at={[105, 135, 0]} size={[110, 24, 10]} r={2} className={cacheHit ? "press lit latched" : "press"} />
        <IsoPlane t={k.TOP(105, 135, 10)}>
          <text className="label" x="55" y="15" fontSize="4.8" textAnchor="middle" fontWeight="bold">
            {cacheHit ? "CACHE ACTIVE (SIMULATE MISS)" : "CACHE BYPASS (SIMULATE HIT)"}
          </text>
        </IsoPlane>
      </g>
    </IsoFigureContainer>
  );
}

