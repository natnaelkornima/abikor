export interface Article {
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  featured: boolean;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  techStack: string[];
  metrics: string;
  github: string;
  flow: string[];
}

export interface SkillSet {
  index: string;
  title: string;
  count: string;
  description: string;
  skills: string[];
}

export interface ArchitectureLayer {
  step: string;
  layer: string;
  tech: string;
  metric: string;
  detail: string;
}

export interface ArchitectureFlow {
  id: string;
  name: string;
  spec: string;
  layers: ArchitectureLayer[];
}

export interface Book {
  title: string;
  author: string;
  year: string;
  genre: string;
  quote: string;
  takeaway: string;
  status: "Completed" | "Reading";
}

export interface Track {
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: string;
  year: string;
  note: string;
  spotifyUrl?: string;
}

export interface Painting {
  id: string;
  title: string;
  artist?: string;
  url: string;
  year: string;
  tag: string;
  medium: string;
  description: string;
  aspect?: string;
  tone?: string;
  location?: string;
}

export type Pic = Painting;

export interface Experience {
  period: string;
  role: string;
  entity: string;
  location: string;
  summary: string;
  highlights: string[];
}

export interface PortfolioData {
  profile: {
    name: string;
    brand: string;
    domain: string;
    roleIndex: string;
    roleTitle: string;
    location: string;
    status: string;
    bio: string[];
    stats: { value: string; label: string; detail: string }[];
    contact: {
      email: string;
      github: string;
      linkedin: string;
      cvUrl: string;
    };
  };
  articles: Article[];
  projects: Project[];
  sets: SkillSet[];
  architectures: Record<string, ArchitectureFlow>;
  principles: { title: string; description: string }[];
  exploring: string[];
  books: Book[];
  playlists: Track[];
  paintings: Painting[];
  pics: Painting[];
  experience: Experience[];
}

export const portfolio: PortfolioData = {
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
      cvUrl: "/assets/Natnael_Kornima_CV.pdf"
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
  ],

  books: [
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      year: "2017",
      genre: "Distributed Systems",
      quote: "Reliability is continuing to work correctly, even when things go wrong.",
      takeaway: "The canonical guide to replication, partitioning, transactions, and consensus in distributed data systems.",
      status: "Completed"
    },
    {
      title: "Clean Architecture",
      author: "Robert C. Martin",
      year: "2017",
      genre: "Software Design",
      quote: "The goal of software architecture is to minimize the human resources required to build and maintain the required system.",
      takeaway: "Hexagonal boundaries, dependency inversion, and separation of business rules from frameworks.",
      status: "Completed"
    },
    {
      title: "Site Reliability Engineering",
      author: "Betsy Beyer, Chris Jones, Niall Murphy",
      year: "2016",
      genre: "Systems Engineering",
      quote: "Hope is not a strategy.",
      takeaway: "Eliminating toil, defining SLOs/SLAs, error budgets, and resilient post-mortem culture.",
      status: "Completed"
    },
    {
      title: "The Pragmatic Programmer",
      author: "David Thomas & Andrew Hunt",
      year: "2019",
      genre: "Engineering Craft",
      quote: "Care about your craft. Why spend your life developing software unless you care about doing it well?",
      takeaway: "Orthogonality, tracer bullets, broken windows theory, and pragmatic engineering rigor.",
      status: "Completed"
    },
    {
      title: "Gödel, Escher, Bach: An Eternal Golden Braid",
      author: "Douglas Hofstadter",
      year: "1979",
      genre: "Cognitive Science / Math",
      quote: "Meaning lies far deeper than syntax, in the strange loops of self-reference.",
      takeaway: "Exploring recursion, formal systems, self-reference, and how intelligence arises from mechanistic rules.",
      status: "Completed"
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      year: "2018",
      genre: "Habit Formation",
      quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
      takeaway: "Systems-driven compounding: continuous 1% daily optimizations over sporadic motivation.",
      status: "Completed"
    },
    {
      title: "Meditations",
      author: "Marcus Aurelius",
      year: "180 AD",
      genre: "Stoic Philosophy",
      quote: "The impediment to action advances action. What stands in the way becomes the way.",
      takeaway: "Quiet stoic discipline, clarity under systemic pressure, and focus strictly on what is within control.",
      status: "Completed"
    },
    {
      title: "Structure and Interpretation of Computer Programs (SICP)",
      author: "Harold Abelson & Gerald Jay Sussman",
      year: "1996",
      genre: "Computer Science",
      quote: "Programs must be written for people to read, and only incidentally for machines to execute.",
      takeaway: "First-principles mental models of computational abstraction, eval/apply loops, and interpreters.",
      status: "Reading"
    }
  ],

  playlists: [
    {
      title: "Yègellé Tezeta",
      artist: "Mulatu Astatke",
      album: "Éthiopiques 4: Ethio Jazz & Musique Instrumentale",
      genre: "Ethio-Jazz",
      duration: "3:15",
      year: "1969",
      note: "Vibraphone warmth and pentatonic mode improvisation that grounds late-night distributed systems debugging."
    },
    {
      title: "Begena Meditative Rhythms",
      artist: "Alemu Aga",
      album: "The Harp of King David",
      genre: "Ethiopian Acoustic / Begena",
      duration: "5:42",
      year: "1994",
      note: "Ten-string box lyre with buzzing buzzing bridges and sub-bass resonance; zero distraction, pure contemplative flow."
    },
    {
      title: "Hailu Mergia & Dahlak Band",
      artist: "Hailu Mergia",
      album: "Wede Harer Guzo",
      genre: "Ethio-Groove / Organ",
      duration: "4:28",
      year: "1978",
      note: "Analog Farfisa organ cascades with hypnotic polyrhythmic percussion."
    },
    {
      title: "A Walk",
      artist: "Tycho",
      album: "Dive",
      genre: "Ambient Electronic / Lo-Fi",
      duration: "5:17",
      year: "2011",
      note: "Analog synthesizer layers and warm bass lines for sustained coding deep work."
    },
    {
      title: "Dayvan Cowboy",
      artist: "Boards of Canada",
      album: "The Campfire Headphase",
      genre: "IDM / Downtempo",
      duration: "5:00",
      year: "2005",
      note: "Reverberant guitars, nostalgic synth textures, and tape-flutter harmonics."
    },
    {
      title: "Photosynthesis",
      artist: "Carbon Based Lifeforms",
      album: "World of Sleepers",
      genre: "Psybient / Ambient Space",
      duration: "6:39",
      year: "2006",
      note: "Sub-bass pads and intricate sound design; prime background audio for architectural diagramming."
    }
  ],

  paintings: [
    {
      id: "pt-01",
      title: "Green Hag: Monstrous Humanoid",
      artist: "Fantasy RPG Dark Art",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890964/Green_Hag_Monstrous_Humanoid_For_Fantasy_RPGs.jpg",
      year: "2024",
      tag: "Fantasy",
      medium: "Digital Oil on Canvas",
      location: "Studio Collection",
      description: "Submerged in murky swampland shadows, a twisted crone draped in moss and ancient malice, illuminated by sickly luminescence.",
      aspect: "3/4",
      tone: "rgb(28, 36, 26)"
    },
    {
      id: "pt-02",
      title: "Solitude in Crimson & Shadow",
      artist: "Expressive Figurative",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890965/__2.jpg",
      year: "2023",
      tag: "Expressionism",
      medium: "Oil on Linen",
      location: "Studio Collection",
      description: "Deep moody impasto with striking crimson undertones capturing contemplative psychological isolation and raw emotional weight.",
      aspect: "4/5",
      tone: "rgb(42, 22, 24)"
    },
    {
      id: "pt-03",
      title: "The Somber Vigil",
      artist: "Dark Romanticism",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890964/__1.jpg",
      year: "2023",
      tag: "Classical",
      medium: "Oil on Wood Panel",
      location: "Studio Collection",
      description: "Chiaroscuro study with dramatic lighting cutting through deep earthen umbers, echoing seventeenth-century masterworks.",
      aspect: "3/4",
      tone: "rgb(32, 26, 22)"
    },
    {
      id: "pt-04",
      title: "Veil of the Unknown",
      artist: "Atmospheric Figurative",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890963/__3.jpg",
      year: "2022",
      tag: "Symbolism",
      medium: "Tempera & Glaze",
      location: "Studio Collection",
      description: "Subtle gradations of cool monochrome and misty charcoal tones, exploring enigmatic presence through soft-edged contours.",
      aspect: "4/5",
      tone: "rgb(30, 32, 34)"
    },
    {
      id: "pt-05",
      title: "The Wounded Angel (Hugo Simberg)",
      artist: "Hugo Simberg",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890964/El_Angel_Herido_-_Hugo_Simberg_Los_Hermanos_Karamazov.jpg",
      year: "1903",
      tag: "Symbolism",
      medium: "Oil on Canvas",
      location: "Ateneum Art Museum",
      description: "Hugo Simberg's legendary masterpiece of Finnish Symbolism: two stern peasant boys carrying a blindfolded, wounded angel across a barren Nordic landscape.",
      aspect: "4/3",
      tone: "rgb(44, 42, 36)"
    },
    {
      id: "pt-06",
      title: "Ascent into Twilight",
      artist: "Mythological Landscape",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890964/__6.jpg",
      year: "2024",
      tag: "Fantasy",
      medium: "Oil on Linen",
      location: "Studio Collection",
      description: "Haunting silhouettes against a dramatic atmospheric sky, evoking epic mythological journeys through untamed, twilight terrains.",
      aspect: "3/4",
      tone: "rgb(34, 28, 38)"
    },
    {
      id: "pt-07",
      title: "The Tactician's Move",
      artist: "Narrative Realism",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890963/Check_.jpg",
      year: "2023",
      tag: "Classical",
      medium: "Oil on Canvas",
      location: "Studio Collection",
      description: "A tension-filled study of calculation and intellect, balancing sharp focal clarity with rich warm interior shadows.",
      aspect: "1/1",
      tone: "rgb(36, 30, 24)"
    },
    {
      id: "pt-08",
      title: "Passage of the Wanderer",
      artist: "Northern Atmospheric",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890963/__5.jpg",
      year: "2023",
      tag: "Symbolism",
      medium: "Oil on Canvas Board",
      location: "Studio Collection",
      description: "A lone figure traversing a weathered path beneath heavy overcast clouds, contemplating destiny and transient solitude.",
      aspect: "3/4",
      tone: "rgb(28, 30, 32)"
    },
    {
      id: "pt-09",
      title: "Nocturne in Grey & Gold",
      artist: "Tonalist Study",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890963/__7.jpg",
      year: "2022",
      tag: "Expressionism",
      medium: "Oil on Paper mounted on Panel",
      location: "Studio Collection",
      description: "Tonalist balance of subdued ochre, lead white, and slate greys, capturing ephemeral dusk over quiet architectural geometry.",
      aspect: "4/5",
      tone: "rgb(36, 34, 30)"
    },
    {
      id: "pt-10",
      title: "Ethereal Echoes",
      artist: "Ethereal Portraiture",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890963/__4.jpg",
      year: "2024",
      tag: "Fantasy",
      medium: "Mixed Media & Oil Glaze",
      location: "Studio Collection",
      description: "Delicate luminous veils and spectral wisps flowing across deep obsidian blacks, bridging portraiture and dreams.",
      aspect: "3/4",
      tone: "rgb(26, 26, 30)"
    },
    {
      id: "pt-11",
      title: "Gaze of the Silent Guardian",
      artist: "Mythic Character Study",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890962/__8.jpg",
      year: "2023",
      tag: "Symbolism",
      medium: "Digital & Oil Emulsion",
      location: "Studio Collection",
      description: "Piercing eyes peering through weathered robes and shadows, imbued with ancient wisdom and unyielding fortitude.",
      aspect: "3/4",
      tone: "rgb(32, 28, 26)"
    },
    {
      id: "pt-12",
      title: "Astronomer by Candlelight",
      artist: "Gerrit Dou",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793968606/A_bright_light_is_not_necessary_a_taper_is_all_one_needs_to_live_in_strangeness_if_it_faithfully_burns__Samuel_Beckett_Malone_Dies____Astronomer_by_Candlelight_Gerrit_Dou_Dutch_1613_-_1675_Netherlands_late_1650s_Oil_on_panel.jpg",
      year: "1650s",
      tag: "Classical",
      medium: "Oil on Panel",
      location: "Netherlands",
      description: "A scholar engrossed in celestial study under the quiet illumination of a single candle taper. 'A bright light is not necessary, a taper is all one needs to live in strangeness, if it faithfully burns' — Samuel Beckett.",
      aspect: "3/4",
      tone: "rgb(28, 22, 18)"
    },
    {
      id: "pt-13",
      title: "Chambers of the Alchemist",
      artist: "Atmospheric Chiaroscuro",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793968606/__9.jpg",
      year: "2024",
      tag: "Classical",
      medium: "Oil on Linen",
      location: "Studio Collection",
      description: "Deep subterranean shadows illuminated by warm lantern glow, amidst parchment manuscripts and antique measuring instruments.",
      aspect: "4/5",
      tone: "rgb(34, 26, 20)"
    },
    {
      id: "pt-14",
      title: "The Silent Watch",
      artist: "Nocturnal Figurative",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793968606/__10.jpg",
      year: "2023",
      tag: "Symbolism",
      medium: "Oil on Canvas Board",
      location: "Studio Collection",
      description: "A contemplative nocturnal figure cast in silhouette against twilight hues, embodying quiet vigil and enduring solitude.",
      aspect: "3/4",
      tone: "rgb(26, 28, 34)"
    },
    {
      id: "pt-15",
      title: "Threshold of the Eclipse",
      artist: "Ethereal Romanticism",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793968606/__11.jpg",
      year: "2024",
      tag: "Fantasy",
      medium: "Tempera & Glaze on Wood",
      location: "Studio Collection",
      description: "Mystical horizon where radiant celestial halos meet dark mountain ridges in dramatic chiaroscuro counterpoint.",
      aspect: "4/5",
      tone: "rgb(36, 28, 30)"
    },
    {
      id: "pt-16",
      title: "The Weaver of Mist",
      artist: "Mythic Symbolism",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793968606/__12.jpg",
      year: "2023",
      tag: "Symbolism",
      medium: "Oil & Pigment Emulsion",
      location: "Studio Collection",
      description: "Veiled presence emerging from drifting charcoal fog, balancing ethereal transparency with rich earthy undertones.",
      aspect: "3/4",
      tone: "rgb(30, 32, 28)"
    },
    {
      id: "pt-17",
      title: "Shadows in the Basilica",
      artist: "Architectural Tonalist",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793968605/__13.jpg",
      year: "2022",
      tag: "Expressionism",
      medium: "Oil on Raw Panel",
      location: "Studio Collection",
      description: "Dramatic shafts of diffused daylight piercing ancient stone arcades, dissolving vaulted architecture into contemplative shadow.",
      aspect: "4/5",
      tone: "rgb(32, 30, 26)"
    },
    {
      id: "pt-18",
      title: "Whispers of the Deep Forest",
      artist: "Dark Romantic Landscape",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793968606/__14.jpg",
      year: "2024",
      tag: "Fantasy",
      medium: "Oil on Linen",
      location: "Studio Collection",
      description: "Dense primordial woodlands where twisted boughs frame hidden forest clearings illuminated by silvery moonlight.",
      aspect: "3/4",
      tone: "rgb(22, 28, 24)"
    },
    {
      id: "pt-19",
      title: "Portrait in Umber & Lead",
      artist: "Classical Figurative",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793968606/__15.jpg",
      year: "2023",
      tag: "Classical",
      medium: "Oil on Canvas",
      location: "Studio Collection",
      description: "Disciplined brushwork and masterful tonal economy, exploring human vulnerability through stark Caravaggesque lighting.",
      aspect: "4/5",
      tone: "rgb(38, 32, 26)"
    }
  ],
  pics: [
    {
      id: "pt-01",
      title: "Green Hag: Monstrous Humanoid",
      artist: "Fantasy RPG Dark Art",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890964/Green_Hag_Monstrous_Humanoid_For_Fantasy_RPGs.jpg",
      year: "2024",
      tag: "Fantasy",
      medium: "Digital Oil on Canvas",
      location: "Studio Collection",
      description: "Submerged in murky swampland shadows, a twisted crone draped in moss and ancient malice, illuminated by sickly luminescence.",
      aspect: "3/4",
      tone: "rgb(28, 36, 26)"
    },
    {
      id: "pt-02",
      title: "Solitude in Crimson & Shadow",
      artist: "Expressive Figurative",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890965/__2.jpg",
      year: "2023",
      tag: "Expressionism",
      medium: "Oil on Linen",
      location: "Studio Collection",
      description: "Deep moody impasto with striking crimson undertones capturing contemplative psychological isolation and raw emotional weight.",
      aspect: "4/5",
      tone: "rgb(42, 22, 24)"
    },
    {
      id: "pt-03",
      title: "The Somber Vigil",
      artist: "Dark Romanticism",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890964/__1.jpg",
      year: "2023",
      tag: "Classical",
      medium: "Oil on Wood Panel",
      location: "Studio Collection",
      description: "Chiaroscuro study with dramatic lighting cutting through deep earthen umbers, echoing seventeenth-century masterworks.",
      aspect: "3/4",
      tone: "rgb(32, 26, 22)"
    },
    {
      id: "pt-04",
      title: "Veil of the Unknown",
      artist: "Atmospheric Figurative",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890963/__3.jpg",
      year: "2022",
      tag: "Symbolism",
      medium: "Tempera & Glaze",
      location: "Studio Collection",
      description: "Subtle gradations of cool monochrome and misty charcoal tones, exploring enigmatic presence through soft-edged contours.",
      aspect: "4/5",
      tone: "rgb(30, 32, 34)"
    },
    {
      id: "pt-05",
      title: "The Wounded Angel (Hugo Simberg)",
      artist: "Hugo Simberg",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890964/El_Angel_Herido_-_Hugo_Simberg_Los_Hermanos_Karamazov.jpg",
      year: "1903",
      tag: "Symbolism",
      medium: "Oil on Canvas",
      location: "Ateneum Art Museum",
      description: "Hugo Simberg's legendary masterpiece of Finnish Symbolism: two stern peasant boys carrying a blindfolded, wounded angel across a barren Nordic landscape.",
      aspect: "4/3",
      tone: "rgb(44, 42, 36)"
    },
    {
      id: "pt-06",
      title: "Ascent into Twilight",
      artist: "Mythological Landscape",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890964/__6.jpg",
      year: "2024",
      tag: "Fantasy",
      medium: "Oil on Linen",
      location: "Studio Collection",
      description: "Haunting silhouettes against a dramatic atmospheric sky, evoking epic mythological journeys through untamed, twilight terrains.",
      aspect: "3/4",
      tone: "rgb(34, 28, 38)"
    },
    {
      id: "pt-07",
      title: "The Tactician's Move",
      artist: "Narrative Realism",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890963/Check_.jpg",
      year: "2023",
      tag: "Classical",
      medium: "Oil on Canvas",
      location: "Studio Collection",
      description: "A tension-filled study of calculation and intellect, balancing sharp focal clarity with rich warm interior shadows.",
      aspect: "1/1",
      tone: "rgb(36, 30, 24)"
    },
    {
      id: "pt-08",
      title: "Passage of the Wanderer",
      artist: "Northern Atmospheric",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890963/__5.jpg",
      year: "2023",
      tag: "Symbolism",
      medium: "Oil on Canvas Board",
      location: "Studio Collection",
      description: "A lone figure traversing a weathered path beneath heavy overcast clouds, contemplating destiny and transient solitude.",
      aspect: "3/4",
      tone: "rgb(28, 30, 32)"
    },
    {
      id: "pt-09",
      title: "Nocturne in Grey & Gold",
      artist: "Tonalist Study",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890963/__7.jpg",
      year: "2022",
      tag: "Expressionism",
      medium: "Oil on Paper mounted on Panel",
      location: "Studio Collection",
      description: "Tonalist balance of subdued ochre, lead white, and slate greys, capturing ephemeral dusk over quiet architectural geometry.",
      aspect: "4/5",
      tone: "rgb(36, 34, 30)"
    },
    {
      id: "pt-10",
      title: "Ethereal Echoes",
      artist: "Ethereal Portraiture",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890963/__4.jpg",
      year: "2024",
      tag: "Fantasy",
      medium: "Mixed Media & Oil Glaze",
      location: "Studio Collection",
      description: "Delicate luminous veils and spectral wisps flowing across deep obsidian blacks, bridging portraiture and dreams.",
      aspect: "3/4",
      tone: "rgb(26, 26, 30)"
    },
    {
      id: "pt-11",
      title: "Gaze of the Silent Guardian",
      artist: "Mythic Character Study",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793890962/__8.jpg",
      year: "2023",
      tag: "Symbolism",
      medium: "Digital & Oil Emulsion",
      location: "Studio Collection",
      description: "Piercing eyes peering through weathered robes and shadows, imbued with ancient wisdom and unyielding fortitude.",
      aspect: "3/4",
      tone: "rgb(32, 28, 26)"
    },
    {
      id: "pt-12",
      title: "Astronomer by Candlelight",
      artist: "Gerrit Dou",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793968606/A_bright_light_is_not_necessary_a_taper_is_all_one_needs_to_live_in_strangeness_if_it_faithfully_burns__Samuel_Beckett_Malone_Dies____Astronomer_by_Candlelight_Gerrit_Dou_Dutch_1613_-_1675_Netherlands_late_1650s_Oil_on_panel.jpg",
      year: "1650s",
      tag: "Classical",
      medium: "Oil on Panel",
      location: "Netherlands",
      description: "A scholar engrossed in celestial study under the quiet illumination of a single candle taper. 'A bright light is not necessary, a taper is all one needs to live in strangeness, if it faithfully burns' — Samuel Beckett.",
      aspect: "3/4",
      tone: "rgb(28, 22, 18)"
    },
    {
      id: "pt-13",
      title: "Chambers of the Alchemist",
      artist: "Atmospheric Chiaroscuro",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793968606/__9.jpg",
      year: "2024",
      tag: "Classical",
      medium: "Oil on Linen",
      location: "Studio Collection",
      description: "Deep subterranean shadows illuminated by warm lantern glow, amidst parchment manuscripts and antique measuring instruments.",
      aspect: "4/5",
      tone: "rgb(34, 26, 20)"
    },
    {
      id: "pt-14",
      title: "The Silent Watch",
      artist: "Nocturnal Figurative",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793968606/__10.jpg",
      year: "2023",
      tag: "Symbolism",
      medium: "Oil on Canvas Board",
      location: "Studio Collection",
      description: "A contemplative nocturnal figure cast in silhouette against twilight hues, embodying quiet vigil and enduring solitude.",
      aspect: "3/4",
      tone: "rgb(26, 28, 34)"
    },
    {
      id: "pt-15",
      title: "Threshold of the Eclipse",
      artist: "Ethereal Romanticism",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793968606/__11.jpg",
      year: "2024",
      tag: "Fantasy",
      medium: "Tempera & Glaze on Wood",
      location: "Studio Collection",
      description: "Mystical horizon where radiant celestial halos meet dark mountain ridges in dramatic chiaroscuro counterpoint.",
      aspect: "4/5",
      tone: "rgb(36, 28, 30)"
    },
    {
      id: "pt-16",
      title: "The Weaver of Mist",
      artist: "Mythic Symbolism",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793968606/__12.jpg",
      year: "2023",
      tag: "Symbolism",
      medium: "Oil & Pigment Emulsion",
      location: "Studio Collection",
      description: "Veiled presence emerging from drifting charcoal fog, balancing ethereal transparency with rich earthy undertones.",
      aspect: "3/4",
      tone: "rgb(30, 32, 28)"
    },
    {
      id: "pt-17",
      title: "Shadows in the Basilica",
      artist: "Architectural Tonalist",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793968605/__13.jpg",
      year: "2022",
      tag: "Expressionism",
      medium: "Oil on Raw Panel",
      location: "Studio Collection",
      description: "Dramatic shafts of diffused daylight piercing ancient stone arcades, dissolving vaulted architecture into contemplative shadow.",
      aspect: "4/5",
      tone: "rgb(32, 30, 26)"
    },
    {
      id: "pt-18",
      title: "Whispers of the Deep Forest",
      artist: "Dark Romantic Landscape",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793968606/__14.jpg",
      year: "2024",
      tag: "Fantasy",
      medium: "Oil on Linen",
      location: "Studio Collection",
      description: "Dense primordial woodlands where twisted boughs frame hidden forest clearings illuminated by silvery moonlight.",
      aspect: "3/4",
      tone: "rgb(22, 28, 24)"
    },
    {
      id: "pt-19",
      title: "Portrait in Umber & Lead",
      artist: "Classical Figurative",
      url: "https://res.cloudinary.com/sq2uzfiq/image/upload/v1793968606/__15.jpg",
      year: "2023",
      tag: "Classical",
      medium: "Oil on Canvas",
      location: "Studio Collection",
      description: "Disciplined brushwork and masterful tonal economy, exploring human vulnerability through stark Caravaggesque lighting.",
      aspect: "4/5",
      tone: "rgb(38, 32, 26)"
    }
  ],

  experience: [
    {
      period: "2024 — Present",
      role: "Lead Architect & Full-Stack Engineer",
      entity: "Nazazi Platform",
      location: "Addis Ababa, Ethiopia",
      summary: "Architected high-throughput notification and academic management infrastructure handling burst traffic and automated delivery.",
      highlights: [
        "Designed decoupled BullMQ + Redis job queues with exponential backoff and idempotent dispatch to safeguard SMS gateway limits.",
        "Engineered responsive Next.js frontend with optimistic client updates and sub-100ms API response targets."
      ]
    },
    {
      period: "2023 — 2024",
      role: "Systems & Web Audio Engineer",
      entity: "Enzira Begena LMS",
      location: "Addis Ababa, Ethiopia",
      summary: "Engineered specialized traditional music education suite featuring client-side Web Audio API interactive tuning and tempo shifting.",
      highlights: [
        "Constructed custom Web Audio API processing state machines to support precise pitch-preserving tempo adjustment for music students.",
        "Implemented progressive offline caching and local IndexedDB state management for intermittent regional connectivity."
      ]
    },
    {
      period: "2022 — 2023",
      role: "Software Engineering & Systems Research",
      entity: "Independent / Open Source",
      location: "Addis Ababa, Ethiopia",
      summary: "Researched deterministic runtime validation for LLMs, hexagonal architecture in TypeScript, and semantic vector caching.",
      highlights: [
        "Engineered NutriGenius and Neural RAG with strict schema guardrails, reducing API token costs by 60%+ through semantic Redis caching.",
        "Authored modular microservices in TypeScript and FastAPI adhering to strict ports-and-adapters architecture."
      ]
    }
  ]
};

