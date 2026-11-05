"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  computeIsoBounds,
  IsoBox,
  IsoPlane,
  IsoVents,
  IsoScrews,
  IsoFigureContainer,
  pressKeyElement,
  prefersReducedMotion,
  f2,
} from "@/lib/iso";
import { portfolio } from "@/data/portfolio";

const BASE_SIZE: [number, number, number] = [280, 210, 7];
const DECK_BOX = { x: 20, y: 24, w: 240, d: 162, h: 26 };
const DECK_Z = 7 + DECK_BOX.h;
const TAPE_BOX = { x: 42, y: 46, w: 136, d: 90, h: 10 };
const TAPE_Z = DECK_Z + 2;

const BOUNDS = computeIsoBounds([
  [0, BASE_SIZE[1], 0],
  [BASE_SIZE[0], 0, 7],
  [BASE_SIZE[0], BASE_SIZE[1], 0],
  [0, 0, 7],
  [DECK_BOX.x, DECK_BOX.y, DECK_Z + 15],
  [DECK_BOX.x + DECK_BOX.w, DECK_BOX.y + DECK_BOX.d, DECK_Z + 15],
]);

interface CassetteFigureProps {
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  trackTitle?: string;
  artist?: string;
}

export function CassetteFigure({
  isPlaying: externalPlaying,
  onTogglePlay,
  onPrev,
  onNext,
  trackTitle = "Fickle",
  artist = "NEWPORT",
}: CassetteFigureProps = {}) {
  const [internalPlaying, setInternalPlaying] = useState(true);
  const isPlaying = externalPlaying !== undefined ? externalPlaying : internalPlaying;

  const [elapsed, setElapsed] = useState(0);
  const [angle, setAngle] = useState(0);
  const [levels, setLevels] = useState<[number, number]>([0, 0]);

  const rootRef = useRef<HTMLElement>(null);
  const playBtnRef = useRef<SVGGElement>(null);
  const stopBtnRef = useRef<SVGGElement>(null);
  const ffBtnRef = useRef<SVGGElement>(null);
  const rewBtnRef = useRef<SVGGElement>(null);

  const durationMs = 184000; // ~3:04

  // Audio simulation state refs
  const simState = useRef({
    playing: isPlaying,
    elapsed: 0,
    duration: durationMs,
    angle: 0,
    level: [0, 0] as [number, number],
    target: [0, 0] as [number, number],
  });
  simState.current.playing = isPlaying;

  // Real requestAnimationFrame loop for rotating reels and bouncing VU meters
  useEffect(() => {
    const el = rootRef.current;
    if (!el || prefersReducedMotion()) return;

    let rafId = 0;
    let lastTime: number | null = null;
    let nextBeat = 0;

    const tick = (now: number) => {
      const delta = lastTime === null ? 0 : Math.min(50, now - lastTime);
      lastTime = now;
      const sim = simState.current;

      if (sim.playing) {
        sim.elapsed = (sim.elapsed + delta) % sim.duration;
        sim.angle = (sim.angle + delta * 0.22) % 360;

        if (now > nextBeat) {
          nextBeat = now + 70 + Math.random() * 90;
          const energy = 0.5 + Math.random() * 0.45;
          sim.target = [
            Math.min(1, energy + (Math.random() * 0.2 - 0.1)),
            Math.min(1, energy + (Math.random() * 0.2 - 0.1)),
          ];
        }
      } else {
        sim.target = [0, 0];
      }

      // Smooth envelope follower
      sim.level = [
        sim.level[0] + (sim.target[0] - sim.level[0]) * Math.min(1, delta / 60),
        sim.level[1] + (sim.target[1] - sim.level[1]) * Math.min(1, delta / 60),
      ];

      setElapsed(sim.elapsed);
      setAngle(sim.angle);
      setLevels([sim.level[0], sim.level[1]]);

      rafId = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        if (!rafId) rafId = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(rafId);
        rafId = 0;
        lastTime = null;
      }
    });

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  const formatTime = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleToggle = () => {
    if (isPlaying) {
      pressKeyElement(stopBtnRef.current, 180);
      if (onTogglePlay) onTogglePlay();
      else setInternalPlaying(false);
    } else {
      pressKeyElement(playBtnRef.current, 180);
      if (onTogglePlay) onTogglePlay();
      else setInternalPlaying(true);
    }
  };

  const handleSkip = (dir: 1 | -1) => {
    if (dir === 1) {
      pressKeyElement(ffBtnRef.current, 180);
      if (onNext) onNext();
      else simState.current.elapsed = (simState.current.elapsed + 15000) % durationMs;
    } else {
      pressKeyElement(rewBtnRef.current, 180);
      if (onPrev) onPrev();
      else simState.current.elapsed = Math.max(0, simState.current.elapsed - 15000);
    }
  };

  const leftSpoolRadius = 14 + (1 - elapsed / durationMs) * 9;
  const rightSpoolRadius = 14 + (elapsed / durationMs) * 9;
  const numSegments = 12;

  return (
    <IsoFigureContainer
      rootRef={rootRef}
      name="Cassette deck"
      hint={isPlaying ? "❚❚ pause · ◀◀ ▶▶ skip" : "▶ play · ◀◀ ▶▶ skip · click tape to swap"}
      readout={`${trackTitle} · ${artist} · ${formatTime(elapsed)} / ${formatTime(durationMs)}`}
      power={isPlaying}
      viewBox={BOUNDS.viewBox}
      label="An isometric cassette deck playing the songs on this page, with turning reels and dancing meters. Press play or stop, or click the tape to swap songs."
      svgProps={{
        tabIndex: 0,
        onClick: (e) => {
          const target = (e.target as Element).closest("[data-btn]");
          const action = target?.getAttribute("data-btn");
          if (action === "play") handleToggle();
          else if (action === "stop") handleToggle();
          else if (action === "ff") handleSkip(1);
          else if (action === "rew") handleSkip(-1);
          else if ((e.target as Element).closest("[data-tape]")) handleSkip(1);
        },
      }}
    >
      {/* 1. Base Slate */}
      <IsoBox k={BOUNDS} at={[0, 0, 0]} size={BASE_SIZE} r={14} />
      <IsoPlane t={BOUNDS.TOP(0, 0, 7)}>
        <rect
          className="detail"
          x={9}
          y={9}
          width={BASE_SIZE[0] - 18}
          height={BASE_SIZE[1] - 18}
          rx={10}
        />
        <IsoScrews
          at={[
            [18, 18],
            [BASE_SIZE[0] - 18, 18],
            [18, BASE_SIZE[1] - 18],
            [BASE_SIZE[0] - 18, BASE_SIZE[1] - 18],
          ]}
        />
      </IsoPlane>

      {/* 2. Main Deck Chassis */}
      <IsoBox
        k={BOUNDS}
        at={[DECK_BOX.x, DECK_BOX.y, 7]}
        size={[DECK_BOX.w, DECK_BOX.d, DECK_BOX.h]}
        r={10}
      />

      {/* Deck Top Surface */}
      <IsoPlane t={BOUNDS.TOP(DECK_BOX.x, DECK_BOX.y, DECK_Z)}>
        {/* Recessed Cassette Well */}
        <rect
          className="face recess"
          x={20}
          y={20}
          width={DECK_BOX.w - 80}
          height={DECK_BOX.d - 40}
          rx={6}
        />

        {/* Dual 12-Segment VU Meters */}
        {[0, 1].map((channel) => (
          <g key={channel}>
            {Array.from({ length: numSegments }, (_, segIdx) => {
              const isOn = levels[channel] * numSegments > segIdx;
              const isPeak = segIdx >= 10;
              return (
                <rect
                  key={segIdx}
                  className={`k-seg${isOn ? (isPeak ? " on peak" : " on") : ""}`}
                  x={190 + channel * 22}
                  y={106 - segIdx * 7.5}
                  width={16}
                  height={5}
                  rx={1}
                />
              );
            })}
            <text
              className="label"
              x={198 + channel * 22}
              y={118}
              fontSize={5}
              textAnchor="middle"
              fill="var(--iso-ink)"
            >
              {channel ? "R" : "L"}
            </text>
          </g>
        ))}

        {/* Digital Counter Display */}
        <rect className="face recess" x={186} y={126} width={44} height={18} rx={3} />
        <text
          className="k-counter"
          x={208}
          y={138.5}
          fontSize={8}
          textAnchor="middle"
          fill="var(--iso-ink-hi)"
        >
          {formatTime(elapsed)}
        </text>

        {/* Running Status LED */}
        <circle
          className={`led${isPlaying ? " hot" : ""}`}
          filter="url(#k-soft)"
          cx={232}
          cy={150}
          r={2.5}
        />
      </IsoPlane>

      {/* Front Panel Vents & Brand */}
      <IsoPlane t={BOUNDS.FRONT(DECK_BOX.x, DECK_BOX.y + DECK_BOX.d, DECK_Z)}>
        <IsoVents from={12} to={84} step={3} across={[6, 20]} />
        <text
          className="label"
          x={DECK_BOX.w - 14}
          y={16}
          fontSize={6.5}
          textAnchor="end"
          letterSpacing={2}
          fill="var(--iso-ink)"
        >
          NATNAEL · AUDIO 02
        </text>
      </IsoPlane>

      {/* 3. Cassette Tape Body with Animated Turning Spools */}
      <g data-tape className="k-tape cursor-pointer">
        <IsoBox
          k={BOUNDS}
          at={[TAPE_BOX.x, TAPE_BOX.y, TAPE_Z]}
          size={[TAPE_BOX.w, TAPE_BOX.d, TAPE_BOX.h]}
          r={4}
        />
        <IsoPlane t={BOUNDS.TOP(TAPE_BOX.x, TAPE_BOX.y, TAPE_Z + TAPE_BOX.h)}>
          {/* Paper Label */}
          <rect
            className="k-tape-label"
            x={8}
            y={6}
            width={TAPE_BOX.w - 16}
            height={24}
            rx={2}
          />
          <text className="k-hand" x={14} y={17} fontSize={8.5}>
            {trackTitle}
          </text>
          <text className="label" x={14} y={26} fontSize={4.6} letterSpacing={0.4}>
            {artist.toUpperCase()}
          </text>

          {/* Cassette Center Window */}
          <rect
            className="face recess"
            x={12}
            y={34}
            width={TAPE_BOX.w - 24}
            height={46}
            rx={4}
          />

          {/* Left Turning Reel */}
          <g transform={`translate(38, 57)`}>
            <circle className="k-spool" cx={0} cy={0} r={f2(leftSpoolRadius)} />
            <g transform={`rotate(${f2(-angle)})`}>
              <circle className="face top" cx={0} cy={0} r={9} />
              <circle className="face recess" cx={0} cy={0} r={4.5} />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <line
                  key={deg}
                  className="k-spoke"
                  x1={0}
                  y1={0}
                  x2={f2(7.5 * Math.cos((deg * Math.PI) / 180))}
                  y2={f2(7.5 * Math.sin((deg * Math.PI) / 180))}
                />
              ))}
            </g>
          </g>

          {/* Right Turning Reel */}
          <g transform={`translate(98, 57)`}>
            <circle className="k-spool" cx={0} cy={0} r={f2(rightSpoolRadius)} />
            <g transform={`rotate(${f2(-angle)})`}>
              <circle className="face top" cx={0} cy={0} r={9} />
              <circle className="face recess" cx={0} cy={0} r={4.5} />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <line
                  key={deg}
                  className="k-spoke"
                  x1={0}
                  y1={0}
                  x2={f2(7.5 * Math.cos((deg * Math.PI) / 180))}
                  y2={f2(7.5 * Math.sin((deg * Math.PI) / 180))}
                />
              ))}
            </g>
          </g>

          {/* Running Tape Ribbon Line */}
          <line
            className="k-tape-run"
            x1={38}
            y1={57 + leftSpoolRadius - 2}
            x2={98}
            y2={57 + rightSpoolRadius - 2}
          />
        </IsoPlane>
      </g>

      {/* 4. Transport Piano Keys: REW, PLAY, STOP, FF */}
      {[
        { id: "rew", label: "◀◀", x: 38, ref: rewBtnRef },
        { id: "play", label: "▶", x: 74, ref: playBtnRef, lit: isPlaying },
        { id: "stop", label: "■", x: 110, ref: stopBtnRef, lit: !isPlaying },
        { id: "ff", label: "▶▶", x: 146, ref: ffBtnRef },
      ].map((btn) => (
        <g
          key={btn.id}
          data-btn={btn.id}
          className={`press${btn.lit ? " lit latched" : ""}`}
          ref={btn.ref}
        >
          <IsoBox
            k={BOUNDS}
            at={[btn.x, DECK_BOX.y + DECK_BOX.d - 6, DECK_Z]}
            size={[26, 22, 5]}
            r={2}
          />
          <IsoPlane t={BOUNDS.TOP(btn.x, DECK_BOX.y + DECK_BOX.d - 6, DECK_Z + 5)}>
            <text
              className="k-glyph"
              x={13}
              y={14}
              fontSize={7}
              textAnchor="middle"
              fill="var(--iso-ink)"
            >
              {btn.label}
            </text>
          </IsoPlane>
        </g>
      ))}
    </IsoFigureContainer>
  );
}
