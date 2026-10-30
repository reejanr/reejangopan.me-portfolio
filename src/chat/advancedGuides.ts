// Advanced and senior-level software-engineering topics: distributed systems, concurrency, multi-tenancy,
// observability, incident management, compliance, threat modelling, release engineering, resilience testing,
// mobile/embedded/game engineering, language selection and technical leadership. General guidance only.
import type { Guide } from "./guides";

export const advancedGuides: Guide[] = [
  {
    topic: "engineering", ask: "What are the core principles of distributed systems (CAP, consistency, consensus)?",
    k: "distributed systems cap theorem pacelc consistency models eventual consistency strong consistency consensus raft paxos clocks ordering partition tolerance quorum replication leader election",
    a: `**Definition.** A distributed system is several machines cooperating over an unreliable network. Its defining feature is *partial failure*: some parts fail while others keep running.

**Key concepts**
• **CAP theorem** — during a network partition a system must choose between **consistency** (every read sees the latest write) and **availability** (every request gets an answer). **PACELC** adds that, even without a partition, you trade latency against consistency.
• **Consistency models** — strong (linearizable), sequential, causal and eventual; choose the weakest model the business rule tolerates.
• **Replication** — leader/follower, multi-leader or leaderless; quorum reads and writes (R + W > N) tune the trade-off.
• **Consensus (Raft, Paxos)** — lets nodes agree on a value or leader despite failures; underpins coordination services and many databases.
• **Time and ordering** — physical clocks drift; use logical or vector clocks, or database-assigned sequence numbers, for ordering.
• **The eight fallacies** — the network is *not* reliable, latency is not zero, bandwidth is not infinite, topology changes, and so on.

**Practice:** use timeouts, idempotency and retries with backoff; avoid distributed transactions where a saga or outbox suffices; prefer a single well-run database until measurements say otherwise.`,
    next: ["Event-driven architecture and domain-driven design?", "Read replicas, partitioning or sharding?", "How do queues, retries and idempotency work?"],
  },
  {
    topic: "engineering", ask: "What should every engineer know about concurrency and operating systems?",
    k: "concurrency parallelism threads processes async await event loop locks mutex deadlock race condition memory management operating system scheduler context switch file descriptors",
    a: `**Concurrency** is structuring a program to handle many tasks at once; **parallelism** is executing them simultaneously on multiple cores.

**Essentials**
• **Processes vs threads** — processes are isolated; threads share memory (faster, but riskier)
• **Async / event loop models** (Node.js, Python asyncio) handle many I/O-bound tasks on few threads; CPU-bound work needs worker threads or processes
• **Race conditions and shared state** — protect with locks, atomic operations, immutable data or message passing
• **Deadlock** — avoid by acquiring locks in a consistent order and using timeouts
• **Memory** — stack vs heap, garbage collection, leaks and pressure; profile before tuning
• **OS resources** — file descriptors, sockets, scheduler behaviour and context-switch cost; ulimits and pool sizes matter under load
• **Backpressure** — bound queues and concurrency so overload degrades gracefully

**Diagnosis tools:** profilers, flame graphs, thread dumps, strace/perf and heap snapshots.`,
    next: ["How do I make an app reliable under failure?", "What are data structures, algorithms and Big-O notation?"],
  },
  {
    topic: "engineering", ask: "How do I design a multi-tenant SaaS architecture?",
    k: "multi tenant multitenancy saas tenant isolation schema per tenant database per tenant shared schema noisy neighbour tenant id row level security tenant aware rate limit onboarding",
    a: `**Multi-tenancy** serves many customers from one platform while keeping their data and performance isolated.

**Isolation models**
• **Shared schema** (a tenant_id on every row) — cheapest and simplest to scale; requires strict enforcement with Row Level Security and tenant-scoped queries
• **Schema-per-tenant** — stronger separation, harder migrations at scale
• **Database-per-tenant** — strongest isolation and per-customer restore; highest cost and operational load
• **Hybrid** — shared by default, dedicated for regulated or very large customers

**Design requirements**
• Derive the tenant from the authenticated identity server-side — never from a client-supplied value
• Tenant-scoped caches, search indexes, file paths and background jobs
• **Noisy-neighbour control:** per-tenant rate limits, quotas and fair job scheduling
• Per-tenant backup/export/deletion, audit logs and usage metering
• Automated, tested onboarding and offboarding

**Test:** write negative tests proving tenant A can never read or change tenant B's data.`,
    next: ["How do I secure authentication and authorization?", "How do I keep data correct (ACID, constraints, concurrency)?"],
  },
  {
    topic: "engineering", ask: "How do I build observability with OpenTelemetry, tracing and alerting?",
    k: "observability opentelemetry tracing distributed tracing logs metrics structured logging correlation id alerting dashboards prometheus grafana datadog sentry apm instrumentation",
    a: `**Observability** lets you ask new questions about a running system without shipping new code. Its three pillars are **metrics**, **logs** and **traces**.

**Implementation**
• **Instrument once with OpenTelemetry** — a vendor-neutral standard for traces, metrics and logs; export to your backend of choice
• **Structured logs** (JSON) with a correlation/request ID on every line; redact secrets and personal data
• **Distributed tracing** — follow one request across services to find the slow or failing hop
• **RED and USE methods** — Rate/Errors/Duration for services; Utilisation/Saturation/Errors for resources
• **Alert on symptoms** (SLO burn rate, user-facing errors), not every cause; every alert needs an owner and a runbook
• **Dashboards per journey**, plus cost, security and business metrics
• **Cardinality and retention** — avoid unbounded labels and unlimited log retention

Add client-side error tracking and real-user monitoring so front-end problems are visible too.`,
    next: ["What are SLIs, SLOs and the golden signals?", "What is the process for incident management and on-call?"],
  },
  {
    topic: "engineering", ask: "What is the process for incident management and on-call?",
    k: "incident management on call severity levels runbook postmortem blameless rca incident commander escalation status page mttr mttd communication outage response",
    a: `**Goal.** Detect quickly, contain the impact, restore service, then learn.

**Process**
1. **Detect** — SLO-based alerts and clear severity levels (for example SEV1 full outage, SEV2 major degradation, SEV3 minor)
2. **Triage and declare** — assign an **incident commander**, a communications lead and technical responders
3. **Mitigate first, diagnose second** — roll back, disable a feature flag, fail over or scale; restore service before finding root cause
4. **Communicate** — regular updates to stakeholders and a public status page for customer-facing outages
5. **Resolve and verify** against the SLOs
6. **Blameless postmortem** — timeline, root and contributing causes, what went well, and tracked action items with owners and dates

**Foundations:** a sustainable on-call rotation, up-to-date runbooks, escalation paths, break-glass access and regular game-day drills. Track **MTTD** and **MTTR** and review recurring incidents quarterly.`,
    next: ["What are SLIs, SLOs and the golden signals?", "How do I plan backups and disaster recovery (RPO and RTO)?"],
  },
  {
    topic: "engineering", ask: "How do SOC 2, ISO 27001, PCI-DSS and data-protection laws apply to software?",
    k: "compliance soc 2 iso 27001 pci dss gdpr pdpl uae data protection law hipaa audit controls certification governance risk policy evidence security framework",
    a: `**Compliance** shows, through independent evidence, that you operate to a recognised standard. Technical controls support it but do not equal it.

• **SOC 2** — an auditor's report on security, availability, confidentiality, processing integrity and privacy controls; common for SaaS sold to enterprises
• **ISO/IEC 27001** — a certifiable information-security management system (ISMS) built on risk assessment and continual improvement
• **PCI-DSS** — mandatory when you store, process or transmit card data; the pragmatic route is to use a hosted payment provider so card data never touches your servers
• **GDPR and the UAE PDPL** — lawful basis, data-subject rights, retention limits, breach notification and cross-border transfer rules
• **NIST SSDF and OWASP ASVS** — secure-development baselines

**Engineering enablers:** access reviews, change management through pull requests, audit logs, encryption, vendor inventory, incident records and automated evidence collection.

Always involve legal counsel and an accredited auditor — a checklist alone never establishes compliance.`,
    next: ["How should I classify and protect sensitive data?", "What are the most common application security threats?"],
  },
  {
    topic: "engineering", ask: "How do I perform threat modelling with STRIDE?",
    k: "threat modelling threat model stride data flow diagram spoofing tampering repudiation information disclosure denial of service elevation of privilege dread attack tree security design review pasta",
    a: `**Threat modelling** finds security flaws at design time, when they are cheapest to fix.

**Method**
1. **Diagram** the system: actors, processes, data stores, data flows and **trust boundaries**
2. **Identify threats** per element with **STRIDE**
   • **S**poofing identity • **T**ampering with data • **R**epudiation (denying an action) • **I**nformation disclosure • **D**enial of service • **E**levation of privilege
3. **Rate** by likelihood and impact (for example DREAD or a simple risk matrix)
4. **Mitigate** — authentication, integrity checks, audit logs, encryption, rate limits, least privilege
5. **Verify** with tests and review, and record residual risk with an owner

**Example:** an upload endpoint — spoofing (stolen session) → MFA and session binding; tampering (malicious file) → type checks and malware scanning; disclosure (guessable URLs) → signed, expiring links; DoS (huge files) → size limits and quotas.

Revisit the model whenever architecture, data flows or integrations change.`,
    next: ["What are the most common application security threats?", "How do I secure authentication and authorization?"],
  },
  {
    topic: "engineering", ask: "How do feature flags, canary releases and API versioning work?",
    k: "release engineering feature flags feature toggles canary release blue green deployment rolling deployment semantic versioning api versioning deprecation rollback dark launch trunk based",
    a: `**Release engineering** separates *deploying* code from *releasing* functionality, which lowers risk.

• **Feature flags** — ship code switched off, enable gradually by user, tenant or percentage; provide a kill switch; remove stale flags promptly
• **Canary release** — send a small share of traffic to the new version, compare error and latency metrics, then expand or roll back automatically
• **Blue/green** — run two production environments and switch traffic instantly; instant rollback, higher cost
• **Rolling deployment** — replace instances gradually behind health checks
• **Semantic versioning (MAJOR.MINOR.PATCH)** — communicate breaking changes; maintain a changelog
• **API versioning and deprecation** — keep old versions working during a published sunset window; use additive, backward-compatible changes by default
• **Rollback design** — reversible migrations (expand/contract), immutable artifacts and a rehearsed procedure

Tie promotion to automated health signals, not to confidence.`,
    next: ["What should a CI/CD pipeline include?", "How do I deploy database changes with zero downtime?"],
  },
  {
    topic: "engineering", ask: "What is chaos engineering and resilience testing?",
    k: "chaos engineering resilience testing fault injection game day failure testing chaos monkey steady state blast radius disaster drill gremlin litmus",
    a: `**Chaos engineering** deliberately injects controlled failures to prove a system tolerates them.

**Method**
1. Define the **steady state** with measurable SLIs
2. Form a hypothesis: "if X fails, users still succeed"
3. **Inject the fault** with a limited **blast radius** — kill an instance, add latency, drop a dependency, fill a disk, expire a certificate, partition the network
4. Observe, compare against the steady state, and fix weaknesses
5. Automate recurring experiments and run **game days** with the on-call team

**Rules:** begin in staging, always have an abort switch, announce experiments, and never inject failure in production without approval and monitoring. The aim is confidence and learning, not breaking things for sport.`,
    next: ["How do I make an app reliable under failure?", "How do I load-test an application?"],
  },
  {
    topic: "engineering", ask: "What differs in mobile, embedded and game development?",
    k: "mobile development ios android flutter react native embedded systems firmware rtos iot game development unity unreal game loop cross platform app store native",
    a: `**Mobile (iOS/Android)**
• Choose native (Swift, Kotlin) for platform depth or cross-platform (Flutter, React Native) for shared code
• Design for intermittent connectivity: offline-first storage, sync and conflict resolution
• Mind battery, memory, permissions, secure storage (Keychain/Keystore), certificate pinning and app-store review rules
• Ship with staged rollouts, crash reporting and forced-upgrade paths for old API versions

**Embedded / IoT**
• Resource-constrained firmware in C/C++ or Rust, often on an RTOS; deterministic timing matters
• Secure boot, signed over-the-air updates, device identity and a plan for fleets in the field
• Test on hardware-in-the-loop, and design for power and connectivity limits

**Game development**
• A real-time **game loop** (input → update → render) with a frame budget; engines such as Unity or Unreal
• Performance profiling, asset pipelines, networking with prediction and reconciliation, and anti-cheat considerations

In every case, treat the client as untrusted and keep authoritative logic on the server.`,
    next: ["How do frontend, backend and full-stack responsibilities differ?", "How do I secure authentication and authorization?"],
  },
  {
    topic: "engineering", ask: "How should I choose a programming language and framework?",
    k: "choose programming language framework python java go rust typescript csharp node dotnet spring django selection criteria technology evaluation ecosystem hiring performance",
    a: `**Select on criteria, not preference**
• **Problem fit** — typed, compiled languages (Java, C#, Go, Rust) for performance and large codebases; TypeScript for full-stack web; Python for data, automation and AI
• **Team skills and hiring market** — the best language is one your team can run well for years
• **Ecosystem and maturity** — libraries, security patches, long-term support and community
• **Operational fit** — startup time, memory use, deployment model, observability support
• **Safety** — static typing and memory safety reduce whole classes of defects
• **Total cost** — licensing, tooling, training and migration risk

**Process:** time-boxed proof of concept against the hardest requirement, an ADR recording the decision, and a standard set of supported technologies to avoid sprawl.

Boring, proven technology is usually the right choice for core business systems.`,
    next: ["How do I document architecture decisions (ADRs)?", "Node.js, Python or .NET for the back end?"],
  },
  {
    topic: "engineering", ask: "What does technical leadership involve for a senior engineer?",
    k: "technical leadership senior engineer staff engineer mentoring code review culture estimation stakeholder communication trade offs build vs buy tech lead engineering manager influence career growth",
    a: `Seniority is measured by **impact and judgement**, not only by code volume.

**Responsibilities**
• **Technical direction** — define architecture, write ADRs and RFCs, and reduce risk before it becomes an incident
• **Trade-off decisions** — build vs buy, speed vs quality, consistency vs availability — explained in business terms
• **Estimation and planning** — give ranges, expose assumptions, slice work and communicate risk early
• **Mentoring and review culture** — raise the whole team's bar through constructive reviews, pairing and documentation
• **Stakeholder communication** — translate between engineering, product and executives; say no with alternatives
• **Quality ownership** — tests, observability, security and operability are part of "done"
• **Delivery leadership** — unblock others, manage dependencies and own outcomes, including mistakes

**Habits:** write things down, disagree and commit, measure results, and keep learning.`,
    next: ["What is the software development lifecycle (SDLC)?", "Build vs buy: SaaS or custom software?", "How do I manage technical debt, documentation and software maintenance?"],
  },
];
