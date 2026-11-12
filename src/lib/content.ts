// ───────────────────────────────────────────────────────────────
// Single content source — all data drawn from Ubaid Ur Rahman.
// No invented metrics, testimonials, or projects.
// Fields marked "to be confirmed" are placeholders awaiting input.
// ───────────────────────────────────────────────────────────────

export const person = {
  name: "Ubaid Ur Rahman",
  initials: "UR",
  brand: "UBAIDSTACK",
  role: "Full Stack Developer",
  shortRole: "Full Stack Developer",
  location: "Peshawar, KPK, Pakistan",
  email: "ubaidking2008@gmail.com",
  phone: "03195907416",
  whatsapp:
    "https://wa.me/923195907416?text=Hi%21%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%20with%20you.",
  yearsExperience: "2",
  status: "Available for focused collaborations",
  social: {
    github: "https://github.com/rahman-khan-star",
  },
  positioning:
    "I build fast, responsive web applications with React, Next.js, and TypeScript.",
  intro: [
    "I build responsive, component-based web interfaces.",
    "I care about clean code, clear structure, and reliable delivery.",
  ],
} as const

export const heroStats = [
  { value: "2", label: "Years of experience" },
  { value: "8", label: "Projects shown below" },
  { value: "Full stack", label: "Frontend to deployment" },
] as const

export const heroCapabilities = [
  {
    label: "Frontend",
    value: "React.js · Next.js · TypeScript",
  },
  {
    label: "Languages",
    value: "JavaScript · TypeScript · HTML · CSS",
  },
  {
    label: "Tooling",
    value: "Tailwind CSS · Git & GitHub · Vercel",
  },
] as const

export const productionDomains = [
  "TRAVEL",
  "HEALTHCARE",
  "EDUCATION",
  "WATCHES",
  "CAFE",
  "ECOMMERCE",
  "SAAS",
] as const

// ── Selected work ──────────────────────────────────────────────
export type Project = {
  id: string
  index: string
  name: string
  url: string
  category: string
  problem: string
  built: string
  role: string
  tech: string[]
  challenge: string
  result: string
  /** Real screenshots served from /public, in display order. */
  screenshots: string[]
  /** Optional label for the live link. */
  ctaLabel?: string
  /** Optional case study file served from /public. */
  presentation?: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    id: "travel-agency-website",
    index: "01",
    name: "Travel Agency Website",
    url: "https://waditours.vercel.app/",
    category: "Website",
    problem: "Details to be confirmed.",
    built: "Project details to be confirmed.",
    role: "To be confirmed.",
    tech: ["To be confirmed"],
    challenge: "To be confirmed.",
    result: "To be confirmed.",
    screenshots: [
      "/travel-agency-1.png.png",
      "/travel-agency-2.png.png",
      "/travel-agency-3.png.png",
      "/travel-agency-4.png.png",
      "/travel-agency-5.png.png",
      "/travel-agency-6.png.png",
    ],
    featured: true,
  },
  {
    id: "medinova-clinic",
    index: "02",
    name: "MediNova Clinic",
    url: "https://medinovaclinic.vercel.app/#home",
    category: "Healthcare Website / Web Development",
    problem: "Details to be confirmed.",
    built:
      "A modern, responsive healthcare website designed to present medical services, introduce doctors, and guide visitors toward appointment requests.",
    role: "To be confirmed.",
    tech: [],
    challenge: "To be confirmed.",
    result: "To be confirmed.",
    screenshots: [
      "/medinova-clinic-project (1).png",
      "/medinova-clinic-project (2).png",
      "/medinova-clinic-project (3).png",
      "/medinova-clinic-project (4).png",
      "/medinova-clinic-project (5).png",
      "/medinova-clinic-project (6).png",
    ],
    ctaLabel: "Visit Site",
    presentation: "/medinova-clinic-presentation.pptx",
  },
  {
    id: "estateora-real-estate",
    index: "03",
    name: "Estateora Real Estate",
    url: "https://estateorarealstate.vercel.app/",
    category: "Real Estate Website",
    problem: "Details to be confirmed.",
    built:
      "A modern, responsive real estate website for buying, renting, and selling property, with property search filters and a listing submission flow.",
    role: "To be confirmed.",
    tech: ["To be confirmed"],
    challenge: "To be confirmed.",
    result: "To be confirmed.",
    screenshots: [
      "/realstate-1.jpg",
      "/realstate-2.jpg",
      "/realstate-3.jpg",
      "/realstate-4.jpg",
      "/realstate-5.jpg",
    ],
  },
  {
    id: "quiz-study-platform",
    index: "04",
    name: "MDCAT Quiz & Study Platform",
    url: "https://mdcat-platform.vercel.app/",
    category: "Web application",
    problem: "Details to be confirmed.",
    built: "Project details to be confirmed.",
    role: "To be confirmed.",
    tech: ["To be confirmed"],
    challenge: "To be confirmed.",
    result: "To be confirmed.",
    screenshots: [
      "/mdcat-platform-1.png.jpg",
      "/mdcat-platform-2.png.jpg",
      "/mdcat-platform-3.png.jpg",
    ],
  },
  {
    id: "timevio-watch-store",
    index: "05",
    name: "TIMEVIO Watches",
    url: "https://www.timevio.shop/",
    category: "Shopify E-commerce Store",
    problem:
      "An independent watch brand needed an online store that could showcase its collection and take orders without a custom-built stack.",
    built:
      "A Shopify storefront for a watch brand, with a curated product catalogue, sale pricing, product pages, and an FAQ covering delivery, cash on delivery, and returns.",
    role: "Store setup · Storefront design · Content and product data",
    tech: ["Shopify", "Liquid", "HTML", "CSS"],
    challenge:
      "Keeping the storefront clean and premium while making prices, delivery options, and ordering through WhatsApp immediately clear.",
    result:
      "A live store at timevio.shop with browsable products, clear pricing, and simple ordering.",
    screenshots: [
      "/WATCH STORE  (1).png",
      "/WATCH STORE  (2).png",
      "/WATCH STORE  (3).png",
      "/WATCH STORE  (4).png",
      "/WATCH STORE  (5).png",
      "/WATCH STORE  (6).png",
      "/WATCH STORE  (7).png",
      "/WATCH STORE  (8).png",
    ],
    ctaLabel: "Visit Site",
  },
  {
    id: "cafe-website",
    index: "06",
    name: "Cafe Website",
    url: "https://cafe-psi-wine.vercel.app/",
    category: "Website",
    problem: "Details to be confirmed.",
    built: "Project details to be confirmed.",
    role: "To be confirmed.",
    tech: ["To be confirmed"],
    challenge: "To be confirmed.",
    result: "To be confirmed.",
    screenshots: [
      "/cafe-website-1.png.jpg",
      "/cafe-website-2.png.jpg",
      "/cafe-website-3.png.jpg",
      "/cafe-website-4.png.jpg",
    ],
  },
  {
    id: "haven-furniture-store",
    index: "07",
    name: "Haven Furniture Store",
    url: "https://haven-furniture-nu.vercel.app/",
    category: "E-commerce Website",
    problem: "Details to be confirmed.",
    built:
      "A furniture storefront with a product catalogue, category browsing, best-seller and collection sections, and cart, shipping and returns messaging.",
    role: "To be confirmed.",
    tech: ["HTML", "CSS", "JavaScript"],
    challenge: "To be confirmed.",
    result: "To be confirmed.",
    screenshots: [
      "/ecomerceweb (1).png",
      "/ecomerceweb (2).png",
      "/ecomerceweb (3).png",
      "/ecomerceweb (4).png",
      "/ecomerceweb (5).png",
      "/ecomerceweb (6).png",
      "/ecomerceweb (7).png",
      "/ecomerceweb (8).png",
    ],
  },
  {
    id: "invoicelauncher-saas",
    index: "08",
    name: "InvoicLauncher",
    url: "https://invoiclauncher.vercel.app/",
    category: "SaaS Platform",
    problem:
      "Freelancers and small teams often track clients, invoices, payments, and expenses across separate tools.",
    built:
      "A full invoicing SaaS dashboard that brings clients, projects, invoices, quotations, payments, expenses, reports, and subscription management into one workspace — with search, filters, status tracking, and revenue analytics.",
    role: "Frontend development · UI implementation",
    tech: ["React", "Vite", "Tailwind CSS", "Recharts", "Lucide"],
    challenge:
      "Keeping dense financial data readable with consistent status states, clear tables, and charts that stay usable on smaller screens.",
    result:
      "A responsive, product-style dashboard covering the full invoicing workflow in one place.",
    screenshots: [
      "/invoice maker  (1).png",
      "/invoice maker  (2).png",
      "/invoice maker  (3).png",
      "/invoice maker  (4).png",
      "/invoice maker  (5).png",
      "/invoice maker  (6).png",
      "/invoice maker  (7).png",
      "/invoice maker  (8).png",
    ],
    ctaLabel: "Visit Site",
  },
]

// ── Capabilities ───────────────────────────────────────────────
export type Capability = {
  id: string
  title: string
  summary: string
  builds: string[]
  tech: string[]
  example: string
  ownership: string
}

export const capabilities: Capability[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    summary:
      "Responsive, component-based interfaces built with modern React tooling.",
    builds: [
      "Component-based UIs with React.js",
      "Server-rendered and static apps with Next.js",
      "Typed, maintainable code with TypeScript",
    ],
    tech: ["React.js", "Next.js", "JavaScript", "TypeScript"],
    example: "To be confirmed",
    ownership: "To be confirmed",
  },
  {
    id: "styling",
    title: "Styling & UI",
    summary:
      "Clean, responsive layouts from semantic markup to utility styling.",
    builds: [
      "Semantic structure with HTML",
      "Responsive layouts with CSS",
      "Utility-first styling with Tailwind CSS",
    ],
    tech: ["HTML", "CSS", "Tailwind CSS"],
    example: "To be confirmed",
    ownership: "To be confirmed",
  },
  {
    id: "version-control",
    title: "Version Control",
    summary:
      "Organized, collaborative development with Git and GitHub.",
    builds: [
      "Branching and commit workflows with Git",
      "Collaboration and code hosting on GitHub",
    ],
    tech: ["Git", "GitHub"],
    example: "To be confirmed",
    ownership: "To be confirmed",
  },
  {
    id: "deployment",
    title: "Deployment",
    summary:
      "Shipping and hosting projects on Vercel.",
    builds: [
      "Deploying front-end projects with Vercel",
      "Managing hosted deployments",
    ],
    tech: ["Vercel"],
    example: "To be confirmed",
    ownership: "To be confirmed",
  },
]

// ── Experience ─────────────────────────────────────────────────
export type Role = {
  company: string
  position: string
  start: string
  end: string | null
  period: string
  location: string
  overview: string
  responsibilities: string[]
  tech: string[]
}

export const experience: Role[] = [
  {
    company: "Employer to be confirmed",
    position: "Full Stack Developer",
    start: "",
    end: null,
    period: "2 years experience",
    location: "Peshawar, KPK, Pakistan",
    overview:
      "Employer, dates, and detailed responsibilities to be confirmed.",
    responsibilities: [
      "Responsibilities to be confirmed.",
    ],
    tech: ["React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Git", "GitHub", "Vercel"],
  },
]

// ── Process ────────────────────────────────────────────────────
export const processSteps = [
  {
    no: "01",
    title: "Understand the problem",
    body: "Find what's broken, slow, or risky. Map the workflow first.",
  },
  {
    no: "02",
    title: "Define the product",
    body: "Agree on APIs, roles, permissions, and key states.",
  },
  {
    no: "03",
    title: "Design the data & API",
    body: "Design data and APIs around real product usage.",
  },
  {
    no: "04",
    title: "Build the system",
    body: "Build focused modules with clean boundaries.",
  },
  {
    no: "05",
    title: "Test & harden",
    body: "Test retries, queues, auth, and failure paths.",
  },
  {
    no: "06",
    title: "Launch & improve",
    body: "Ship, monitor, and improve what matters.",
  },
] as const

// ── Experiments / additional work ──────────────────────────────
// No additional projects were provided for this section.
export const experiments: { name: string; kind: string; body: string; tech: string[] }[] = []

// ── Education ──────────────────────────────────────────────────
export const education = [
  {
    degree: "DIT",
    school: "Institution to be confirmed",
    period: "Dates to be confirmed",
  },
] as const

// ── Proof strip ────────────────────────────────────────────────
export const proof = [
  {
    label: "Focus",
    value: "Frontend · Full stack · Deployment",
  },
  {
    label: "Frontend",
    value: "React.js · Next.js · JavaScript · TypeScript",
  },
  {
    label: "Styling & tooling",
    value: "HTML · CSS · Tailwind CSS · Git & GitHub · Vercel",
  },
  {
    label: "Education",
    value: "DIT",
  },
] as const

// ── Contact ────────────────────────────────────────────────────
export const projectTypes = [
  "Website",
  "Web application",
  "Full stack project",
  "Frontend development",
  "Other",
] as const

export const budgetRanges = [
  "Under $2k",
  "$2k — $5k",
  "$5k — $15k",
  "$15k+",
  "Let's discuss",
] as const
