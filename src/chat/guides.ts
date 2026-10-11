// Practical guides for the on-site assistant: choosing a stack, scaling, planning a
// website/app, and running a startup's tech. General advice — never claims about Reejan
// beyond what his services and projects show.

export type Topic = "stacks" | "scaling" | "planning" | "startup" | "security";
export type Guide = { topic: Topic; ask: string; k: string; a: string; next?: string[] };

const S = "https://reejangopan.me/services";

export const topicLabels: Record<Topic, string> = {
  stacks: "Tech stacks",
  scaling: "Scaling",
  planning: "Before you build",
  startup: "Startups & automation",
  security: "Security",
};

export const guides: Guide[] = [
  // ======================= TECH STACKS =======================
  {
    topic: "stacks", ask: "Best tech stack for a business website?",
    k: "business website company website corporate site landing page stack build website tech stack for website marketing site brochure",
    a: `For a fast, SEO-friendly business website:
• **Front end:** React with Next.js or Vite, prerendered to static HTML — loads fast and ranks well
• **Styling:** Tailwind CSS for a consistent design system
• **Content:** a headless CMS (Sanity, Contentful, Strapi) if non-developers will edit pages; WordPress if the team needs its plugin ecosystem
• **Hosting:** Vercel, Netlify or Cloudflare Pages — global CDN, HTTPS and preview deploys, often free to start
• **Must-haves:** technical SEO, Google Analytics 4, a Google Business Profile, contact forms with spam protection

**Why:** prerendered pages are faster, cheaper to host and safer than a server rendering every request.
Reejan builds this kind of site — e.g. usfdemolition.com with 200+ prerendered routes: ${S}#full-stack-development`,
    next: ["How do I improve website SEO?", "Website builder or custom website?", "What do I need before building a website?"],
  },
  {
    topic: "stacks", ask: "Best tech stack for an e-commerce store?",
    k: "ecommerce e-commerce online store shop shopify woocommerce sell products payments cart",
    a: `Pick by size and how custom it needs to be:
• **Most stores:** Shopify — payments, inventory, taxes, security and PCI compliance are handled for you
• **Already on WordPress:** WooCommerce
• **Custom design at scale:** headless Shopify (or Medusa) with a Next.js front end
• **Truly unique flows:** custom build — Next.js + Stripe + PostgreSQL — only when off-the-shelf can't do it

**Why:** payments, fraud and compliance are hard to get right; buy them unless selling online *is* your unique advantage.
Add GA4 e-commerce tracking, product schema markup and fast product images from day one.`,
    next: ["Build vs buy: SaaS or custom software?", "How do I improve website SEO?", "What does a marketing tech stack need?"],
  },
  {
    topic: "stacks", ask: "Best tech stack for a SaaS product?",
    k: "saas software as a service product startup app subscription multi tenant platform b2b",
    a: `A proven, productive SaaS stack:
• **Front end:** React + Next.js + TypeScript
• **Back end:** Node.js (or Python if the product is data/AI-heavy)
• **Database:** PostgreSQL — Supabase gives you Postgres, auth, storage and real-time in one service
• **Auth & tenancy:** Supabase Auth / Clerk / Auth0, with Row Level Security to keep each customer's data separate
• **Billing:** Stripe subscriptions
• **Background work:** a job queue for emails, reports and imports
• **Ops:** Vercel or AWS, error tracking (Sentry), uptime monitoring, automated backups

**Why:** one language (TypeScript) end to end, a database that handles relationships and transactions properly, and managed services so a small team ships fast.
Related: ${S}#backend-databases`,
    next: ["How do I scale a web app?", "Monolith or microservices?", "Which database should I use?"],
  },
  {
    topic: "stacks", ask: "Best way to build a mobile app?",
    k: "mobile app android ios iphone app development react native flutter expo native pwa cross platform",
    a: `Three good routes:
• **Cross-platform (most apps):** React Native with Expo, or Flutter — one codebase for Android and iOS
• **Native (Swift / Kotlin):** for heavy device features, top performance or complex animations
• **PWA:** an installable web app — cheapest and no app-store review, but limited access to device features

**Back end:** Supabase or Firebase for auth, database and push notifications.
**Why:** cross-platform cuts cost and time roughly in half for typical business apps.
Reejan's WAQTI runs as an Android app, a PWA and a web dashboard on one PostgreSQL back end: https://reejangopan.me/projects/waqti-workforce-management-platform`,
    next: ["What is a Progressive Web App (PWA)?", "Best tech stack for a SaaS product?", "What do I need before building a web app?"],
  },
  {
    topic: "stacks", ask: "Best tech stack for internal business tools?",
    k: "internal tool tools admin panel dashboard back office business app company app hr app attendance inventory workflow app",
    a: `For internal tools (attendance, HR, inventory, approvals, dashboards):
• **Simple forms & approvals:** low-code first — Power Apps + Power Automate if you're on Microsoft 365, or Retool / AppSheet
• **Business-critical or complex:** React + TypeScript + PostgreSQL/Supabase with role-based access and Row Level Security
• **Sign-in:** single sign-on with Microsoft Entra ID or Google so staff use their work accounts
• **Must-haves:** audit logs, exports to Excel/PDF, mobile-friendly screens for field staff

**Why:** low-code is fastest for simple workflows; custom code pays off when logic is complex (overtime rules, payroll) or many people use it daily.
Reejan built WAQTI this way: ${S}#business-systems`,
    next: ["How can a business automate its processes?", "Build vs buy: SaaS or custom software?", "Tell me about WAQTI"],
  },
  {
    topic: "stacks", ask: "Tech stack for an AI app or chatbot?",
    k: "ai app chatbot chat bot llm application gpt claude gemini assistant rag build ai generative ai stack",
    a: `A practical AI application stack:
• **Model:** an LLM API (Claude, GPT or Gemini) — no need to train your own
• **Your data:** RAG — split documents, create embeddings, store them in a vector database (pgvector in PostgreSQL, or Pinecone), retrieve the relevant pieces for each question
• **Back end:** Python (FastAPI) or Node.js, with streaming responses
• **Guardrails:** clear system prompt, grounding in your data, rate limits, spend limits, human review for important actions
• **Quality:** a test set of real questions to measure answers before and after changes

**Why:** grounding answers in your own data makes them accurate and up to date.
Fun fact: I'm a lightweight version of this — Reejan built me to search a knowledge base in your browser. Related: ${S}#ai-automation`,
    next: ["What is RAG (Retrieval-Augmented Generation)?", "How does this chatbot work?", "How can a business use AI?"],
  },
  {
    topic: "stacks", ask: "Tech stack for real-time apps (chat, live updates)?",
    k: "real time realtime live updates chat app websocket websockets notifications collaboration socket",
    a: `For live chat, notifications, dashboards or collaboration:
• **Managed:** Supabase Realtime, Firebase or Pusher/Ably — easiest to run
• **Self-built:** Node.js with WebSockets (Socket.IO), Redis pub/sub to share events between servers
• **Database:** PostgreSQL for the records, Redis for presence and fast counters

**Why:** WebSockets keep a connection open so updates arrive instantly instead of the app polling every few seconds.`,
    next: ["How do I scale a web app?", "What is caching and why does it matter?", "Best tech stack for a SaaS product?"],
  },
  {
    topic: "stacks", ask: "Best stack for dashboards and reports?",
    k: "dashboard dashboards reporting reports analytics bi business intelligence charts kpi power bi metabase data",
    a: `Start with the simplest thing that answers the business question:
• **BI tools (fastest):** Power BI (great with Microsoft 365), Looker Studio (free, Google), Metabase (open source)
• **Custom dashboard in your app:** React + a chart library (Recharts, ECharts) on PostgreSQL views
• **Heavy data:** a data warehouse (BigQuery, Snowflake) fed by scheduled pipelines

**Why:** a BI tool often delivers in days what a custom dashboard takes weeks to build; go custom when the dashboard is part of your product.`,
    next: ["Which database should I use?", "How can a business automate its processes?", "Build vs buy: SaaS or custom software?"],
  },
  {
    topic: "stacks", ask: "Node.js, Python or .NET for the back end?",
    k: "backend back end choose node python dotnet .net java which language server side api language comparison",
    a: `All three are excellent — choose by team and problem:
• **Node.js (TypeScript):** one language front to back, great for APIs and real-time; huge ecosystem
• **Python:** best for data, automation and AI (FastAPI, Django, Flask)
• **.NET (C#) / Java:** strongly typed and mature — common in enterprises and Microsoft-centric companies

**Rule of thumb:** use what your team knows best; switch only for a clear reason (e.g. Python for heavy AI/data work).
Reejan works with Node.js, Python (Flask) and ASP.NET Core: https://reejangopan.me/skills`,
    next: ["Which database should I use?", "Monolith or microservices?", "Best tech stack for a SaaS product?"],
  },
  {
    topic: "stacks", ask: "Which database should I use?",
    k: "which database choose database pick database right database sql vs nosql postgresql mongodb mysql firebase redis vector database comparison",
    a: `Default to **PostgreSQL** for business data, then add others only when needed:
• **PostgreSQL / MySQL (SQL):** relationships, transactions, reporting — orders, staff, payroll, invoices
• **MongoDB / Firestore (NoSQL):** flexible documents, fast prototyping, data without fixed structure
• **Redis:** caching, sessions, queues, real-time counters
• **Vector database (pgvector, Pinecone):** AI search over embeddings

**Why:** most business data is relational — SQL keeps it consistent and easy to report on. Supabase adds auth and APIs on top of Postgres.`,
    next: ["What is PostgreSQL?", "How do I scale a database?", "What is Supabase?"],
  },
  {
    topic: "stacks", ask: "Where should I host my website or app?",
    k: "hosting where host deploy deployment server vercel aws azure netlify cloudflare vps cheap hosting cloud provider",
    a: `Match hosting to the project:
• **Websites & front ends:** Vercel, Netlify or Cloudflare Pages — global CDN, HTTPS, free tiers
• **APIs & full apps:** Vercel/serverless functions for light back ends; AWS, Azure or Google Cloud for full control and enterprise needs
• **Databases:** managed services (Supabase, AWS RDS, Azure Database) — backups and updates handled for you
• **VPS (e.g. a Linux server):** cheapest for steady workloads, but you handle updates, security and backups

**Why:** managed platforms trade a little cost for far less maintenance and downtime.`,
    next: ["How do I scale a web app?", "How do I keep cloud costs low?", "Website security essentials?"],
  },
  {
    topic: "stacks", ask: "Fastest way to build an MVP?",
    k: "mvp minimum viable product prototype validate idea quick launch fast startup first version no code",
    a: `To validate an idea quickly:
• **No-code to test demand:** Webflow / Framer landing page + a waitlist form, or Bubble / Glide for a clickable product
• **Code MVP:** Next.js + Supabase + Vercel + Stripe — auth, database, hosting and payments in days, not months
• **Scope:** one user type, one core workflow, one success metric; skip admin panels and edge cases

**Why:** the goal of an MVP is learning, not perfection — ship, measure, then invest in what users actually use.`,
    next: ["What do I need before building a web app?", "Best tech stack for a SaaS product?", "How long does it take to build a website or app?"],
  },
  {
    topic: "stacks", ask: "Monolith or microservices?",
    k: "monolith microservices architecture modular monolith service oriented split services",
    a: `Start with a **modular monolith** — one codebase and deployment, organised into clear modules.
• **Monolith:** simpler to build, test, deploy and debug — right for almost every new product
• **Microservices:** independent services and teams; worth it only at larger scale, when parts need to scale or deploy separately

**Why:** microservices add networking, monitoring and data-consistency complexity. Split out a service only when there's a clear, measured reason.`,
    next: ["How do I scale a web app?", "Node.js, Python or .NET for the back end?", "What are queues and background jobs?"],
  },
  {
    topic: "stacks", ask: "React, Next.js, Vue or Angular?",
    k: "react vs next vue angular svelte framework comparison which frontend framework choose front end",
    a: `• **React:** the most widely used UI library — huge ecosystem and hiring pool
• **Next.js:** React plus routing, server rendering and static generation — the default for React websites and apps that need SEO
• **Vue / Nuxt:** approachable and elegant, popular with smaller teams
• **Angular:** an opinionated, all-in-one framework favoured by large enterprises
• **Svelte / SvelteKit:** very small and fast, smaller ecosystem

**Why React/Next.js usually:** mature tooling, TypeScript support and talent availability. Reejan builds with React and Next.js.`,
    next: ["What is React?", "What is Next.js?", "Best tech stack for a business website?"],
  },
  {
    topic: "stacks", ask: "Website builder or custom website?",
    k: "website builder wix squarespace webflow wordpress template custom website vs builder diy",
    a: `• **Builders (Wix, Squarespace, Webflow):** fastest and cheapest for a simple brochure site you edit yourself
• **WordPress:** flexible with thousands of plugins — needs regular updates and security care
• **Custom (React/Next.js):** best speed, SEO, security and unique features; needs a developer for changes unless you add a CMS

**Choose custom when:** performance and SEO drive leads, you need integrations (CRM, booking, portals), or the site is part of your product.`,
    next: ["Best tech stack for a business website?", "What do I need before building a website?", "How much does a website cost?"],
  },

  // ======================= SCALING =======================
  {
    topic: "scaling", ask: "How do I scale a web app?",
    k: "scale scaling scalable scalability grow traffic users performance handle more users high traffic load",
    a: `Scale in this order — measure first, then fix the real bottleneck:
1. **Measure:** monitoring, error tracking and slow-query logs
2. **Cache & CDN:** serve static files from a CDN; cache expensive results (Redis)
3. **Fix the database:** indexes, efficient queries, connection pooling
4. **Go stateless & horizontal:** run several app servers behind a load balancer (or serverless that autoscales)
5. **Move slow work to queues:** emails, reports and imports run in the background
6. **Read replicas:** send read-heavy traffic to database copies
7. **Split services last:** only the parts that genuinely need independent scaling

**Why this order:** the cheapest fixes (caching, indexes) usually give the biggest wins.`,
    next: ["What is caching and why does it matter?", "How do I scale a database?", "What are queues and background jobs?"],
  },
  {
    topic: "scaling", ask: "What is caching and why does it matter?",
    k: "cache caching redis cdn browser cache memoization speed up invalidation",
    a: `Caching stores a result so you don't compute or fetch it again:
• **Browser cache:** files stay on the visitor's device
• **CDN cache:** pages and assets served from a location near the visitor (Cloudflare, Vercel)
• **Application cache:** Redis holds expensive query results or sessions
• **Database cache:** materialised views for heavy reports

**Why:** it cuts response times and server cost dramatically. The hard part is invalidation — decide when cached data must refresh.`,
    next: ["How do I scale a web app?", "What is Cloudflare?", "How do I scale a database?"],
  },
  {
    topic: "scaling", ask: "How do I scale a database?",
    k: "scale scaling slow database replicas sharding partitioning connection pooling pgbouncer query performance",
    a: `Step by step:
1. **Indexes** on columns you filter and join by — the biggest, cheapest win
2. **Fix slow queries** — avoid fetching far more data than you need; paginate
3. **Connection pooling** (PgBouncer / Supabase pooler) so many app servers share connections
4. **Caching** for frequently read data
5. **Read replicas** for reporting and read-heavy traffic
6. **Partitioning** very large tables (e.g. by month)
7. **Sharding** — splitting data across servers — only at very large scale

Reejan does PostgreSQL query analysis and index optimisation in production.`,
    next: ["What is database indexing?", "What is caching and why does it matter?", "Which database should I use?"],
  },
  {
    topic: "scaling", ask: "What are queues and background jobs?",
    k: "queue queues background job jobs worker workers async sqs rabbitmq bullmq cron scheduled tasks",
    a: `A queue lets your app hand slow work to background workers instead of making users wait:
• **Examples:** sending emails, generating PDFs and payslips, importing spreadsheets, resizing images, syncing with other systems
• **Tools:** AWS SQS, RabbitMQ, BullMQ (Redis), or scheduled cron jobs for nightly work

**Why:** pages stay fast, work survives restarts (it's retried), and you can add workers when volume grows.`,
    next: ["How do I scale a web app?", "Monolith or microservices?", "How can a business automate its processes?"],
  },
  {
    topic: "scaling", ask: "How do I keep my app online (uptime, backups)?",
    k: "uptime availability high availability backup backups disaster recovery downtime redundancy failover rpo rto",
    a: `• **Automated backups** with point-in-time recovery — and test restoring them
• **Redundancy:** run across multiple availability zones; managed databases make this easy
• **Monitoring & alerts:** uptime checks, error tracking, notifications to your phone
• **Safe deploys:** CI/CD, preview environments and quick rollbacks
• **Know your targets:** how much data you can lose (RPO) and how long you can be down (RTO)

Reejan maintains 99%+ uptime across servers, hosting and email at USF Group.`,
    next: ["What should I monitor in production?", "Website security essentials?", "Where should I host my website or app?"],
  },
  {
    topic: "scaling", ask: "How do I make a website load fast?",
    k: "fast website speed slow website page speed optimisation optimization performance core web vitals load time lighthouse",
    a: `• **Prerender or cache pages** so the server sends ready-made HTML
• **Optimise images:** modern formats (WebP/AVIF), correct sizes, lazy-load below the fold
• **Ship less JavaScript:** code-split, remove unused libraries
• **Fonts:** self-host, preload the main ones, \`font-display: swap\`
• **CDN** for global delivery; compression (Brotli/Gzip)
• **Measure** with Lighthouse and Core Web Vitals (LCP, CLS, INP)

**Why:** faster sites rank higher and convert better — especially on mobile. This site scores 100 on desktop Lighthouse performance.`,
    next: ["What is Core Web Vitals?", "How do I improve website SEO?", "What is caching and why does it matter?"],
  },
  {
    topic: "scaling", ask: "What should I monitor in production?",
    k: "monitoring observability logs metrics tracing sentry alerts production monitor errors apm",
    a: `• **Errors:** exceptions with stack traces (Sentry)
• **Uptime:** external checks every minute with alerts
• **Performance:** response times, slow queries, Core Web Vitals from real users
• **Infrastructure:** CPU, memory, disk, database connections
• **Business metrics:** sign-ups, orders, failed payments
• **Logs:** structured and searchable, with audit logs for sensitive actions

**Why:** you find and fix problems before customers report them.`,
    next: ["How do I keep my app online (uptime, backups)?", "How do I scale a web app?", "Website security essentials?"],
  },
  {
    topic: "scaling", ask: "How do I keep cloud costs low?",
    k: "cloud cost costs cheap reduce bill aws bill optimise cost optimization budget save money hosting cost",
    a: `• **Start managed and serverless** — pay for actual use; free tiers cover many small apps
• **Right-size** servers and databases; turn off unused resources
• **Cache and use a CDN** to reduce compute and bandwidth
• **Set budgets and alerts** in AWS/Azure/Google Cloud and spend limits on APIs
• **Commit for discounts** (reserved instances / savings plans) once usage is steady
• **Review monthly** — costs creep quietly

**Why:** most cloud waste is idle or oversized resources.`,
    next: ["Where should I host my website or app?", "How do I scale a web app?", "Build vs buy: SaaS or custom software?"],
  },

  // ======================= BEFORE YOU BUILD =======================
  {
    topic: "planning", ask: "What do I need before building a website?",
    k: "before building website need prepare plan website checklist requirements start website new website what do i need",
    a: `Website planning checklist:
1. **Goal:** leads, sales, bookings, credibility? Define one main action
2. **Audience:** who visits and what they need to find quickly
3. **Pages & content:** services, about, projects, contact — text, photos, testimonials
4. **Domain & professional email** (e.g. Microsoft 365)
5. **Brand:** logo, colours, fonts
6. **SEO plan:** the searches you want to rank for; Google Business Profile for local
7. **Integrations:** forms, WhatsApp, booking, CRM, payments
8. **Analytics:** GA4 and conversion tracking
9. **Legal:** privacy policy, cookie consent where required
10. **Who maintains it:** content updates, security, backups

Reejan can help plan and build it: ${S}`,
    next: ["Best tech stack for a business website?", "How much does a website cost?", "How do I set up a domain and business email?"],
  },
  {
    topic: "planning", ask: "What do I need before building a web app?",
    k: "before building web app application software requirements plan project app idea specification what to prepare start app",
    a: `Web app planning checklist:
1. **Problem & users:** who uses it, what job it does, how success is measured
2. **User roles & permissions:** e.g. admin, manager, staff — who can see and change what
3. **Core workflows:** the 3–5 key journeys, step by step
4. **Data model:** the main things you store (customers, orders, shifts) and how they relate
5. **MVP scope:** what's in v1, what waits
6. **Integrations:** email, payments, Microsoft 365/Google sign-in, accounting, WhatsApp
7. **Security & compliance:** personal data, audit logs, backups
8. **Platforms:** web, mobile, offline needs
9. **Hosting & running costs**
10. **Support plan:** who fixes issues and adds features after launch

Reejan builds business web apps end to end: ${S}#business-systems`,
    next: ["Fastest way to build an MVP?", "Best tech stack for a SaaS product?", "How long does it take to build a website or app?"],
  },
  {
    topic: "planning", ask: "How much does a website cost?",
    k: "cost price how much website cost budget pricing quote app cost development cost estimate",
    a: `Cost depends mainly on:
• **Scope:** number of pages, features and user roles
• **Template vs custom design**
• **Content management:** editing yourself needs a CMS
• **Integrations:** payments, booking, CRM, ERP, APIs
• **Ongoing costs:** domain, hosting, email, maintenance and updates

A simple site on a builder costs little; a custom site or business app is an investment that should pay back in leads, saved time or sales.
For a quote on your project, email Reejan: reejanr90@gmail.com`,
    next: ["What do I need before building a website?", "Website builder or custom website?", "How long does it take to build a website or app?"],
  },
  {
    topic: "planning", ask: "How long does it take to build a website or app?",
    k: "how long timeline time duration weeks months build time delivery schedule",
    a: `Rough, typical ranges (scope changes everything):
• **Simple business website:** about 1–3 weeks
• **Larger custom site with CMS and integrations:** about 3–8 weeks
• **MVP web app:** about 6–12 weeks
• **Business platform (e.g. attendance + payroll):** several months, delivered in phases

**What speeds it up:** ready content, clear decisions, a small MVP scope and quick feedback.`,
    next: ["Fastest way to build an MVP?", "What do I need before building a web app?", "What is the software development process?"],
  },
  {
    topic: "planning", ask: "How do I set up a domain and business email?",
    k: "domain email business email professional email setup dns spf dkim dmarc mx records google workspace microsoft 365 email setup",
    a: `1. **Buy the domain** from a reputable registrar; enable auto-renew and registrar lock
2. **Choose email:** Microsoft 365 or Google Workspace
3. **Point DNS:** MX records for email; A/CNAME records for the website (Cloudflare makes DNS easy)
4. **Protect deliverability:** set **SPF, DKIM and DMARC** so your emails don't land in spam and can't be spoofed
5. **Secure accounts:** MFA for everyone, admin roles kept minimal

Reejan manages domains, DNS and corporate email at USF Group: ${S}#microsoft-365-it`,
    next: ["Microsoft 365 or Google Workspace?", "Website security essentials?", "What tech does a startup company need?"],
  },
  {
    topic: "planning", ask: "How do I improve website SEO?",
    k: "seo improve seo rank google ranking search engine optimisation optimization get found google search traffic",
    a: `• **Technical:** fast pages, mobile-friendly, HTTPS, clean URLs, XML sitemap, robots.txt, structured data (schema)
• **On-page:** one clear topic per page, a unique title and meta description, one H1, descriptive headings, internal links
• **Content:** answer real questions your customers search for; add case studies and FAQs
• **Local:** a complete Google Business Profile with reviews
• **Authority:** links from relevant directories, partners and press
• **Measure:** Google Search Console and GA4

This portfolio follows all of these. Related: ${S}#technical-seo`,
    next: ["What is Technical SEO?", "How do I make a website load fast?", "What does a marketing tech stack need?"],
  },
  {
    topic: "planning", ask: "What is the software development process?",
    k: "process sdlc software development lifecycle agile scrum sprint workflow methodology how projects are built steps",
    a: `A typical delivery flow:
1. **Discovery:** goals, users, requirements, risks
2. **Design:** user flows, wireframes, data model, architecture
3. **Build** in short iterations (agile sprints) with regular demos
4. **Test:** automated tests plus user acceptance testing
5. **Launch:** deploy, monitor, fix quickly
6. **Improve:** measure usage and iterate

Reejan's approach: identify the problem → design the solution → build → design the database → secure → deploy → monitor → optimise → support → improve.`,
    next: ["What do I need before building a web app?", "What should I test before launch?", "Fastest way to build an MVP?"],
  },
  {
    topic: "planning", ask: "What should I test before launch?",
    k: "test testing before launch launch checklist qa quality go live checklist pre launch",
    a: `Launch checklist:
• Every form, payment and email actually works (and lands in the right inbox)
• Works on phones, tablets and major browsers
• Page speed and Core Web Vitals
• SEO: titles, descriptions, sitemap submitted, no broken links, redirects from old URLs
• Security: HTTPS, admin accounts with MFA, no test data or secrets exposed
• Analytics and conversion tracking firing correctly
• Backups and monitoring switched on
• Accessibility basics: contrast, keyboard navigation, alt text`,
    next: ["How do I improve website SEO?", "Website security essentials?", "What should I monitor in production?"],
  },
  {
    topic: "planning", ask: "How do I make a website accessible?",
    k: "accessibility accessible wcag a11y screen reader disability contrast keyboard inclusive",
    a: `• **Semantic HTML:** real headings, buttons, links and form labels
• **Contrast:** text readable against its background (WCAG AA)
• **Keyboard:** everything usable without a mouse, with visible focus
• **Images:** meaningful alt text
• **Motion:** respect "reduce motion" settings
• **Forms:** clear labels and error messages

**Why:** more people can use your site, it's increasingly a legal expectation, and it helps SEO. This site scores 100 on Lighthouse accessibility for its key pages.`,
    next: ["What should I test before launch?", "How do I make a website load fast?", "How do I improve website SEO?"],
  },
  {
    topic: "planning", ask: "Build vs buy: SaaS or custom software?",
    k: "build vs buy build or buy custom software off the shelf saas subscription custom development decision",
    a: `• **Buy (SaaS)** when the need is common — email, accounting, CRM, chat. It's faster, cheaper and maintained for you
• **Build** when the process is your competitive advantage, off-the-shelf tools force painful workarounds, or many tools need tying together
• **Hybrid:** buy the standard parts and build the glue — integrations, automations and a custom app for the unique workflow

Example: an internal ERP that connects to Zoho Books for accounting instead of rebuilding accounting.`,
    next: ["How can a business automate its processes?", "Best tech stack for internal business tools?", "What tech does a startup company need?"],
  },

  // ======================= STARTUPS & AUTOMATION =======================
  {
    topic: "startup", ask: "What tech does a startup company need?",
    k: "startup company new business small business tech setup tools need office it setup what software does a business need",
    a: `A solid starting setup:
• **Domain, website & professional email** (Microsoft 365 or Google Workspace)
• **Identity & security:** single sign-on, MFA for everyone, a password manager
• **Collaboration:** Teams or Slack, shared drives (OneDrive/SharePoint or Google Drive)
• **Sales:** a CRM (HubSpot, Zoho CRM)
• **Finance:** accounting & invoicing (Zoho Books, QuickBooks, Xero) — VAT-ready in the UAE
• **People:** HR, attendance and payroll (in the UAE, payroll through WPS)
• **Work:** project management (Planner, Asana, Trello, Jira)
• **Devices:** laptop management and endpoint protection (Intune)
• **Backups & automation** connecting it all

Reejan sets this up for businesses: https://reejangopan.me/projects/enterprise-it-infrastructure-dubai-smbs`,
    next: ["Microsoft 365 or Google Workspace?", "How can a business automate its processes?", "Cybersecurity basics for a small business?"],
  },
  {
    topic: "startup", ask: "Microsoft 365 or Google Workspace?",
    k: "microsoft 365 vs google workspace gmail outlook office google docs which email suite compare",
    a: `Both are excellent:
• **Microsoft 365:** desktop Office apps, Teams, SharePoint, strong device and security management (Entra ID, Intune, Conditional Access) — common in corporates and the UAE
• **Google Workspace:** simple, browser-first, great real-time collaboration in Docs and Sheets — popular with startups

**Choose by:** your team's habits, clients' file formats, and how much device and security control you need.
Reejan administers Microsoft 365 for 50+ users and is MS-900 certified.`,
    next: ["What is Microsoft 365?", "How do I set up a domain and business email?", "What tech does a startup company need?"],
  },
  {
    topic: "startup", ask: "How can a business automate its processes?",
    k: "automate automation business process workflow automation save time manual work repetitive tasks zapier make n8n power automate rpa",
    a: `1. **Map the process** step by step and find repetitive, rule-based steps
2. **Pick the right tool:**
   • Power Automate — if you're on Microsoft 365
   • Zapier or Make — connect SaaS apps without code
   • n8n — open source and self-hostable
   • Python scripts or custom apps — complex logic or large volumes
3. **Start with quick wins:** new lead → CRM + welcome email; invoice reminders; approval flows; employee onboarding checklists; weekly reports emailed automatically
4. **Measure hours saved**, then automate the next process

Reejan automated reporting and IT ticket categorisation with Python and LLM APIs, saving ~5 hours a week. Related: ${S}#ai-automation`,
    next: ["How can a business use AI?", "Build vs buy: SaaS or custom software?", "How do I automate HR, attendance and payroll?"],
  },
  {
    topic: "startup", ask: "How can a business use AI?",
    k: "ai for business use ai business ai llm business adoption artificial intelligence company productivity gpt use cases automation business use",
    a: `High-value, low-risk places to start:
• **Customer support:** a chatbot grounded in your FAQs and docs (like me)
• **Documents:** summarise, extract data from invoices and forms, draft emails and reports
• **Operations:** categorise tickets and requests, route work automatically
• **Knowledge search:** ask questions across company files (RAG)
• **Sales & marketing:** first drafts of content and proposals

**Do it safely:** keep sensitive data protected, ground the AI in your own data, and keep a human reviewing important decisions. Start with one measurable use case.`,
    next: ["Tech stack for an AI app or chatbot?", "How can a business automate its processes?", "What is RAG (Retrieval-Augmented Generation)?"],
  },
  {
    topic: "startup", ask: "How do I automate HR, attendance and payroll?",
    k: "hr automation attendance payroll automate leave overtime wps employee management staff tracking timesheets",
    a: `• **Attendance:** mobile or GPS/selfie check-in replaces paper sheets
• **Overtime & leave:** rules calculated automatically, requests and approvals in-app
• **Payroll:** attendance flows straight into pay calculations and payslips; in the UAE salaries are paid through WPS
• **Employee records:** documents, renewals and reminders in one system
• **Reports:** live dashboards instead of spreadsheets

Reejan built exactly this in WAQTI: https://reejangopan.me/projects/waqti-workforce-management-platform`,
    next: ["Tell me about WAQTI", "Best tech stack for internal business tools?", "Build vs buy: SaaS or custom software?"],
  },
  {
    topic: "startup", ask: "Which CRM and accounting tools should a startup use?",
    k: "crm accounting invoicing tools hubspot zoho salesforce quickbooks xero zoho books finance software vat e-invoicing",
    a: `• **CRM:** HubSpot (free tier, easy), Zoho CRM (great value), Salesforce (enterprise scale)
• **Accounting:** Zoho Books, QuickBooks or Xero — make sure it handles UAE VAT, and plan for e-invoicing requirements
• **Connect them:** won deal → invoice automatically; payments update the CRM

**Why:** a CRM stops leads falling through the cracks; cloud accounting saves hours every month and keeps you compliant.
Reejan has evaluated Zoho Books and UAE e-invoicing integration for an internal ERP.`,
    next: ["How can a business automate its processes?", "What tech does a startup company need?", "What is an ERP?"],
  },
  {
    topic: "startup", ask: "What does a marketing tech stack need?",
    k: "marketing stack digital marketing tools google ads meta ads analytics leads lead generation marketing tech",
    a: `• **Website** built for speed and conversions
• **Google Business Profile** for local search and Maps
• **Analytics:** GA4 + Google Tag Manager, with conversion tracking for forms, calls and WhatsApp
• **Search Console** for SEO health
• **Ads:** Google Ads (search intent) and Meta Ads (awareness)
• **CRM** to capture and follow up every lead
• **Email marketing** for nurturing

Reejan runs technical SEO, GA4 tracking and Google Ads for a Dubai business and is Google Ads and GA4 certified.`,
    next: ["How do I improve website SEO?", "What is Google Analytics 4 (GA4)?", "What is conversion tracking?"],
  },
  {
    topic: "startup", ask: "How do I plan a digital transformation?",
    k: "digital transformation plan roadmap modernise modernize paperless go digital transform business strategy",
    a: `1. **Assess:** list processes and tools; find where time, errors and paper pile up
2. **Prioritise:** high-impact, low-effort quick wins first
3. **Choose systems of record:** one place each for customers, finance, people and operations
4. **Integrate & automate** the hand-offs between them
5. **Train people** and update SOPs — adoption matters more than tools
6. **Measure:** hours saved, errors reduced, faster cycle times

Reejan's role at USF Group is exactly this: turning manual operations into digital systems.`,
    next: ["How can a business automate its processes?", "Build vs buy: SaaS or custom software?", "What tech does a startup company need?"],
  },

  // ======================= SECURITY =======================
  {
    topic: "security", ask: "Website security essentials?",
    k: "website security secure website app security protect hack hacking web security owasp best practices",
    a: `• **HTTPS everywhere** and security headers
• **Keep software updated** — frameworks, plugins, servers
• **Strong authentication:** MFA for admins, no shared accounts
• **Least privilege:** people and services get only the access they need
• **Validate all input** on the server; protect against SQL injection and XSS
• **Secrets** in environment variables, never in code
• **WAF & DDoS protection** (Cloudflare)
• **Backups** you've tested restoring
• **Logs and alerts** for suspicious activity`,
    next: ["Cybersecurity basics for a small business?", "What is Row Level Security?", "How do I keep my app online (uptime, backups)?"],
  },
  {
    topic: "security", ask: "Cybersecurity basics for a small business?",
    k: "cybersecurity small business security basics protect company phishing ransomware password manager mfa endpoint",
    a: `The essentials that stop most attacks:
• **MFA on every account**, especially email and admin
• **Password manager** for the whole team
• **Automatic updates** on all devices
• **Endpoint protection** and device management (e.g. Intune)
• **Backups** stored separately, tested regularly — your ransomware insurance
• **Phishing awareness** training
• **Least-privilege access** and quick removal when staff leave
• **Email protection:** SPF, DKIM, DMARC

Reejan enforces endpoint security, access reviews and patching at USF Group.`,
    next: ["Website security essentials?", "What is Conditional Access?", "What is MFA?"],
  },
  {
    topic: "security", ask: "How do I protect customer data?",
    k: "protect data customer data privacy personal data gdpr pdpl data protection compliance encryption",
    a: `• **Collect only what you need** and know where it's stored
• **Encrypt** in transit (HTTPS) and at rest
• **Control access:** role-based permissions and Row Level Security in the database
• **Audit logs** of who viewed or changed data
• **Retention:** delete data you no longer need
• **Be transparent:** a clear privacy policy; follow local law (the UAE has its own data protection law, the EU has GDPR)`,
    next: ["What is Row Level Security?", "Website security essentials?", "What is audit logging?"],
  },
];
