"use client";

import React, { useState } from "react";
import { portfolio } from "@/data/portfolio";

export default function BooksPage() {
  const { books } = portfolio;
  const [lampOn, setLampOn] = useState(true);
  const [intensity, setIntensity] = useState(85);

  return (
    <div>
      <header className="grid items-start gap-10">
        <div>
          <p className="k-label">
            <span className="text-[#6e6e6e]">02</span>
            <span aria-hidden="true" className="mx-1.5 text-[#4a4a4a]">/</span>
            <span>Books</span>
          </p>
          <h1 className="mt-3 text-2xl font-medium tracking-[-0.025em] text-[#ededed]">
            Books I&#39;ve read
          </h1>
          <div className="mt-4 max-w-[60ch] space-y-4 leading-7 text-[#b7b7b7]">
            My favorite hobby away from the keyboard, and an architectural insight or line from each book that stayed with me.
          </div>
        </div>
      </header>

      {/* Desk Lamp Isometric Visualizer */}
      <div className="mt-10">
        <figure className="k-iso">
          <div className="k-iso__bar">
            <span>Desk Lamp // Reading Rig</span>
            <span className="text-[#6e6e6e]">KF-02 · INTENSITY {lampOn ? `${intensity}%` : "OFF"}</span>
          </div>
          <div className="k-iso__stage flex flex-col items-center justify-center py-10">
            <div className="relative flex flex-col items-center">
              {/* Lamp Light Glow Cone */}
              <div
                className="transition-all duration-300 pointer-events-none absolute -top-10 w-64 h-48 rounded-full blur-3xl"
                style={{
                  background: lampOn
                    ? `radial-gradient(circle, rgba(251, 191, 36, ${intensity / 250}) 0%, rgba(0,0,0,0) 70%)`
                    : "transparent",
                }}
              />

              {/* Minimal SVG Lamp */}
              <svg width="120" height="110" viewBox="0 0 120 110" fill="none" className="relative z-10">
                {/* Lamp Shade */}
                <path
                  d="M 40 45 L 80 45 L 90 70 L 30 70 Z"
                  fill={lampOn ? "#fef08a" : "#2a2a2a"}
                  stroke="#444"
                  strokeWidth="1.5"
                  className="transition-colors duration-300"
                />
                {/* Lamp Neck */}
                <path d="M 60 45 L 60 25 Q 60 15 70 15 L 80 15" stroke="#666" strokeWidth="2.5" fill="none" />
                <path d="M 80 15 L 80 85" stroke="#555" strokeWidth="2.5" fill="none" />
                {/* Lamp Base */}
                <ellipse cx="80" cy="88" rx="22" ry="7" fill="#1c1c1c" stroke="#444" strokeWidth="1.5" />
              </svg>

              {/* Lamp Controls */}
              <div className="mt-4 flex items-center gap-4 bg-[#181818] border border-[#2e2e2e] rounded-md px-3 py-1.5 font-mono text-[11px] text-[#b7b7b7] z-10">
                <button
                  type="button"
                  onClick={() => setLampOn(!lampOn)}
                  className="rounded border border-[#363636] bg-[#242424] px-2 py-0.5 text-[10px] text-[#ededed] hover:bg-[#303030] transition-colors"
                >
                  {lampOn ? "SWITCH [OFF]" : "SWITCH [ON]"}
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-[#6e6e6e]">DIM:</span>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={intensity}
                    disabled={!lampOn}
                    onChange={(e) => setIntensity(Number(e.target.value))}
                    className="w-20 accent-amber-400 cursor-pointer disabled:opacity-30"
                  />
                </div>
              </div>
            </div>
          </div>
        </figure>
      </div>

      {/* Book List in .k-rows matching kinfish.dev */}
      <section className="mt-16">
        <div className="k-rule-b flex min-h-10 items-center justify-between gap-4">
          <h2 className="k-label flex gap-1.5">
            <span className="text-[#6e6e6e]">SHELF</span>
            <span aria-hidden="true" className="text-[#4a4a4a]">/</span>
            <span className="text-[#ededed]">Finished &amp; Core Texts ({books.length})</span>
          </h2>
          <span className="k-label text-[#6e6e6e]">First-Principles Readings</span>
        </div>

        <ul className="k-rows">
          {books.map((book) => (
            <li key={book.title} className="py-4">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <span className="text-[15px] font-medium text-[#ededed]">
                  {book.title}
                </span>
                <span className="font-mono text-[11px] text-[#6e6e6e]">
                  {book.author} · {book.year}
                </span>
              </div>

              <blockquote className="mt-2 text-[13px] italic leading-relaxed text-[#b7b7b7] border-l border-[#3a3a3a] pl-3">
                &ldquo;{book.quote}&rdquo;
              </blockquote>

              <p className="mt-2 max-w-[62ch] text-[13px] leading-relaxed text-[#929292]">
                {book.takeaway}
              </p>

              <div className="mt-2.5 flex items-center gap-2">
                <span className="k-chip">{book.genre}</span>
                <span className="font-mono text-[10.5px] text-[#6e6e6e]">
                  {book.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
