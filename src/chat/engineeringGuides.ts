// Enterprise software-engineering guides, distilled from the "Enterprise Software Architecture &
// Engineering Playbook" (v1.0, 30 Oct 2026). General engineering knowledge — they explain how to
// build and run production systems and never claim anything about Reejan beyond what his
// services and projects show. They feed the /guides pages, the in-browser chat assistant and
// llms-full.txt (and through it the AI assistant API).
import type { Guide } from "./guides";

const S = "https://reejangopan.me/services";

export const engineeringGuides: Guide[] = [
  // ---------- foundations ----------
  {
    topic: "engineering", ask: "What does enterprise-grade software actually mean?",
    k: "enterprise grade software architecture production ready what is enterprise principles engineering playbook reliable correctness",
    a: `Enterprise-grade is not a list of technologies — it is a set of verified properties:
• **Correct under retries, races and partial outages** — no duplicate payments, double bookings or lost updates
• **Protected data** with authorization enforced at every boundary
• **Predictable latency and cost** under a known workload
• **Recoverable:** auditable change history and restores that have actually been tested
• **Maintainable:** documented ownership and controlled deployments

Four rules for every project:
1. **Evidence before claims** — code, migrations, cloud config, executed tests and runtime metrics are the source of truth
2. **Separate traffic dimensions** — daily users, concurrent connections, in-flight requests and request rate are different numbers
3. **Correctness and confidentiality before speed** — no tenant leaks, duplicate pay or unsafe downloads
4. **Scale progressively** — baseline, optimise queries and cache, tune the pool and autoscale, and only then split services or partition data

Principle: build the simplest architecture that meets verified reliability, security and throughput goals. Readiness is shown with measurements and repeatable tests, not by the number of technologies installed.`,
    next: ["How do I design a scalable web architecture?", "How do I run a production-readiness audit?", "How do I document architecture decisions (ADRs)?"],
  },
  {
    topic: "engineering", ask: "How do I document architecture decisions (ADRs)?",
    k: "adr architecture decision record document decisions design review tradeoffs alternatives rationale",
    a: `For every non-trivial decision, write a short Architecture Decision Record:
• **Context and requirements** — what problem, for whom
• **At least two viable alternatives**
• **Constraints, risk and cost**
• **The chosen option** and why
• **Expected signals** that show it is working
• **Migration and rollback plan**
• **Owner and date**

Revisit the decision when the traffic profile or the organisation changes. Review designs through eight lenses: functional, security, reliability, performance, data integrity, operations, cost and delivery (can many engineers change the system without corrupting shared work?).`,
    next: ["What does enterprise-grade software actually mean?", "Do I need Kubernetes, microservices or sharding?"],
  },

  // ---------- capacity & architecture ----------
  {
    topic: "engineering", ask: "How do I plan for 100,000 users?",
    k: "100000 users 100k concurrent users capacity planning dau rps requests per second traffic model load handle scale million users sizing",
    a: `Do not confuse four numbers:
• **DAU** — unique users per day; drives transactions per day and storage growth
• **Concurrent sessions** — users connected in a window; drives sockets and session counts
• **In-flight requests** — handled at the same instant; drives connections, worker pools and backpressure
• **RPS** — requests per second; drives CPU, caching, database QPS and external quotas

Model it with a formula: users × actions per minute × API calls per action ÷ 60. Illustration (not a benchmark): 100,000 connected users each acting every 30 seconds is about 3,333 actions/sec; at 4 uncached API calls each that is about 13,333 API requests/sec before retries, bots and background jobs.

Then prove it: baseline → ramp to expected peak → spike → soak → stress beyond the goal → failure injection (Redis down, replica lag, worker halted, object-store timeout). Never claim 100k capacity without a load test and a recovery test at that target. Availability maths: 99.9% allows about 43.2 minutes of downtime per 30-day month; 99.95% about 21.6 minutes.`,
    next: ["How do I load-test an application?", "How do I design a scalable web architecture?", "How do I scale a web app?"],
  },
  {
    topic: "engineering", ask: "How do I load-test an application?",
    k: "load test load testing k6 stress test soak spike ramp baseline performance test capacity p95 p99 latency tail",
    a: `A sound load-test sequence (with k6 or similar, on staging with synthetic data):
1. **Baseline** at normal load with clean database and cache telemetry
2. **Ramp** to the expected peak and hold it to find saturation and tail latency
3. **Spike** to model a campaign or bot burst — overload must be bounded, not catastrophic
4. **Soak** for memory leaks, pool exhaustion and queue backlogs
5. **Stress** beyond the goal to find the first bottleneck and confirm graceful degradation
6. **Failure injection:** Redis unavailable, replica lag, queue worker halted, object-store timeout, CDN cache miss

Watch p50/p95/p99 per journey, error rate, CPU/memory, database pool use and locks, queue lag and cache hit rate. Include expensive searches, upload spikes and bot scraping in the workload mix. Never load-test production without authorisation, and write acceptance criteria (for example "p95 under 400 ms at peak with under 0.1% errors") before you run.`,
    next: ["How do I plan for 100,000 users?", "What should I monitor in production?"],
  },
  {
    topic: "engineering", ask: "How do I design a scalable web architecture?",
    k: "scalable web architecture reference architecture cdn waf load balancer stateless api database redis queue workers object storage layers diagram trust boundaries",
    a: `A representative scalable web workload, top to bottom:
• **DNS → CDN + DDoS protection + WAF + TLS termination**
• **Reverse proxy / load balancer** to a **stateless web/API tier** (so you can add instances)
• **Identity provider** for authentication
• **Managed relational database** (primary, optional read replica) with connection pooling
• **Redis** for hot reads and rate-limit counters — only when measured
• **Transactional outbox → queue → workers + dead-letter queue** for email, media and notifications
• **Private object storage → signed URLs**, with the CDN for public assets only
• **Observability:** logs, metrics, traces
• **Search index** only if SQL search can no longer cope

Trust boundaries to enforce: internet vs origin, app vs identity/authorization, app vs database (least privilege), app vs workers (authenticated events, idempotent processing), private files vs public CDN, and CI/CD vs production (separate secrets, human approval for destructive steps). Use managed versions where possible — the diagram is not a directive to deploy every box on day one.`,
    next: ["Which infrastructure do I need now and which later?", "What is the difference between a proxy, load balancer and API gateway?", "How do I plan for 100,000 users?"],
  },
  {
    topic: "engineering", ask: "Which infrastructure do I need now and which later?",
    k: "infrastructure needed now later conditional rare technology choice matrix cdn waf redis queue replica elasticsearch kubernetes microservices sharding what do i need",
    a: `Use three tiers:

**NOW (baseline for most public production apps)**
• DNS, TLS and automated certificate renewal
• CDN and image optimisation for public media
• WAF/DDoS protection (it does not replace code-level authorization)
• Server-side input validation and authorization
• Rate limits and quotas per action, identity, tenant and IP
• Logs, metrics and tracing with secrets/PII redacted
• Encrypted backups plus a tested restore
• Relational database with transactions, indexing and query profiling

**CONDITIONAL (needs observed demand)**
• Redis/cache, queues and workers, read replicas, partitioning, a search engine, an API gateway, autoscaling

**RARE / LAST RESORT (needs an ADR and a specialist team)**
• Kubernetes, microservices, service mesh, multi-region active-active, and sharding — the last resort because cross-shard transactions get hard

Don't add expensive technology without a measured bottleneck and a trained owner.`,
    next: ["Do I need Kubernetes, microservices or sharding?", "When do I need a search engine like Elasticsearch?"],
  },
  {
    topic: "engineering", ask: "Do I need Kubernetes, microservices or sharding?",
    k: "kubernetes k8s microservices sharding monolith modular monolith multi region service mesh kafka too early premature complexity enterprise",
    a: `Usually not at first. These are justified by measurements and team shape, not by looking "enterprise":
• **Modular monolith first** — split into microservices only for domain or team scaling, independent deployment and when you have the operations maturity (service discovery, inter-service auth, tracing, contracts, distributed consistency)
• **Kubernetes** — for portability, multi-service orchestration and a real platform team
• **Sharding** — only when a single database node cannot cope after optimisation; it complicates joins, transactions, resharding and tenant routing. Try indexes, caching, vertical scaling, replicas and partitioning first
• **Multi-region active-active** — needs a cross-region consistency plan and a large operations budget
• **Kafka / Elasticsearch** — add when the workload demands them, not to appear modern

If you do adopt one, write an ADR that shows the benefit exceeds the operational risk and cost.`,
    next: ["Which infrastructure do I need now and which later?", "Monolith or microservices?", "How do I document architecture decisions (ADRs)?"],
  },
  {
    topic: "engineering", ask: "What is the difference between a proxy, load balancer and API gateway?",
    k: "forward proxy reverse proxy load balancer api gateway difference bff edge router nginx explained",
    a: `• **Forward proxy** — sits in front of *clients* and controls their outbound requests
• **Reverse proxy** — sits in front of *origin servers* and routes incoming traffic (TLS termination, caching, compression)
• **Load balancer** — spreads work across instances, with health and readiness checks
• **API gateway** — adds centralised routing, authentication policies, quotas and observability for many APIs

Their functions overlap, so use managed capabilities instead of multiplying hops. An API gateway is only worth it for multi-API routing and quotas beyond what your edge or runtime already does.`,
    next: ["How do I design a scalable web architecture?", "API design checklist for production?"],
  },

  // ---------- data ----------
  {
    topic: "engineering", ask: "How do I keep data correct (ACID, constraints, concurrency)?",
    k: "acid transactions constraints concurrency isolation level optimistic locking unique foreign key check invariant lost update write skew data integrity database correctness",
    a: `Make invariants executable in the database, not just in the UI:
• **UNIQUE, FOREIGN KEY, CHECK and NOT NULL constraints**, clear transaction boundaries and audit fields
• **Transactions** for steps that must change together; pick isolation levels deliberately and test lost updates, write skew and concurrent approvals
• **Optimistic concurrency** (version columns) for ordinary edits; **locks or serialised commands** when correctness demands it
• **Idempotency and uniqueness enforced server-side** — a disabled button is not protection against double submit
• **An authoritative ledger** for money or payroll; recompute derived totals deterministically
• **Connection pooling, query timeouts**, EXPLAIN-based tuning and recorded migration history

ACID example (booking or payroll approval): *Atomicity* — reserve stock and create the booking together; *Consistency* — a unit can't be reserved twice, an overtime segment can't be paid twice; *Isolation* — two requests must not both see the last unit as free; *Durability* — a committed record survives failure.`,
    next: ["How do I prevent duplicate payments and double bookings?", "Read replicas, partitioning or sharding?", "How do I scale a database?"],
  },
  {
    topic: "engineering", ask: "How do I prevent duplicate payments and double bookings?",
    k: "duplicate payment double booking race condition idempotency key double submit webhook replay refund payout overtime double pay concurrency business logic",
    a: `These are business-logic races, and they need server-side defences:
• **Idempotency keys** — a unique (user, key) constraint using INSERT … ON CONFLICT, never check-then-insert
• **Atomic reservation** — reserve inventory and create the booking in one transaction, with a unique/exclusion constraint so the same unit or time slot cannot be taken twice
• **Webhook safety** — verify signatures, enforce a replay window and process each event ID once
• **Ledger + reconciliation** — an immutable record of money movement, reconciled against the provider
• **Locks held briefly** — never keep a database transaction open while calling an external API
• **Tests** for double-submit, concurrent updates and partial failure
• **Audit trail** for every payout, refund and approval

Queues deliver at least once, so payment and payroll consumers must never assume exactly-once processing.`,
    next: ["How do queues, retries and idempotency work?", "How do I keep data correct (ACID, constraints, concurrency)?"],
  },
  {
    topic: "engineering", ask: "Read replicas, partitioning or sharding?",
    k: "read replica partitioning sharding vertical scaling replica lag database scaling horizontal compare when to use",
    a: `Pick by the bottleneck:
• **Vertical scaling** — working set or CPU under-provisioned; has a single-node ceiling and failover cost
• **Read replica** — reads saturate the primary and slightly stale reads are fine; watch replica lag and read-your-writes routing
• **Partitioning** — very large time-series tables and fast retention deletion; adds query-plan and key/index complexity
• **Sharding** — one node truly can't cope after optimisation; brings cross-shard joins/transactions and resharding pain
• **Horizontal stateless app tier** — more app instances, but the database, cache and shared state can still be the bottleneck

Order of attack: measure with EXPLAIN → add indexes → fix N+1 queries → cache hot reads → tune the connection pool → scale vertically → replicas → partitioning → sharding last.`,
    next: ["How do I scale a database?", "Do I need Kubernetes, microservices or sharding?"],
  },
  {
    topic: "engineering", ask: "How do I deploy database changes with zero downtime?",
    k: "zero downtime migration expand contract schema change backfill rollback database migration deploy backward compatible",
    a: `Use the expand → migrate → contract pattern:
1. **Expand** — add backward-compatible nullable columns or indexes that old code ignores
2. **Deploy code** that can read both the old and new shape; **backfill in measured, restartable batches**
3. **Verify** metrics, tests and the rollback path before making the new field mandatory
4. **Contract later** — remove old columns only after every client and job is migrated and the rollback window has expired

Also: one migration owner who serialises schema changes, replay migrations from a clean database in CI, prefer forward-only migrations with a documented roll-forward plan, and take a backup before risky steps. Never run production DDL or data deletion without authorisation and a rollback plan.`,
    next: ["What should a CI/CD pipeline include?", "How do multiple developers or AI agents work on one codebase safely?"],
  },

  // ---------- caching, queues, storage, search, API ----------
  {
    topic: "engineering", ask: "How should caching work in a production app?",
    k: "caching cache strategy redis cdn ttl invalidation cache stampede stale data cache aside layered cache hot key tenant",
    a: `Caching is a consistency decision, not just a speed trick.
• **Layers:** browser/CDN for safe public content → server cache for expensive repeated reads → Redis only when several instances need shared ephemeral data or you have measured hot keys
• **Choose TTL and invalidation per data class** (cache-aside, write-through); prevent stampedes with locks or request coalescing
• **Never cache one tenant's confidential result under a key another tenant can reach**
• **Never serve stale permissions** — a cache must not be the source of truth for authorization or money
• **Watch** memory, evictions, hit rate and hot keys; and have a plan for Redis being down

Rule: if you can't say how an entry gets invalidated, don't cache it.`,
    next: ["How do I scale a web app?", "How do I make a website load fast?"],
  },
  {
    topic: "engineering", ask: "How do queues, retries and idempotency work?",
    k: "queue message queue worker dead letter dlq outbox pattern at least once delivery retry backoff jitter idempotent consumer background jobs poison message backpressure",
    a: `A queue smooths bursts and moves slow work (email, media processing, reconciliation, notifications) off the request path. Because delivery is usually **at least once**, design for duplicates:
• **Idempotent consumers** with a durable idempotency key and a unique business-action key
• **Bounded retries with exponential backoff and jitter** — unlimited retries cause retry storms
• **Dead-letter queue** plus a replay procedure for poison messages
• **Transactional outbox** — write the state change and the event in one database transaction so they never diverge
• **Backpressure:** concurrency limits and caps so a backlog can't take the database down
• **Monitor queue age and lag**, not just queue length

Payment and payroll consumers must not assume exactly-once processing.`,
    next: ["How do I prevent duplicate payments and double bookings?", "How do I make an app reliable under failure?"],
  },
  {
    topic: "engineering", ask: "How do I store and serve files securely?",
    k: "file upload storage object storage s3 blob signed url presigned private bucket malware scan secure uploads cdn documents payroll id",
    a: `• **Public media:** versioned keys, responsive image formats, cache-control headers, CDN, sensible size limits
• **Sensitive files** (IDs, payroll, verification documents): a **private bucket**, authorise first, then issue a **short-lived signed URL**; audit downloads where required — never expose them as public media
• **Uploads:** detect the real content type, allowlist extensions, limit size, generate safe key names, scan untrusted documents for malware, and never host user-uploaded executables
• **Lifecycle:** retention, versioning, deletion policy, encryption, restore tests, access logs and an egress cost forecast
• **Images:** strip EXIF/GPS metadata and re-encode before storing`,
    next: ["How do I protect customer data?", "How should I classify and protect sensitive data?"],
  },
  {
    topic: "engineering", ask: "When do I need a search engine like Elasticsearch?",
    k: "search engine elasticsearch opensearch meilisearch algolia postgres full text search trigram when to use relevance facets index",
    a: `Start with **indexed SQL and PostgreSQL full-text/trigram search**. Move to a dedicated engine (Meilisearch, OpenSearch/Elasticsearch, Algolia) only when fuzzy matching, facets, geo search, analytics or volume justify it.

If you add one, define up front: how the index is built **from authoritative data change events**, how it is rebuilt, how much lag is acceptable, and how **ACL and tenant filters** are applied — search results must never reveal an unauthorised listing or private tenant data. Decide by relevance, load and operating cost, not fashion.`,
    next: ["Which database should I use?", "Which infrastructure do I need now and which later?"],
  },
  {
    topic: "engineering", ask: "API design checklist for production?",
    k: "api design checklist rest graphql pagination versioning validation error envelope request id cors csrf webhook etag quota rate limit contract",
    a: `• **Versioned contracts**, request validation, typed error envelopes, request IDs and safe exception mapping
• **Pagination, field selection, bounded page sizes** — no unbounded lists or exports
• **Safe CORS** (exact allowlist), CSRF protection where relevant, **webhook authentication and replay windows**
• **Per-user and per-tenant authorization on every record** — including server actions and batch endpoints
• **Idempotent mutations** and optimistic concurrency for edits
• **HTTP caching** with ETags where safe, stable error codes and backward compatibility
• **Per-tenant quotas** and rate limits

Verify with contract tests so external consumers don't break silently.`,
    next: ["What are the most common application security threats?", "How do queues, retries and idempotency work?"],
  },

  // ---------- security ----------
  {
    topic: "engineering", ask: "What are the most common application security threats?",
    k: "application security threats owasp top 10 idor bola sql injection xss ssrf csrf credential stuffing threat model asvs api security common vulnerabilities attacks",
    a: `Design and test against at least these threats:
• **Broken object authorization (IDOR/BOLA)**, role bypass and tenant/row-level policy leakage
• **Injection:** SQL, XSS, SSRF, command injection, path traversal, unsafe deserialization, malicious uploads
• **Identity attacks:** credential stuffing, admin compromise, session theft or fixation, phishing, OAuth misconfiguration
• **Abuse:** API abuse, account enumeration, scraping, spam sign-ups, cost exhaustion and denial of service
• **Race conditions:** double booking, duplicate refunds/payments, replayed webhooks, stale updates
• **Leaks:** secrets in code, CI logs or client bundles; public buckets; unredacted error telemetry
• **Supply chain:** vulnerable dependencies, compromised CI actions, unreviewed AI-written code
• **AI risks:** prompt injection and agent over-permission

Verify against OWASP ASVS 5.0, OWASP Top 10:2025 and the OWASP API Security Top 10 (2023), using negative-permission tests, dependency and secret scans, authorised staging DAST and human review of sensitive flows. Claim discipline: no system can be promised "unhackable" — a defensible claim is that known risks are reduced, tested, monitored and recoverable.`,
    next: ["How do I secure authentication and authorization?", "Website security essentials?", "How should an AI assistant be secured against prompt injection?"],
  },
  {
    topic: "engineering", ask: "How do I secure authentication and authorization?",
    k: "authentication authorization rbac abac mfa passkeys session tenant isolation rls least privilege deny by default object level access control login security",
    a: `• **Authentication:** MFA or passkeys for privileged roles, strong password hashing, session rotation and revocation, rate-limited recovery flows
• **Authorization:** *deny by default*, with **object-level and function-level checks on every route, server action and batch endpoint** — never trust the client for identity
• **Tenant isolation** enforced in code and, as defence in depth, with database Row Level Security
• **Least privilege** for people, services and database roles
• **Negative tests:** prove user A cannot read or change user B's data (horizontal) or reach admin functions (vertical)
• **Anti-enumeration and bot protection** on login, sign-up and reset
• **Detection:** alert on privilege changes, mass downloads and failed-login anomalies`,
    next: ["What is Row Level Security?", "What is MFA?", "What are the most common application security threats?"],
  },
  {
    topic: "engineering", ask: "How should I classify and protect sensitive data?",
    k: "data classification privacy pii personal data retention deletion gdpr pdpl uae compliance sensitive data employee id passport payroll encryption redaction logs",
    a: `1. **Classify** data as public, internal, confidential or highly sensitive
2. **Map** purpose, collection, access, retention, deletion, sharing and backup expiry
3. **Protect** the high-risk sets — employee IDs, passports, payroll, supplier verification documents — with encryption in transit and at rest, KMS-managed keys and rotation, least-privilege access and audit logs
4. **Minimise and redact:** never log passwords, keys, tokens, full ID documents or confidential payloads
5. **Review** UAE and cross-border legal obligations with counsel — technical controls alone do not establish legal compliance
6. Keep an inventory of vendors/sub-processors and a breach-response plan`,
    next: ["How do I protect customer data?", "How do I store and serve files securely?"],
  },
  {
    topic: "engineering", ask: "How should an AI assistant be secured against prompt injection?",
    k: "ai security prompt injection llm agent security rag retrieval acl tool allowlist indirect injection copilot chatbot over permission exfiltration human approval",
    a: `Treat everything the model reads — visitor messages, retrieved documents, web pages, tool output — as **data, never instructions**.
• **Least privilege for tools:** allowlist what an agent may call, scoped per user role; require **human approval for destructive actions**
• **Retrieval ACLs:** only retrieve documents the current user may see
• **Defend against indirect injection** hidden in documents and web pages
• **Prevent secret exfiltration:** keep keys out of prompts and outputs
• **Handle PII carefully** in prompts, logs and responses
• **Bound cost and abuse:** input-length limits, rate limits, daily caps and a spend limit
• **Test with adversarial prompts** and keep AI-written code untrusted until reviewed`,
    next: ["How can a business use AI?", "What are the most common application security threats?"],
  },

  // ---------- reliability & operations ----------
  {
    topic: "engineering", ask: "How do I make an app reliable under failure?",
    k: "reliability resilience timeout retry backoff circuit breaker bulkhead graceful degradation overload backpressure health check readiness liveness failure modes fault tolerance",
    a: `Design around failure modes:
• **Timeouts and per-dependency budgets** so one hung call can't use up every request slot
• **Bounded retries** with exponential backoff and jitter, plus idempotency — avoid retry storms
• **Circuit breakers and bulkheads** when repeated downstream failures would cascade
• **Graceful degradation:** a cached public catalogue may stay visible while recommendations are down — but never serve stale payroll permissions
• **Overload protection:** queues, concurrency limits, connection pool caps and shedding of non-critical work
• **Health:** readiness and liveness probes, safe shutdown and deployment health checks

Then rehearse it: inject dependency failures in staging and confirm the app degrades the way you designed.`,
    next: ["How do queues, retries and idempotency work?", "What should I monitor in production?", "How do I keep my app online (uptime, backups)?"],
  },
  {
    topic: "engineering", ask: "What are SLIs, SLOs and the golden signals?",
    k: "sli slo error budget golden signals observability monitoring alerting latency traffic errors saturation sre on call dashboard postmortem incident",
    a: `Give each critical user journey an **SLI** (what you measure), an **SLO** (the target), an **error budget**, an owner, a dashboard and an incident process.

What to measure:
• **Latency** — p50/p95/p99 per journey (client vs origin vs database time)
• **Traffic** — RPS, read/write mix, unique users, connections, burst rate
• **Errors** — 5xx and domain failure rate, separated from safe 4xx
• **Saturation** — CPU/memory, DB pool use, locks, IOPS, Redis evictions, queue lag
• **Correctness** — duplicate payouts, booking conflicts, reconciliation mismatches
• **Security and cost** — auth anomalies, abuse flags, secret access, spend spikes

Alerts should describe user-impacting failures, not noisy CPU thresholds. Hold blameless postmortems and track time-to-detect and time-to-recover. Use correlation IDs across logs and traces, and avoid high-cardinality metrics and unbounded log retention.`,
    next: ["What should I monitor in production?", "How do I make an app reliable under failure?", "How do I plan backups and disaster recovery (RPO and RTO)?"],
  },
  {
    topic: "engineering", ask: "How do I plan backups and disaster recovery (RPO and RTO)?",
    k: "backup disaster recovery rpo rto restore drill pitr point in time recovery dr plan business continuity restore test failover",
    a: `• **RPO** — the maximum tolerable data loss; **RTO** — the maximum tolerable time to recover. Set both per datastore by business criticality
• **Automate encrypted backups** and keep a copy in an independent failure domain
• **Cover everything:** the database, object storage, and secrets/configuration — not just SQL dumps
• **Test the restore** in an isolated environment and confirm it produces a *working application*; a successful backup is not proof of a successful restore
• **Use point-in-time recovery** where supported
• **Plan the human side:** break-glass access, incident communication and a migration rollback or roll-forward procedure
• **Rehearse** annually or more often — and after major infrastructure changes`,
    next: ["Backup strategy for a small business?", "What are SLIs, SLOs and the golden signals?"],
  },

  // ---------- engineering process ----------
  {
    topic: "engineering", ask: "What should a CI/CD pipeline include?",
    k: "ci cd pipeline github actions release gates canary blue green feature flags sast sbom secret scanning oidc staging deploy rollback branch protection production deploy",
    a: `A strong pipeline, in order:
1. Pull request → scope and code-owner review → **deterministic install**
2. **Format, lint, typecheck, unit tests**
3. **Database migrations from a clean baseline** + constraint and RLS tests
4. **Integration, API-contract and critical end-to-end tests**
5. **SAST, secret scanning, dependency/SBOM and container/IaC scans**
6. **Staging deploy** + smoke tests + observability check
7. **Protected-branch gate** and approved production promotion with serialised migrations
8. **Canary or feature flags**, post-deploy checks, and a rollback decision

Release gates: exact commit SHA recorded, every required check green, production secrets isolated (short-lived cloud identity via OIDC), rollback tested for schema/auth/cache changes, demonstrated load capacity for the target, on-call contacts and runbooks ready. A broken CI runner is not a passed test — document the blocked gate instead of silently merging.`,
    next: ["What tests does production software need?", "How do I deploy database changes with zero downtime?", "What should I test before launch?"],
  },
  {
    topic: "engineering", ask: "What tests does production software need?",
    k: "test pyramid unit integration contract e2e performance resilience security tests property based testing qa automation what tests production",
    a: `Test each layer for what it uniquely catches:
• **Unit / property-based:** calculations, date/time rules, state-machine transitions, validation edge cases
• **Integration / database:** transactions, lock behaviour, RLS, unique keys, migrations, replica assumptions
• **Contract:** external APIs and webhooks, breaking changes, error semantics
• **End-to-end:** high-value journeys, role access and mobile responsiveness
• **Performance:** peak RPS, latency tails, memory/DB pressure and cache-miss scenarios
• **Resilience:** dependency failures, queue replays, retry storms and restore drills
• **Security:** negative permissions, secret scanning, vulnerabilities and supply chain

Passing unit tests is not enough while authorization, recovery and peak traffic remain untested.`,
    next: ["What should a CI/CD pipeline include?", "What should I test before launch?"],
  },
  {
    topic: "engineering", ask: "How do multiple developers or AI agents work on one codebase safely?",
    k: "multi agent ai agents collaboration git branching worktree codeowners merge conflicts cherry pick protected main integration owner parallel development team workflow",
    a: `One accountable technical lead (the orchestrator) owns requirements, scope, acceptance criteria, architecture decisions, integration order and production changes. Specialists (security, database, performance, frontend/QA, SRE) can audit and build independently, but:
• **One branch or worktree per task** with assigned, non-overlapping file ownership
• **Order of work:** contracts/ADR → database migrations → API → frontend → integration tests
• **One migration authority** who serialises schema changes and replays them on a fresh database
• **Only the integration owner merges or cherry-picks** — a cherry-pick copies a commit, not its dependencies or migrations
• **Protected main, CODEOWNERS, required CI, reviews, environment approvals** — no silent emergency merges, no force-push to main
• **Treat AI-written code as untrusted** until reviewed; limit agent credentials and separate dev from production secrets
• **Write a spec first:** user story, scope exclusions, threats, invariants, permissions, API/DB contract, error behaviour, migration compatibility, tests and rollback plan`,
    next: ["What should a CI/CD pipeline include?", "How do I run a production-readiness audit?"],
  },

  // ---------- audit, roadmap, anti-patterns ----------
  {
    topic: "engineering", ask: "How do I run a production-readiness audit?",
    k: "production readiness audit review checklist capability matrix findings register severity p0 p1 maturity score evidence gate go no go architecture review assessment",
    a: `Audit first, redesign later:
1. **Pin** one application, repository, branch, commit and the current production deployment — don't mix production evidence with local demo data
2. **Inventory (read-only):** routes, APIs, roles, jobs, queues, migrations, integrations, data stores and trust boundaries; list the unknowns
3. **Verify independently:** security (authorization, secrets), database (integrity, migration order, duplicate requests), SRE (real telemetry vs assumptions)
4. **Build a capability matrix:** need (NOW/LATER/NO) × status (IMPLEMENTED / PARTIAL / MISSING / N/A / UNVERIFIED) × evidence × risk × owner
5. **One findings register**, severity-sorted: P0 exploitable compromise or data corruption; P1 likely outage or financial-integrity issue; P2 likely performance/maintenance cost; P3 enhancement — each with proof, safe reproduction, fix, test plan and rollback
6. **Score maturity 0–5** (absent → ad hoc → basic → managed → measured → continuously validated) only with evidence
7. **Fix in small sequential PRs**, test on staging, verify every CI gate, then decide on actual results — never on confidence

Rules: a dependency being installed or a README mentioning a service proves nothing; never invent benchmarks or compliance claims; and an audit never means "safe from all attacks". Review cadence: checks per PR, monthly dependency/backup/SLI reviews, quarterly threat-model review, annual DR rehearsal.`,
    next: ["What does enterprise-grade software actually mean?", "What is the right rollout roadmap for engineering maturity?", "What are common architecture anti-patterns?"],
  },
  {
    topic: "engineering", ask: "What is the right rollout roadmap for engineering maturity?",
    k: "roadmap rollout maturity p0 p1 p2 p3 p4 prioritise engineering plan stabilise protect now scale verify specialise phased remediation",
    a: `Phase the work by risk, not by technology fashion:
• **P0 — protect now:** secret scanning, role/tenant authorization, financial invariants, backups, admin MFA, blocking CI. *Exit:* no known exploitable P0, and critical data can be restored
• **P1 — stabilise:** metrics and traces, query audit, connection pool, rate limits, bounded retries, private files. *Exit:* critical SLOs measured and runbooks work
• **P2 — verify scale:** k6 workload models, CDN/cache, index fixes, controlled autoscaling, quota plan. *Exit:* peak target sustained with margin and measured cost
• **P3 — specialise:** workers/outbox, search index, replicas, partitioning if required. *Exit:* bottleneck-specific benchmarks show value
• **P4 — platform expansion:** Kubernetes, microservices, sharding, multi-region — only when an ADR proves the benefit exceeds the risk and cost

Typical timeline for remediation: quick wins in 0–7 days, stabilisation in 1–4 weeks, scale validation over 1–3 months.`,
    next: ["How do I run a production-readiness audit?", "Which infrastructure do I need now and which later?"],
  },
  {
    topic: "engineering", ask: "What are common architecture anti-patterns?",
    k: "anti patterns mistakes architecture pitfalls bad practices common mistakes overengineering unbounded queries retry loops long transactions exposed bucket",
    a: `Catch these early:
• Adding expensive technology without a **measured bottleneck** or a trained owner
• **Direct client access** to privileged database tables, or exposed storage buckets
• **Unbounded list responses** and full-table scans on every homepage refresh
• **Long database transactions** holding locks while calling external APIs
• **Retry loops** without deadlines, idempotency or backoff
• **Ignoring CI** because the runner broke, or running migrations out of order
• **Several people or agents** editing the same migration, state machine or production branch
• Calling it done because unit tests pass while **authorization, recovery and peak traffic** are untested
• A very fast app that gets the money wrong — operational correctness comes first`,
    next: ["How do I run a production-readiness audit?", "How do I keep data correct (ACID, constraints, concurrency)?"],
  },

  // ---------- domain overlays ----------
  {
    topic: "engineering", ask: "What should I check when building a rental or B2B marketplace?",
    k: "rental marketplace b2b marketplace supplier renter admin listings booking availability rfq catalogue search deposit refund tenant isolation equipment rental platform architecture",
    a: `Marketplace-specific risks to design and test:
• **Identity boundaries** between supplier, renter and admin; ownership and visibility of listings, RFQs, chats, contracts and verification files
• **Availability and reservation concurrency** — two renters must not reserve the same constrained inventory
• **Payments, deposits, refunds and payouts** (if you handle them): authenticated, idempotent, audited and reconciled
• **Catalogue quality:** filters, categories, attribute facets, image uploads, media CDN and document access
• **Environment discipline:** hosted vs local database migration state, and sample-data publishing validated separately
• **Load model at scale:** expensive catalogue searches, availability reads, upload spikes, bot scraping and provider quotas

Reejan builds websites and technical SEO for the USF Group companies, including rental.usfme.com; see his projects for details.`,
    next: ["How do I prevent duplicate payments and double bookings?", "How do I plan for 100,000 users?"],
  },
  {
    topic: "engineering", ask: "What should I check when building workforce, HR and payroll software?",
    k: "workforce hr payroll attendance overtime leave software design correctness timezone shift approvals employee documents salary slips waqti check in roles supervisor",
    a: `Operational correctness is the primary goal — a fast app that mispays employees is not production-ready.
• **Role scopes** (employee, supervisor, engineer, HSE, DC, office staff, admin) enforced in every server action *and* every SQL policy
• **Time correctness:** check-in timestamps against the local business date, overnight shifts, offline replay, location evidence and deduplication
• **Pay rules:** daily regular-plus-overtime limits vs rest-day/holiday overtime-only rules, with no duplicate payable hours or stale visible entitlements
• **Approvals and corrections** with a reason and audit trail; salary effective dates; payroll cut-off and lock; repeat-safe month generation
• **Privacy:** confidential HR documents and salary slips, least privilege and audit of sensitive changes
• **Recovery:** the ability to restore payroll records

Reejan built WAQTI, a workforce management platform for attendance, overtime and payroll with role-based access and audit logs; see the WAQTI case study.`,
    next: ["How do I automate HR, attendance and payroll?", "How do I keep data correct (ACID, constraints, concurrency)?"],
  },
  {
    topic: "engineering", ask: "What should a production corporate website include?",
    k: "corporate website production checklist enquiry form anti spam seo canonical sitemap redirects core web vitals cms admin isolation analytics consent cdn email delivery attachments",
    a: `• **Delivery:** global CDN caching, responsive images, light pages, healthy Core Web Vitals and a low p95 HTML response; no broken images
• **SEO hygiene:** canonical URLs, a consistent sitemap and correct redirects
• **Forms** (contact, tender, vendor): anti-spam, CSRF/rate limits, secure attachment handling, and delivery monitoring with retries
• **Admin/CMS isolation** from the public site, with MFA and least privilege
• **Privacy:** enquiry-data retention rules and analytics/GTM consent where required
• **Safe backups** and reliable mail routing`,
    next: ["How do I improve website SEO?", "How do I make a website load fast?", "Website security essentials?"],
  },
];
