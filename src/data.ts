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
    id: "teju",
    title: "Teju Health AI",
    tag: "AI Agent · Health & Fitness",
    year: "2026",
    blurb:
      "A family fitness companion: food logging, exercise tracking and an AI agent that turns each person's goals into daily guidance.",
    bullets: [
      "Agent that reads a person's goals and inputs, reasons over them and returns clear diet and exercise suggestions.",
      "Designed around what a whole family needs in one place: meals, workouts, activity goals and shared progress.",
      "End-to-end design combining an AI pipeline with a user-facing interface.",
    ],
    stack: ["Python", "LLM agent", "React"],
    links: [],
    note: "Demo coming soon.",
    hue: "linear-gradient(145deg,#10b981 0%,#065f46 55%,#021a12 100%)",
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
  { name: "Languages", items: ["Python", "C++", "C", "Java", "JavaScript", "SQL"] },
  { name: "Machine learning", items: ["scikit-learn", "LightGBM", "pandas", "NumPy", "NLP", "YOLOv8", "Feature engineering"] },
  { name: "Web", items: ["React", "FastAPI", "Flask", "REST APIs", "HTML5", "CSS3", "PHP"] },
  { name: "Data", items: ["MySQL", "Oracle SQL", "PostGIS", "Supabase"] },
  { name: "Tools", items: ["Git", "GitHub", "Linux CLI", "Postman", "Figma", "Canva", "Jupyter"] },
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
    "Computer Science & Software Engineering undergraduate at Andhra University (CGPA 8.7/10) with strong foundations in data structures, algorithms, OOP, DBMS, operating systems and computer networks. Built machine learning systems (road-damage detection with YOLOv8, business entity resolution with gradient boosting) and full-stack applications in React, FastAPI and MySQL. Seeking software development, machine learning and full-stack internships.",
  coursework:
    "Data Structures & Algorithms, DBMS, Object-Oriented Programming, Operating Systems, Computer Networks, Web Technologies, Software Engineering",
  education: [
    { school: "Andhra University, Visakhapatnam", degree: "B.Tech, Computer Science & Software Engineering", years: "2024 – 2028", score: "CGPA: 8.7 / 10.0 (1st year)" },
    { school: "Sasi Junior College, Andhra Pradesh", degree: "Class XII (MPC)", years: "2022 – 2024", score: "98.4%" },
    { school: "Sasi English Medium School, Andhra Pradesh", degree: "Class X (SSC)", years: "2020 – 2022", score: "96.83%" },
  ],
  skills: [
    ["Languages", "C, C++, Java, Python, JavaScript, SQL"],
    ["Data Structures & Algorithms", "Arrays, Strings, Linked Lists, Stacks, Queues, Trees, Graphs, Hashing, Heaps, Recursion, Dynamic Programming, Greedy, Sorting & Searching, Complexity Analysis"],
    ["Machine Learning", "scikit-learn, LightGBM, pandas, NumPy, NLP, YOLOv8, Feature Engineering, Model Evaluation, AI Agents"],
    ["Web Development", "HTML5, CSS3, JavaScript (ES6+), React, Flask, FastAPI, PHP, REST APIs, Responsive Design"],
    ["Databases", "MySQL, Oracle SQL, PostgreSQL/PostGIS, Supabase, Normalization, Indexing, Joins, Transactions"],
    ["Core CS", "OOP, Operating Systems, Computer Networks (TCP/IP, HTTP, DNS), SDLC, Agile, System Design Fundamentals"],
    ["Tools", "Git, GitHub, VS Code, Linux CLI, Postman, Figma, Canva, Jupyter Notebook"],
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
    "FLY Program and mentor sessions, FFE Foundation: leadership and professional effectiveness.",
    "Content creation and outreach: articles and LinkedIn posts, Canva posters and carousels, campaign planning.",
  ],
  languages: "English (Proficient) | Telugu (Native) | Hindi (Proficient)",
};

export const extras = [
  "NPTEL certified: Quantum Computing, Software Engineering",
  "Reading Comprehensive Assessment, FFE Foundation",
  "FLY Program and mentor sessions, FFE Foundation",
  "Content creation and outreach: articles, LinkedIn posts, Canva design",
];
