"use client";

import React, { useState } from "react";
import { portfolio } from "@/data/portfolio";
import { Disc } from "lucide-react";
import { CassetteFigure } from "@/components/figures/cassette-figure";

export default function PlaylistsPage() {
  const { playlists } = portfolio;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = playlists[currentIdx];

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
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
          <h1 className="mt-3 font-serif text-2xl font-medium tracking-[-0.025em] text-[#ededed]">
            On repeat
          </h1>
          <div className="mt-4 max-w-[60ch] font-sans space-y-4 leading-7 text-[#b7b7b7]">
            The acoustic textures, Ethio-jazz improvisation, and meditative frequencies I keep in rotation during systems engineering sessions.
          </div>
        </div>
      </header>

      {/* Crafted Isometric Cassette Deck Figure from Anatomy Kit */}
      <div className="mt-10">
        <CassetteFigure
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          onPrev={() => setCurrentIdx((i) => (i - 1 + playlists.length) % playlists.length)}
          onNext={() => setCurrentIdx((i) => (i + 1) % playlists.length)}
          trackTitle={currentTrack.title}
          artist={currentTrack.artist}
        />
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
                  <span className="inline-flex items-center gap-2 font-serif-regular text-[15.5px] font-medium text-[#ededed]">
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

                <div className="mt-1 flex items-center justify-between font-sans text-[13px] text-[#929292]">
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

