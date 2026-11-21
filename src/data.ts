// Single source of truth for the portfolio AND the resume.
// Edit here, then rebuild both so they stay in sync.

export const profile = {
  name: "Chaparla Monish",
  short: "Monish",
  role: "Software Developer · Machine Learning",
  tagline: "I build things that learn, and ship them.",
  intro:
    "B.Tech Computer Science & Software Engineering student at Andhra University. I build full-stack apps and machine learning systems, from road-damage detection to entity matching at Amazon scale.",
  location: "Visakhapatnam, Andhra Pradesh",
  email: "chaparlamonish@gmail.com",
  github: "https://github.com/monishchaparla",
  linkedin: "https://www.linkedin.com/in/chaparla-monish-745126373/",
  resume: "/Chaparla_Monish_Resume.pdf",
};

export type Project = {
  id: string;
  title: string;
  tag: string;
  year: string;
  blurb: string;
  bullets: string[];
  stack: string[];
  links: { label: string; href: string }[];
  metrics?: { label: string; value: string }[];
  hue: string; // CSS gradient for the poster
  note?: string;
};

export const projects: Project[] = [
  {
    id: "carbontrace",
    title: "CarbonTrace AI",
    tag: "AI · ESG · Full-stack",
    year: "2026",
    blurb:
      "Turns bills, invoices and freight manifests into audit-ready Scope 1, 2 and 3 emissions, with every number traced back to its line on the source document.",
    bullets: [
      "Gemini structured extraction with bounding boxes, then deterministic validation that flags kWh/MWh misprints, bad periods and future dates for human review.",
      "Maps lines to 3,639 official emission factors (EPA, UK DESNZ 2026, India CEA v22) with rules, BM25 retrieval and a model pick limited to the shortlist.",
      "Exact Decimal and unit-checked maths, an append-only audit log, and a pdf.js view that highlights each ledger line on the original page.",
      "Benchmark on 50 held-out synthetic documents: 100% line extraction and factor match, 10/10 problems flagged, 0 false flags, 8.4 s median.",
    ],
    stack: ["Python", "FastAPI", "Gemini", "Next.js", "TypeScript", "pdf.js", "Vercel"],
    links: [
      { label: "Live demo", href: "https://carbontrace-three.vercel.app" },
      { label: "Source on GitHub", href: "https://github.com/monishchaparla/carbontrace-ai" },
    ],
    metrics: [
      { label: "Factor match (held-out)", value: "100%" },
      { label: "False flags", value: "0/41" },
    ],
    hue: "linear-gradient(145deg,#0d9488 0%,#115e59 55%,#04201d 100%)",
  },
  {
    id: "pathguard",
    title: "PathGuard-AI",
    tag: "Computer Vision · Geospatial",
    year: "2026",
    blurb:
      "An engine that finds road damage in dashcam video, measures it, and drafts the legal notice to the contractor responsible.",
    bullets: [
      "Detects potholes with YOLOv8 on dashcam uploads or a live camera, with a classical computer-vision fallback.",
      "Measures width, length, depth and volume of each defect, then estimates repair cost from MoRTH schedule-of-rates.",
      "Snaps defects to Uber H3 cells and merges repeat sightings with PostGIS ST_DWithin (3 m) on Supabase.",
      "Matches the road to its contractor and defect-liability period, then generates a Clause 17 statutory notice.",
    ],
    stack: ["Python", "YOLOv8", "Supabase", "PostGIS", "Uber H3", "Streamlit"],
    links: [{ label: "Source on GitHub", href: "https://github.com/monishchaparla/PathGuard-AI" }],
    hue: "linear-gradient(145deg,#e50914 0%,#7a0a10 55%,#1a0507 100%)",
  },
  {
    id: "amazon-ml",
    title: "Amazon ML Challenge 2026",
    tag: "Machine Learning · Entity Resolution",
    year: "2026",
    blurb:
      "Matched business records across three noisy data sources to the same real-world company, in a national 72-hour competition.",
    bullets: [
      "Problem: link records from three sources with typos, abbreviations and landmark-style addresses, including a country unseen in training.",
      "Built the full pipeline: preprocessing, candidate blocking, feature engineering, gradient-boosted classifier, validation and tuning.",
      "Optimised for macro F0.5, which weights precision over recall.",
      "Competed as team SYNTAX_ERROR.",
    ],
    stack: ["Python", "pandas", "LightGBM", "scikit-learn"],
    links: [{ label: "Source on GitHub", href: "https://github.com/monishchaparla/amazon-ml-challenge-2026" }],
    metrics: [
      { label: "Recall", value: "99.6%" },
      { label: "F0.5", value: "0.98" },
    ],
    hue: "linear-gradient(145deg,#f59e0b 0%,#b45309 50%,#1c1003 100%)",
  },
  {
    id: "health-buddy",
    title: "Health Buddy",
    tag: "AI · Nutrition · Android",
    year: "2026",
    blurb:
      "An Indian family nutrition coach: log meals in English or Telugu by text, photo or barcode, and see each family member's day alongside Health Connect data.",
    bullets: [
      "Separate logins with a family section for managing members, including children under parental consent.",
      "AI identifies dishes and portions; nutrition and calorie targets are computed deterministically from a food database.",
      "Android companion syncs steps, sleep and heart rate from Health Connect to the same account.",
    ],
    stack: ["Next.js", "FastAPI", "Gemini", "Expo", "Health Connect"],
    links: [{ label: "Source on GitHub", href: "https://github.com/monishchaparla/health-buddy" }],
    note: "In development.",
    hue: "linear-gradient(145deg,#65a30d 0%,#3f6212 55%,#0f1a04 100%)",
  },
  {
    id: "resume-analyzer",
    title: "AI Resume Analyzer",
    tag: "NLP · Full-stack",
    year: "2024",
    blurb:
      "Upload a resume PDF, extract skills with NLP, and see how well it matches a job description.",
    bullets: [
      "React frontend, REST API backend and an NLP skill-extraction pipeline.",
      "Generates concrete suggestions to align a profile with a role.",
    ],
    stack: ["Python", "FastAPI", "React", "NLP"],
    links: [],
    hue: "linear-gradient(145deg,#0ea5e9 0%,#075985 55%,#041a2a 100%)",
  },
  {
    id: "railway",
    title: "Railway Reservation System",
    tag: "Full-stack · Databases",
    year: "2024",
    blurb:
      "Login, seat selection, PNR generation and an admin console on a relational schema.",
    bullets: [
      "MySQL schema with joins, foreign keys and transaction handling.",
      "Component-based React UI that stays clean on small screens.",
    ],
    stack: ["React", "MySQL"],
    links: [],
    hue: "linear-gradient(145deg,#64748b 0%,#334155 55%,#0b1220 100%)",
  },
];

export const seasons = [
  { season: "Season 1", title: "Class X", years: "2020 – 2022", place: "Sasi English Medium School", line: "96.83% in SSC." },
  { season: "Season 2", title: "Class XII (MPC)", years: "2022 – 2024", place: "Sasi Junior College", line: "98.4% in HSC." },
  {
    season: "Season 3",
    title: "B.Tech, CSE & Software Engineering",
    years: "2024 – 2028",
    place: "Andhra University, Visakhapatnam",
    line: "CGPA 8.7 in year one. Amazon ML Challenge 2026, PathGuard-AI and more.",
  },
];

export const skillGroups = [
  { name: "Languages", items: ["Python", "TypeScript", "JavaScript", "C++", "Java", "SQL"] },
  { name: "AI and machine learning", items: ["LLM structured output", "BM25 retrieval", "Model evaluation", "scikit-learn", "LightGBM", "pandas", "YOLOv8"] },
  { name: "Backend", items: ["FastAPI", "REST APIs", "SQLite", "PostgreSQL / PostGIS", "Supabase", "pytest"] },
  { name: "Frontend", items: ["Next.js", "React", "Tailwind CSS", "pdf.js"] },
  { name: "Tools and cloud", items: ["Git", "GitHub", "Vercel", "Linux CLI", "Postman", "Figma"] },
];

export const achievements = [
  { big: "99.6%", label: "Recall at Amazon ML Challenge 2026, F0.5 of 0.98" },
  { big: "98.4%", label: "Class XII, with 96.83% in Class X" },
  { big: "8.7", label: "CGPA in the first year of B.Tech" },
  { big: "2x", label: "District champion in cricket and badminton" },
];

// Resume-only fields (the site does not show these in full).
export const resume = {
  phone: "+91 78158 49780",
  portfolio: "https://monish-portfolio-rho.vercel.app",
  headline: "B.Tech Computer Science & Software Engineering | Software Development | Machine Learning",
  summary:
    "Computer Science undergraduate at Andhra University (CGPA 8.7/10) who builds and deploys AI products end to end. Shipped CarbonTrace AI, an audit-grade carbon accounting app with measured accuracy on a held-out benchmark, built PathGuard-AI for road-damage detection with YOLOv8, and scored 99.6% recall in the Amazon ML Challenge 2026. Seeking software development and machine learning internships.",
  coursework:
    "Data Structures & Algorithms, DBMS, Object-Oriented Programming, Operating Systems, Computer Networks, Web Technologies, Software Engineering",
  education: [
    { school: "Andhra University, Visakhapatnam", degree: "B.Tech, Computer Science & Software Engineering", years: "2024 – 2028", score: "CGPA: 8.7 / 10.0 (1st year)" },
    { school: "Sasi Junior College, Andhra Pradesh", degree: "Class XII (MPC)", years: "2022 – 2024", score: "98.4%" },
    { school: "Sasi English Medium School, Andhra Pradesh", degree: "Class X (SSC)", years: "2020 – 2022", score: "96.83%" },
  ],
  skills: [
    ["Languages", "Python, TypeScript, JavaScript, C++, Java, SQL"],
    ["AI / ML", "LLM structured output (Gemini), prompt-injection safeguards, BM25 retrieval, evaluation benchmarks, scikit-learn, LightGBM, pandas, NumPy, YOLOv8"],
    ["Backend", "FastAPI, REST APIs, SQLite, PostgreSQL/PostGIS, Supabase, MySQL, pytest, API-key auth"],
    ["Frontend", "Next.js, React, Tailwind CSS, pdf.js, Recharts, accessible responsive UI"],
    ["Cloud & Tools", "Vercel, Git, GitHub, Linux CLI, Postman, Figma, Jupyter"],
    ["Core CS", "Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks"],
  ] as [string, string][],
  competition: {
    title: "Amazon ML Challenge 2026",
    role: "Team SYNTAX_ERROR | Business Entity Resolution",
    year: "2026",
    bullets: [
      "Matched business records across three noisy sources (typos, abbreviations, landmark addresses, an unseen country in test) in a national 72-hour competition.",
      "Built the full pipeline: preprocessing, candidate blocking, feature engineering, gradient-boosted classifier, validation and tuning.",
      "Achieved recall of 99.6% and an F0.5 score of 0.98, the metric that weights precision over recall.",
    ],
  },
  leadership: [
    "FLY Program and mentor sessions, FFE Foundation; content creation and outreach (articles, LinkedIn, Canva campaigns).",
  ],
  languages: "English (Proficient) | Telugu (Native) | Hindi (Proficient)",
};

export const extras = [
  "NPTEL certified: Quantum Computing, Software Engineering",
  "Reading Comprehensive Assessment, FFE Foundation",
  "FLY Program and mentor sessions, FFE Foundation",
  "Content creation and outreach: articles, LinkedIn posts, Canva design",
];
