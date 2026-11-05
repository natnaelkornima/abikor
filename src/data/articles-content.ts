export interface ArticleDetail {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  figureType: "queue-dispatcher" | "schema-guardrail" | "audio-synth" | "hexagonal-ports" | "rrf-retrieval";
  content: {
    intro: string;
    sections: {
      id: string;
      heading: string;
      paragraphs: string[];
      code?: {
        language: string;
        snippet: string;
      };
      callout?: string;
    }[];
    conclusion: string;
    takeaways: string[];
  };
}

export const ARTICLES_MAP: Record<string, ArticleDetail> = {
  "decoupling-sms-gateways": {
    slug: "decoupling-sms-gateways",
    title: "Decoupling Ingestion from Delivery: Architecture of High-Throughput SMS Gateways",
    date: "Oct 28, 2026",
    readTime: "7 min read",
    category: "Distributed Systems",
    summary: "How we decoupled Fastify API ingestion from asynchronous BullMQ/Redis workers to guarantee sub-100ms response times during high-volume institutional broadcasts.",
    figureType: "queue-dispatcher",
    content: {
      intro: "When you build notifications for thousands of students and guardians across an educational district, traffic does not arrive in a gentle, Poisson-distributed stream. It arrives all at once: report card distributions, emergency school closures, and scheduled attendance roll calls hit the system within a five-second window.",
      sections: [
        {
          id: "the-monolithic-trap",
          heading: "The Monolithic Trap: Synchronous Upstream HTTP Calls",
          paragraphs: [
            "In early iterations of most notification engines, an incoming HTTP request triggers database validation, formats the payload, and immediately calls the external telecom SMS vendor before returning a response to the client. This architectural pattern is a ticking time bomb.",
            "Telecom gateways are notoriously non-deterministic. Their P99 latency can swing from 200ms during off-peak hours to 18 seconds when carriers experience carrier-level throttling. When 10,000 requests hit your API simultaneously, your Node.js event loop gets starved, connection pools exhaust, and incoming requests time out at the edge gateway."
          ],
          callout: "The first rule of distributed notification systems: your client must never wait for third-party telecom carrier handshakes."
        },
        {
          id: "the-decoupled-pipeline",
          heading: "The Architecture: Two-Phase Eventual Delivery",
          paragraphs: [
            "To solve this, we decoupled the architecture into two strictly separated subsystems: an ultra-fast Ingestion Gateway and an asynchronous, backpressure-aware Worker Pool.",
            "The Ingestion Gateway runs on Fastify. Its only job is schema validation, appending an idempotent transaction log into PostgreSQL, and pushing a lightweight pointer job into Redis via BullMQ. The entire HTTP ingestion cycle completes in under 22ms, immediately returning a 202 Accepted status with a tracking UUID."
          ],
          code: {
            language: "typescript",
            snippet: `// Fastify Ingestion Route: Sub-30ms P99\nfastify.post('/v1/broadcasts', async (req, reply) => {\n  const payload = broadcastSchema.parse(req.body);\n  const broadcastId = crypto.randomUUID();\n\n  // Atomic idempotency key reservation\n  const isDuplicate = await redis.set(\`idemp:\${payload.idempotencyKey}\`, broadcastId, 'NX', 'EX', 86400);\n  if (!isDuplicate) {\n    return reply.status(409).send({ error: 'Duplicate broadcast request' });\n  }\n\n  // Push to Redis BullMQ with token-bucket rate limiting\n  await smsQueue.add('dispatch-batch', {\n    broadcastId,\n    recipients: payload.recipients,\n    template: payload.template,\n  }, {\n    attempts: 5,\n    backoff: { type: 'exponential', delay: 1000 },\n    removeOnComplete: true,\n  });\n\n  return reply.status(202).send({ status: 'queued', broadcastId });\n});`
          }
        },
        {
          id: "handling-backpressure",
          heading: "Token-Bucket Rate Limiting & Telco Backpressure",
          paragraphs: [
            "Downstream carriers enforce strict quotas—typically 50 to 100 SMS messages per second per shortcode. If your workers blast requests unrestricted, carriers will drop messages or permanently ban your binding.",
            "We implemented a Redis-backed Token Bucket algorithm. Independent worker containers consume from the queue only when tokens are available in the shared bucket. If a carrier returns an HTTP 429 Too Many Requests, the worker dynamically reduces token replenish rate, pauses the queue for a jittered backoff interval, and smoothly resumes without packet loss."
          ]
        }
      ],
      conclusion: "Decoupling ingestion from dispatch turns violent traffic spikes into a smooth, observable queue drainage process. Even if external telcos slow to a crawl, your clients never experience downtime, and your delivery guarantees remain bulletproof.",
      takeaways: [
        "Never block client HTTP lifecycles on external third-party network calls.",
        "Use atomic Redis idempotency keys to eliminate double-billing and duplicate SMS dispatches.",
        "Implement token bucket rate limiters to respect carrier backpressure and avoid throttling."
      ]
    }
  },
  "deterministic-schema-guardrails": {
    slug: "deterministic-schema-guardrails",
    title: "Deterministic Over Clever: Why Strict Schema Guardrails Matter in LLM Systems",
    date: "Sep 22, 2026",
    readTime: "9 min read",
    category: "AI & ML",
    summary: "Treating language models as probabilistic microservices. Implementing runtime Pydantic validation, self-correcting prompt retries, and zero-hallucination pipelines.",
    figureType: "schema-guardrail",
    content: {
      intro: "Building software with Large Language Models is seductive because natural language feels flexible. But in production systems, flexibility without constraints is called a bug. The difference between an AI demo and an enterprise system is determinism.",
      sections: [
        {
          id: "the-probabilistic-microservice",
          heading: "Treating the LLM as an Untrusted Foreign Microservice",
          paragraphs: [
            "A production engineer would never accept an external microservice that randomly changes JSON keys, returns markdown formatting when numbers were requested, or invents enum values out of thin air. Yet teams frequently pipe raw model outputs directly into application state.",
            "The correct mental model is to treat the LLM as an untrusted, stochastic third-party API. Every token sequence emitted must pass through a strict deterministic verification gate before entering your business logic."
          ]
        },
        {
          id: "runtime-schema-fences",
          heading: "Pin-Tumbler Validation Fences with Pydantic & Zod",
          paragraphs: [
            "We enforce schema compliance at two levels: grammar-constrained sampling at generation time (via tools or JSON mode) and runtime post-generation schema verification with Pydantic or Zod.",
            "If an output fails schema validation, the system does not crash or throw an unhandled exception. It feeds the exact parser error back to the model as an internal self-correction loop, instructing it to fix the pinpointed discrepancy."
          ],
          code: {
            language: "typescript",
            snippet: `export async function verifyAndExtract<T>(prompt: string, schema: z.ZodSchema<T>, maxRetries = 3): Promise<T> {\n  let lastError: string | null = null;\n  for (let attempt = 1; attempt <= maxRetries; attempt++) {\n    const response = await callModel({ prompt, correctionContext: lastError });\n    const parsed = schema.safeParse(response.json);\n    if (parsed.success) {\n      return parsed.data; // Strict deterministic guarantee\n    }\n    lastError = \`Schema violation on field: \${parsed.error.issues.map(i => i.path.join('.') + ': ' + i.message).join(', ')}\`;\n  }\n  throw new DeterministicValidationError('Exhausted self-correction attempts');\n}`
          }
        }
      ],
      conclusion: "When you build software around non-deterministic engines, your job is to build the deterministic cage. Strict schema validation, atomic retries, and explicit failure modes make language models dependable enterprise building blocks.",
      takeaways: [
        "Never trust raw model output strings inside relational databases or application state.",
        "Use schema parser errors to drive self-correcting validation retry loops.",
        "Enforce strict enums and boundary validations on all extracted parameters."
      ]
    }
  },
  "web-audio-api-edge": {
    slug: "web-audio-api-edge",
    title: "Audio Synchronization at the Edge with the Web Audio API",
    date: "Aug 14, 2026",
    readTime: "6 min read",
    category: "Frontend & Audio",
    summary: "Building zero-latency tempo shifting and loop controls for indigenous acoustic music pedagogy without pitch degradation.",
    figureType: "audio-synth",
    content: {
      intro: "The Begena is an ancient ten-stringed Ethiopian lyre with a deep, resonant buzz caused by leather pieces vibrating against the bridge. Replicating this nuanced acoustic behavior in a browser requires sub-millisecond precision that standard HTML5 <audio> tags cannot deliver.",
      sections: [
        {
          id: "the-timing-problem",
          heading: "The Limits of the HTML5 Audio Tag",
          paragraphs: [
            "Standard HTML5 audio elements are designed for passive playback. Attempting to loop, pitch-shift, or synchronize user fret interactions using DOM event handlers leads to noticeable jitter (often 50ms to 120ms of audio latency). For interactive musical pedagogy, human ears perceive anything over 15ms as unacceptable lag.",
            "To achieve authentic real-time responsiveness, we built our audio engine directly on the Web Audio API's AudioContext and AudioWorklet nodes."
          ]
        },
        {
          id: "audio-graph-architecture",
          heading: "The Interactive Audio Graph",
          paragraphs: [
            "The audio graph chains an AudioBufferSourceNode into a custom BiquadFilterNode to model string resonance, followed by a ConvolverNode loaded with impulse responses from traditional resonance chambers.",
            "By controlling playbackRate in conjunction with phase-vocoder time stretching algorithms, students can slow intricate string plucking down to 25% speed while preserving the instrument's exact pitch and buzz timbre."
          ]
        }
      ],
      conclusion: "The Web Audio API transforms the browser from a simple media display canvas into an interactive digital signal processing workstation capable of preserving centuries of musical tradition.",
      takeaways: [
        "Avoid HTML5 <audio> for real-time synchronization; use AudioContext hardware clocks.",
        "Implement custom impulse response convolution to replicate physical acoustic resonance chambers.",
        "Decouple audio processing onto AudioWorklet threads to prevent main thread UI lag from causing audio dropouts."
      ]
    }
  },
  "hexagonal-architecture-typescript": {
    slug: "hexagonal-architecture-typescript",
    title: "Hexagonal Architecture in TypeScript: Ports and Adapters in Practice",
    date: "Jul 05, 2026",
    readTime: "8 min read",
    category: "Software Architecture",
    summary: "Structuring production Node.js services with strict dependency inversion, domain invariants, and interchangeable database drivers.",
    figureType: "hexagonal-ports",
    content: {
      intro: "Frameworks come and go, databases get replaced, and ORMs fall out of fashion. Hexagonal Architecture (Ports and Adapters) ensures that your core business logic remains pristine and insulated from the churn of external libraries.",
      sections: [
        {
          id: "dependency-inversion",
          heading: "The Core Principle: Domain Never Depends on Infrastructure",
          paragraphs: [
            "In conventional layered architectures, business services import database models, HTTP controllers, and external client libraries directly. When you want to swap PostgreSQL for SQLite in tests or replace Express with Fastify, your business logic fractures.",
            "In Hexagonal Architecture, dependencies point inward. The core domain defines interfaces (Ports) for everything it needs from the outside world. Outside adapters (Fastify controllers, Drizzle ORM repositories, Redis caches) implement those ports."
          ]
        },
        {
          id: "ports-in-practice",
          heading: "Declaring Ports as TypeScript Contracts",
          paragraphs: [
            "By writing pure TypeScript interfaces for our repositories and notifications, we can test complex business invariants in pure in-memory unit tests that execute in 4 milliseconds without launching Docker containers or connecting to live databases."
          ]
        }
      ],
      conclusion: "Hexagonal Architecture requires a small upfront investment in interface definitions, but pays compounding dividends in testability, maintainability, and architectural longevity.",
      takeaways: [
        "Never import database drivers or HTTP frameworks inside domain entity classes.",
        "Define primary ports for incoming drivers and secondary ports for outgoing infrastructure.",
        "Use in-memory adapter stubs to run thousands of domain unit tests in sub-second times."
      ]
    }
  },
  "rrf-semantic-caching-rag": {
    slug: "rrf-semantic-caching-rag",
    title: "Reciprocal Rank Fusion and Semantic Caching in Modern RAG Pipelines",
    date: "May 19, 2026",
    readTime: "10 min read",
    category: "AI & ML",
    summary: "Combining sparse BM25 keyword matching with dense Qdrant vector retrieval, cross-encoder reranking, and Redis semantic caching.",
    figureType: "rrf-retrieval",
    content: {
      intro: "Pure vector search frequently disappoints in production. It understands high-level semantics, but fails miserably at exact identifier lookups, SKU numbers, and technical jargon. Real-world RAG systems require hybrid search and aggressive semantic caching.",
      sections: [
        {
          id: "hybrid-search-rrf",
          heading: "Why Dense Embeddings Alone Fail",
          paragraphs: [
            "Embedding models compress sentences into latent space. In doing so, specific part numbers like 'IC-74HC595' get blurred into general concepts like 'integrated circuits'.",
            "Reciprocal Rank Fusion (RRF) solves this by executing both a sparse keyword search (BM25 or PostgreSQL Full-Text) and a dense vector search (Qdrant), combining their ranked positions with reciprocal weighting."
          ]
        },
        {
          id: "semantic-caching",
          heading: "Sub-15ms Latency with Redis Semantic Caching",
          paragraphs: [
            "Over 40% of queries in enterprise knowledge bases are semantically identical rephrasings of earlier questions. Storing cosine-similar query vectors in Redis with an indexing threshold of 0.94 allows returning verified completions in under 15ms without querying the language model."
          ]
        }
      ],
      conclusion: "Combining sparse exact retrieval with dense semantic vectors and embedding caching yields RAG architectures that are simultaneously accurate, lightning-fast, and cost-effective.",
      takeaways: [
        "Use Reciprocal Rank Fusion to blend exact BM25 matches with dense vector similarities.",
        "Add a cross-encoder reranker on top of top-K results to eliminate irrelevant context.",
        "Deploy semantic vector caching in Redis to bypass LLM inference costs on common queries."
      ]
    }
  }
};
