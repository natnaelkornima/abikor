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

const BASE_SIZE: [number, number, number] = [300, 240, 7];
const CAMERA_BODY = { x: 38, y: 50, w: 120, d: 130, h: 48 };
const BODY_Z = 7 + CAMERA_BODY.h;
const SHUTTER_BUTTON = { x: 44, y: 154, w: 20, d: 20, h: 6 };

const BOUNDS = computeIsoBounds([
  [0, BASE_SIZE[1], 0],
  [BASE_SIZE[0], 0, 7],
  [BASE_SIZE[0], BASE_SIZE[1], 0],
  [0, 0, 7],
  [CAMERA_BODY.x, CAMERA_BODY.y, BODY_Z + 40],
  [260, 200, BODY_Z],
]);

interface InstantCameraFigureProps {
  framesLeft?: number;
  onSnap?: (photoIdx: number) => void;
}

export function InstantCameraFigure({
  framesLeft = 8,
  onSnap,
}: InstantCameraFigureProps = {}) {
  const pics = portfolio.pics || [
    { title: "Above the Clouds", location: "In the air", date: "2024" },
    { title: "Terminal Workspace", location: "San Francisco", date: "2024" },
    { title: "Late Night Code", location: "Addis Ababa", date: "2024" },
  ];

  const [frameIndex, setFrameIndex] = useState(0);
  const [flash, setFlash] = useState(false);
  const [printEject, setPrintEject] = useState(0); // 0 (hidden) to 1 (fully ejected)
  const [developProgress, setDevelopProgress] = useState(1); // 0 (blank) to 1 (developed)
  const [pilePhotos, setPilePhotos] = useState<number[]>([0]);

  const rootRef = useRef<HTMLElement>(null);
  const shutterRef = useRef<SVGGElement>(null);
  const isSnapping = useRef(false);

  const snap = () => {
    if (isSnapping.current) return;
    isSnapping.current = true;

    pressKeyElement(shutterRef.current, 240);
    setFlash(true);
    setPrintEject(0.05);
    setDevelopProgress(0);

    const nextIdx = (frameIndex + 1) % pics.length;
    setFrameIndex(nextIdx);
    if (onSnap) onSnap(nextIdx);

    // Flash burst
    window.setTimeout(() => setFlash(false), 220);

    // Eject animation
    let start: number | null = null;
    const ejectDuration = 900;
    const animateEject = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min(1, (t - start) / ejectDuration);
      setPrintEject(progress);

      if (progress < 1) {
        requestAnimationFrame(animateEject);
      } else {
        // Drop on pile
        setPilePhotos((prev) => [...prev.slice(-3), nextIdx]);
        // Begin chemical development
        let devStart: number | null = null;
        const devDuration = 2200;
        const animateDev = (dt: number) => {
          if (devStart === null) devStart = dt;
          const devP = Math.min(1, (dt - devStart) / devDuration);
          setDevelopProgress(devP);
          if (devP < 1) {
            requestAnimationFrame(animateDev);
          } else {
            isSnapping.current = false;
          }
        };
        requestAnimationFrame(animateDev);
      }
    };
    requestAnimationFrame(animateEject);
  };

  // Autonomous periodic snapshot loop
  useEffect(() => {
    const el = rootRef.current;
    if (!el || prefersReducedMotion()) return;

    let timerId = 0;
    let isVisible = false;

    const scheduleNext = () => {
      timerId = window.setTimeout(() => {
        if (isVisible && !isSnapping.current) {
          snap();
        }
        scheduleNext();
      }, 7500);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = Boolean(entry?.isIntersecting);
      if (isVisible) scheduleNext();
      else window.clearTimeout(timerId);
    });

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timerId);
    };
  }, [pics.length]);

  const currentPhoto = pics[frameIndex] || {
    title: "Instant Shot",
    location: "Studio",
  };
  const isDeveloping = developProgress < 1;
  const statusReadout = isDeveloping
    ? `frame 0${frameIndex + 1} · developing (${Math.round(developProgress * 100)}%)`
    : `frame 0${frameIndex + 1} · ${currentPhoto.location}`;

  return (
    <IsoFigureContainer
      rootRef={rootRef}
      name="Instant camera"
      hint="Press shutter · click print to inspect"
      readout={statusReadout}
      power={flash}
      viewBox={BOUNDS.viewBox}
      label="An isometric instant camera that prints pictures, developing each one in black and white and dropping it on a pile on the desk. Press the shutter for the next; click a print to open its picture."
      svgProps={{
        tabIndex: 0,
        onClick: (e) => {
          if ((e.target as Element).closest("[data-shutter]")) {
            snap();
          }
        },
      }}
    >
      <defs>
        <radialGradient id="k-lens-glass" cx="0.38" cy="0.34" r="0.8">
          <stop offset="0" stopColor="#4a4d52" />
          <stop offset="0.35" stopColor="#1a1c20" />
          <stop offset="1" stopColor="#050506" />
        </radialGradient>
        <clipPath id="k-print-photo">
          <rect x={6} y={6} width={52} height={52} rx={1} />
        </clipPath>
      </defs>

      {/* 1. Base Table Surface */}
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

      {/* 2. Camera Main Chassis */}
      <IsoBox
        k={BOUNDS}
        at={[CAMERA_BODY.x, CAMERA_BODY.y, 7]}
        size={[CAMERA_BODY.w, CAMERA_BODY.d, CAMERA_BODY.h]}
        r={12}
      />

      {/* Camera Top Surface with Optical Viewfinder */}
      <IsoPlane t={BOUNDS.TOP(CAMERA_BODY.x, CAMERA_BODY.y, BODY_Z)}>
        <rect className="face recess" x={14} y={14} width={34} height={20} rx={3} />
        <circle className="k-glass" cx={31} cy={24} r={6} fill="url(#k-lens-glass)" />

        {/* Xenon Strobe Flash Window */}
        <rect
          className={`k-flash${flash ? " is-on" : ""}`}
          x={68}
          y={14}
          width={40}
          height={20}
          rx={2.5}
        />
      </IsoPlane>

      {/* Front Face with Big Isometric Lens Assembly */}
      <IsoPlane t={BOUNDS.FRONT(CAMERA_BODY.x, CAMERA_BODY.y + CAMERA_BODY.d, BODY_Z)}>
        {/* Outer Lens Bezel */}
        <circle className="face top" cx={60} cy={24} r={22} />
        <circle className="face recess" cx={60} cy={24} r={17} />
        <circle className="k-glass" cx={60} cy={24} r={15} fill="url(#k-lens-glass)" />
        <circle className="k-pupil" cx={60} cy={24} r={4} fill="#000" />
        <circle className="k-glint-dot" cx={66} cy={20} r={1.5} fill="rgba(255,255,255,0.4)" />

        {/* Film Ejection Slot */}
        <rect className="face recess" x={15} y={42} width={90} height={3.5} rx={1} />
      </IsoPlane>

      {/* Tactile Shutter Button */}
      <g
        className="press k-shutter cursor-pointer"
        data-shutter
        ref={shutterRef}
        onClick={snap}
      >
        <IsoBox
          k={BOUNDS}
          at={[SHUTTER_BUTTON.x, SHUTTER_BUTTON.y, BODY_Z]}
          size={[SHUTTER_BUTTON.w, SHUTTER_BUTTON.d, SHUTTER_BUTTON.h]}
          r={SHUTTER_BUTTON.w / 2}
        />
        <IsoPlane t={BOUNDS.TOP(SHUTTER_BUTTON.x, SHUTTER_BUTTON.y, BODY_Z + SHUTTER_BUTTON.h)}>
          <circle className="led hot" cx={10} cy={10} r={3} />
        </IsoPlane>
      </g>

      {/* 3. Emerging Polaroid Print from the Front Slot */}
      {printEject > 0 && (
        <g style={{ transform: `translate(0px, ${f2(printEject * 38)}px)` }}>
          <IsoPlane
            t={BOUNDS.TOP(
              CAMERA_BODY.x + 28,
              CAMERA_BODY.y + CAMERA_BODY.d - 10 + printEject * 30,
              12
            )}
          >
            <rect className="k-print-paper" width={64} height={76} rx={2} fill="#ececec" />
            <rect
              className="k-print-blank"
              x={6}
              y={6}
              width={52}
              height={52}
              rx={1}
              fill={`rgba(20,20,20, ${f2(1 - developProgress * 0.85)})`}
            />
            <text className="k-print-hand" x={8} y={69} fontSize={5} fill="#161616">
              {currentPhoto.location}
            </text>
          </IsoPlane>
        </g>
      )}

      {/* 4. Desk Pile of Previously Captured Instant Prints */}
      {pilePhotos.map((pIdx, stackOrder) => {
        const photo = pics[pIdx] || pics[0];
        const rot = ((stackOrder % 3) - 1) * 7;
        const pileX = 184 + stackOrder * 8;
        const pileY = 96 + stackOrder * 6;
        const pileZ = 8 + stackOrder * 2.5;

        return (
          <g key={stackOrder} className="k-pile cursor-pointer">
            <IsoPlane t={BOUNDS.TOP(pileX, pileY, pileZ)}>
              <g transform={`rotate(${rot} 32 38)`}>
                <rect
                  className="k-shade"
                  x={2}
                  y={3}
                  width={64}
                  height={76}
                  rx={2}
                  filter="url(#k-soft)"
                />
                <rect className="k-print-paper" width={64} height={76} rx={2} fill="#ededed" />
                <rect
                  className="k-print-blank"
                  x={6}
                  y={6}
                  width={52}
                  height={52}
                  rx={1}
                  fill="#1c1c1c"
                />
                <text className="k-print-hand" x={8} y={69} fontSize={5} fill="#161616">
                  {photo.location}
                </text>
              </g>
            </IsoPlane>
          </g>
        );
      })}

      {/* Flash Bloom Screen Wash Overlay */}
      {flash && (
        <rect
          className="k-wash pointer-events-none"
          x={-2000}
          y={-2000}
          width={6000}
          height={6000}
          fill="#ffffff"
          opacity={0.88}
        />
      )}
    </IsoFigureContainer>
  );
}
