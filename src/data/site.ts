// Single source of truth for all portfolio content, page metadata and structured data.

export const SITE_URL = "https://reejangopan.me";

export const profile = {
  name: "Reejan R Gopan",
  // The brand name Google shows as the "site name" in search results.
  siteName: "Reejan Gopan",
  // Every form of the name people search for. Used in structured data, copy and llms.txt.
  alternateNames: ["Reejan Gopan", "Reejan", "Reejan R. Gopan"],
  givenName: "Reejan",
  familyName: "Gopan",
  title: "Full-Stack Software Engineer",
  tagline:
    "Building scalable enterprise software, intelligent automation solutions and production-ready digital platforms.",
  summary:
    "Full-Stack Software Engineer and IT systems professional in Dubai with 2+ years across enterprise applications, workforce management, cloud infrastructure and AI-enabled software in the UAE and India.",
  location: "Dubai, UAE",
  openTo: "Full-Stack, Enterprise Application, AI Application & Cloud Engineering roles",
  email: "reejanr90@gmail.com",
  phone: "+971 52 712 3154",
  phoneHref: "tel:+971527123154",
  whatsapp: "https://wa.me/971527123154",
  linkedin: "https://www.linkedin.com/in/reejan-r-gopan-38a8092b9",
  cv: "/Reejan_R_Gopan_CV.pdf",
  github: "https://github.com/reejanr",
};

// Homepage hero positioning. The job title in the Experience section stays as it is.
export const hero = {
  focus: ["Enterprise Applications", "AI Engineering", "Cloud & DevOps"],
  tagline: "Building scalable enterprise software, intelligent automation solutions and production-ready digital platforms.",
  chips: ["Full-Stack Development", "Enterprise Systems", "AI-Assisted Engineering"],
};

// Engineering practices. Scenarios are described in general terms: no employee records or
// production data are shown on this site.
export const practices = [
  { title: "System architecture", text: "Modular systems with clear backend boundaries, explicit data flows and deliberate API design." },
  { title: "Database engineering", text: "Schemas, constraints, transactions, indexing and migrations, so correctness is enforced by the database and not only by application code." },
  { title: "Concurrency and reliability", text: "Race-condition prevention, idempotency, duplicate detection and retry handling, for example the overtime integrity checks in WAQTI." },
  { title: "Security", text: "Role-based access control, row-level security, secure sessions, audit logs and protection of sensitive data." },
  { title: "Testing", text: "Unit, integration, end-to-end and database regression testing." },
  { title: "Delivery", text: "Git branching, pull requests, CI checks, deployments and rollback planning." },
  { title: "Production operations", text: "Monitoring, incident investigation, backup verification and performance profiling." },
];

export const confidentiality =
  "Most of this work was built for USF Group and is not open source. To protect the company, its employees and its systems, this site does not publish proprietary source code, employee records, attendance photos, payroll data, credentials or private infrastructure details. Examples are described in general terms, and screenshots or demos are shared only where authorised.";

export const stats = [
  { value: 2, suffix: "+", label: "Years in software, cloud & enterprise IT" },
  { value: 50, suffix: "+", label: "Microsoft 365 users administered" },
  { value: 99, suffix: "%+", label: "Uptime across servers, hosting & email" },
  { value: 5, prefix: "~", suffix: "h", label: "Manual work saved weekly with Python & LLM automation" },
];

export type Project = {
  slug: string;
  name: string;
  short: string;
  category: string;
  status: string;
  period: string;
  role: string;
  result?: string;
  stack: string[];
  overview: string[];
  problem?: string;
  features: { title: string; text: string }[];
  outcomes: string[];
  link?: { label: string; href: string };
  sites?: { name: string; href: string; text: string }[];
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
};

export const projects: Project[] = [
  {
    slug: "waqti-workforce-management-platform",
    name: "WAQTI — Workforce Management Platform",
    short:
      "Production attendance, overtime, leave and payroll platform used for real field operations.",
    category: "Enterprise application",
    status: "In production",
    period: "2025 — present",
    role: "Design, full-stack development, database & deployment",
    result: "Digitised attendance for site supervisors across multiple project sites",
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "PWA", "Android"],
    overview: [
      "WAQTI is a workforce management platform built for a multi-site construction and demolition business. It replaces paper attendance and manual calculations with a supervisor Android app, a progressive web app and a web dashboard on one PostgreSQL core.",
      "It covers the workforce lifecycle from check-in to payroll, and is designed so supervisors on site need as few taps as possible.",
    ],
    problem:
      "Attendance was tracked on paper, overtime was recorded by hand and pay was calculated manually across several project sites — slow, error-prone and hard to audit.",
    features: [
      { title: "Attendance", text: "GPS-based check-in with nearest-site detection, selfie capture and face verification, shift and night-shift handling, late, early-out and absence tracking." },
      { title: "Supervisor operations", text: "Bulk check-in and check-out for crews, site attendance, active-worker views and overtime sessions — built to minimise actions on site." },
      { title: "Overtime engine", text: "Normal, additional, Sunday and public-holiday overtime with sessions, approvals, claims and audit logs." },
      { title: "Leave", text: "Employee leave requests, annual and labour leave, Document Controller processing and admin approvals." },
      { title: "Payroll", text: "Attendance-based daily salary, absence deductions, overtime calculation, payslips and payroll-period closing." },
      { title: "Security & data", text: "PostgreSQL data model for staff, sites and attendance on Supabase, Row Level Security, server-side RPC, role authorisation and audit logging." },
    ],
    outcomes: [
      "Attendance digitised for site supervisors across multiple project sites",
      "Six operational roles served: Admin, Employee, Supervisor, Engineer, HSE and Document Controller",
      "Web, PWA and Android clients on a single PostgreSQL source of truth",
    ],
    seoTitle: "WAQTI Workforce Management Platform — Case Study",
    seoDescription:
      "Case study: WAQTI, a React, TypeScript and Supabase/PostgreSQL workforce platform for attendance, overtime, leave and payroll, built by Reejan R Gopan in Dubai.",
    keywords: ["workforce management software", "attendance app", "payroll system", "Supabase", "PostgreSQL", "React"],
  },
  {
    slug: "devv-ai-workforce-copilot",
    name: "DEVV — AI Workforce Copilot",
    short:
      "An AI assistant integrated with the WAQTI workforce platform, using a retrieval engine and role-aware knowledge to answer questions and support administrators securely.",
    category: "AI application",
    status: "Production integration, limited rollout",
    period: "2026 — present",
    role: "Design, integration & development",
    result: "Role-aware answers; rollout is currently limited and not open to all employees",
    stack: ["LLM provider integration", "Retrieval engine", "Role-aware access control"],
    overview: [
      "DEVV is an AI copilot for the WAQTI workforce platform. It combines a retrieval engine with a large language model so answers come from the platform's own knowledge, and what each person can see depends on their role.",
      "It is integrated in production, but rollout is deliberately limited at the moment: it is not available to every employee.",
    ],
    problem:
      "Supervisors and administrators spend time looking up policies, procedures and records. A general-purpose chatbot cannot be trusted with that: it does not know the company's rules, and it must never reveal information to someone who is not allowed to see it.",
    features: [
      { title: "Retrieval engine", text: "Answers are grounded in retrieved company knowledge instead of the model's memory alone." },
      { title: "Role-aware knowledge", text: "Retrieval respects the asker's role, so each person only receives information they are authorised to see." },
      { title: "LLM provider integration", text: "A provider-integration layer that keeps the model behind the application's own authorisation and logging." },
      { title: "Secure admin assistance", text: "Assistance for administrators that works inside the platform's existing permission model." },
    ],
    outcomes: [
      "Integrated into the production platform with a controlled, limited rollout",
      "Authorisation is enforced by the application, not left to the model",
    ],
    seoTitle: "DEVV — AI Workforce Copilot (Case Study)",
    seoDescription:
      "Case study of DEVV, an AI copilot with retrieval and role-aware knowledge integrated into a workforce management platform, by Reejan R Gopan.",
    keywords: ["AI copilot", "retrieval augmented generation", "role-aware AI", "LLM integration", "enterprise AI assistant"],
  },
  {
    slug: "custom-erp-crm-systems",
    name: "Custom ERP & CRM Systems",
    short:
      "Custom ERP and CRM systems built for companies — HR, payroll, operations, accounting, sales pipelines and customer management in one place.",
    category: "Enterprise application",
    status: "In development",
    period: "2025 — present",
    role: "Requirements, architecture & full-stack development",
    result: "In development — one system for operations, finance and customers",
    stack: ["React", "TypeScript", "PostgreSQL", "Supabase", "REST APIs"],
    overview: [
      "Custom ERP and CRM systems built for companies that had outgrown spreadsheets and disconnected tools. Each one is shaped around how that business actually works, instead of forcing the team into a generic product.",
      "The ERP side runs people, operations and finance; the CRM side tracks leads, customers and sales. Both sit on one relational PostgreSQL database, so management sees the whole business in one place.",
    ],
    problem:
      "Companies were running HR, operations, sales and accounting across spreadsheets, email and separate apps — data was duplicated, follow-ups were missed and nobody had a single, reliable view of the business.",
    features: [
      { title: "ERP — people & payroll", text: "Employee records, HR workflows, attendance-linked payroll, leave and document management." },
      { title: "ERP — operations", text: "Projects, operational processes, approvals, documents and administration with role-based access." },
      { title: "ERP — finance (planned)", text: "Planned: accounting workflows, invoicing and integration with accounting software such as Zoho Books, with UAE e-invoicing readiness. These are on the roadmap and not yet implemented." },
      { title: "CRM — leads & pipeline", text: "Lead capture from website forms, calls and WhatsApp, sales pipeline stages, follow-up reminders and ownership by salesperson." },
      { title: "CRM — customers", text: "Customer and contact records, quotations, activity history and a full view of every client relationship." },
      { title: "Reporting & automation", text: "Management dashboards, automated notifications and reports, and audit logs on a secure PostgreSQL core." },
    ],
    outcomes: [
      "Design goal: one source of truth for operations, finance and customers",
      "Design goal: fewer missed follow-ups with a tracked sales pipeline",
      "Design goal: less manual data entry through automation and integrations",
      "Design goal: role-based access and audit trails for accountability",
    ],
    seoTitle: "Custom ERP & CRM Development for Companies in Dubai, UAE",
    seoDescription:
      "Custom ERP and CRM systems for companies in Dubai — HR, payroll, operations, accounting, leads and sales pipelines — built by Reejan R Gopan.",
    keywords: ["custom ERP development Dubai", "custom CRM development UAE", "ERP developer Dubai", "CRM software UAE", "HR and payroll system", "PostgreSQL", "React"],
  },
  {
    slug: "usf-group-web-platforms",
    name: "USF Group Web Platforms",
    short:
      "Websites, technical SEO and GEO (AI-search optimisation) for the USF Group companies — usfdemolition.com, usfgrand.com, rental.usfme.com and usfme.com.",
    category: "Web platforms · SEO & GEO",
    status: "Live",
    period: "2025 — present",
    role: "Design, development, SEO, GEO, analytics & deployment",
    result: "4 company websites · 300+ prerendered pages",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vite", "Vercel", "Cloudflare", "JSON-LD", "GA4"],
    overview: [
      "The web presence of USF Group in the UAE — a separate website for each group company, covering demolition, civil construction and heavy-equipment rental. Reejan designed, built and deployed the sites and runs their SEO, GEO and analytics.",
      "Every site is built for speed and discoverability: pages are prerendered to static HTML, structured with schema.org data, and written so both Google and AI assistants such as ChatGPT, Gemini and Perplexity can understand and cite them.",
    ],
    problem:
      "Each USF company needed its own credible, fast website that ranks for competitive UAE searches — demolition, civil works, excavator rental — and turns visits into calls, WhatsApp messages and enquiries.",
    sites: [
      { name: "usfdemolition.com", href: "https://usfdemolition.com", text: "Built with Next.js on Vercel. USF Demolition Works LLC — demolition services, projects, equipment, tenders, vendor registration and careers, with 200+ prerendered routes and split sitemaps for pages, services, locations, projects, blog, jobs and images." },
      { name: "usfgrand.com", href: "https://usfgrand.com", text: "Built with React and Vite. USF GRAND Constructions LLC — civil contractor site for road works, earthworks, excavation, utilities and marine projects across Dubai, Abu Dhabi and Sharjah." },
      { name: "rental.usfme.com", href: "https://rental.usfme.com", text: "Built with React and Vite. USF Equipment Rental — 100+ page catalogue of excavators, long-reach machines, breakers, crushers and attachments for rent across the UAE." },
      { name: "usfme.com", href: "https://usfme.com", text: "USF Group corporate website — the parent brand linking the group companies." },
    ],
    features: [
      { title: "Prerendered architecture", text: "Static, prerendered pages on every site for fast first paint and complete indexing — 300+ pages across the group." },
      { title: "Technical SEO", text: "Sitemap indexes, robots directives, canonical URLs, metadata and JSON-LD structured data across service, location, project and equipment pages." },
      { title: "GEO — AI search optimisation", text: "Entity-rich content, FAQ and organisation schema and clear answers so AI assistants and Google AI Overviews can find, understand and cite each company." },
      { title: "Local SEO", text: "Location pages and Google Business Profile alignment for Dubai, Abu Dhabi, Sharjah and the wider UAE." },
      { title: "Analytics & conversions", text: "GA4 and Google Tag Manager tracking for form submissions, calls, click-to-call, WhatsApp, directions and outbound clicks; Google Ads for demolition services." },
      { title: "Performance", text: "Core Web Vitals work on LCP, FCP, blocking time, image optimisation, lazy loading and transfer size, with a mobile-first focus." },
    ],
    outcomes: [
      "4 company websites live under one consistent, fast stack",
      "300+ prerendered, indexable pages with structured data",
      "CI/CD from GitHub to Vercel and Cloudflare",
      "SEO, GEO, GA4 tracking and Google Ads supporting organic, AI-search and paid traffic in Dubai and Abu Dhabi",
    ],
    link: { label: "Visit usfdemolition.com", href: "https://usfdemolition.com" },
    seoTitle: "USF Group Web Platforms — Websites, SEO & GEO Case Study",
    seoDescription:
      "Case study: websites, technical SEO and GEO for USF Group in the UAE — usfdemolition.com, usfgrand.com, rental.usfme.com and usfme.com — by Reejan R Gopan.",
    keywords: ["Next.js website development Dubai", "USF Demolition website", "USF Grand", "USF equipment rental", "website development Dubai", "technical SEO", "GEO AI search optimisation", "local SEO UAE", "construction company website", "equipment rental website", "prerendering", "Core Web Vitals"],
  },
  {
    slug: "xauusd-btcusd-trading-analysis-platform",
    name: "Trading Analysis Platform",
    short:
      "Python-based XAUUSD/BTCUSD analysis system with multi-timeframe processing, strategy filtering, news integration and automated testing.",
    category: "FinTech / data",
    status: "Built & tested",
    period: "2025",
    role: "Design & development",
    stack: ["Python", "Flask", "Pandas", "REST APIs"],
    overview: [
      "A Flask web service that processes live gold (XAUUSD) and Bitcoin (BTCUSD) market data and generates trading signals from technical confluence across timeframes.",
    ],
    features: [
      { title: "Multi-timeframe engine", text: "H1/H4 analysis with market structure, trading sessions, risk/reward and strategy filters." },
      { title: "Signal hygiene", text: "Cooldowns and duplicate-signal suppression to keep output clean." },
      { title: "News integration", text: "Economic-news checks with caching that can block signals around high-impact events." },
      { title: "Data engineering & tests", text: "CSV and Parquet ingestion of historical data with safeguards against future-data leakage, backed by automated tests." },
    ],
    outcomes: ["Live market-data processing for XAUUSD and BTCUSD", "Strategy logic covered by automated tests"],
    seoTitle: "XAUUSD & BTCUSD Trading Analysis Platform (Python, Flask)",
    seoDescription:
      "Case study: Python, Flask and Pandas service analysing live XAUUSD and BTCUSD data with multi-timeframe logic, news filters and automated tests.",
    keywords: ["Python Flask", "Pandas", "trading signals", "XAUUSD", "BTCUSD", "data engineering"],
  },
  {
    slug: "enterprise-it-infrastructure-dubai-smbs",
    name: "Enterprise IT Infrastructure for Dubai SMBs",
    short:
      "Deployed servers, Active Directory, Microsoft 365, email, VPN and endpoint security for small and mid-size businesses.",
    category: "Infrastructure",
    status: "Delivered",
    period: "2024 — present",
    role: "Systems engineering & deployment",
    result: "40% faster IT setup with standard checklists and configuration scripts",
    stack: ["Windows Server", "Active Directory", "Microsoft 365", "Entra ID", "VPN"],
    overview: [
      "End-to-end IT foundations for small and mid-size businesses in Dubai: servers, identity, email, collaboration, remote access and endpoint protection.",
    ],
    features: [
      { title: "Identity & directory", text: "Active Directory, Group Policy and Microsoft Entra ID with Conditional Access." },
      { title: "Collaboration", text: "Microsoft 365, Exchange Online, SharePoint and Teams rollouts." },
      { title: "Network & access", text: "VPN, firewalls and secure remote access." },
      { title: "Repeatable deployments", text: "Standard checklists and configuration scripts for consistent, faster setups." },
    ],
    outcomes: ["IT setup time reduced by 40%", "Consistent, documented deployments across businesses"],
    seoTitle: "Enterprise IT Infrastructure for Dubai SMBs — Case Study",
    seoDescription:
      "Windows Server, Active Directory, Microsoft 365, Entra ID, VPN and endpoint security deployments for Dubai SMBs — 40% faster setup through standardised scripts.",
    keywords: ["IT infrastructure Dubai", "Microsoft 365 administrator", "Active Directory", "Windows Server"],
  },
];

export const experience = [
  {
    role: "IT Systems & Digital Transformation Administrator",
    company: "USF Group (USF Demolition Works LLC)",
    location: "Dubai, UAE",
    period: "01/2025 — Present",
    start: "2025-01",
    current: true,
    points: [
      "Developed **Waqti**, a workforce attendance app (Android + web) in React, TypeScript and Supabase/PostgreSQL, digitising attendance for site supervisors across multiple project sites.",
      "Built and deployed the **USF Group websites** — usfdemolition.com, usfgrand.com, rental.usfme.com and usfme.com — with React, TypeScript and Tailwind, CI/CD through GitHub to Vercel and Cloudflare.",
      "Administered **Microsoft 365 for 50+ users** — provisioning, licensing, Exchange Online, SharePoint, Teams and Conditional Access in Entra ID.",
      "Managed Windows Server 2019/2022, Active Directory, Group Policy, DNS, DHCP, VPS hosting and corporate email at **99%+ uptime**.",
      "Automated reporting and IT ticket categorisation with Python, LLM APIs and GitHub Copilot, **saving ~5 hours a week**.",
      "Ran technical SEO, GEO (AI-search optimisation), GA4 tracking and Google Ads across the group's sites in Dubai and Abu Dhabi; enforced endpoint security, access reviews and patching.",
    ],
  },
  {
    role: "IT Procurement & Support Specialist",
    company: "Chimera Group",
    location: "Dubai, UAE",
    period: "09/2024 — 12/2024",
    start: "2024-09",
    current: false,
    points: [
      "Procured IT hardware, licences and enterprise services through competitive tendering, **reducing purchasing costs**.",
      "Managed the full IT asset lifecycle — procurement, tagging, inventory and disposal.",
      "Administered Office 365 accounts, mailboxes and security settings; supported ERP operations.",
      "Level 1 & 2 support for networks, workstations, CCTV and biometric access; coordinated ISPs to meet SLAs.",
    ],
  },
  {
    role: "Network Administrator",
    company: "Tata Consultancy Services (TCS iON)",
    location: "India",
    period: "03/2024 — 09/2024",
    start: "2024-03",
    current: false,
    points: [
      "Configured and maintained Cisco routers, managed switches and firewall rules.",
      "Monitored network performance and resolved incidents to minimise downtime.",
      "OS patching, antivirus updates, scheduled backup and recovery.",
      "Documented network topology, SOPs and IT asset records for audits.",
    ],
  },
];

export const coreStack = [
  "React", "Next.js", "TypeScript", "Python", "Node.js", "PostgreSQL",
  "Supabase", "Tailwind CSS", "Vercel", "Microsoft 365", "Windows Server", "Active Directory",
];

export const toolkit = [
  { label: "Languages", value: "TypeScript, JavaScript, Python, SQL, C#, C++, Java, PHP, Dart" },
  { label: "Frontend", value: "React, Next.js, Tailwind CSS, shadcn/ui, HTML5, CSS3, Flutter, responsive design" },
  { label: "Backend", value: "Node.js, Express, Flask, ASP.NET Core, REST APIs, microservices" },
  { label: "Databases", value: "PostgreSQL, Supabase, MySQL, MongoDB, Firestore, Pinecone" },
  { label: "Cloud", value: "AWS (Lambda, S3, EC2, ELB, Kinesis), Microsoft Azure, Vercel, Cloudflare, Netlify" },
  { label: "DevOps", value: "Git, GitHub, CI/CD pipelines, Docker, Linux (Ubuntu), environment configuration" },
  { label: "Generative AI & ML", value: "LLMs, Google Gemini, Vertex AI, RAG, vector search, embeddings, Sentence Transformers, prompt engineering, GitHub Copilot" },
  { label: "Systems administration", value: "Windows Server 2019/2022, Active Directory, Group Policy, DNS, DHCP, Microsoft 365, Entra ID, Exchange Online, SharePoint, Teams, Intune" },
  { label: "Networking & security", value: "TCP/IP, LAN/WAN, VPN, firewalls, Cisco routers & switches, SSL/TLS, Conditional Access, endpoint security, patch management" },
  { label: "Testing & analytics", value: "Selenium, GA4, Google Search Console, technical SEO, Google Ads" },
];

export const expanding = ["Go", "Kubernetes", "Terraform", "GraphQL", "Vue.js", "Nuxt.js"];

export const education = {
  degree: "Bachelor of Computer Applications (BCA)",
  school: "Sree Narayana College of Technology, University of Kerala",
  location: "Kerala, India",
  period: "2021 — 2024",
};

export const certifications = [
  { name: "Microsoft 365 Certified: Fundamentals (MS-900)", issuer: "Microsoft" },
  { name: "Google Ads Search Certification", issuer: "Google Skillshop" },
  { name: "Google Analytics 4 Certification", issuer: "Google Skillshop" },
];

export const languages = [
  { name: "English", level: "Professional" },
  { name: "Malayalam", level: "Native" },
];

export const nav = [
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/ai-engineering", label: "AI Engineering" },
  { to: "/experience", label: "Experience" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const about = {
  intro:
    "I’m Reejan R Gopan (also written Reejan Gopan), a Full-Stack Software Engineer and IT Systems professional based in Dubai, UAE, specializing in enterprise applications, business automation, cloud infrastructure, and AI-enabled software solutions.",
  paragraphs: [
    "My experience spans the complete software delivery lifecycle — from understanding operational challenges and designing application architecture to developing secure systems, managing databases, deploying applications, and maintaining production infrastructure.",
    "At USF Group, I work across enterprise workforce management, HRMS and payroll systems, web applications, business process automation, corporate infrastructure, and cloud-based platforms.",
    "My key engineering projects include WAQTI, a production workforce management platform; DEVV, an AI-powered business copilot; and custom ERP initiatives.",
    "I primarily work with TypeScript, JavaScript, React, Next.js, Python, PostgreSQL, Supabase, and modern cloud development tools. I also use AI-assisted development workflows to support implementation, testing, code review, and software delivery.",
  ],
  lifecycle: [
    "Identify the problem", "Design the solution", "Build the application", "Design the database",
    "Secure the platform", "Deploy", "Monitor", "Optimise", "Support users", "Improve the process",
  ],
  differentiators: [
    { title: "Business + engineering", text: "I understand both the operational workflow and the technical implementation, so systems fit how people actually work." },
    { title: "End-to-end ownership", text: "Comfortable moving from requirement gathering to production deployment, monitoring and support." },
    { title: "Production experience", text: "My projects are used by real employees, supervisors and administrators — not tutorials." },
    { title: "Security by design", text: "Role-based access, Row Level Security, server-side authorisation and audit trails are part of the architecture, not an afterthought." },
  ],
  direction:
    "My career focus is building secure, maintainable, scalable enterprise software that solves real business problems. I’m interested in Full-Stack Software Engineering, Enterprise Application Development, AI Application Engineering, and Cloud Engineering opportunities.",
};

export const faqs = [
  {
    q: "What roles is Reejan R Gopan looking for?",
    a: "Reejan is interested in Full-Stack Software Engineering, Enterprise Application Development, AI Application Engineering and Cloud Engineering roles, and is based in Dubai, UAE.",
  },
  {
    q: "Does Reejan work with AI?",
    a: "Yes. He builds AI-enabled software — LLM API integration, retrieval with BM25, and DEVV, a role-aware AI copilot with a limited rollout — and uses AI-assisted development tools such as Codex, Claude Code and GitHub Copilot. He builds applications that use trained models; he does not present himself as a machine-learning researcher.",
  },
  {
    q: "Which websites has Reejan built with Next.js?",
    a: "usfdemolition.com, the website of USF Demolition Works LLC, is built with Next.js and deployed on Vercel. The other USF Group sites, usfgrand.com and rental.usfme.com, are React and Vite builds.",
  },
  {
    q: "Who is Reejan R Gopan?",
    a: "Reejan R Gopan is a Full-Stack Software Engineer based in Dubai, UAE. He builds production business applications, workforce platforms, automation tools and digital systems, and has 2+ years of experience across full-stack development, cloud infrastructure and enterprise IT in the UAE and India.",
  },
  {
    q: "Are Reejan Gopan and Reejan R Gopan the same person?",
    a: "Yes. Reejan R Gopan also goes by Reejan Gopan or simply Reejan. It is the same Dubai-based Full-Stack Software Engineer, and reejangopan.me is his official website.",
  },
  {
    q: "What services does Reejan Gopan offer?",
    a: "Full-stack web application development; workforce, payroll and ERP systems; PostgreSQL and Supabase back ends; cloud and DevOps on AWS, Azure and Vercel; AI automation with LLM APIs; Microsoft 365 and IT infrastructure; and technical SEO and web performance.",
  },
  {
    q: "What has Reejan built?",
    a: "Key projects include WAQTI, a workforce management platform for attendance, overtime, leave and payroll; the USF Group web platforms (usfdemolition.com, usfgrand.com, rental.usfme.com, usfme.com) with 300+ prerendered pages, SEO and GEO; a Python trading analysis platform for XAUUSD and BTCUSD; IT infrastructure deployments for Dubai SMBs; and custom ERP and CRM systems for companies.",
  },
  {
    q: "Which technologies does Reejan work with?",
    a: "React, TypeScript, JavaScript, Python, Node.js, PostgreSQL, Supabase, Next.js, AWS, Microsoft Azure, Docker, Vercel, Cloudflare, Microsoft 365, Entra ID, Windows Server and Active Directory.",
  },
  {
    q: "Is Reejan open to new roles?",
    a: "Yes — Reejan is open to Software Engineer, Full-Stack Developer, Cloud Engineer and Systems Engineer roles in Dubai and the UAE.",
  },
  {
    q: "How can I contact Reejan R Gopan?",
    a: "Email reejanr90@gmail.com, call +971 52 712 3154, or connect on LinkedIn. His CV can be downloaded from reejangopan.me.",
  },
];

export type Service = {
  id: string;
  title: string;
  searchTerms: string[];
  text: string;
  points: string[];
  tools: string[];
  related: string[]; // project slugs
  seoTitle: string; // page title (Dubai/UAE buyer searches)
  seoDescription: string;
  keywords: string[];
  guides: string[]; // titles of related guides in src/chat/guides.ts
};

// Each service maps to real work, so every keyword is backed by a project or role.
export const services: Service[] = [
  {
    id: "complete-business-setup",
    seoTitle: "IT & Digital Setup for Small Businesses in Dubai",
    seoDescription: "One partner for your company’s tech in Dubai: office IT, Microsoft 365, website, CRM, ERP, accounting integration, automation and support for SMBs.",
    keywords: ["IT company Dubai", "IT setup for small business Dubai", "IT support Dubai", "CRM setup Dubai", "ERP for SMEs UAE", "business automation Dubai"],
    guides: ["Can Reejan set up everything for my business?", "IT infrastructure setup for a new office?", "How do you set up a CRM for a business?", "Off-the-shelf ERP or a custom ERP?", "Can Reejan set up our accounting system?", "Managed IT support and maintenance?", "What can be automated in a small business?"],
    title: "Complete IT & digital setup for SMBs",
    searchTerms: ["IT company Dubai", "IT setup for small business UAE", "business automation Dubai", "CRM and ERP setup UAE"],
    text: "One technology partner for small and mid-size businesses — from the office network and Microsoft 365 to the website, CRM, ERP, accounting system and the automations that connect them. Planned, set up, documented and supported.",
    points: [
      "IT infrastructure: network, Wi-Fi, firewall, servers, Active Directory, devices",
      "Microsoft 365, business email, domains, security and backups",
      "Company website, SEO, Google Business Profile and lead tracking",
      "CRM setup, pipelines and lead automation",
      "ERP and custom business apps: HR, attendance, payroll, operations, inventory",
      "Accounting software setup and integration (with your accountant), VAT-ready",
      "Process automation, dashboards and AI assistants",
      "Training, documentation and ongoing support",
    ],
    tools: ["Microsoft 365", "Windows Server", "Entra ID", "Cloudflare", "React", "PostgreSQL", "Zoho", "Power Automate"],
    related: ["enterprise-it-infrastructure-dubai-smbs", "waqti-workforce-management-platform", "custom-erp-crm-systems", "usf-group-web-platforms"],
  },
  {
    id: "full-stack-development",
    seoTitle: "Full-Stack Web App Development in Dubai — React & Next.js",
    seoDescription: "Custom web applications, portals and dashboards in Dubai built with React, TypeScript, Next.js and Node.js — fast, secure and designed around your business.",
    keywords: ["web app development Dubai", "React developer Dubai", "full-stack developer UAE", "Next.js developer Dubai", "custom software development Dubai"],
    guides: ["Best tech stack for a business website?", "Best tech stack for a SaaS product?", "React, Next.js, Vue or Angular?", "Fastest way to build an MVP?", "What do I need before building a web app?"],
    title: "Full-stack web application development",
    searchTerms: ["Full-Stack Developer Dubai", "React developer Dubai", "TypeScript developer UAE", "web application developer UAE"],
    text: "Production web and mobile applications built with React, TypeScript and Next.js on Node.js, Express or Supabase back ends — designed around how the business actually works.",
    points: ["Dashboards, portals and internal tools", "Progressive web apps and Android clients", "Responsive, mobile-first interfaces", "CI/CD from GitHub to Vercel and Cloudflare"],
    tools: ["React", "TypeScript", "Next.js", "Node.js", "Express", "Tailwind CSS", "Flutter"],
    related: ["waqti-workforce-management-platform", "usf-group-web-platforms"],
  },
  {
    id: "business-systems",
    seoTitle: "Workforce, Payroll, ERP & CRM Software Development in the UAE",
    seoDescription: "Attendance, overtime, leave, payroll and ERP systems for UAE businesses — replacing paper and spreadsheets with web and mobile apps, like WAQTI.",
    keywords: ["attendance system UAE", "payroll software Dubai", "workforce management software UAE", "ERP developer Dubai", "CRM developer Dubai", "HR software Dubai"],
    guides: ["How do I automate HR, attendance and payroll?", "Off-the-shelf ERP or a custom ERP?", "Best tech stack for internal business tools?", "Build vs buy: SaaS or custom software?"],
    title: "Workforce, payroll, ERP & CRM software",
    searchTerms: ["workforce management software developer", "attendance system developer UAE", "payroll software developer Dubai", "ERP developer UAE", "custom CRM developer UAE"],
    text: "Business systems that replace paper and spreadsheets: attendance with GPS and selfie check-in, overtime engines, leave, payroll and HR workflows, and custom ERP and CRM systems.",
    points: ["Attendance, overtime and leave workflows", "Attendance-based payroll and payslips", "Role-based access for supervisors, HR and admins", "Custom ERP and CRM modules", "Audit trails and reporting"],
    tools: ["React", "TypeScript", "Supabase", "PostgreSQL", "PWA", "Android"],
    related: ["waqti-workforce-management-platform", "custom-erp-crm-systems"],
  },
  {
    id: "backend-databases",
    seoTitle: "Supabase, PostgreSQL & API Development in Dubai",
    seoDescription: "Secure back ends and databases: PostgreSQL schema design, Supabase with Row Level Security, REST APIs and integrations for Dubai and UAE businesses.",
    keywords: ["Supabase developer", "PostgreSQL developer Dubai", "API development Dubai", "backend developer UAE", "database design Dubai"],
    guides: ["Which database should I use?", "How do I scale a database?", "Node.js, Python or .NET for the back end?", "How do I protect customer data?"],
    title: "Back-end, database & API engineering",
    searchTerms: ["Supabase developer", "PostgreSQL developer Dubai", "REST API developer UAE", "Node.js developer Dubai"],
    text: "Relational data models, secure APIs and server-side business logic — with Row Level Security, role authorisation and audit logging built in from the start.",
    points: ["PostgreSQL schema design and query optimisation", "Supabase auth, RLS and server-side RPC", "REST APIs and third-party integrations", "Migrations, backups and data quality"],
    tools: ["PostgreSQL", "Supabase", "Node.js", "Express", "Flask", "ASP.NET Core", "MySQL", "MongoDB"],
    related: ["waqti-workforce-management-platform", "xauusd-btcusd-trading-analysis-platform"],
  },
  {
    id: "cloud-devops",
    seoTitle: "Cloud & DevOps Services in Dubai — AWS, Azure, Vercel",
    seoDescription: "Deploy and run apps reliably on AWS, Azure, Vercel and Cloudflare: CI/CD, Docker, domains, SSL, CDN, monitoring and cost control — 99%+ uptime.",
    keywords: ["cloud engineer Dubai", "AWS consultant UAE", "Azure engineer Dubai", "DevOps engineer UAE", "website hosting Dubai"],
    guides: ["Where should I host my website or app?", "How do I scale a web app?", "How do I keep my app online (uptime, backups)?", "How do I keep cloud costs low?", "What should I monitor in production?"],
    title: "Cloud, DevOps & deployment",
    searchTerms: ["Cloud Engineer Dubai", "AWS developer UAE", "Azure engineer Dubai", "DevOps engineer UAE"],
    text: "Deploying and running applications in production — hosting, CI/CD, domains, DNS, SSL and CDN — on AWS, Microsoft Azure, Vercel and Cloudflare.",
    points: ["CI/CD pipelines with GitHub", "AWS Lambda, S3, EC2, ELB and Kinesis", "Docker and Linux (Ubuntu) environments", "Domains, DNS, SSL, CDN and 99%+ uptime"],
    tools: ["AWS", "Microsoft Azure", "Vercel", "Cloudflare", "Docker", "Linux", "GitHub"],
    related: ["usf-group-web-platforms", "enterprise-it-infrastructure-dubai-smbs"],
  },
  {
    id: "ai-automation",
    seoTitle: "AI Automation & Chatbot Development in Dubai",
    seoDescription: "Python and LLM-powered automation, RAG knowledge bots and AI assistants for Dubai businesses — grounded in your data, measured in hours saved.",
    keywords: ["AI automation Dubai", "AI chatbot development UAE", "LLM integration developer", "RAG chatbot Dubai", "Python automation Dubai"],
    guides: ["How can a business use AI?", "Tech stack for an AI app or chatbot?", "How can a business automate its processes?", "What can be automated in a small business?"],
    title: "AI automation & LLM integration",
    searchTerms: ["AI automation Dubai", "LLM integration developer", "Python automation engineer UAE", "RAG developer"],
    text: "Python and LLM-powered automation for real operations — from reporting and IT ticket categorisation (saving ~5 hours a week) to retrieval-augmented assistants over company data.",
    points: ["Workflow and reporting automation in Python", "LLM APIs, Google Gemini and Vertex AI", "RAG with embeddings and Pinecone vector search", "Prompt engineering and AI-assisted development"],
    tools: ["Python", "Google Gemini", "Vertex AI", "Pinecone", "Sentence Transformers", "GitHub Copilot"],
    related: ["xauusd-btcusd-trading-analysis-platform"],
  },
  {
    id: "microsoft-365-it",
    seoTitle: "Microsoft 365 & IT Infrastructure Services in Dubai",
    seoDescription: "Microsoft 365, Entra ID, Intune, Windows Server, Active Directory, networking and endpoint security for Dubai SMBs — set up, secured and supported.",
    keywords: ["Microsoft 365 administrator Dubai", "Microsoft 365 setup Dubai", "IT infrastructure Dubai", "Active Directory Dubai", "network setup Dubai"],
    guides: ["IT infrastructure setup for a new office?", "Microsoft 365 or Google Workspace?", "Cybersecurity basics for a small business?", "Employee onboarding and offboarding IT checklist?", "Backup strategy for a small business?"],
    title: "Microsoft 365 & IT infrastructure",
    searchTerms: ["Microsoft 365 administrator Dubai", "Systems Engineer Dubai", "IT infrastructure engineer UAE", "Active Directory administrator"],
    text: "Identity, collaboration and infrastructure for growing businesses — Microsoft 365 for 50+ users, Entra ID, Windows Server, Active Directory, networking and endpoint security.",
    points: ["Microsoft 365, Exchange Online, SharePoint and Teams", "Entra ID, Conditional Access, MFA and Intune", "Windows Server 2019/2022, Active Directory and Group Policy", "Networking, VPN, firewalls and patch management"],
    tools: ["Microsoft 365", "Entra ID", "Intune", "Windows Server", "Active Directory", "Cisco"],
    related: ["enterprise-it-infrastructure-dubai-smbs"],
  },
  {
    id: "technical-seo",
    seoTitle: "Technical SEO & Website Speed Optimization in Dubai",
    seoDescription: "Websites built to rank and convert in Dubai: technical SEO, schema, sitemaps, Core Web Vitals and GA4 conversion tracking for calls, forms and WhatsApp.",
    keywords: ["technical SEO Dubai", "SEO expert Dubai", "website speed optimization UAE", "Core Web Vitals", "Google Ads tracking Dubai"],
    guides: ["How do I improve website SEO?", "How do I make a website load fast?", "What does a marketing tech stack need?", "What should I test before launch?"],
    title: "Technical SEO & web performance",
    searchTerms: ["technical SEO Dubai", "Core Web Vitals optimisation", "website performance UAE", "GA4 conversion tracking"],
    text: "Websites engineered to be found and to convert: prerendering, structured data, sitemaps, Core Web Vitals and GA4 conversion tracking for forms, calls and WhatsApp.",
    points: ["Prerendered, crawlable architectures", "Schema markup and sitemap architecture", "Core Web Vitals (LCP, FCP, CLS) optimisation", "GA4, Tag Manager and Google Ads tracking"],
    tools: ["GA4", "Google Tag Manager", "Search Console", "Google Ads", "Lighthouse"],
    related: ["usf-group-web-platforms"],
  },
];

// Search phrases the site targets — every one is backed by a project, role or service above.
export const seoKeywords = [
  "Reejan R Gopan", "Reejan Gopan", "Reejan",
  "Full-Stack Software Engineer Dubai", "Software Engineer UAE", "Enterprise Application Developer UAE", "AI Application Engineer Dubai", "Next.js Developer Dubai", "Cloud & DevOps Engineer Dubai", "Software Engineer Dubai", "Systems Engineer Dubai", "Full-Stack Developer Dubai", "React Developer Dubai",
  "TypeScript Developer UAE", "Supabase Developer", "PostgreSQL Developer Dubai", "Node.js Developer Dubai",
  "Cloud Engineer Dubai", "AWS Developer UAE", "Azure Engineer Dubai", "Microsoft 365 Administrator Dubai",
  "Workforce Management Software Developer", "ERP Developer UAE", "Payroll Software Developer Dubai",
  "AI Automation Dubai", "Python Developer Dubai", "Technical SEO Dubai", "Web Application Developer UAE",
];

// Skills grouped by category and by how well each is evidenced. "demonstrated" means it appears in a
// project or role on this site. Anything else is working knowledge or still being learned, and is
// never described as production experience.
export type SkillGroup = { category: string; demonstrated: string[]; working: string[]; learning: string[] };
export const skillMatrix: SkillGroup[] = [
  { category: "Programming languages", demonstrated: ["TypeScript", "JavaScript", "Python", "SQL", "HTML5", "CSS3"], working: ["C#", "Java", "C++", "PHP", "Dart"], learning: ["Go", "Rust", "Kotlin", "Bash / PowerShell"] },
  { category: "Frontend engineering", demonstrated: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Vite", "Progressive web apps", "Responsive design"], working: ["Flutter"], learning: ["Vue.js", "Nuxt.js", "Angular"] },
  { category: "Backend & API engineering", demonstrated: ["Node.js", "Flask", "REST APIs"], working: ["Express", "ASP.NET Core", "Microservices"], learning: ["FastAPI", "Spring Boot", "Laravel", "GraphQL", "WebSockets"] },
  { category: "Databases", demonstrated: ["PostgreSQL", "Supabase", "Row Level Security", "Schema migrations"], working: ["MySQL", "MongoDB", "Firestore", "Pinecone"], learning: ["Redis", "SQL Server"] },
  { category: "Cloud & DevOps", demonstrated: ["Git & GitHub", "Vercel", "Cloudflare", "CI/CD deployments"], working: ["Docker", "Linux (Ubuntu)", "AWS", "Microsoft Azure", "Netlify"], learning: ["Kubernetes", "Terraform", "GitHub Actions", "Jenkins", "Nginx"] },
  { category: "AI engineering", demonstrated: ["LLM API integration", "BM25 retrieval", "Role-aware retrieval", "AI-assisted development (Codex, Claude Code, GitHub Copilot)"], working: ["RAG", "Embeddings & vector search", "Google Gemini & Vertex AI", "Prompt engineering"], learning: ["LLM evaluation", "AI observability and cost control"] },
  { category: "Enterprise applications", demonstrated: ["Workforce management", "Attendance & payroll logic", "Role-based access", "Business process automation"], working: ["ERP & CRM modules (in development)"], learning: ["Accounting-software integrations"] },
  { category: "Software architecture & security", demonstrated: ["RBAC", "Row Level Security", "Audit logging", "Server-side authorisation", "Idempotency & retry handling"], working: ["SSL/TLS", "Conditional Access"], learning: [] },
  { category: "IT infrastructure", demonstrated: ["Microsoft 365", "Windows Server 2019/2022", "Active Directory", "Group Policy", "Entra ID", "DNS & DHCP", "VPN"], working: ["Exchange Online", "SharePoint", "Teams", "Intune", "Cisco routers & switches", "Firewalls", "Endpoint security", "Patch management"], learning: [] },
  { category: "Testing & quality engineering", demonstrated: ["Unit, integration and end-to-end testing", "Database regression testing"], working: ["Selenium", "Playwright"], learning: [] },
  { category: "SEO, performance & analytics", demonstrated: ["Technical SEO", "GEO (AI-search optimisation)", "JSON-LD structured data", "Core Web Vitals", "GA4", "Google Search Console", "Google Ads"], working: [], learning: [] },
];
