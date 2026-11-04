import type { Metadata } from "next";
import "./globals.css";
import { LiveWire } from "@/components/live-wire";

export const metadata: Metadata = {
  title: "Natnael Kornima — Full-Stack Engineer & Systems Builder",
  description:
    "Natnael Kornima, Full-Stack Engineer & Systems Builder. Building scalable web platforms, distributed backend services, and deterministic AI systems.",
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": "/index.md",
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
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#151515] text-[#ededed] antialiased">
        <div className="mx-auto flex min-h-screen max-w-[712px] flex-col px-4 pt-6 sm:pt-12">
          {children}
        </div>
        <LiveWire />
      </body>
    </html>
  );
}

