import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Natnael Kornima — Full-Stack Engineer & Systems Builder",
  description:
    "Natnael Kornima, Full-Stack Engineer & Systems Builder. Building scalable web platforms, distributed backend services, and deterministic AI systems.",
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": "/index.md",
      "application/rss+xml": "/feed.xml",
    },
  },
  openGraph: {
    title: "Natnael Kornima — Full-Stack Engineer & Systems Builder",
    description:
      "Building scalable web platforms, distributed backend services, and deterministic AI systems from Addis Ababa / Remote.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${GeistMono.variable} font-sans text-[15px]`}
    >
      <head />
      <body className="min-h-screen bg-[#151515] text-[#ededed] font-sans antialiased">
        <a
          href="#content"
          className="fixed left-4 top-3 z-50 -translate-y-[200%] rounded-[5px] bg-[#ededed] px-3 py-2 text-black transition-transform duration-150 focus:translate-y-0"
        >
          Skip to content
        </a>
        <div className="mx-auto flex min-h-svh max-w-[712px] flex-col px-4 pt-6 sm:pt-12">
          <SiteHeader />
          <main
            id="content"
            tabIndex={-1}
            className="flex-1 pb-24 pt-12 focus:outline-none sm:pt-16"
          >
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
