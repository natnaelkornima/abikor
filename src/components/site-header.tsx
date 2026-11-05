"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { portfolio } from "@/data/portfolio";

export function SiteHeader() {
  const pathname = usePathname();
  const { profile } = portfolio;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/articles", label: "Blog" },
    { href: "/books", label: "Books" },
    { href: "/playlists", label: "Playlists" },
    { href: "/paintings", label: "Paintings" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="k-rule-b flex items-center justify-between gap-6">
      <Link
        href="/"
        className="hidden min-h-11 items-center font-mono text-[11px] uppercase tracking-[0.08em] text-[#ededed] sm:flex select-none"
      >
        {profile.brand}
        <span className="text-[#6e6e6e]">{profile.domain}</span>
      </Link>
      <nav aria-label="Site" className="k-nav flex gap-5 sm:gap-7">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

