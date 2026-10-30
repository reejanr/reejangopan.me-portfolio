// Content of the /engineering-playbook page, distilled from the Enterprise Software Architecture &
// Engineering Playbook (v1.0, 30 Oct 2026). Principles and methods — not claims about past work.

export type Card = { title: string; text: string };
export type Row = { a: string; b: string; c?: string };

export const principles: Card[] = [
  { title: "Evidence before claims", text: "Code, migrations, cloud config, executed tests and runtime metrics are the source of truth — not a README or an installed dependency." },
  { title: "Separate the traffic numbers", text: "Daily users, concurrent connections, in-flight requests and requests per second are four different things." },
  { title: "Correctness before speed", text: "No tenant leaks, duplicate payments, double bookings or unsafe downloads. A fast app that mispays is not production-ready." },
  { title: "Scale progressively", text: "Baseline → optimise queries and cache → tune the pool and autoscale → split services or partition data only when measurements demand it." },
];

export const lenses: Row[] = [
  { a: "Functional", b: "Can every documented journey complete with the right permissions and business rules?" },
  { a: "Security", b: "Which trust boundaries exist, and which attacks remain possible?" },
  { a: "Reliability", b: "What happens when each dependency is slow, down, inconsistent or corrupted?" },
  { a: "Performance", b: "What is the p95/p99 experience at the required workload and region?" },
  { a: "Data integrity", b: "Which invariants must be atomic, unique, immutable and auditable?" },
  { a: "Operations", b: "Can an on-call engineer detect, contain and recover failures?" },
  { a: "Cost", b: "What is the monthly bill at realistic peak and storage growth?" },
  { a: "Delivery", b: "Can many engineers change the system without corrupting shared work?" },
];

export const traffic: Row[] = [
  { a: "DAU", b: "Unique users in 24 hours", c: "Drives transactions per day and storage growth" },
  { a: "Concurrent sessions", b: "Users connected in a window", c: "Drives session counts and sockets" },
  { a: "In-flight requests", b: "Handled at the same instant", c: "Drives connections, worker pools, backpressure" },
  { a: "RPS", b: "Requests handled per second", c: "Drives CPU, caching, database QPS, provider quotas" },
];

export const loadSteps = ["Baseline", "Ramp to peak", "Spike", "Soak", "Stress", "Failure injection"];

export const stackLayers: Card[] = [
  { title: "Edge", text: "DNS → CDN + DDoS protection + WAF + TLS termination" },
  { title: "Routing", text: "Reverse proxy / load balancer with health and readiness checks" },
  { title: "Application", text: "Stateless web / API / server-actions tier, plus an identity provider" },
  { title: "Data", text: "Managed relational database (pooled), optional read replica" },
  { title: "Async", text: "Transactional outbox → queue → workers → dead-letter queue" },
  { title: "Files", text: "Private object storage → signed URLs; CDN for public assets only" },
  { title: "Speed", text: "Redis for measured hot reads and rate-limit counters" },
  { title: "Insight", text: "Logs, metrics and traces — with secrets and PII redacted" },
];

export const matrix: { tier: string; tone: "now" | "cond" | "rare"; items: string }[] = [
  { tier: "NOW", tone: "now", items: "DNS & TLS · CDN & image optimisation · WAF/DDoS · input validation & authorization · rate limits · logs/metrics/tracing · encrypted backups + restore test · relational DB with indexing & query profiling" },
  { tier: "CONDITIONAL", tone: "cond", items: "Redis cache · queues & workers · read replicas · partitioning · search engine · API gateway · autoscaling" },
  { tier: "RARE / LAST RESORT", tone: "rare", items: "Kubernetes · microservices · service mesh · multi-region active-active · sharding — each needs an ADR, a specialist team and a measured reason" },
];

export const dataRules: string[] = [
  "Make invariants executable: UNIQUE, FOREIGN KEY, CHECK and NOT NULL constraints, clear transaction boundaries, audit fields.",
  "Pick isolation levels deliberately; test lost updates, write skew and concurrent approvals.",
  "Optimistic concurrency (version columns) for ordinary edits; locks or serialised commands where correctness demands it.",
  "Enforce idempotency and uniqueness on the server — a disabled button is not protection against double submit.",
  "Keep an authoritative ledger for money and payroll; recompute derived totals deterministically.",
  "Pool connections, bound query time, profile with EXPLAIN, and record every migration.",
  "Never hold a transaction open while calling an external API.",
];

export const scaleLadder: Row[] = [
  { a: "Vertical scaling", b: "CPU or working set under-provisioned", c: "Single-node ceiling" },
  { a: "Read replica", b: "Reads saturate the primary; stale reads are fine", c: "Replica lag, read-your-writes routing" },
  { a: "Partitioning", b: "Huge time-series tables, fast retention deletes", c: "Query-plan and key complexity" },
  { a: "Sharding", b: "One node can't cope after optimisation", c: "Cross-shard joins & transactions" },
];

export const migrationSteps = ["Expand — add compatible columns/indexes", "Deploy code that reads both shapes; backfill in batches", "Verify metrics and the rollback path", "Contract — drop old fields after the rollback window"];

export const plumbing: Card[] = [
  { title: "Caching", text: "A consistency decision: browser/CDN for public content, server cache for expensive reads, Redis only for shared ephemeral data or measured hot keys. Never cache one tenant's data where another can reach it; never serve stale permissions." },
  { title: "Queues", text: "At-least-once delivery means duplicates. Use idempotent consumers, bounded retries with backoff and jitter, dead-letter queues, a transactional outbox and queue-age monitoring." },
  { title: "File storage", text: "Private buckets and short-lived signed URLs for sensitive files; allowlisted types, size limits and malware scans for uploads; EXIF stripped from images." },
  { title: "Search", text: "Start with indexed SQL and Postgres full-text. Add a dedicated engine only when relevance or scale needs it — with ACL filters so results never leak private data." },
  { title: "APIs", text: "Versioned contracts, validation, typed errors, request IDs, bounded pagination, exact CORS allowlists, authenticated webhooks with replay windows and per-tenant quotas." },
];

export const threats: string[] = [
  "Broken object authorization (IDOR/BOLA) and tenant leakage",
  "SQL injection, XSS, SSRF, command injection, path traversal, malicious uploads",
  "Credential stuffing, session theft, phishing, OAuth misconfiguration",
  "Scraping, enumeration, spam sign-ups, cost exhaustion, denial of service",
  "Race conditions: double booking, duplicate payouts, replayed webhooks",
  "Secrets in code, CI logs or client bundles; public buckets",
  "Supply chain: vulnerable dependencies, compromised CI actions, unreviewed AI code",
  "Prompt injection and over-permissioned AI agents",
];

export const controls: Row[] = [
  { a: "Identity", b: "MFA/passkeys for privileged roles, secure hashing, session revocation" },
  { a: "Authorization", b: "Deny by default, object- and function-level checks, tenant isolation, negative tests" },
  { a: "Input / output", b: "Parameterised queries, escaped output, schema validation, SSRF and upload controls" },
  { a: "Browser / API", b: "TLS, safe cookies, CSP rollout, CORS allowlist, CSRF defence, HSTS" },
  { a: "Data & crypto", b: "Encryption in transit and at rest, KMS and rotation, least-privilege DB" },
  { a: "Edge / abuse", b: "WAF, DDoS, bot mitigation, per-identity quotas, anti-enumeration" },
  { a: "Supply chain", b: "Dependency scanning, SAST, secret scanning, SBOM, pinned workflows" },
  { a: "Detection & recovery", b: "Alerts on privilege change and mass download; restore drills; incident response" },
];

export const reliability: Card[] = [
  { title: "Timeouts & budgets", text: "No hung call may use up every request slot." },
  { title: "Bounded retries", text: "Exponential backoff + jitter + idempotency — never retry storms." },
  { title: "Breakers & bulkheads", text: "Stop one failing dependency cascading through the system." },
  { title: "Graceful degradation", text: "Cached catalogue stays up; payroll permissions are never served stale." },
  { title: "Overload protection", text: "Queues, concurrency limits and pool caps shed non-critical work." },
  { title: "Health checks", text: "Readiness, liveness and safe shutdown on every deploy." },
];

export const signals: Row[] = [
  { a: "Latency", b: "p50 / p95 / p99 per journey" },
  { a: "Traffic", b: "RPS, read/write mix, connections, bursts" },
  { a: "Errors", b: "5xx and domain failures, separate from safe 4xx" },
  { a: "Saturation", b: "CPU, memory, DB pool, locks, queue lag" },
  { a: "Correctness", b: "Duplicate payouts, booking conflicts, reconciliation gaps" },
  { a: "Security & cost", b: "Auth anomalies, abuse flags, spend spikes" },
];

export const pipeline = [
  "Pull request & code-owner review",
  "Lint · typecheck · unit tests",
  "Migrations from a clean baseline + RLS tests",
  "Integration · contract · E2E",
  "SAST · secrets · dependencies · SBOM",
  "Staging deploy + smoke tests",
  "Protected-branch gate & approval",
  "Canary / feature flags & rollback decision",
];

export const testLayers: Row[] = [
  { a: "Unit / property", b: "Calculations, date rules, state machines, validation" },
  { a: "Integration / DB", b: "Transactions, locks, RLS, unique keys, migrations" },
  { a: "Contract", b: "External APIs, webhooks, breaking changes" },
  { a: "End-to-end", b: "High-value journeys, roles, mobile" },
  { a: "Performance", b: "Peak RPS, latency tails, cache-miss storms" },
  { a: "Resilience", b: "Dependency failures, queue replays, restore drills" },
  { a: "Security", b: "Negative permissions, secrets, supply chain" },
];

export const agentRules: string[] = [
  "One accountable technical lead owns scope, architecture and integration order.",
  "One branch or worktree per task, with assigned, non-overlapping files.",
  "Contracts and ADRs first → migrations → API → frontend → integration tests.",
  "One migration authority; only the integration owner merges or cherry-picks.",
  "Protected main, CODEOWNERS, required CI and environment approvals — no silent emergency merges.",
  "AI-written code is untrusted until reviewed; agents get limited credentials.",
];

export const roadmap: { p: string; name: string; text: string; exit: string }[] = [
  { p: "P0", name: "Protect now", text: "Secret scanning, role/tenant authorization, financial invariants, backups, admin MFA, blocking CI.", exit: "No known exploitable P0; critical data can be restored." },
  { p: "P1", name: "Stabilise", text: "Metrics and traces, query audit, connection pool, rate limits, bounded retries, private files.", exit: "Critical SLOs measured; runbooks work." },
  { p: "P2", name: "Verify scale", text: "k6 workload models, CDN/cache, index fixes, controlled autoscaling, quota plan.", exit: "Peak target sustained with margin and measured cost." },
  { p: "P3", name: "Specialise", text: "Workers/outbox, search index, replicas, partitioning if required.", exit: "Bottleneck-specific benchmarks show value." },
  { p: "P4", name: "Expand platform", text: "Kubernetes, microservices, sharding, multi-region — only when justified.", exit: "An ADR proves benefit exceeds risk and cost." },
];

export const antiPatterns: string[] = [
  "Expensive technology with no measured bottleneck or trained owner",
  "Clients talking directly to privileged tables or open storage buckets",
  "Unbounded lists and full-table scans on every homepage load",
  "Long transactions holding locks while calling external APIs",
  "Retry loops without deadlines, idempotency or backoff",
  "Ignoring CI because the runner broke; migrations run out of order",
  "Several people or agents editing the same migration or production branch",
  "Calling it done because unit tests pass while authorization and recovery are untested",
];

export const auditSteps: Card[] = [
  { title: "1 · Pin & inventory", text: "Fix one app, commit and deployment; list routes, roles, jobs, migrations, integrations and unknowns — read-only." },
  { title: "2 · Verify independently", text: "Security, database and SRE checks run separately, against evidence." },
  { title: "3 · Capability matrix", text: "Need × status (implemented / partial / missing / unverified) × evidence × owner." },
  { title: "4 · Findings register", text: "P0–P3 severity, safe reproduction, fix, test plan and rollback for each." },
  { title: "5 · Fix & decide", text: "Small sequential PRs, staging tests, every CI gate green — then a release decision from results, not confidence." },
];

export const overlays: Card[] = [
  { title: "Rental marketplace", text: "Supplier/renter/admin isolation, availability concurrency, idempotent deposits and refunds, catalogue search, uploads and verification documents." },
  { title: "Workforce & payroll", text: "Role scopes, local business-date and shift rules, overtime eligibility, approvals with audit, payroll lock, confidential HR documents." },
  { title: "Corporate website", text: "CDN caching, Core Web Vitals, canonical URLs and sitemaps, anti-spam forms, attachment security, analytics consent." },
  { title: "ERP / enquiry hub", text: "Deduplication across email, WhatsApp and forms, attachment scanning, audit trail, RBAC, reconciliation with accounting." },
];

export const references: { name: string; url: string }[] = [
  { name: "AWS Well-Architected Framework", url: "https://wa.aws.amazon.com/index.en.html" },
  { name: "OWASP ASVS 5.0", url: "https://github.com/OWASP/ASVS" },
  { name: "OWASP Top 10:2025", url: "https://top10.owasp.org/2025/" },
  { name: "OWASP API Security Top 10 (2023)", url: "https://api-security.owasp.org/editions/2023/en/0x11-t10/" },
  { name: "NIST SP 800-218 (SSDF)", url: "https://csrc.nist.gov/pubs/sp/800/218/final" },
  { name: "OWASP Secrets Management", url: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html" },
];
