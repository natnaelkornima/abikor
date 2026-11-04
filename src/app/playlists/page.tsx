"use client";

import React, { useState } from "react";
import { portfolio } from "@/data/portfolio";
import { Play, Pause, SkipForward, SkipBack, Disc } from "lucide-react";

export default function PlaylistsPage() {
  const { playlists } = portfolio;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = playlists[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % playlists.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + playlists.length) % playlists.length);
  };

  return (
    <div>
      <header className="grid items-start gap-10">
        <div>
          <p className="k-label">
            <span className="text-[#6e6e6e]">03</span>
            <span aria-hidden="true" className="mx-1.5 text-[#4a4a4a]">/</span>
            <span>Playlists</span>
          </p>
          <h1 className="mt-3 text-2xl font-medium tracking-[-0.025em] text-[#ededed]">
            On repeat
          </h1>
          <div className="mt-4 max-w-[60ch] space-y-4 leading-7 text-[#b7b7b7]">
            The acoustic textures, Ethio-jazz improvisation, and meditative frequencies I keep in rotation during systems engineering sessions.
          </div>
        </div>
      </header>

      {/* Cassette Deck Isometric Player Widget */}
      <div className="mt-10">
        <figure className="k-iso">
          <div className="k-iso__bar">
            <span>Cassette Deck // Stereo Hi-Fi</span>
            <span className="text-[#6e6e6e]">
              KORNIMA · 03 · {isPlaying ? "PLAYING" : "STOP"}
            </span>
          </div>
          <div className="k-iso__stage flex flex-col items-center justify-center py-8">
            <div className="w-full max-w-md rounded-lg border border-[#383838] bg-[#1a1a1a] p-5 shadow-2xl">
              {/* Tape Housing */}
              <div className="rounded border border-[#262626] bg-[#121212] p-4">
                <div className="flex items-center justify-between border-b border-[#222] pb-2 text-[10px] font-mono text-[#6e6e6e]">
                  <span>SIDE A // 60 MIN</span>
                  <span className="text-teal-400 font-bold">{currentTrack.genre}</span>
                </div>

                {/* Cassette Reels Window */}
                <div className="my-4 flex items-center justify-center gap-8 rounded bg-[#1c1c1c] py-4 border border-[#2b2b2b]">
                  {/* Left Spool */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-[#555] bg-[#222] ${
                      isPlaying ? "animate-spin" : ""
                    }`}
                    style={{ animationDuration: "3s" }}
                  >
                    <div className="h-4 w-4 rounded-full bg-[#151515] border border-[#444]" />
                  </div>

                  {/* Tape Label Window */}
                  <div className="text-center font-mono select-none">
                    <div className="text-[11px] font-medium text-[#ededed] truncate max-w-[140px]">
                      {currentTrack.title}
                    </div>
                    <div className="text-[10px] text-[#6e6e6e]">
                      {currentTrack.artist}
                    </div>
                  </div>

                  {/* Right Spool */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-[#555] bg-[#222] ${
                      isPlaying ? "animate-spin" : ""
                    }`}
                    style={{ animationDuration: "3s" }}
                  >
                    <div className="h-4 w-4 rounded-full bg-[#151515] border border-[#444]" />
                  </div>
                </div>

                {/* Counter & Status */}
                <div className="flex items-center justify-between font-mono text-[10.5px] text-[#777]">
                  <span className="text-[#ededed]">TAPE COUNTER: 0{currentIdx + 1}:42</span>
                  <span>{currentTrack.duration}</span>
                </div>
              </div>

              {/* Tape Transport Buttons */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="rounded border border-[#333] bg-[#222] p-2 text-[#ededed] hover:bg-[#2c2c2c] transition-colors"
                  aria-label="Previous track"
                >
                  <SkipBack className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-1.5 rounded border border-white/20 bg-[#ededed] px-4 py-1.5 font-mono text-[11px] font-medium text-black hover:bg-white transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="size-3.5 fill-current" /> PAUSE
                    </>
                  ) : (
                    <>
                      <Play className="size-3.5 fill-current" /> PLAY
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="rounded border border-[#333] bg-[#222] p-2 text-[#ededed] hover:bg-[#2c2c2c] transition-colors"
                  aria-label="Next track"
                >
                  <SkipForward className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </figure>
      </div>

      {/* Track List in .k-rows matching kinfish.dev */}
      <section className="mt-16">
        <div className="k-rule-b flex min-h-10 items-center justify-between gap-4">
          <h2 className="k-label flex gap-1.5">
            <span className="text-[#6e6e6e]">TRACKS</span>
            <span aria-hidden="true" className="text-[#4a4a4a]">/</span>
            <span className="text-[#ededed]">Heavy Rotation ({playlists.length})</span>
          </h2>
          <span className="k-label text-[#6e6e6e]">Acoustics &amp; Ethio-Jazz</span>
        </div>

        <ul className="k-rows">
          {playlists.map((track, idx) => {
            const isCurrent = idx === currentIdx;
            return (
              <li
                key={track.title}
                onClick={() => {
                  setCurrentIdx(idx);
                  setIsPlaying(true);
                }}
                className={`py-3.5 transition-colors duration-150 cursor-pointer ${
                  isCurrent ? "bg-white/[0.03]" : "hover:bg-white/[0.015]"
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="inline-flex items-center gap-2 text-[15px] font-medium text-[#ededed]">
                    {isCurrent && isPlaying ? (
                      <Disc className="size-3.5 text-teal-400 animate-spin" />
                    ) : (
                      <span className="font-mono text-[11px] text-[#6e6e6e]">
                        0{idx + 1}
                      </span>
                    )}
                    <span className="decoration-[#525252] underline-offset-4 hover:underline">
                      {track.title}
                    </span>
                  </span>
                  <span className="font-mono text-[11px] text-[#6e6e6e]">
                    {track.duration}
                  </span>
                </div>

                <div className="mt-1 flex items-center justify-between text-[13px] text-[#929292]">
                  <span>
                    {track.artist} · <em className="text-[#777] not-italic">{track.album}</em>
                  </span>
                  <span className="font-mono text-[10px] text-[#6e6e6e]">
                    {track.year}
                  </span>
                </div>

                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#7e7e7e]">
                  {track.note}
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

