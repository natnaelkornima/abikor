import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Clock, Tag } from "lucide-react";
import { ARTICLES_MAP } from "@/data/articles-content";
import { ArticleAnatomyFigure } from "@/components/figures/article-anatomy-figure";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(ARTICLES_MAP).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES_MAP[slug];
  if (!article) return {};

  return {
    title: `${article.title} — Natnael Kornima`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.date,
      authors: ["Natnael Kornima"],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = ARTICLES_MAP[slug];

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-[720px] mx-auto pb-20">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <div className="k-label flex items-center gap-2">
          <Link
            href="/articles"
            className="text-[#6e6e6e] hover:text-[#ededed] transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeft className="size-3" />
            <span>Blog</span>
          </Link>
          <span aria-hidden="true" className="text-[#4a4a4a]">/</span>
          <time className="text-[#8a8a92] font-mono text-[11px] tabular-nums">
            {article.date}
          </time>
        </div>
      </nav>

      {/* Article Header */}
      <header className="space-y-4">
        <h1 className="text-[26px] sm:text-[32px] md:text-[36px] font-extrabold tracking-[-0.035em] text-[#ededed] leading-[1.18] text-balance">
          {article.title}
        </h1>

        <p className="text-[16px] sm:text-[17px] leading-relaxed text-[#b7b7b7] font-sans">
          {article.summary}
        </p>

        {/* Author & Metadata Bar */}
        <div className="pt-4 pb-2 border-y border-[#2d2d34] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative size-9 rounded-full overflow-hidden border border-[#3a3a46] bg-[#1a1a20]">
              <Image
                src="/portrait.jpg"
                alt="Natnael Kornima"
                width={36}
                height={36}
                className="object-cover grayscale contrast-125"
              />
            </div>
            <div>
              <div className="text-[13.5px] font-medium text-[#ededed] leading-tight">
                Natnael Kornima
              </div>
              <div className="text-[11px] font-mono text-[#8a8a92]">
                Software Engineer
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-[#8a8a92]">
            <span className="inline-flex items-center gap-1 k-chip">
              <Tag className="size-2.5" />
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" />
              {article.readTime}
            </span>
          </div>
        </div>
      </header>

      {/* Interactive Anatomy Isometric Figure */}
      <div className="my-10">
        <ArticleAnatomyFigure figureType={article.figureType} title={article.title} />
      </div>

      {/* Article Deep-Dive Body */}
      <div className="space-y-10 text-[15.5px] leading-[1.8] text-[#c9c9cf] font-sans" data-article-body="true">
        {/* Intro */}
        <p className="text-[17px] leading-relaxed text-[#e0e0e0] font-normal">
          {article.content.intro}
        </p>

        {/* Sections */}
        {article.content.sections.map((section, idx) => (
          <section key={section.id} id={section.id} className="space-y-4 pt-4">
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#ededed] tracking-[-0.02em] pt-2">
              <span className="font-mono text-[13px] text-[#6e6e6e] font-normal mr-2">
                0{idx + 1}.
              </span>
              {section.heading}
            </h2>

            {section.paragraphs.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}

            {section.callout && (
              <div className="my-6 border-l-2 border-[#e56b40] bg-[#1a1a20]/60 px-5 py-4 text-[#dedede] text-[14.5px] leading-relaxed rounded-r">
                <p className="italic">{section.callout}</p>
              </div>
            )}

            {section.code && (
              <div className="my-6 rounded-md border border-[#2d2d34] bg-[#101014] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 border-b border-[#24242c] bg-[#16161c] text-[11px] font-mono text-[#8a8a92]">
                  <span>{section.code.language.toUpperCase()}</span>
                  <span>IMMUTABLE SPEC</span>
                </div>
                <pre className="p-4 overflow-x-auto text-[12.5px] font-mono leading-relaxed text-[#e0e0e0]">
                  <code>{section.code.snippet}</code>
                </pre>
              </div>
            )}
          </section>
        ))}

        {/* Key Takeaways */}
        {article.content.takeaways && article.content.takeaways.length > 0 && (
          <div className="mt-12 rounded-lg border border-[#2d2d34] bg-[#16161c] p-6 space-y-4">
            <h3 className="text-[15px] font-mono uppercase tracking-wider text-[#ededed] flex items-center gap-2">
              <CheckCircle2 className="size-4 text-[#e56b40]" />
              Architectural Takeaways
            </h3>
            <ul className="space-y-3 pt-2">
              {article.content.takeaways.map((takeaway, tIdx) => (
                <li key={tIdx} className="flex items-start gap-3 text-[14px] leading-relaxed text-[#c0c0c6]">
                  <span className="font-mono text-[11px] text-[#e56b40] mt-1 shrink-0">
                    0{tIdx + 1} /
                  </span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Conclusion */}
        <section className="space-y-4 pt-4 border-t border-[#24242c]">
          <h2 className="text-[19px] font-bold text-[#ededed]">Conclusion</h2>
          <p>{article.content.conclusion}</p>
        </section>
      </div>

      {/* Footer Navigation */}
      <footer className="mt-16 pt-8 border-t border-[#2d2d34] flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 px-4 py-2.5 text-[12px] font-mono uppercase tracking-wider text-[#ededed] border border-[#2d2d34] bg-[#18181f] hover:bg-[#23232c] hover:border-[#4a4a56] transition-colors rounded-sm"
        >
          <ArrowLeft className="size-3.5" />
          <span>All posts</span>
        </Link>

        <a
          href="https://github.com/natnaelkornima"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[12.5px] font-mono text-[#8a8a92] hover:text-[#ededed] transition-colors"
        >
          <span>Discuss on GitHub</span>
          <ArrowUpRight className="size-3.5" />
        </a>
      </footer>
    </article>
  );
}

