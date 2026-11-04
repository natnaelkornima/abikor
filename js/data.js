/**
 * Natnael Kornima — Portfolio Data & Structured Knowledge Graph
 * High-craft portfolio data modeled after kinfish.dev minimalist brutalism.
 */

export const portfolio = {
  profile: {
    name: "Natnael Kornima",
    brand: "Natnael",
    domain: ".dev",
    roleIndex: "00",
    roleTitle: "Full-Stack Engineer & Systems Builder",
    location: "Addis Ababa / Remote",
    status: "Available for roles",
    bio: [
      "I'm a full-stack engineer and systems builder. I design and engineer scalable web applications, robust distributed backends, and AI-assisted workflows. Bridging thoughtful client-side ergonomics with reliable, deterministic backend infrastructure.",
      "I approach software development with an engineering mindset grounded in first principles: understanding the problem deeply, choosing the appropriate architectural constraints, and building software that is maintainable, performant, and resilient under load."
    ],
    stats: [
      { value: "26+", label: "Public Repositories", detail: "Active on GitHub" },
      { value: "TS · Python · Node", label: "Core Stack", detail: "Distributed & Web" },
      { value: "Sub-45ms", label: "P99 Latency Goal", detail: "RAG & API Pipelines" }
    ],
    contact: {
      email: "natnaelkornima78@gmail.com",
      github: "https://github.com/natnaelkornima",
      linkedin: "https://linkedin.com/in/natnaelkornima",
      cvUrl: "assets/Natnael_Kornima_CV.pdf"
    }
  },

  articles: [
    {
      title: "Decoupling Ingestion from Delivery: Architecture of High-Throughput SMS Gateways",
      slug: "decoupling-sms-gateways",
      date: "Oct 28, 2026",
      readTime: "7 min read",
      category: "Systems",
      summary: "How we decoupled Fastify API ingestion from asynchronous BullMQ/Redis workers to guarantee sub-100ms response times during high-volume institutional broadcasts."
    },
    {
      title: "Deterministic Over Clever: Why Strict Schema Guardrails Matter in LLM Systems",
      slug: "deterministic-schema-guardrails",
      date: "Sep 22, 2026",
      readTime: "9 min read",
      category: "AI & ML",
      summary: "Treating language models as probabilistic microservices. Implementing runtime Pydantic validation, self-correcting prompt retries, and zero-hallucination pipelines."
    },
    {
      title: "Audio Synchronization at the Edge with the Web Audio API",
      slug: "web-audio-api-edge",
      date: "Aug 14, 2026",
      readTime: "6 min read",
      category: "Frontend",
      summary: "Building zero-latency tempo shifting and loop controls for indigenous acoustic music pedagogy without pitch degradation."
    },
    {
      title: "Hexagonal Architecture in TypeScript: Ports and Adapters in Practice",
      slug: "hexagonal-architecture-typescript",
      date: "Jul 05, 2026",
      readTime: "8 min read",
      category: "Architecture",
      summary: "Structuring production Node.js services with strict dependency inversion, domain invariants, and interchangeable database drivers."
    },
    {
      title: "Reciprocal Rank Fusion and Semantic Caching in Modern RAG Pipelines",
      slug: "rrf-semantic-caching-rag",
      date: "May 19, 2026",
      readTime: "10 min read",
      category: "AI & ML",
      summary: "Combining sparse BM25 keyword matching with dense Qdrant vector retrieval, cross-encoder reranking, and Redis semantic caching."
    }
  ],

  projects: [
    {
      id: "nazazi",
      title: "Nazazi SMS & School Management Platform",
      role: "Lead Architect",
      featured: true,
      tagline: "High-throughput communication and institutional management suite.",
      description: "An integrated School Information System (SIS) paired with an automated, high-deliverability SMS dispatch and notification gateway.",
      problem: "Educational institutions require instant, reliable communication with thousands of guardians simultaneously, often facing throttled SMS APIs, failed deliveries, and fragmented student record tracking.",
      solution: "Architected a decoupled event-driven notification queue with BullMQ and Redis that handles burst traffic, automatic exponential retries, delivery webhook reconciliations, and role-based student record administration.",
      techStack: ["TypeScript", "Next.js", "Node.js", "Fastify", "PostgreSQL", "Redis", "BullMQ"],
      metrics: "Sub-100ms Ingestion · Zero Duplicate Dispatches",
      github: "https://github.com/natnaelkornima/nazazi",
      flow: ["Ingest API (Fastify)", "BullMQ / Redis Queue", "Postgres Idempotency Check", "Telco SMS Gateway"]
    },
    {
      id: "enzira-lms",
      title: "Enzira Begena E-Learning Platform",
      role: "Creator",
      featured: true,
      tagline: "Dedicated cultural music curriculum & multimedia streaming platform.",
      description: "A bespoke Learning Management System designed specifically for indigenous acoustic instrument education with interactive notation, audio analysis, and progress tracking.",
      problem: "Traditional LMS templates fail to cater to specialized non-Western musical structures and acoustic pedagogy, lacking responsive audio-visual synchronization and nuanced milestone evaluations.",
      solution: "Built a customized web platform featuring modular lesson sequences, interactive fretboard/string visualizations, responsive multimedia streaming, and structured instructor review workflows.",
      techStack: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Web Audio API"],
      metrics: "Low Latency Audio · Progressive Offline Caching",
      github: "https://github.com/natnaelkornima/Enzira_begena_LMS",
      flow: ["Web Audio API Engine", "Interactive Notation State", "Video Buffer Stream", "Relational Curriculum DB"]
    },
    {
      id: "nutrigenius",
      title: "NutriGenius AI Dietary Intelligence",
      role: "Creator",
      featured: true,
      tagline: "Context-aware nutritional analysis engine using structured LLM reasoning.",
      description: "An AI-powered nutritional advisory application that parses unstructured meal records and generates personalized dietary breakdowns with clinical constraint checking.",
      problem: "Most nutritional apps require tedious manual ingredient weighing and static lookup tables that fail on complex cultural dishes and contextual dietary restrictions.",
      solution: "Developed an ingestion pipeline that translates natural language meal descriptions into structured nutritional JSON schemas using few-shot prompt chaining, calibrated against nutritional databases.",
      techStack: ["Python", "FastAPI", "JavaScript", "LangChain / LLM APIs", "NumPy", "Tailwind CSS"],
      metrics: "Deterministic Output · Grounded Context Verification",
      github: "https://github.com/natnaelkornima/NutriGenius",
      flow: ["Natural Language Ingest", "Context & Vector Grounding", "LLM Reasoning Core", "Pydantic Schema Guardrails"]
    },
    {
      id: "rag-guardrails",
      title: "Neural RAG & Vector Guardrails",
      role: "Creator",
      featured: true,
      tagline: "Deterministic semantic search with Pydantic verification and reranking.",
      description: "A production-grade Retrieval-Augmented Generation (RAG) pipeline utilizing hybrid dense/sparse embeddings, semantic cross-encoder reranking, and deterministic schema enforcement.",
      problem: "Unconstrained LLM retrieval applications suffer from context hallucinations, noisy vector hits, and invalid schema formatting in downstream distributed systems.",
      solution: "Built an asynchronous Python & FastAPI pipeline integrating Qdrant vector indexing, reciprocal rank fusion (RRF), semantic caching in Redis, and strict Pydantic parsing guards.",
      techStack: ["Python", "FastAPI", "Qdrant", "Redis", "LangChain", "Pydantic"],
      metrics: "Sub-45ms Retrieval · 60%+ Cost Reduction",
      github: "https://github.com/natnaelkornima",
      flow: ["Natural Language Query", "Hybrid Vector & BM25 Index", "Cross-Encoder Reranker", "Pydantic Schema Guardrails"]
    },
    {
      id: "gerima",
      title: "Gerima Application Architecture",
      role: "Creator",
      featured: false,
      tagline: "Modular TypeScript service foundation for secure data operations.",
      description: "A structured full-stack TypeScript application implementing clean hexagonal architecture, strict authentication layers, and relational storage patterns.",
      problem: "Fast-growing projects frequently suffer from architectural drift and leaky abstraction layers between persistence and transport domains.",
      solution: "Built a production-grade template with clean separation of domain entities, repository interfaces, controller validation, and automated contract tests.",
      techStack: ["TypeScript", "Node.js", "Express", "PostgreSQL", "Jest"],
      metrics: "Hexagonal Architecture · 100% Contract Test Suite",
      github: "https://github.com/natnaelkornima/Gerima",
      flow: ["Domain Invariant Core", "Port & Adapter Layer", "Repository Data Driver", "JWT Security Shield"]
    },
    {
      id: "enzira-fast-track",
      title: "Enzira Fast Track Interactive",
      role: "Creator",
      featured: false,
      tagline: "Lightweight, responsive curriculum runner with low latency.",
      description: "An optimized frontend application focusing on rapid onboarding, streamlined lesson access, and client-side performance.",
      problem: "Learners in regions with intermittent mobile connectivity experience drop-offs due to bloated client bundles.",
      solution: "Constructed an ultra-lean client application with optimistic UI updates, aggressive client-side caching, and minimal runtime overhead.",
      techStack: ["JavaScript", "HTML5", "CSS3", "Service Workers", "IndexedDB"],
      metrics: "< 45KB Initial Payload · Full Offline Capability",
      github: "https://github.com/natnaelkornima/Enzira_fast_track",
      flow: ["Service Worker Cache", "Optimistic State Engine", "IndexedDB Offline Store", "Lightweight DOM Runner"]
    }
  ],

  sets: [
    {
      index: "01",
      title: "Client Architecture & Web",
      count: "6 TECHS",
      description: "Constructing accessible, resilient, and responsive client architectures with strict typography and low perceptual latency.",
      skills: ["TypeScript", "JavaScript (ESNext)", "React", "Next.js", "Tailwind CSS", "HTML5 & CSS3"]
    },
    {
      index: "02",
      title: "Distributed Services & Systems",
      count: "6 TECHS",
      description: "Designing deterministic APIs, high-throughput message brokers, and relational data layers with strict ACID compliance.",
      skills: ["Node.js", "Fastify / Express", "Python & FastAPI", "PostgreSQL", "Redis & BullMQ", "Auth & Security (JWT)"]
    },
    {
      index: "03",
      title: "Machine Intelligence & RAG",
      count: "5 TECHS",
      description: "Engineering robust guardrails and vector retrieval systems around non-deterministic language models.",
      skills: ["Python Scientific (NumPy/Pandas)", "PyTorch", "Transformers", "LLM Orchestration & APIs", "Qdrant & Vector RAG"]
    },
    {
      index: "04",
      title: "DevOps & Infrastructure",
      count: "4 TECHS",
      description: "Automated delivery pipelines, immutable containerization, and robust Linux environment orchestration.",
      skills: ["Linux & Shell Scripting", "Docker & Containers", "Git & Version Control", "CI/CD & Cloud Deploy"]
    }
  ],

  architectures: {
    web: {
      id: "web",
      name: "Distributed Web Architecture",
      spec: "FLOW: HIGH-CONCURRENCY WEB // P99 < 35MS",
      layers: [
        {
          step: "01 // EDGE",
          layer: "Client & Edge Layer",
          tech: "Next.js / TypeScript / Service Workers",
          metric: "CACHE 98%",
          detail: "Edge routing, optimistic UI updates, static asset caching, and progressive hydration."
        },
        {
          step: "02 // GATEWAY",
          layer: "API Gateway & Security",
          tech: "Fastify / Node.js / Reverse Proxy",
          metric: "JWT & RATE-LIMIT",
          detail: "Sub-millisecond routing, JWT verification, rate limiting, and request sanitization."
        },
        {
          step: "03 // QUEUES",
          layer: "Application Logic & Queues",
          tech: "Fastify Services + BullMQ / Redis",
          metric: "ASYNC CONCURRENCY",
          detail: "Decoupled background workers, idempotent job execution, and webhook reconciliation."
        },
        {
          step: "04 // PERSISTENCE",
          layer: "Data Persistence & Caching",
          tech: "PostgreSQL + Redis Cluster",
          metric: "ACID GUARANTEED",
          detail: "Normalized schemas, indexed query planning, read-replicas, and pub/sub caching."
        }
      ]
    },
    ai: {
      id: "ai",
      name: "Deterministic AI & RAG Pipeline",
      spec: "FLOW: DETERMINISTIC RAG // ZERO-HALLUCINATION",
      layers: [
        {
          step: "01 // SANITIZE",
          layer: "Input Sanitization & Gate",
          tech: "Python / FastAPI Middleware",
          metric: "FIREWALL PASS",
          detail: "Token boundary checks, prompt injection mitigation, and request schema parsing."
        },
        {
          step: "02 // RETRIEVAL",
          layer: "Context Retrieval (RAG)",
          tech: "Qdrant / Dense-Sparse Embeddings",
          metric: "RECIPROCAL RANK FUSION",
          detail: "Hybrid dense semantic search combined with BM25 keyword matching and cross-encoder reranking."
        },
        {
          step: "03 // INFERENCE",
          layer: "Model Reasoning Core",
          tech: "LLM APIs / Local Quantized Models",
          metric: "STRUCTURED JSON",
          detail: "Few-shot conditioned prompts, system role constraints, and structured output formatting."
        },
        {
          step: "04 // GUARDRAIL",
          layer: "Deterministic Validation",
          tech: "Pydantic / Runtime Fences",
          metric: "STRICT RUNTIME FENCE",
          detail: "Strict Pydantic JSON schema verification, self-correcting retry prompts, and graceful fallbacks."
        }
      ]
    }
  },

  principles: [
    {
      title: "Deterministic Over Clever",
      description: "Code should be predictable, observable, and easy to reason about. Explicit architecture beats implicit magic every time."
    },
    {
      title: "End-to-End Ownership",
      description: "From data modeling and indexing in PostgreSQL to client-side bundle budgets and perceptual latency on low-bandwidth networks."
    },
    {
      title: "Pragmatic AI Integration",
      description: "Treating LLMs and neural models as probabilistic microservices that require strict schema validation, caching, and fallback guarantees."
    }
  ],

  exploring: [
    "Distributed event streaming & CDC pipelines",
    "Local model quantization & Edge inference (ONNX / vLLM)",
    "Advanced vector search indexing & hybrid sparse-dense retrieval",
    "Rust for performance-critical systems microservices"
  ]
};

