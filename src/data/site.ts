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
  title: "Software & Systems Engineer",
  tagline:
    "I build production business applications, workforce platforms, automation tools, and digital systems.",
  summary:
    "2+ years across full-stack development, cloud infrastructure and enterprise IT in the UAE and India — solving real operational problems from workforce attendance and payroll to business websites and cloud deployments.",
  location: "Dubai, UAE",
  openTo: "Software, Full-Stack, Cloud & Systems roles",
  email: "reejanr90@gmail.com",
  phone: "+971 52 712 3154",
  phoneHref: "tel:+971527123154",
  linkedin: "https://www.linkedin.com/in/reejan-r-gopan-38a8092b9",
  cv: "/Reejan_R_Gopan_CV.pdf",
  github: "https://github.com/reejanr",
};

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
    slug: "usf-demolition-digital-platform",
    name: "USF Demolition Digital Platform",
    short:
      "Corporate web platform with 200+ prerendered routes, technical SEO, analytics, conversion tracking and performance optimization.",
    category: "Web platform",
    status: "Live",
    period: "2025 — present",
    role: "Design, development, SEO, analytics & deployment",
    result: "200+ prerendered routes · CI/CD via GitHub",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Vercel", "Cloudflare"],
    overview: [
      "The corporate website for USF Demolition Works LLC — a fast, search-optimised platform covering demolition services, projects, equipment, tenders, vendor registration and careers.",
      "Every route is prerendered to static HTML for speed and indexability, and deployed through GitHub to Vercel behind Cloudflare.",
    ],
    features: [
      { title: "Prerendered architecture", text: "200+ statically prerendered routes for fast first paint and complete indexing." },
      { title: "Technical SEO", text: "Sitemap architecture, robots directives, canonical URLs, metadata and JSON-LD structured data across service and location pages." },
      { title: "Analytics & conversions", text: "GA4 and Google Tag Manager tracking for form submissions, calls, click-to-call, WhatsApp, directions and outbound clicks." },
      { title: "Performance", text: "Core Web Vitals work on LCP, FCP, blocking time, image optimisation, lazy loading and transfer size, with a mobile-first focus." },
    ],
    outcomes: [
      "200+ prerendered, indexable routes",
      "CI/CD from GitHub to Vercel and Cloudflare",
      "Technical SEO, GA4 tracking and Google Ads supporting organic and paid traffic in Dubai and Abu Dhabi",
    ],
    link: { label: "Visit usfdemolition.com", href: "https://usfdemolition.com" },
    seoTitle: "USF Demolition Digital Platform — Case Study",
    seoDescription:
      "Case study: React and Vite corporate platform with 200+ prerendered routes, technical SEO, GA4 conversion tracking and Core Web Vitals work.",
    keywords: ["technical SEO", "prerendering", "React website", "Core Web Vitals", "Vercel", "Cloudflare"],
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
  {
    slug: "internal-erp-platform",
    name: "Internal ERP Platform",
    short:
      "Business-management platform covering HR, employees, payroll, operations and accounting workflows.",
    category: "Enterprise application",
    status: "In development",
    period: "2025 — present",
    role: "Architecture & full-stack development",
    stack: ["React", "TypeScript", "PostgreSQL"],
    overview: [
      "An integrated operations platform that brings company workflows into one system instead of many disconnected tools.",
    ],
    features: [
      { title: "People", text: "Employee records, HR workflows and payroll." },
      { title: "Operations", text: "Operational processes, documents and project administration." },
      { title: "Finance", text: "Accounting workflows, with integration options such as Zoho Books and UAE e-invoicing under evaluation." },
      { title: "Reporting", text: "Management dashboards on a relational PostgreSQL core." },
    ],
    outcomes: ["One relational source of truth for company operations"],
    seoTitle: "Internal ERP Platform (React, TypeScript, PostgreSQL)",
    seoDescription:
      "An internal ERP platform for HR, employees, payroll, operations and accounting workflows, built with React, TypeScript and PostgreSQL by Reejan R Gopan.",
    keywords: ["ERP development", "HR system", "payroll", "PostgreSQL", "React"],
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
      "Built and deployed **usfdemolition.com** with React, TypeScript and Tailwind — CI/CD through GitHub, hosted on Vercel and Cloudflare.",
      "Administered **Microsoft 365 for 50+ users** — provisioning, licensing, Exchange Online, SharePoint, Teams and Conditional Access in Entra ID.",
      "Managed Windows Server 2019/2022, Active Directory, Group Policy, DNS, DHCP, VPS hosting and corporate email at **99%+ uptime**.",
      "Automated reporting and IT ticket categorisation with Python, LLM APIs and GitHub Copilot, **saving ~5 hours a week**.",
      "Ran technical SEO, GA4 tracking and Google Ads for demolition services in Dubai and Abu Dhabi; enforced endpoint security, access reviews and patching.",
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
  "React", "TypeScript", "Python", "Node.js", "PostgreSQL", "Supabase",
  "Next.js", "AWS", "Azure", "Docker", "Microsoft 365", "Windows Server",
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

export const expanding = ["C#", "ASP.NET Core", "Docker", "Azure"];

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
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
];

export const about = {
  intro:
    "I’m Reejan R Gopan — also written Reejan Gopan — a Software & Systems Engineer based in Dubai. I build production business systems — workforce management, attendance, payroll and ERP platforms — and manage the infrastructure, security, websites, analytics and digital platforms behind them.",
  paragraphs: [
    "My work combines software engineering with real-world business operations. Instead of focusing only on code or only on IT administration, I work across the complete technology lifecycle — from understanding the business problem to running the system in production and improving it.",
    "At USF Group in Dubai I built WAQTI, a workforce platform used for real field operations, and the company’s web platform with 200+ prerendered routes. Alongside development I administer Microsoft 365 for 50+ users, Windows Server and Active Directory, hosting, DNS and corporate email.",
    "Before that I worked in IT procurement and support at Chimera Group in Dubai, and as a Network Administrator at TCS iON in India — the infrastructure foundation that shapes how I design and secure software today.",
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
    "My direction is toward full-stack engineering, cloud and DevOps, and AI-enabled enterprise systems — designing and operating complete platforms from infrastructure to application.",
};

export const faqs = [
  {
    q: "Who is Reejan R Gopan?",
    a: "Reejan R Gopan is a Software & Systems Engineer based in Dubai, UAE. He builds production business applications, workforce platforms, automation tools and digital systems, and has 2+ years of experience across full-stack development, cloud infrastructure and enterprise IT in the UAE and India.",
  },
  {
    q: "Are Reejan Gopan and Reejan R Gopan the same person?",
    a: "Yes. Reejan R Gopan also goes by Reejan Gopan or simply Reejan. It is the same Dubai-based Software & Systems Engineer, and reejangopan.me is his official website.",
  },
  {
    q: "What services does Reejan Gopan offer?",
    a: "Full-stack web application development; workforce, payroll and ERP systems; PostgreSQL and Supabase back ends; cloud and DevOps on AWS, Azure and Vercel; AI automation with LLM APIs; Microsoft 365 and IT infrastructure; and technical SEO and web performance.",
  },
  {
    q: "What has Reejan built?",
    a: "Key projects include WAQTI, a workforce management platform for attendance, overtime, leave and payroll; the USF Demolition digital platform with 200+ prerendered routes and technical SEO; a Python trading analysis platform for XAUUSD and BTCUSD; IT infrastructure deployments for Dubai SMBs; and an internal ERP platform.",
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
};

// Each service maps to real work, so every keyword is backed by a project or role.
export const services: Service[] = [
  {
    id: "complete-business-setup",
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
    related: ["enterprise-it-infrastructure-dubai-smbs", "waqti-workforce-management-platform", "internal-erp-platform", "usf-demolition-digital-platform"],
  },
  {
    id: "full-stack-development",
    title: "Full-stack web application development",
    searchTerms: ["Full-Stack Developer Dubai", "React developer Dubai", "TypeScript developer UAE", "web application developer UAE"],
    text: "Production web and mobile applications built with React, TypeScript and Next.js on Node.js, Express or Supabase back ends — designed around how the business actually works.",
    points: ["Dashboards, portals and internal tools", "Progressive web apps and Android clients", "Responsive, mobile-first interfaces", "CI/CD from GitHub to Vercel and Cloudflare"],
    tools: ["React", "TypeScript", "Next.js", "Node.js", "Express", "Tailwind CSS", "Flutter"],
    related: ["waqti-workforce-management-platform", "usf-demolition-digital-platform"],
  },
  {
    id: "business-systems",
    title: "Workforce, payroll & ERP software",
    searchTerms: ["workforce management software developer", "attendance system developer UAE", "payroll software developer Dubai", "ERP developer UAE"],
    text: "Business systems that replace paper and spreadsheets: attendance with GPS and selfie check-in, overtime engines, leave, payroll and HR workflows, and integrated ERP modules.",
    points: ["Attendance, overtime and leave workflows", "Attendance-based payroll and payslips", "Role-based access for supervisors, HR and admins", "Audit trails and reporting"],
    tools: ["React", "TypeScript", "Supabase", "PostgreSQL", "PWA", "Android"],
    related: ["waqti-workforce-management-platform", "internal-erp-platform"],
  },
  {
    id: "backend-databases",
    title: "Back-end, database & API engineering",
    searchTerms: ["Supabase developer", "PostgreSQL developer Dubai", "REST API developer UAE", "Node.js developer Dubai"],
    text: "Relational data models, secure APIs and server-side business logic — with Row Level Security, role authorisation and audit logging built in from the start.",
    points: ["PostgreSQL schema design and query optimisation", "Supabase auth, RLS and server-side RPC", "REST APIs and third-party integrations", "Migrations, backups and data quality"],
    tools: ["PostgreSQL", "Supabase", "Node.js", "Express", "Flask", "ASP.NET Core", "MySQL", "MongoDB"],
    related: ["waqti-workforce-management-platform", "xauusd-btcusd-trading-analysis-platform"],
  },
  {
    id: "cloud-devops",
    title: "Cloud, DevOps & deployment",
    searchTerms: ["Cloud Engineer Dubai", "AWS developer UAE", "Azure engineer Dubai", "DevOps engineer UAE"],
    text: "Deploying and running applications in production — hosting, CI/CD, domains, DNS, SSL and CDN — on AWS, Microsoft Azure, Vercel and Cloudflare.",
    points: ["CI/CD pipelines with GitHub", "AWS Lambda, S3, EC2, ELB and Kinesis", "Docker and Linux (Ubuntu) environments", "Domains, DNS, SSL, CDN and 99%+ uptime"],
    tools: ["AWS", "Microsoft Azure", "Vercel", "Cloudflare", "Docker", "Linux", "GitHub"],
    related: ["usf-demolition-digital-platform", "enterprise-it-infrastructure-dubai-smbs"],
  },
  {
    id: "ai-automation",
    title: "AI automation & LLM integration",
    searchTerms: ["AI automation Dubai", "LLM integration developer", "Python automation engineer UAE", "RAG developer"],
    text: "Python and LLM-powered automation for real operations — from reporting and IT ticket categorisation (saving ~5 hours a week) to retrieval-augmented assistants over company data.",
    points: ["Workflow and reporting automation in Python", "LLM APIs, Google Gemini and Vertex AI", "RAG with embeddings and Pinecone vector search", "Prompt engineering and AI-assisted development"],
    tools: ["Python", "Google Gemini", "Vertex AI", "Pinecone", "Sentence Transformers", "GitHub Copilot"],
    related: ["xauusd-btcusd-trading-analysis-platform"],
  },
  {
    id: "microsoft-365-it",
    title: "Microsoft 365 & IT infrastructure",
    searchTerms: ["Microsoft 365 administrator Dubai", "Systems Engineer Dubai", "IT infrastructure engineer UAE", "Active Directory administrator"],
    text: "Identity, collaboration and infrastructure for growing businesses — Microsoft 365 for 50+ users, Entra ID, Windows Server, Active Directory, networking and endpoint security.",
    points: ["Microsoft 365, Exchange Online, SharePoint and Teams", "Entra ID, Conditional Access, MFA and Intune", "Windows Server 2019/2022, Active Directory and Group Policy", "Networking, VPN, firewalls and patch management"],
    tools: ["Microsoft 365", "Entra ID", "Intune", "Windows Server", "Active Directory", "Cisco"],
    related: ["enterprise-it-infrastructure-dubai-smbs"],
  },
  {
    id: "technical-seo",
    title: "Technical SEO & web performance",
    searchTerms: ["technical SEO Dubai", "Core Web Vitals optimisation", "website performance UAE", "GA4 conversion tracking"],
    text: "Websites engineered to be found and to convert: prerendering, structured data, sitemaps, Core Web Vitals and GA4 conversion tracking for forms, calls and WhatsApp.",
    points: ["Prerendered, crawlable architectures", "Schema markup and sitemap architecture", "Core Web Vitals (LCP, FCP, CLS) optimisation", "GA4, Tag Manager and Google Ads tracking"],
    tools: ["GA4", "Google Tag Manager", "Search Console", "Google Ads", "Lighthouse"],
    related: ["usf-demolition-digital-platform"],
  },
];

// Search phrases the site targets — every one is backed by a project, role or service above.
export const seoKeywords = [
  "Reejan R Gopan", "Reejan Gopan", "Reejan",
  "Software Engineer Dubai", "Systems Engineer Dubai", "Full-Stack Developer Dubai", "React Developer Dubai",
  "TypeScript Developer UAE", "Supabase Developer", "PostgreSQL Developer Dubai", "Node.js Developer Dubai",
  "Cloud Engineer Dubai", "AWS Developer UAE", "Azure Engineer Dubai", "Microsoft 365 Administrator Dubai",
  "Workforce Management Software Developer", "ERP Developer UAE", "Payroll Software Developer Dubai",
  "AI Automation Dubai", "Python Developer Dubai", "Technical SEO Dubai", "Web Application Developer UAE",
];
