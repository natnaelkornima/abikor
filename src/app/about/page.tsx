import React from "react";
import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";
import { CopyEmailButton } from "@/components/copy-email-button";
import { ArrowUpRight, Github, Linkedin, ShieldCheck, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Natnael Kornima",
  description:
    "Engineering background, experience timeline, and systems philosophy of Natnael Kornima.",
};

export default function AboutPage() {
  const { profile, experience, principles } = portfolio;

  return (
    <div>
      <header className="grid items-start gap-10">
        <div>
          <p className="k-label">
            <span className="text-[#6e6e6e]">05</span>
            <span aria-hidden="true" className="mx-1.5 text-[#4a4a4a]">/</span>
            <span>About</span>
          </p>
          <h1 className="mt-3 font-serif text-2xl font-medium tracking-[-0.025em] text-[#ededed]">
            {profile.name}
          </h1>

          <ul className="k-badges mt-3" aria-label="At a glance">
            <li className="k-chip font-mono">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#ededed] shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
              {profile.status}
            </li>
            <li className="k-chip font-mono">Full-Stack &amp; Systems</li>
            <li className="k-chip font-mono">{profile.location}</li>
          </ul>

          <div className="mt-6 space-y-4 font-sans leading-7 text-[#b7b7b7]">
            <p>
              I&#39;m an Ethiopian full-stack engineer and distributed systems builder based in Addis Ababa. I design and construct reliable backend pipelines, modular TypeScript microservices, and high-performance client applications with obsessive attention to latency and fault-tolerance.
            </p>
            <p>
              Over the past years, I have architected mission-critical notification dispatch engines for school platforms (Nazazi), engineered custom Web Audio API processing state machines for traditional instruments (Enzira Begena LMS), and built deterministic verification fences around generative AI models (NutriGenius &amp; Neural RAG).
            </p>
            <p>
              I believe in simple, observable systems over convoluted abstractions. When software fails, it should fail predictably, log clear breadcrumbs, and recover without data loss.
            </p>
          </div>
        </div>
      </header>

      {/* Experience Timeline in .k-rows matching kinfish.dev */}
      <section className="mt-16">
        <div className="k-rule-b flex min-h-10 items-center justify-between gap-4">
          <h2 className="k-label flex gap-1.5">
            <span className="text-[#6e6e6e]">TIMELINE</span>
            <span aria-hidden="true" className="text-[#4a4a4a]">/</span>
            <span className="text-[#ededed]">Engineering Journey</span>
          </h2>
          <span className="k-label text-[#6e6e6e]">Roles &amp; Milestones</span>
        </div>

        <ul className="k-rows">
          {experience.map((item) => (
            <li key={item.entity} className="py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <span className="font-serif-regular text-[15.5px] font-medium text-[#ededed]">
                  {item.role} · <span className="text-[#ededed]">{item.entity}</span>
                </span>
                <span className="font-mono text-[11px] text-[#6e6e6e]">
                  {item.period}
                </span>
              </div>

              <div className="mt-1 font-mono text-[11px] text-[#888]">
                {item.location}
              </div>

              <p className="mt-2 font-sans text-[13.5px] leading-relaxed text-[#929292]">
                {item.summary}
              </p>

              <ul className="mt-3 space-y-1.5 pl-4 list-disc text-[12.5px] text-[#8e8e8e]">
                {item.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {/* Engineering Tenets */}
      <section className="mt-16">
        <div className="k-rule-b flex min-h-10 items-center justify-between gap-4">
          <h2 className="k-label flex gap-1.5">
            <span className="text-[#6e6e6e]">METHODOLOGY</span>
            <span aria-hidden="true" className="text-[#4a4a4a]">/</span>
            <span className="text-[#ededed]">How I Build</span>
          </h2>
          <span className="k-label text-[#6e6e6e]">Operating Principles</span>
        </div>

        <div className="mt-4 space-y-3">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="rounded-[6px] border border-[#2a2a2a] bg-[#1a1a1a] p-4 transition-colors duration-150 hover:border-white/15"
            >
              <h3 className="text-[14px] font-medium text-[#ededed]">
                {principle.title}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-[#929292]">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Public Verification & Keys */}
      <section className="mt-16">
        <div className="k-rule-b flex min-h-10 items-center justify-between gap-4">
          <h2 className="k-label flex gap-1.5">
            <span className="text-[#6e6e6e]">VERIFICATION</span>
            <span aria-hidden="true" className="text-[#4a4a4a]">/</span>
            <span className="text-[#ededed]">Cryptographic Identity</span>
          </h2>
          <span className="k-label text-[#6e6e6e]">Security</span>
        </div>

        <div className="mt-4 rounded-[6px] border border-[#2a2a2a] bg-[#1a1a1a] p-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#ededed] mb-2">
            <ShieldCheck className="size-4" />
            <span>GitHub Signed Commits</span>
          </div>
          <div className="text-[#888] space-y-1">
            <p>Identity: natnaelkornima (Natnael Kornima)</p>
            <p className="truncate">Key Fingerprint: ed25519 // SHA256:d8K...G9x</p>
            <p>Primary Email: {profile.contact.email}</p>
          </div>
        </div>
      </section>

      {/* Social / Connect Row */}
      <div className="k-label mt-16 flex flex-wrap gap-x-6 gap-y-2">
        <a
          href={profile.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 decoration-[#525252] underline-offset-4 hover:underline text-[#b7b7b7] hover:text-[#ededed] transition-colors"
        >
          Follow on GitHub
          <ArrowUpRight className="size-3.5 shrink-0 text-[#6e6e6e] transition-colors group-hover:text-[#ededed]" />
        </a>
        <a
          href={profile.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 decoration-[#525252] underline-offset-4 hover:underline text-[#b7b7b7] hover:text-[#ededed] transition-colors"
        >
          Connect on LinkedIn
          <ArrowUpRight className="size-3.5 shrink-0 text-[#6e6e6e] transition-colors group-hover:text-[#ededed]" />
        </a>
        <CopyEmailButton email={profile.contact.email} />
      </div>
    </div>
  );
}

