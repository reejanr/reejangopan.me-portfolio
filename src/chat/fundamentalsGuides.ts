// Software-engineering fundamentals that complement the enterprise playbook: lifecycle, version control,
// design principles, testing practice, DevOps, cloud, networking, frontend, data and AI engineering.
// Written as professional reference explanations (definition → practice → pitfalls). General guidance —
// no claims about Reejan beyond what his services and projects show.
import type { Guide } from "./guides";

export const fundamentalsGuides: Guide[] = [
  {
    topic: "engineering", ask: "What is the software development lifecycle (SDLC)?",
    k: "sdlc software development lifecycle phases requirements design implementation testing deployment maintenance waterfall agile scrum kanban process methodology",
    a: `**Definition.** The SDLC is the structured sequence by which software moves from an idea to a maintained production system.

**Phases**
1. **Requirements** — business goals, user stories, acceptance criteria, constraints and non-functional targets (performance, security, availability)
2. **Design** — architecture, data model, API contracts, UX; recorded as specifications and ADRs
3. **Implementation** — coding against the spec in small, reviewed changes
4. **Verification** — unit, integration, end-to-end, performance and security testing
5. **Release** — CI/CD, staged rollout, monitoring and rollback
6. **Operation & maintenance** — incident response, patching, iteration, retirement

**Methodologies.** *Waterfall* suits fixed, regulated scope. *Agile (Scrum/Kanban)* delivers in short iterations with continuous feedback. Mature teams combine Agile delivery with DevSecOps controls.

**Common pitfalls:** vague acceptance criteria, skipping non-functional requirements, testing only at the end, and no ownership after release.`,
    next: ["How do I write good requirements and specifications?", "What should a CI/CD pipeline include?", "What does enterprise-grade software actually mean?"],
  },
  {
    topic: "engineering", ask: "How do I write good requirements and specifications?",
    k: "requirements specification user stories acceptance criteria prd brd functional non functional requirements spec driven development scope estimation planning",
    a: `**Principle.** A requirement must be testable. If nobody can verify it, it is a wish.

**A professional specification states**
• **Problem and user story** — who needs what, and why
• **Scope and explicit exclusions**
• **Functional requirements** with acceptance criteria (Given / When / Then)
• **Non-functional requirements** — latency targets, availability, security, accessibility, data retention
• **Roles and permissions**, API and data contracts, state transitions and error behaviour
• **Threats, invariants and edge cases**
• **Migration compatibility, metrics, test plan and rollback plan**

**Estimation.** Estimate in ranges, break work into slices deliverable in days, and track risk separately from effort.

**Pitfalls:** gold-plating, hidden assumptions, scope creep without a change process.`,
    next: ["What is the software development lifecycle (SDLC)?", "How do multiple developers or AI agents work on one codebase safely?"],
  },
  {
    topic: "engineering", ask: "How should Git, branching and code review work in a team?",
    k: "git version control branching strategy trunk based development gitflow pull request code review commit messages merge rebase conventional commits codeowners",
    a: `**Version control** records every change, who made it and why, and makes rollback possible.

**Recommended workflow**
• **Short-lived feature branches** off a protected main (trunk-based development) — merge small and often; use feature flags for unfinished work
• **Pull requests** with required reviews, passing CI and CODEOWNERS approval; no direct pushes or force-pushes to main
• **Commit hygiene:** small, cohesive commits with meaningful messages (for example Conventional Commits)
• **Merge strategy:** squash or rebase for linear history; resolve conflicts on the feature branch, not on main
• **Tagging and releases:** semantic versioning, changelogs and tagged release artifacts

**A good code review** checks correctness, security, readability, tests, performance and maintainability — and is respectful and specific. Review the design, not the person.

**Pitfalls:** long-lived branches, giant pull requests, rubber-stamp reviews, secrets committed to history.`,
    next: ["What should a CI/CD pipeline include?", "How do I keep code clean and maintainable?"],
  },
  {
    topic: "engineering", ask: "How do I keep code clean and maintainable?",
    k: "clean code solid principles design patterns dry kiss yagni refactoring technical debt maintainability code quality readability coupling cohesion naming",
    a: `**Core principles**
• **SOLID** — single responsibility, open/closed, Liskov substitution, interface segregation, dependency inversion
• **DRY, KISS, YAGNI** — don't repeat knowledge, keep it simple, build only what is needed
• **High cohesion, low coupling** — modules do one job and depend on abstractions, not internals
• **Clear naming and small functions** — code is read far more often than written
• **Composition over inheritance**; prefer immutability and pure functions where practical

**Design patterns** (Factory, Strategy, Observer, Adapter, Repository, CQRS…) are named solutions to recurring problems — apply them when the problem appears, not in advance.

**Technical debt.** Track it explicitly, refactor continuously under test coverage, and schedule paydown; do not let it accumulate silently.

**Tooling:** formatters, linters, static analysis and type systems enforce the baseline automatically.`,
    next: ["What does a professional testing strategy look like?", "How should Git, branching and code review work in a team?"],
  },
  {
    topic: "engineering", ask: "What does a professional testing strategy look like?",
    k: "testing strategy tdd bdd unit test integration test mocks coverage test automation regression flaky tests quality assurance qa test driven development",
    a: `**Goal.** Fast, trustworthy feedback that a change is safe to ship.

**Strategy**
• Follow the **test pyramid**: many fast unit tests, fewer integration tests, a small set of end-to-end tests on critical journeys
• **TDD / BDD** where the logic is complex — write the failing test first, or specify behaviour in business language
• **Test behaviour, not implementation**; use mocks sparingly and prefer real databases in integration tests
• **Coverage is a signal, not a goal** — review what is *not* covered, especially authorization and money paths
• **Non-functional tests:** performance, security, accessibility and resilience
• **Eliminate flaky tests** immediately; a flaky suite trains people to ignore failures
• **Regression tests** for every production bug

Gate every merge on automated tests in CI.`,
    next: ["What tests does production software need?", "What should a CI/CD pipeline include?"],
  },
  {
    topic: "engineering", ask: "What is DevOps, and how do containers and infrastructure as code fit in?",
    k: "devops docker containers kubernetes terraform infrastructure as code iac ansible deployment environments configuration management gitops pipeline platform engineering",
    a: `**DevOps** unites development and operations around automation, shared ownership and fast, safe delivery.

**Building blocks**
• **Containers (Docker)** — package an application and its dependencies so it runs identically everywhere; keep images small, pinned, non-root and scanned
• **Orchestration (Kubernetes, ECS, serverless)** — only when scale and team maturity justify it
• **Infrastructure as Code (Terraform, Bicep, CloudFormation)** — define environments in version-controlled code, review changes like application code and detect drift
• **Configuration & secrets** — environment-specific config outside code; secrets in a vault or secret manager, never in the repository
• **Environments** — development, staging and production kept as similar as possible
• **GitOps / CD** — the repository is the source of truth; pipelines promote artifacts with approvals

**Principle:** automate anything done twice, and make every deployment repeatable and reversible.`,
    next: ["What should a CI/CD pipeline include?", "How do I choose and run workloads in the cloud?"],
  },
  {
    topic: "engineering", ask: "How do I choose and run workloads in the cloud?",
    k: "cloud computing aws azure gcp iaas paas saas serverless lambda shared responsibility model finops cost optimisation multi cloud regions availability zones",
    a: `**Service models.** *IaaS* (virtual machines, networks), *PaaS* (managed runtimes and databases), *SaaS* (finished software), and *serverless/functions* (pay per execution).

**Selection guidance**
• Prefer **managed services** — you operate less and inherit the provider's resilience
• Understand the **shared responsibility model**: the provider secures the cloud; you secure your configuration, identities and data
• Design for **availability zones**; adopt multi-region only with a clear recovery or latency requirement
• Apply **least-privilege IAM**, private networking and encryption by default
• Practise **FinOps**: tag resources, set budgets and alerts, right-size, and review cost monthly
• Avoid needless lock-in with open standards (containers, SQL, OpenTelemetry) — but don't pay for portability you will never use

**Frameworks:** the AWS Well-Architected Framework's pillars — operational excellence, security, reliability, performance, cost and sustainability — apply to any cloud.`,
    next: ["What is DevOps, and how do containers and infrastructure as code fit in?", "Which infrastructure do I need now and which later?"],
  },
  {
    topic: "engineering", ask: "What networking fundamentals should every engineer know?",
    k: "networking fundamentals tcp ip http https dns tls osi model latency bandwidth cdn firewall vpn load balancing websockets http2 http3 ports subnets",
    a: `• **OSI / TCP-IP model** — link, network (IP), transport (TCP/UDP), application (HTTP, DNS, SMTP)
• **DNS** translates names to IP addresses; TTLs, caching and failover records affect how fast changes propagate
• **TCP** is reliable and ordered; **UDP** is fast and connectionless (QUIC/HTTP-3 builds reliability on UDP)
• **HTTP/HTTPS** — methods, status codes, headers, caching and cookies; **TLS** provides encryption, authentication and integrity
• **Latency vs bandwidth** — round trips usually dominate web performance; reduce them with CDNs, keep-alive and compression
• **Subnets, firewalls, VPNs, NAT** — segment networks, restrict traffic by rule and protect remote access
• **Real-time channels:** WebSockets and server-sent events for live updates
• **Troubleshooting toolkit:** ping, traceroute, dig/nslookup, curl, packet captures

Understanding these makes outages, slow pages and security issues diagnosable instead of mysterious.`,
    next: ["What is the difference between a proxy, load balancer and API gateway?", "What are the most common application security threats?"],
  },
  {
    topic: "engineering", ask: "What are data structures, algorithms and Big-O notation?",
    k: "data structures algorithms big o complexity arrays hash map tree graph sorting searching dynamic programming computer science fundamentals time space",
    a: `**Data structures** organise data for efficient access: arrays, linked lists, stacks, queues, hash maps, trees (including B-trees used by databases), heaps and graphs.

**Algorithms** are step-by-step procedures: searching, sorting, graph traversal, recursion, dynamic programming and greedy methods.

**Big-O** describes how time or memory grows with input size n: O(1) constant, O(log n) binary search, O(n) scan, O(n log n) efficient sorting, O(n²) nested loops, O(2ⁿ) exponential.

**Practical value:** choosing a hash map over a list turns a slow lookup into a constant-time one; understanding B-tree indexes explains why queries speed up; recognising O(n²) loops prevents performance incidents. Measure before optimising — complexity tells you where to look, profiling tells you what to fix.`,
    next: ["How do I keep code clean and maintainable?", "How do I make a website load fast?"],
  },
  {
    topic: "engineering", ask: "How do frontend, backend and full-stack responsibilities differ?",
    k: "frontend backend full stack responsibilities react typescript accessibility core web vitals state management ssr spa rendering api server client architecture",
    a: `**Frontend** — what users see and touch: component architecture, state management, rendering strategy (SSR, SSG, SPA), accessibility (WCAG), responsive and internationalised UI, and **Core Web Vitals** performance.

**Backend** — business logic, APIs, persistence, authentication/authorization, background jobs and integrations; it is the *trust boundary*, so all validation and permission checks live here.

**Full-stack engineering** spans both plus the data and deployment layers: designing end-to-end features, contracts between client and server (typed schemas), and the operational concerns that keep them healthy.

**Professional standards:** typed languages (TypeScript), schema validation at the boundary, accessible semantic HTML, keyboard support, error and loading states, and observability on both client and server. Never trust client-side checks for security.`,
    next: ["API design checklist for production?", "How do I make a website load fast?"],
  },
  {
    topic: "engineering", ask: "What is event-driven architecture and domain-driven design?",
    k: "event driven architecture ddd domain driven design cqrs event sourcing saga bounded context aggregates messaging pub sub microservices choreography orchestration",
    a: `**Domain-driven design (DDD)** aligns software with the business: a shared *ubiquitous language*, **bounded contexts** that own their model and data, and **aggregates** that protect invariants inside one transaction boundary. Use it where the domain is genuinely complex.

**Event-driven architecture** has components publish facts (events) that others react to, decoupling producers from consumers.
• **Pub/sub and streaming** (queues, Kafka-style logs) for fan-out
• **CQRS** — separate write and read models when their needs diverge
• **Event sourcing** — store the sequence of events as the source of truth (powerful, but costly to operate)
• **Sagas** — coordinate multi-step business transactions across services with compensating actions instead of distributed locks

**Trade-offs:** eventual consistency, harder debugging and duplicate delivery. Use the transactional outbox and idempotent consumers, and adopt these patterns only where the problem demands them.`,
    next: ["How do queues, retries and idempotency work?", "Do I need Kubernetes, microservices or sharding?"],
  },
  {
    topic: "engineering", ask: "How do data engineering, analytics and databases differ (SQL vs NoSQL, OLTP vs OLAP)?",
    k: "sql nosql oltp olap data warehouse data lake etl elt analytics bigquery snowflake postgres mongodb redis normalization schema design data modelling",
    a: `• **Relational (SQL)** — structured data, joins and ACID transactions: the default for business systems (PostgreSQL, MySQL, SQL Server)
• **NoSQL** — document (MongoDB), key-value (Redis, DynamoDB), wide-column and graph stores; choose for a specific access pattern or scale need, not by fashion
• **OLTP** — many small, concurrent transactions (the application database); **OLAP** — large analytical scans (a data warehouse such as BigQuery or Snowflake)
• **Data modelling** — normalise for integrity, denormalise deliberately for read performance; index for real query patterns
• **ETL/ELT pipelines** move data from operational systems into warehouses; keep them idempotent, observable and tested
• **Data quality & governance** — ownership, lineage, access control and retention

Keep analytics workloads off the primary transactional database.`,
    next: ["Which database should I use?", "Read replicas, partitioning or sharding?"],
  },
  {
    topic: "engineering", ask: "What does AI and machine-learning engineering involve?",
    k: "ai engineering machine learning llm rag embeddings vector database mlops evaluation prompt engineering fine tuning inference guardrails model deployment",
    a: `**Applied AI engineering** turns models into reliable products.
• **LLM applications** — prompt design, structured outputs, tool use, and **retrieval-augmented generation (RAG)** with embeddings and a vector or keyword index to ground answers in your own data
• **Evaluation** — automated test sets, regression checks and human review; you cannot improve what you do not measure
• **MLOps** — versioned data and models, reproducible training, deployment, monitoring for drift and rollback
• **Reliability and cost** — caching, fallbacks, timeouts, rate limits, token budgets and latency monitoring
• **Safety and security** — prompt-injection defences, least-privilege tools, PII handling and human approval for risky actions
• **Governance** — document intended use, limitations and data provenance

Choose the simplest approach that meets the need: a rules engine or search index often beats a model.`,
    next: ["How should an AI assistant be secured against prompt injection?", "How can a business use AI?"],
  },
  {
    topic: "engineering", ask: "How do I manage technical debt, documentation and software maintenance?",
    k: "technical debt documentation maintenance legacy code refactoring runbooks readme onboarding deprecation versioning dependency updates lifecycle end of life support",
    a: `**Technical debt** is the future cost of shortcuts taken during delivery. Manage it like financial debt: make it visible, rank it by interest (how much it slows or endangers you), and pay it down continuously.

**Maintenance practices**
• **Dependency hygiene** — automated update pull requests, vulnerability scanning and planned upgrades before end-of-life
• **Refactor under tests**, in small safe steps, alongside feature work
• **Documentation as a product:** README and onboarding guide, architecture overview, ADRs, API reference, runbooks and post-incident notes — kept in the repository and reviewed with code
• **Deprecation policy** — announce, support a migration path, then remove
• **Ownership** — every service has a named team and on-call contact

Legacy systems are modernised incrementally (strangler pattern) rather than rewritten in one risky step.`,
    next: ["How do I keep code clean and maintainable?", "How do I run a production-readiness audit?"],
  },
  {
    topic: "engineering", ask: "What are accessibility, internationalisation and performance standards for web products?",
    k: "accessibility wcag a11y aria internationalisation i18n localisation rtl arabic performance core web vitals lcp cls inp seo semantic html web standards responsive",
    a: `• **Accessibility (WCAG 2.2 AA)** — semantic HTML, keyboard operability, visible focus, sufficient contrast, text alternatives, ARIA only where native elements cannot do the job; test with a screen reader and automated tools
• **Internationalisation (i18n)** — externalise strings, support right-to-left layouts (essential for Arabic), locale-aware dates, numbers and currencies, and Unicode throughout
• **Performance** — optimise **Core Web Vitals** (LCP, INP, CLS): compress and lazy-load images, ship less JavaScript, cache aggressively and render critical content on the server
• **SEO** — crawlable HTML, canonical URLs, structured data, fast pages and a sitemap
• **Responsive design** — mobile-first layouts that work at every width

These are quality requirements, not polish: they widen your audience and reduce legal and business risk.`,
    next: ["How do I make a website load fast?", "How do I improve website SEO?"],
  },
];
