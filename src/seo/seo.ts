import {
  SITE_URL, profile, projects, experience, coreStack, certifications, education, faqs,
  services, seoKeywords, toolkit,
} from "@/data/site";

// Every route the site serves. prerender.js renders each one to static HTML
// and builds sitemap.xml from this list.
export const routes: string[] = [
  "/",
  "/about",
  "/services",
  "/projects",
  ...projects.map((p) => `/projects/${p.slug}`),
  "/experience",
  "/skills",
  "/contact",
];

export type Head = {
  title: string;
  description: string;
  path: string;
  ogType: "website" | "profile" | "article";
  robots?: string;
  keywords?: string[];
  jsonLd: object[];
};

const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const abs = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;

const person = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: profile.name,
  givenName: profile.givenName,
  familyName: profile.familyName,
  alternateName: profile.alternateNames,
  jobTitle: profile.title,
  description: `${profile.title} in Dubai. ${profile.tagline}`,
  url: SITE_URL,
  image: OG_IMAGE,
  email: `mailto:${profile.email}`,
  telephone: profile.phoneHref.replace("tel:", ""),
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  worksFor: { "@id": `${SITE_URL}/#employer` },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.school,
    address: { "@type": "PostalAddress", addressRegion: "Kerala", addressCountry: "IN" },
  },
  hasCredential: certifications.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c.name,
    credentialCategory: "certification",
    recognizedBy: { "@type": "Organization", name: c.issuer },
  })),
  knowsAbout: Array.from(new Set([
    ...coreStack,
    ...toolkit.flatMap((t) => t.value.split(/,\s*/)).map((v) => v.replace(/\s*\(.*?\)/, "")),
    "Full-stack development", "Workforce management systems", "Payroll systems", "ERP development",
    "Cloud infrastructure", "DevOps", "AI automation", "Technical SEO",
  ])),
  makesOffer: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.title, description: s.text, areaServed: "United Arab Emirates" },
  })),
  homeLocation: { "@type": "City", name: "Dubai" },
  knowsLanguage: ["English", "Malayalam"],
  sameAs: [profile.linkedin, profile.github],
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: profile.siteName,
  alternateName: [profile.name, "reejangopan.me"],
  description: `Portfolio of ${profile.name}, ${profile.title} in Dubai.`,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#person` },
};

const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

const BUILT = new Date().toISOString().slice(0, 10);

const page = (type: string, path: string, name: string, description: string, extra: object = {}) => ({
  "@type": type,
  dateModified: BUILT,
  "@id": `${abs(path)}#webpage`,
  url: abs(path),
  name,
  description,
  inLanguage: "en",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#person` },
  ...extra,
});

const employer = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#employer`,
  name: "USF Group (USF Demolition Works LLC)",
  url: "https://usfdemolition.com",
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
};

const graph = (...nodes: object[]) => [{ "@context": "https://schema.org", "@graph": [website, person, employer, ...nodes] }];

export function getHead(rawPath: string): Head {
  const path = rawPath.replace(/\/+$/, "") || "/";

  if (path === "/") {
    const title = `${profile.siteName} — ${profile.title} in Dubai`;
    const description =
      "Software & Systems Engineer in Dubai building production business apps, workforce platforms and cloud systems with React, TypeScript, PostgreSQL and Python.";
    return {
      title, description, path, ogType: "profile",
      keywords: seoKeywords,
      jsonLd: graph(page("ProfilePage", path, title, description, { mainEntity: { "@id": `${SITE_URL}/#person` } })),
    };
  }

  if (path === "/about") {
    const title = `About Reejan Gopan (${profile.name}) — Dubai`;
    const description =
      "About Reejan R Gopan, a Dubai-based Software & Systems Engineer building workforce, payroll and ERP systems and running the cloud, security and IT behind them.";
    return {
      title, description, path, ogType: "profile",
      keywords: [...profile.alternateNames, profile.name, "Software Engineer Dubai", "Systems Engineer UAE"],
      jsonLd: graph(
        page("AboutPage", path, title, description, { mainEntity: { "@id": `${SITE_URL}/#person` } }),
        {
          "@type": "FAQPage",
          "@id": `${abs(path)}#faq`,
          mainEntity: faqs.map((f) => ({
            "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
        breadcrumbs([{ name: "About", path }]),
      ),
    };
  }

  if (path === "/services") {
    const title = `Services — ${profile.siteName}, Software Engineer Dubai`;
    const description =
      "Complete IT and digital setup for SMBs in Dubai: IT infrastructure, Microsoft 365, websites, CRM, ERP, automation, cloud and AI — by Reejan R Gopan.";
    return {
      title, description, path, ogType: "website",
      keywords: services.flatMap((s) => s.searchTerms),
      jsonLd: graph(
        page("CollectionPage", path, title, description, {
          mainEntity: {
            "@type": "ItemList",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Service",
                "@id": `${abs(path)}#${s.id}`,
                name: s.title,
                description: s.text,
                serviceType: s.title,
                provider: { "@id": `${SITE_URL}/#person` },
                areaServed: [{ "@type": "City", name: "Dubai" }, { "@type": "Country", name: "United Arab Emirates" }],
                url: `${abs(path)}#${s.id}`,
              },
            })),
          },
        }),
        breadcrumbs([{ name: "Services", path }]),
      ),
    };
  }

  if (path === "/projects") {
    const title = `Projects — ${profile.siteName}, Software Engineer`;
    const description =
      "Projects by Reejan R Gopan: WAQTI workforce platform, USF Demolition web platform, a Python trading analysis system, IT infrastructure and an ERP.";
    return {
      title, description, path, ogType: "website",
      jsonLd: graph(
        page("CollectionPage", path, title, description, {
          mainEntity: {
            "@type": "ItemList",
            itemListElement: projects.map((p, i) => ({
              "@type": "ListItem", position: i + 1, name: p.name, url: abs(`/projects/${p.slug}`),
            })),
          },
        }),
        breadcrumbs([{ name: "Projects", path }]),
      ),
    };
  }

  const project = projects.find((p) => path === `/projects/${p.slug}`);
  if (project) {
    const title = project.seoTitle.length <= 44 ? `${project.seoTitle} | ${profile.siteName}` : project.seoTitle;
    return {
      title, description: project.seoDescription, path, ogType: "article", keywords: project.keywords,
      jsonLd: graph(
        page("WebPage", path, title, project.seoDescription, {
          mainEntity: {
            "@type": project.slug.startsWith("waqti") ? "SoftwareApplication" : "CreativeWork",
            name: project.name,
            description: project.short,
            author: { "@id": `${SITE_URL}/#person` },
            keywords: [...project.stack, ...project.keywords].join(", "),
            ...(project.slug.startsWith("waqti")
              ? { applicationCategory: "BusinessApplication", operatingSystem: "Web, Android" }
              : {}),
            ...(project.link ? { sameAs: project.link.href } : {}),
          },
        }),
        breadcrumbs([{ name: "Projects", path: "/projects" }, { name: project.name, path }]),
      ),
    };
  }

  if (path === "/experience") {
    const title = `Experience — ${profile.siteName}, ${profile.title}`;
    const description =
      "Experience of Reejan R Gopan: IT Systems & Digital Transformation at USF Group Dubai, IT support at Chimera Group and network admin at TCS iON.";
    return {
      title, description, path, ogType: "profile",
      jsonLd: graph(
        page("ProfilePage", path, title, description, {
          mainEntity: {
            "@id": `${SITE_URL}/#person`,
            hasOccupation: experience.map((e) => ({
              "@type": "Occupation", name: e.role,
              occupationLocation: { "@type": "Place", name: e.location },
            })),
          },
        }),
        breadcrumbs([{ name: "Experience", path }]),
      ),
    };
  }

  if (path === "/skills") {
    const title = `Skills & Tech Stack — ${profile.siteName}`;
    const description =
      "Reejan R Gopan's tech stack: React, TypeScript, Python, Node.js, PostgreSQL, Supabase, AWS, Azure, Docker, Microsoft 365 and Windows Server.";
    return {
      title, description, path, ogType: "website",
      jsonLd: graph(page("WebPage", path, title, description), breadcrumbs([{ name: "Skills", path }])),
    };
  }

  if (path === "/contact") {
    const title = `Contact ${profile.siteName} — Software Engineer in Dubai`;
    const description =
      "Contact Reejan R Gopan, Software & Systems Engineer in Dubai — email, phone, LinkedIn and CV. Open to Software, Full-Stack, Cloud and Systems roles.";
    return {
      title, description, path, ogType: "website",
      jsonLd: graph(page("ContactPage", path, title, description), breadcrumbs([{ name: "Contact", path }])),
    };
  }

  return {
    title: `Page not found | ${profile.siteName}`,
    description: "This page does not exist.",
    path, ogType: "website", robots: "noindex, follow", jsonLd: [],
  };
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Head tags as an HTML string, used by prerender.js. Every tag carries data-seo
// so the client can swap them on navigation.
export function headToHtml(h: Head): string {
  const url = abs(h.path);
  const tags = [
    `<title data-seo>${esc(h.title)}</title>`,
    `<meta data-seo name="description" content="${esc(h.description)}" />`,
    `<meta data-seo name="robots" content="${h.robots ?? "index, follow, max-image-preview:large, max-snippet:-1"}" />`,
    h.keywords ? `<meta data-seo name="keywords" content="${esc(h.keywords.join(", "))}" />` : "",
    `<link data-seo rel="canonical" href="${url}" />`,
    `<meta data-seo property="og:type" content="${h.ogType}" />`,
    `<meta data-seo property="og:site_name" content="${esc(profile.siteName)}" />`,
    `<meta data-seo property="og:title" content="${esc(h.title)}" />`,
    `<meta data-seo property="og:description" content="${esc(h.description)}" />`,
    `<meta data-seo property="og:url" content="${url}" />`,
    `<meta data-seo property="og:image" content="${OG_IMAGE}" />`,
    `<meta data-seo property="og:image:width" content="1200" />`,
    `<meta data-seo property="og:image:height" content="630" />`,
    `<meta data-seo property="og:image:alt" content="${esc(`${profile.name} — ${profile.title}`)}" />`,
    `<meta data-seo property="og:locale" content="en_US" />`,
    `<meta data-seo name="twitter:card" content="summary_large_image" />`,
    `<meta data-seo name="twitter:title" content="${esc(h.title)}" />`,
    `<meta data-seo name="twitter:description" content="${esc(h.description)}" />`,
    `<meta data-seo name="twitter:image" content="${OG_IMAGE}" />`,
    ...h.jsonLd.map((j) => `<script data-seo type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`),
  ];
  return tags.filter(Boolean).join("\n    ");
}
