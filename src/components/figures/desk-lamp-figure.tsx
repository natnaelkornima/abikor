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

const BASE_SIZE: [number, number, number] = [300, 230, 7];
const LAMP_BASE = { x: 210, y: 140, r: 24, h: 8 };
const ARM_Z = 7 + LAMP_BASE.h;

const BOUNDS = computeIsoBounds([
  [0, BASE_SIZE[1], 0],
  [BASE_SIZE[0], 0, 7],
  [BASE_SIZE[0], BASE_SIZE[1], 0],
  [0, 0, 7],
  [LAMP_BASE.x - 30, LAMP_BASE.y - 30, ARM_Z + 120],
  [40, 40, ARM_Z + 40],
]);

export function DeskLampFigure() {
  const [lampOn, setLampOn] = useState(true);
  const [dimmerLevel, setDimmerLevel] = useState(0.85);
  const [pageNum, setPageNum] = useState(1);
  const [pageProgress, setPageProgress] = useState(0); // 0 to 1 flipping arc
  const [held, setHeld] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const switchRef = useRef<SVGGElement>(null);
  const dimmerRef = useRef<SVGGElement>(null);

  const animRef = useRef({ progress: 0, lampOn: true, held: false });
  animRef.current = { progress: pageProgress, lampOn, held };

  // Autonomous page turning animation loop via requestAnimationFrame
  useEffect(() => {
    const el = rootRef.current;
    if (!el || prefersReducedMotion()) return;

    let rafId = 0;
    let lastTime: number | null = null;
    let cycle = 0;
    const CYCLE_DURATION = 3800; // ms per page turn cycle

    const tick = (now: number) => {
      const delta = lastTime === null ? 0 : Math.min(50, now - lastTime);
      lastTime = now;

      if (!animRef.current.held) {
        cycle = (cycle + delta) % CYCLE_DURATION;
        // Fast realistic page flip in last 600ms of cycle
        if (cycle > CYCLE_DURATION - 650) {
          const flipTime = (cycle - (CYCLE_DURATION - 650)) / 650;
          setPageProgress(flipTime);
        } else {
          if (animRef.current.progress > 0) {
            setPageProgress(0);
            setPageNum((p) => p + 1);
          }
        }
      }

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

  const handleToggleSwitch = () => {
    pressKeyElement(switchRef.current, 140);
    setLampOn((on) => !on);
  };

  const handleCycleDimmer = () => {
    pressKeyElement(dimmerRef.current, 140);
    setDimmerLevel((d) => (d >= 0.95 ? 0.35 : d + 0.25));
    if (!lampOn) setLampOn(true);
  };

  const currentBook = portfolio.books[0] || {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
  };

  // Lamp beam illumination polygon
  const [lampLightX, lampLightY] = BOUNDS.P(165, 95, ARM_Z + 75);
  const [bookCorner1X, bookCorner1Y] = BOUNDS.P(35, 45, 12);
  const [bookCorner2X, bookCorner2Y] = BOUNDS.P(155, 45, 12);
  const [bookCorner3X, bookCorner3Y] = BOUNDS.P(155, 135, 12);
  const [bookCorner4X, bookCorner4Y] = BOUNDS.P(35, 135, 12);

  const beamPath = `M${f2(lampLightX)} ${f2(lampLightY)} L${f2(bookCorner1X)} ${f2(
    bookCorner1Y
  )} L${f2(bookCorner2X)} ${f2(bookCorner2Y)} L${f2(bookCorner3X)} ${f2(
    bookCorner3Y
  )} L${f2(bookCorner4X)} ${f2(bookCorner4Y)} Z`;

  return (
    <IsoFigureContainer
      rootRef={rootRef}
      name="Desk lamp"
      hint={held ? "Holding the page" : "Turn the dimmer · click switch to toggle"}
      readout={`${currentBook.title} · page ${pageNum} · ${Math.round(
        dimmerLevel * 100
      )}%`}
      power={lampOn}
      viewBox={BOUNDS.viewBox}
      label="An isometric desk lamp lighting an open book whose pages turn, beside a stack of books. Turn the dimmer on its base to set how bright it is, and click its switch to turn it off and on."
      svgProps={{
        tabIndex: 0,
        style: { "--lamp": dimmerLevel } as React.CSSProperties,
      }}
    >
      <defs>
        <radialGradient id="k-pool">
          <stop offset="0" stopColor="var(--iso-accent-hi)" stopOpacity={f2(0.55 * dimmerLevel)} />
          <stop offset="0.4" stopColor="var(--iso-accent-hi)" stopOpacity={f2(0.32 * dimmerLevel)} />
          <stop offset="0.8" stopColor="var(--iso-accent)" stopOpacity={f2(0.12 * dimmerLevel)} />
          <stop offset="1" stopColor="var(--iso-accent)" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="k-beam"
          gradientUnits="userSpaceOnUse"
          x1={f2(lampLightX)}
          y1={f2(lampLightY)}
          x2={f2(bookCorner2X)}
          y2={f2(bookCorner4Y)}
        >
          <stop offset="0" stopColor="var(--iso-accent-hi)" stopOpacity={f2(0.32 * dimmerLevel)} />
          <stop offset="0.6" stopColor="var(--iso-accent)" stopOpacity={f2(0.12 * dimmerLevel)} />
          <stop offset="1" stopColor="var(--iso-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 1. Base Table Plate */}
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

      {/* 2. Open Book on the Desk */}
      <g
        className="cursor-pointer"
        onMouseDown={() => setHeld(true)}
        onMouseUp={() => setHeld(false)}
        onTouchStart={() => setHeld(true)}
        onTouchEnd={() => setHeld(false)}
      >
        {/* Book Left & Right Hard Cover */}
        <IsoBox k={BOUNDS} at={[35, 45, 7]} size={[56, 88, 3]} r={2} />
        <IsoBox k={BOUNDS} at={[93, 45, 7]} size={[56, 88, 3]} r={2} />

        {/* Static Left Page */}
        <IsoPlane t={BOUNDS.TOP(36, 46, 10)}>
          <rect className="k-paper" width={54} height={86} rx={1} />
          {Array.from({ length: 9 }, (_, i) => (
            <line
              key={i}
              className="detail"
              x1={6}
              y1={12 + i * 8}
              x2={48}
              y2={12 + i * 8}
            />
          ))}
          <text className="label" x={6} y={80} fontSize={4.5}>
            {pageNum * 2 - 1}
          </text>
        </IsoPlane>

        {/* Static Right Page */}
        <IsoPlane t={BOUNDS.TOP(94, 46, 10)}>
          <rect className="k-paper" width={54} height={86} rx={1} />
          {Array.from({ length: 9 }, (_, i) => (
            <line
              key={i}
              className="detail"
              x1={6}
              y1={12 + i * 8}
              x2={48}
              y2={12 + i * 8}
            />
          ))}
          <text className="label" x={46} y={80} fontSize={4.5} textAnchor="end">
            {pageNum * 2}
          </text>
        </IsoPlane>

        {/* Dynamic Flipping Page Arch */}
        {pageProgress > 0 && (
          <g style={{ transformOrigin: "93px 46px" }}>
            <IsoPlane
              t={BOUNDS.plane(
                [93, 46, 10],
                [Math.cos(pageProgress * Math.PI), 0, Math.sin(pageProgress * Math.PI)],
                [0, 1, 0]
              )}
            >
              <rect className="k-paper" width={54} height={86} rx={1} />
              {Array.from({ length: 9 }, (_, i) => (
                <line
                  key={i}
                  className="detail"
                  x1={6}
                  y1={12 + i * 8}
                  x2={48}
                  y2={12 + i * 8}
                />
              ))}
            </IsoPlane>
          </g>
        )}
      </g>

      {/* 3. Stack of Finished Books Beside the Lamp */}
      {portfolio.books.slice(1, 5).map((book, bIdx) => {
        const bookZ = 7 + bIdx * 8;
        return (
          <g key={book.title} className="k-stack__book">
            <IsoBox k={BOUNDS} at={[158, 48, bookZ]} size={[46, 68, 7.5]} r={1.5} />
            <IsoPlane t={BOUNDS.SIDE(158 + 46, 48 + 68, bookZ + 7.5)}>
              <text
                className="k-stack__title"
                x={8}
                y={5.5}
                fontSize={3.8}
                fill="var(--iso-ink)"
              >
                {book.title.slice(0, 16)}
              </text>
            </IsoPlane>
          </g>
        );
      })}

      {/* 4. Illuminated Light Pool & Projection Beam */}
      {lampOn && (
        <g className="pointer-events-none">
          <path className="k-light on" d={beamPath} fill="url(#k-beam)" />
          <IsoPlane t={BOUNDS.TOP(0, 0, 7.5)}>
            <circle
              cx={f2((bookCorner1X + bookCorner3X) / 2)}
              cy={f2((bookCorner1Y + bookCorner3Y) / 2)}
              r={72}
              fill="url(#k-pool)"
            />
          </IsoPlane>
        </g>
      )}

      {/* 5. Desk Lamp Base, Joint Arms, and Shade */}
      <IsoBox
        k={BOUNDS}
        at={[LAMP_BASE.x - 18, LAMP_BASE.y - 18, 7]}
        size={[36, 36, LAMP_BASE.h]}
        r={18}
      />
      <IsoPlane t={BOUNDS.TOP(LAMP_BASE.x - 18, LAMP_BASE.y - 18, ARM_Z)}>
        {/* Toggle Switch */}
        <g
          className="press"
          ref={switchRef}
          onClick={handleToggleSwitch}
          data-switch
        >
          <circle className="face" cx={10} cy={18} r={5} />
          <circle
            className={`led${lampOn ? " hot" : ""}`}
            cx={10}
            cy={18}
            r={2.5}
            filter="url(#k-soft)"
          />
        </g>

        {/* Rotary Dimmer Knob */}
        <g
          className="press"
          ref={dimmerRef}
          onClick={handleCycleDimmer}
          data-dimmer
        >
          <circle className="face top" cx={26} cy={18} r={6} />
          <line
            className="detail"
            x1={26}
            y1={18}
            x2={26 + 5 * Math.cos(dimmerLevel * 2 * Math.PI)}
            y2={18 + 5 * Math.sin(dimmerLevel * 2 * Math.PI)}
            strokeWidth={1.5}
          />
        </g>
      </IsoPlane>

      {/* Cantilever Metal Strut Arms */}
      <IsoBox k={BOUNDS} at={[LAMP_BASE.x - 2, LAMP_BASE.y - 2, ARM_Z]} size={[4, 4, 55]} r={1.5} />
      <IsoBox k={BOUNDS} at={[LAMP_BASE.x - 22, LAMP_BASE.y - 18, ARM_Z + 50]} size={[4, 4, 45]} r={1.5} />

      {/* Lamp Shade Head */}
      <IsoBox
        k={BOUNDS}
        at={[LAMP_BASE.x - 45, LAMP_BASE.y - 35, ARM_Z + 80]}
        size={[28, 28, 22]}
        r={8}
      />
      {lampOn && (
        <IsoPlane t={BOUNDS.FRONT(LAMP_BASE.x - 45, LAMP_BASE.y - 15, ARM_Z + 90)}>
          <circle
            className="halo hot"
            cx={14}
            cy={10}
            r={16}
            filter="url(#k-bloom)"
            fill="rgba(255,255,255,0.4)"
          />
          <circle
            className="accent"
            cx={14}
            cy={10}
            r={7}
            filter="url(#k-glow)"
            fill="#ffffff"
          />
        </IsoPlane>
      )}
    </IsoFigureContainer>
  );
}
