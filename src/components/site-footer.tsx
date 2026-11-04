import React from "react";
import Link from "next/link";
import { portfolio } from "@/data/portfolio";

export function SiteFooter() {
  const { profile } = portfolio;
  return (
    <footer className="k-rule-t k-label flex flex-wrap items-center justify-between gap-3 py-5 mt-16">
      <span className="flex items-center gap-1.5">
        <span>© 2026 {profile.name}</span>
        <span aria-hidden="true" className="mx-1 text-[#4a4a4a]">·</span>
        <span>Built with</span>
        <span className="font-serif-heart text-rose-400 text-sm inline-block select-none" title="Crafted with care">♥</span>
        <span>in Addis Ababa</span>
      </span>
      <span className="flex gap-5">
        <Link
          href="/feed.xml"
          className="transition-colors hover:text-[#ededed]"
        >
          RSS
        </Link>
        <a
          href={profile.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[#ededed]"
        >
          GitHub
        </a>
        <a
          href={profile.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[#ededed]"
        >
          LinkedIn
        </a>
        <a
          href={profile.contact.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-[#ededed]"
        >
          CV
        </a>
      </span>
    </footer>
  );
}

