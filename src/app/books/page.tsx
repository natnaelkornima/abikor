import React from "react";
import { portfolio } from "@/data/portfolio";
import { DeskLampFigure } from "@/components/figures/desk-lamp-figure";

export default function BooksPage() {
  const { books } = portfolio;

  return (
    <div>
      <header className="grid items-start gap-10">
        <div>
          <p className="k-label">
            <span className="text-[#6e6e6e]">02</span>
            <span aria-hidden="true" className="mx-1.5 text-[#4a4a4a]">/</span>
            <span>Books</span>
          </p>
          <h1 className="mt-3 text-[26px] sm:text-[30px] font-extrabold tracking-[-0.035em] text-[#ededed]">
            Books I&#39;ve read
          </h1>
          <div className="mt-4 max-w-[60ch] font-sans space-y-4 leading-7 text-[#b7b7b7]">
            My favorite hobby away from the keyboard, and an architectural insight or line from each book that stayed with me.
          </div>
        </div>
      </header>

      {/* Crafted Isometric Desk Lamp Figure from Anatomy Kit */}
      <div className="mt-10">
        <DeskLampFigure />
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
          {books.map((book) => {
            const slug =
              "book-" +
              book.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            return (
              <li key={book.title} id={slug} className="py-4 transition-colors">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <span className="font-serif-regular text-[15.5px] font-medium text-[#ededed]">
                    {book.title}
                  </span>
                  <span className="font-mono text-[11px] text-[#6e6e6e]">
                    {book.author} · {book.year}
                  </span>
                </div>

                <blockquote className="mt-2 font-serif text-[13.5px] italic leading-relaxed text-[#b7b7b7] border-l border-[#3a3a3a] pl-3">
                  &ldquo;{book.quote}&rdquo;
                </blockquote>

                <p className="mt-2 max-w-[62ch] font-sans text-[13px] leading-relaxed text-[#929292]">
                  {book.takeaway}
                </p>

                <div className="mt-2.5 flex items-center gap-2">
                  <span className="k-chip">{book.genre}</span>
                  <span className="font-mono text-[10.5px] text-[#6e6e6e]">
                    {book.status}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

