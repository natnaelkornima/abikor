# Natnael Kornima — Personal Portfolio

> **Full-Stack Engineer & Systems Builder**  
> Modern, minimalist, brutalist developer portfolio built with **Next.js (App Router)**, **Tailwind CSS**, and **shadcn/ui**, reverse-engineered with the high-craft design system of [`kinfish.dev`](https://www.kinfish.dev/).

---

## 🎨 Tech Stack & Architecture

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19, Server & Client Components)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design tokens (`--k-*`)
- **Component Primitives**: [shadcn/ui](https://ui.shadcn.com/) (`Button`, `Badge`, `Dialog` drawer)
- **Typography**: Original **Geist Sans** & **Geist Mono** variable webfonts
- **Interactive Features**:
  - **Live Wire HUD (`k-lw`)**: Precision cursor reticle and SVG dynamic wire targeting interactive elements
  - **Project Deep-Dive Drawer**: Clickable inspection modal with problem, solution, schematic flow, and metrics
  - **Systems Architecture Flow (`k-iso`)**: Interactive blueprint stage for Web and AI RAG pipelines
  - **One-Click Email Copy**: Instant clipboard copy with floating feedback toast
  - **Agent Markdown Alternate**: Available at `/index.md` for LLM and coding agent indexing

---

## 📁 Project Structure

```
New Portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with Geist fonts & Live Wire HUD
│   │   ├── page.tsx           # Home page with all sections (00 to 05)
│   │   └── globals.css        # Tailwind imports & brutalist custom tokens
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx     # shadcn Button with brutalist variants
│   │   │   ├── badge.tsx      # shadcn Badge with k-chip styling
│   │   │   ├── dialog.tsx     # shadcn Dialog modal
│   │   │   └── slot.tsx       # Polymorphic Slot component
│   │   ├── live-wire.tsx      # Client Live Wire cursor reticle HUD
│   │   ├── architecture-stage.tsx # Interactive architecture blueprint
│   │   ├── project-modal.tsx  # Project list & deep-dive drawer
│   │   └── copy-email-button.tsx # Clipboard feedback button & toast
│   ├── data/
│   │   └── portfolio.ts       # Typed dataset (Projects, Sets, Articles, Bio)
│   └── lib/
│       ├── utils.ts           # shadcn cn() utility
│       └── cva.ts             # Lightweight class-variance-authority implementation
├── public/
│   ├── assets/
│   │   ├── fonts/             # Geist Sans & Mono woff2
│   │   ├── Natnael_Kornima_CV.pdf # Curriculum Vitae
│   │   └── *.jpeg / *.png     # Project media assets
│   └── index.md               # Agent-friendly markdown alternative
├── components.json            # shadcn/ui configuration
├── tailwind.config.ts         # Tailwind tokens & font mapping
├── postcss.config.mjs         # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Scripts & dependencies
```

---

## 🚀 Running Locally

```bash
# Start development server on port 3000
npm run dev

# Or build and start production server
npm run build
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment

Deploy to Vercel with zero configuration:
```bash
npx vercel
```
Or push to GitHub and connect to Vercel, Netlify, or Cloudflare Pages.
