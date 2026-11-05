"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
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

const CHAR_W = 3.5;
const LINE_H = 7.5;
const MAX_COLS = 30;
const BELL_COL = 26;
const MAX_LINES = 6;
const PAPER_W = 16 * CHAR_W;

const BASE_SIZE: [number, number, number] = [300, 236, 7];
const REAR_HOUSING = { x: 28, y: 40, w: 244, d: 56, h: 40 };
const KEYBOARD_SLOPE = { x: 28, y: 96, w: 244, d: 122, h: 18 };
const REAR_Z = 7 + REAR_HOUSING.h;
const KEY_Z = 7 + KEYBOARD_SLOPE.h;
const CARRIAGE_BOX = { x: 84, y: 52, w: 244, d: 20, h: 20 };
const PAPER_SPEC = { x: 142, y: 61, w: 130, bottom: 50, top: 150, margin: 8 };
const CARRIAGE_LEFT = PAPER_SPEC.x + PAPER_SPEC.margin - PAPER_W;
const PAPER_START_Y = PAPER_SPEC.top - 80;

const KEY_LAYOUT = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "Backspace"],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "Enter"],
  ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
];

const KEY_LABELS: Record<string, string> = { Backspace: "←", Enter: "↵" };
const KEY_H = 14;
const KEY_START_Y = KEYBOARD_SLOPE.y + 8;

const BOUNDS = computeIsoBounds([
  [0, BASE_SIZE[1], 0],
  [BASE_SIZE[0], 0, 7],
  [BASE_SIZE[0], BASE_SIZE[1], 0],
  [0, 0, 7],
  [CARRIAGE_BOX.x - 112 - 20, CARRIAGE_BOX.y, REAR_Z + CARRIAGE_BOX.h + 2],
  [CARRIAGE_BOX.x + CARRIAGE_BOX.w + 10, CARRIAGE_BOX.y, REAR_Z + CARRIAGE_BOX.h + 2],
  [PAPER_SPEC.x - 112, PAPER_SPEC.y, PAPER_SPEC.top],
  [PAPER_SPEC.x + PAPER_SPEC.w, PAPER_SPEC.y, PAPER_SPEC.top],
]);

const SHIFT_MAP: Record<string, string> = {
  "!": "1",
  "@": "2",
  "#": "3",
  "$": "4",
  "%": "5",
  "^": "6",
  "&": "7",
  "*": "8",
  "(": "9",
  ")": "0",
  "_": "-",
  ":": ";",
  "<": ",",
  ">": ".",
  "?": "/",
  "'": ";",
  '"': ";",
};

const normalizeKey = (k: string) => {
  if (k === " ") return " ";
  if (k.length === 1) return SHIFT_MAP[k] ?? k.toLowerCase();
  return k;
};

function wrapTitle(text: string): string[] {
  const lines: string[] = [];
  let cur = "";
  for (const word of text.split(" ")) {
    if (cur && cur.length + 1 + word.length > MAX_COLS) {
      lines.push(cur);
      cur = word;
    } else {
      cur = cur ? `${cur} ${word}` : word;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function makeSteps(post: { title: string }): string[] {
  const steps: string[] = [];
  wrapTitle(post.title).forEach((line, idx) => {
    if (idx > 0) steps.push("Enter");
    steps.push(...Array.from(line));
  });
  steps.push("Enter", "Enter");
  return steps;
}

function makeInitialState(post: { title: string }) {
  const lines = wrapTitle(post.title).map((line) =>
    Array.from(line).map((ch, col) => ({ ch, col }))
  );
  lines.push([], []);
  return { lines, gone: 0, col: 0, last: null as { col: number; ch: string } | null };
}

export function TypewriterFigure() {
  const posts = useMemo(() => {
    return portfolio.articles.map((a) => ({
      title: a.title,
      date: a.date,
    }));
  }, []);

  const rootRef = useRef<HTMLElement>(null);
  const keyRefs = useRef<Map<string, SVGGElement>>(new Map());
  const registerKey = useMemo(
    () => (key: string, el: SVGGElement | null) => {
      if (el) keyRefs.current.set(key, el);
    },
    []
  );

  const [state, setState] = useState(() => makeInitialState(posts[0]));
  const [returning, setReturning] = useState(false);
  const [lastActivity, setLastActivity] = useState(-1e9);
  const [now, setNow] = useState(0);
  const [userTyping, setUserTyping] = useState(false);
  const [postIndex, setPostIndex] = useState(0);

  const leverRef = useRef<SVGGElement>(null);
  const autoState = useRef({ index: 0, steps: [] as string[], step: 0 });

  const typeChar = (k: string) => {
    if (k === "Enter") {
      pressKeyElement(leverRef.current, 260);
      pressKeyElement(keyRefs.current.get("Enter") || null);
      setReturning(true);
      window.setTimeout(() => setReturning(false), 420);
      setState((prev) => {
        const nextLines = [...prev.lines, []];
        const overflow = Math.max(0, nextLines.length - 18);
        return {
          lines: nextLines.slice(overflow),
          gone: prev.gone + overflow,
          col: 0,
          last: null,
        };
      });
    } else if (k === "Backspace") {
      pressKeyElement(keyRefs.current.get("Backspace") || null);
      setState((prev) => ({
        ...prev,
        col: Math.max(0, prev.col - 1),
      }));
    } else if (k.length === 1) {
      pressKeyElement(keyRefs.current.get(normalizeKey(k)) || null);
      setReturning(false);
      setState((prev) => {
        const nextLines = [...prev.lines];
        const lastLine = nextLines[nextLines.length - 1] || [];
        nextLines[nextLines.length - 1] = [...lastLine, { ch: k, col: prev.col }];
        return {
          ...prev,
          lines: nextLines,
          col: Math.min(32, prev.col + 1),
          last: k === " " ? null : { col: prev.col, ch: k },
        };
      });
    } else {
      return false;
    }

    setLastActivity(performance.now());
    return true;
  };

  const hasInteracted = useRef(false);
  const handleUserKey = (k: string) => {
    if (hasInteracted.current) {
      hasInteracted.current = false;
      const last = state.lines.at(-1);
      if (k !== "Enter" && last && last.length) {
        typeChar("Enter");
      }
    }
    return typeChar(k);
  };

  useEffect(() => {
    const el = rootRef.current;
    if (!el || prefersReducedMotion()) return;

    let isVisible = false;
    let timerId = 0;
    const curAuto = autoState.current;

    const tick = () => {
      if (!isVisible || userTyping) return;
      if (curAuto.step >= curAuto.steps.length) {
        curAuto.index = (curAuto.index + 1) % posts.length;
        curAuto.steps = makeSteps(posts[curAuto.index]);
        curAuto.step = 0;
        setPostIndex(curAuto.index);
      }

      const nextKey = curAuto.steps[curAuto.step++];
      typeChar(nextKey);

      const delay =
        nextKey === "Enter"
          ? curAuto.step >= curAuto.steps.length
            ? 1500
            : 520
          : nextKey === " "
          ? 110
          : /[,.:?!]/.test(nextKey)
          ? 170
          : 62 + ((nextKey.charCodeAt(0) * 37) % 41);

      timerId = window.setTimeout(tick, delay);
    };

    const observer = new IntersectionObserver(([entry]) => {
      const prev = isVisible;
      isVisible = Boolean(entry?.isIntersecting);
      if (isVisible && !prev) {
        timerId = window.setTimeout(tick, 900);
      } else if (!isVisible) {
        window.clearTimeout(timerId);
      }
    });

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timerId);
    };
  }, [posts, userTyping]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(performance.now()), 250);
    return () => window.clearInterval(timer);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "Escape") {
      e.currentTarget.blur();
    } else if ((e.key !== "Enter" || !e.repeat) && handleUserKey(e.key)) {
      e.preventDefault();
    }
  };

  const isPower = now - lastActivity < 1500;
  const [dispX, dispY] = BOUNDS.D(-state.col * CHAR_W, 0, 0);
  const visibleLinesStart = Math.max(0, state.lines.length - MAX_LINES);
  const activeLineIdx = state.gone + state.lines.length - 1;
  const getLineY = (lineNum: number) => PAPER_START_Y + lineNum * LINE_H;

  const curPostDate = posts[postIndex]?.date || "";
  const formattedDate = curPostDate
    ? new Date(curPostDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      })
    : "";

  return (
    <IsoFigureContainer
      rootRef={rootRef}
      name="Typewriter"
      hint={userTyping ? "Typing · esc to stop" : "Press a key to type"}
      readout={`${userTyping ? "you" : formattedDate} · line ${activeLineIdx + 1} · col ${
        state.col + 1
      }`}
      power={isPower}
      viewBox={BOUNDS.viewBox}
      label="An isometric typewriter typing out the titles of the blog's posts. Press its keys, or click it and use your keyboard, to type on it yourself."
      svgProps={{
        tabIndex: 0,
        onKeyDown,
        onClick: (e) => {
          const keyEl = (e.target as Element).closest("[data-key]");
          const k = keyEl?.getAttribute("data-key");
          if (k) {
            e.currentTarget.focus({ preventScroll: true });
            handleUserKey(k);
          }
        },
        onFocus: () => {
          hasInteracted.current = true;
          setUserTyping(true);
        },
        onBlur: () => setUserTyping(false),
      }}
    >
      {/* 1. Base Housing and Side Frame */}
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

      {/* Rear Box Housing */}
      <IsoBox
        k={BOUNDS}
        at={[REAR_HOUSING.x, REAR_HOUSING.y, 7]}
        size={[REAR_HOUSING.w, REAR_HOUSING.d, REAR_HOUSING.h]}
        r={8}
      />
      <IsoPlane t={BOUNDS.TOP(REAR_HOUSING.x, REAR_HOUSING.y, REAR_Z)}>
        <rect
          className="face recess"
          x={6}
          y={4}
          width={REAR_HOUSING.w - 12}
          height={8}
          rx={4}
        />
        {[60, 184].map((pos) => (
          <g key={pos}>
            <circle className="face" cx={pos} cy={44} r={8} />
            <circle className="detail" cx={pos} cy={44} r={4.5} />
            <circle className="face recess" cx={pos} cy={44} r={1.6} />
          </g>
        ))}
      </IsoPlane>

      {/* Front Slanted Keyboard Chassis & Board */}
      <IsoBox
        k={BOUNDS}
        at={[KEYBOARD_SLOPE.x, KEYBOARD_SLOPE.y, 7]}
        size={[KEYBOARD_SLOPE.w, KEYBOARD_SLOPE.d, KEYBOARD_SLOPE.h]}
        r={8}
      />
      <IsoPlane t={BOUNDS.TOP(KEYBOARD_SLOPE.x, KEYBOARD_SLOPE.y, KEY_Z)}>
        {/* Outer keyboard bed rim */}
        <rect
          x={4}
          y={4}
          width={KEYBOARD_SLOPE.w - 8}
          height={KEYBOARD_SLOPE.d - 8}
          rx={6}
          fill="#2a2a32"
          stroke="#484854"
          strokeWidth={1}
        />
        {/* Slanted mechanical keyboard board holding the keys */}
        <rect
          x={7}
          y={7}
          width={KEYBOARD_SLOPE.w - 14}
          height={KEYBOARD_SLOPE.d - 14}
          rx={4}
          fill="#212127"
          stroke="#3a3a46"
          strokeWidth={1}
        />
        {/* Subtle decorative guide rule in Anatomy craft style */}
        <line
          x1={12}
          y1={KEYBOARD_SLOPE.d - 14}
          x2={KEYBOARD_SLOPE.w - 12}
          y2={KEYBOARD_SLOPE.d - 14}
          stroke="#32323c"
          strokeWidth={1}
        />
      </IsoPlane>

      {/* 2. Interactive Tactile Keys Grid */}
      {KEY_LAYOUT.map((row, rowIdx) => {
        const rowY = KEY_START_Y + rowIdx * 21;
        let curX = KEYBOARD_SLOPE.x + 14 + rowIdx * 6;
        return row.map((keyName) => {
          const keyW = keyName === "Enter" ? 24 : KEY_H;
          const posX = curX;
          curX += keyW === KEY_H ? 18 : keyW + 4;
          return (
            <g
              key={keyName}
              className="press key"
              data-key={keyName}
              ref={(el) => registerKey(keyName, el)}
            >
              <IsoBox
                k={BOUNDS}
                at={[posX + keyW / 2 - 2.5, rowY + KEY_H / 2 - 2.5, KEY_Z]}
                size={[5, 5, 6]}
                r={1}
              />
              <IsoBox
                k={BOUNDS}
                at={[posX, rowY, KEY_Z + 6]}
                size={[keyW, KEY_H, 3]}
                r={7}
              />
              <IsoPlane t={BOUNDS.TOP(posX, rowY, KEY_Z + 9)}>
                <text
                  className="label"
                  x={keyW / 2}
                  y={9.2}
                  fontSize={6.5}
                  textAnchor="middle"
                  fill="var(--iso-ink)"
                >
                  {KEY_LABELS[keyName] ?? keyName}
                </text>
              </IsoPlane>
            </g>
          );
        });
      })}

      {/* Spacebar */}
      <g
        className="press key"
        data-key=" "
        ref={(el) => registerKey(" ", el)}
      >
        <IsoBox k={BOUNDS} at={[110, KEY_START_Y + 84 + 4, KEY_Z]} size={[5, 4, 5]} r={1} />
        <IsoBox k={BOUNDS} at={[185, KEY_START_Y + 84 + 4, KEY_Z]} size={[5, 4, 5]} r={1} />
        <IsoBox
          k={BOUNDS}
          at={[80, KEY_START_Y + 84 + 1, KEY_Z + 5]}
          size={[140, 10, 3.5]}
          r={4}
        />
      </g>

      {/* Carriage Bell Indicator LED */}
      <IsoPlane t={BOUNDS.SIDE(REAR_HOUSING.x + REAR_HOUSING.w, REAR_HOUSING.y + REAR_HOUSING.d, REAR_Z)}>
        <circle className="face recess" cx={REAR_HOUSING.d - 10} cy={13} r={6.5} />
        <circle
          className={`led${state.col >= BELL_COL ? " hot" : ""}`}
          filter="url(#k-soft)"
          cx={REAR_HOUSING.d - 10}
          cy={13}
          r={4.2}
        />
      </IsoPlane>

      {/* 3. Moving Mechanical Carriage & Paper Sheet */}
      <g
        className={`k-carriage${returning ? " ret" : ""}`}
        style={{ transform: `translate(${f2(dispX)}px, ${f2(dispY)}px)` }}
      >
        {/* Paper Sheet and Feed Mechanism */}
        <IsoPlane t={BOUNDS.FRONT(PAPER_SPEC.x, PAPER_SPEC.y, PAPER_SPEC.top)}>
          <rect
            className="k-paper"
            width={PAPER_SPEC.w}
            height={PAPER_SPEC.top - PAPER_SPEC.bottom}
            rx={1.5}
          />
          <line
            className="detail"
            x1={PAPER_SPEC.margin - 2}
            y1={6}
            x2={PAPER_SPEC.margin - 2}
            y2={PAPER_SPEC.top - PAPER_SPEC.bottom - 4}
          />

          {/* Typing Feed */}
          <g
            className="k-feed"
            style={{ transform: `translate(0px, ${f2(-activeLineIdx * LINE_H)}px)` }}
          >
            {state.lines.slice(visibleLinesStart).map((lineChars, lIdx) => {
              const absLine = state.gone + visibleLinesStart + lIdx;
              const nonSpaceChars = lineChars.filter(
                (c) =>
                  c.ch !== " " &&
                  !(state.last && absLine === activeLineIdx && c.col === state.last.col)
              );
              if (!nonSpaceChars.length) return null;
              return (
                <text
                  key={absLine}
                  className="ink"
                  fontSize={6}
                  y={f2(getLineY(absLine))}
                  x={nonSpaceChars.map((c) => f2(PAPER_SPEC.margin + c.col * CHAR_W)).join(" ")}
                >
                  {nonSpaceChars.map((c) => c.ch).join("")}
                </text>
              );
            })}

            {/* Glowing Type Strike Bloom on Last Typed Character */}
            {state.last && (
              <>
                <rect
                  className="halo hot"
                  filter="url(#k-bloom)"
                  x={f2(PAPER_SPEC.margin + state.last.col * CHAR_W - 3)}
                  y={f2(getLineY(activeLineIdx) - 8)}
                  width={10}
                  height={11}
                  rx={4}
                  fill="rgba(255,255,255,0.4)"
                />
                <text
                  className="accent"
                  filter="url(#k-glow)"
                  fontSize={6}
                  fontWeight={500}
                  x={f2(PAPER_SPEC.margin + state.last.col * CHAR_W)}
                  y={f2(getLineY(activeLineIdx))}
                  fill="#ffffff"
                >
                  {state.last.ch}
                </text>
              </>
            )}
          </g>
        </IsoPlane>

        {/* Carriage Platen / Roller */}
        <IsoBox
          k={BOUNDS}
          at={[CARRIAGE_BOX.x - 10, CARRIAGE_BOX.y + 3, REAR_Z + 2]}
          size={[10, CARRIAGE_BOX.d - 6, CARRIAGE_BOX.h - 4]}
          r={3}
        />
        <IsoBox
          k={BOUNDS}
          at={[CARRIAGE_BOX.x, CARRIAGE_BOX.y, REAR_Z]}
          size={[CARRIAGE_BOX.w, CARRIAGE_BOX.d, CARRIAGE_BOX.h]}
          r={6}
        />
        <IsoPlane t={BOUNDS.FRONT(CARRIAGE_BOX.x, CARRIAGE_BOX.y + CARRIAGE_BOX.d, REAR_Z + CARRIAGE_BOX.h)}>
          <IsoVents
            from={4}
            to={CARRIAGE_BOX.h - 4}
            step={2.4}
            across={[6, CARRIAGE_BOX.w - 6]}
            vertical={false}
          />
        </IsoPlane>
        <IsoPlane t={BOUNDS.TOP(CARRIAGE_BOX.x, CARRIAGE_BOX.y, REAR_Z + CARRIAGE_BOX.h)}>
          <IsoVents
            from={4}
            to={CARRIAGE_BOX.d - 4}
            step={2.4}
            across={[6, CARRIAGE_BOX.w - 6]}
            vertical={false}
          />
        </IsoPlane>
        <IsoBox
          k={BOUNDS}
          at={[CARRIAGE_BOX.x + CARRIAGE_BOX.w, CARRIAGE_BOX.y + 3, REAR_Z + 2]}
          size={[10, CARRIAGE_BOX.d - 6, CARRIAGE_BOX.h - 4]}
          r={3}
        />

        {/* Carriage Return Metal Lever */}
        <g
          className="press"
          data-key="Enter"
          ref={leverRef}
          onClick={(e) => {
            e.stopPropagation();
            typeChar("Enter");
          }}
        >
          <IsoBox
            k={BOUNDS}
            at={[CARRIAGE_BOX.x - 18, CARRIAGE_BOX.y + 8, REAR_Z + CARRIAGE_BOX.h - 3]}
            size={[6, 4, 4]}
            r={1}
          />
          <IsoBox
            k={BOUNDS}
            at={[CARRIAGE_BOX.x - 18, CARRIAGE_BOX.y + 12, REAR_Z + CARRIAGE_BOX.h - 2]}
            size={[4, 40, 3]}
            r={1.5}
          />
          <IsoBox
            k={BOUNDS}
            at={[CARRIAGE_BOX.x - 21, CARRIAGE_BOX.y + 50, REAR_Z + CARRIAGE_BOX.h - 3]}
            size={[10, 8, 6]}
            r={3}
          />
        </g>
      </g>

      {/* Front Center Ribbon Strike Guide & Power Status LED */}
      <IsoBox
        k={BOUNDS}
        at={[CARRIAGE_LEFT + PAPER_W - 5, CARRIAGE_BOX.y + CARRIAGE_BOX.d + 1, REAR_Z]}
        size={[10, 5, 7]}
        r={1.5}
      />
      <IsoPlane
        t={BOUNDS.FRONT(
          CARRIAGE_LEFT + PAPER_W - 5,
          CARRIAGE_BOX.y + CARRIAGE_BOX.d + 6,
          REAR_Z + 7
        )}
      >
        <circle
          className={`led${isPower ? " hot" : ""}`}
          filter="url(#k-soft)"
          cx={5}
          cy={3.5}
          r={1.4}
        />
      </IsoPlane>
    </IsoFigureContainer>
  );
}
