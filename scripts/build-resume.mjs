// Builds the resume (HTML -> PDF via Chrome, and DOCX) from src/data.ts, the same data the site uses.
// Run: npm run resume
import { mkdirSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import path from "node:path";
import {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink, TabStopType, BorderStyle,
} from "docx";
import { profile, projects, resume } from "../src/data.ts";

const OUT = "resume";
mkdirSync(OUT, { recursive: true });

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const short = (u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const contact = [
  ["Visakhapatnam, India", null],
  [resume.phone, null],
  [profile.email, `mailto:${profile.email}`],
  ["Portfolio: " + short(resume.portfolio), resume.portfolio],
  ["GitHub: monishchaparla", profile.github],
  ["LinkedIn: chaparla-monish", profile.linkedin],
];

// Strongest first; the resume is kept to one page, so older projects live on the portfolio only.
const RESUME_PROJECTS = { carbontrace: 4, pathguard: 3, "health-buddy": 2 };
const mainProjects = Object.keys(RESUME_PROJECTS).map((id) => projects.find((p) => p.id === id)).filter(Boolean);
const projLine = (p) => p.stack.join(", ");
// Other in-progress projects get one line each (title, stack, GitHub) to keep the page count at one.
const inProgress = projects.filter((p) => p.note === "In development." && !(p.id in RESUME_PROJECTS));
const projectBullets = (p) => p.bullets.slice(0, RESUME_PROJECTS[p.id]);
const projTitle = (p) => (p.note === "In development." ? `${p.title} (in progress)` : p.title);
const linkLabel = (l) => (l.label.startsWith("Live") ? "Live: " : "") + short(l.href);
const amazon = projects.find((p) => p.id === "amazon-ml");
const ACCENT = "#0F4C5C"; // deep teal: prints well in greyscale and stays ATS-neutral

const certs = [
  "Academic excellence: Class XII 98.4%, Class X 96.83%, B.Tech CGPA 8.7/10.",
  "NPTEL certified: Quantum Computing; Software Engineering.",
  "District-level champion in cricket and badminton.",
];

// ---------- HTML (for the PDF) ----------
const link = (t, h) => (h ? `<a href="${h}">${esc(t)}</a>` : esc(t));
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${profile.name} - Resume</title>
<style>
@page { size: A4; margin: 8mm 12mm; }
* { box-sizing: border-box; }
body { font: 9.5pt/1.22 "Calibri", "Segoe UI", Arial, sans-serif; color: #111; margin: 0; font-variant-ligatures: none; font-feature-settings: "liga" 0, "clig" 0; } /* ATS: no fi/fl ligature glyphs in extracted text */
a { color: ${ACCENT}; text-decoration: none; }
h1 { font-size: 22pt; margin: 0; letter-spacing: .5px; color: ${ACCENT}; }
.sub { color: #333; margin: 1px 0 3px; }
.contact { color: #222; font-size: 8.8pt; }
.contact span + span::before { content: "  |  "; color: #888; }
h2 { font-size: 10.5pt; letter-spacing: .6px; color: ${ACCENT}; border-bottom: 1.2px solid ${ACCENT}; padding-bottom: 1px; margin: 5px 0 2px; text-transform: uppercase; }
.row { display: flex; justify-content: space-between; gap: 8px; }
.row b { font-weight: 700; }
.muted { color: #444; }
ul { margin: 1px 0 3px 15px; padding: 0; }
li { margin: 0 0 1px; }
.item { margin-bottom: 3px; break-inside: avoid; }
.skills div { margin-bottom: 1.5px; }
</style></head><body>
<h1>${esc(profile.name.toUpperCase())}</h1>
<div class="sub">${esc(resume.headline)}</div>
<div class="contact">${contact.map(([t, h]) => `<span>${link(t, h)}</span>`).join("")}</div>

<h2>Professional Summary</h2><div>${esc(resume.summary)}</div>

<h2>Education</h2>
${resume.education.map((e) => `<div class="row"><div><b>${esc(e.school)}</b> | ${esc(e.degree)} | ${esc(e.score)}</div><div>${esc(e.years)}</div></div>`).join("")}

<h2>Technical Skills</h2>
<div class="skills">${resume.skills.map(([k, v]) => `<div><b>${esc(k)}:</b> ${esc(v)}</div>`).join("")}</div>

<h2>Projects</h2>
${mainProjects.map((p) => `<div class="item"><div class="row"><div><b>${esc(projTitle(p))}</b> | ${esc(projLine(p))}</div><div>${p.year}</div></div>
${p.links.length ? `<div class="muted">${p.links.map((l) => link(linkLabel(l), l.href)).join("  |  ")}</div>` : ""}
<ul>${projectBullets(p).map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div>`).join("")}
${inProgress.length ? `<div class="item"><b>Also in progress</b><ul>${inProgress.map((p) => `<li><b>${esc(p.title)}</b> | ${esc(projLine(p))}${p.links[0] ? ` | ${link(short(p.links[0].href), p.links[0].href)}` : ""}</li>`).join("")}</ul></div>` : ""}

<h2>Competitions</h2>
<div class="item"><div class="row"><div><b>${esc(resume.competition.title)}</b> | ${esc(resume.competition.role)}</div><div>${resume.competition.year}</div></div>
<div class="muted">${link(short(amazon.links[0].href), amazon.links[0].href)}</div>
<ul>${resume.competition.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div>

<h2>Achievements & Certifications</h2>
<ul>${certs.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>

<h2>Additional</h2>
<ul>${resume.leadership.map((c) => `<li>${esc(c)}</li>`).join("")}<li>Languages: ${esc(resume.languages)}</li></ul>
</body></html>`;

const htmlPath = path.resolve(OUT, "Chaparla_Monish_Resume.html");
writeFileSync(htmlPath, html);

// ---------- PDF via Chrome ----------
const chromeCandidates = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const chrome = chromeCandidates.find((p) => existsSync(p));
if (!chrome) throw new Error("Chrome or Edge not found; cannot print the PDF.");
const pdfPath = path.resolve(OUT, "Chaparla_Monish_Resume.pdf");
const profileDir = path.resolve(".chrome-resume-profile");
execFileSync(chrome, [
  "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
  `--user-data-dir=${profileDir}`,
  `--print-to-pdf=${pdfPath}`,
  pathToFileURL(htmlPath).href,
], { stdio: "ignore", timeout: 60000 });
copyFileSync(pdfPath, path.resolve("public", "Chaparla_Monish_Resume.pdf"));

// ---------- DOCX ----------
const FONT = "Calibri";
const run = (text, o = {}) => new TextRun({ text, font: FONT, size: 19, ...o });
const ACCENT_HEX = ACCENT.slice(1);
const linkRun = (t, h) => new ExternalHyperlink({ link: h, children: [run(t, { color: ACCENT_HEX })] });
const h2 = (t) => new Paragraph({
  spacing: { before: 160, after: 60 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT_HEX, space: 1 } },
  children: [run(t.toUpperCase(), { bold: true, size: 21, color: ACCENT_HEX })],
});
const bullet = (t) => new Paragraph({ bullet: { level: 0 }, spacing: { after: 20 }, children: [run(t)] });
const para = (children, o = {}) => new Paragraph({ spacing: { after: 20 }, children, ...o });
const rowTabbed = (left, right) => new Paragraph({
  tabStops: [{ type: TabStopType.RIGHT, position: 10300 }],
  spacing: { before: 40 },
  children: [...left, run("\t"), run(right)],
});

const children = [
  new Paragraph({ children: [run(profile.name.toUpperCase(), { bold: true, size: 44, color: ACCENT_HEX })] }),
  para([run(resume.headline)]),
  para(contact.flatMap(([t, h], i) => [i ? run("  |  ", { color: "888888" }) : run(""), h ? linkRun(t, h) : run(t)])),
  h2("Professional Summary"), para([run(resume.summary)]),
  h2("Education"),
  ...resume.education.map((e) => rowTabbed([run(e.school, { bold: true }), run(` | ${e.degree} | ${e.score}`)], e.years)),
  h2("Technical Skills"),
  ...resume.skills.map(([k, v]) => para([run(k + ": ", { bold: true }), run(v)])),
  h2("Projects"),
  ...mainProjects.flatMap((p) => [
    rowTabbed([run(projTitle(p), { bold: true }), run(" | " + projLine(p))], p.year),
    ...(p.links.length ? [para(p.links.flatMap((l, i) => [i ? run("  |  ", { color: "888888" }) : run(""), linkRun(linkLabel(l), l.href)]))] : []),
    ...projectBullets(p).map(bullet),
  ]),
  ...(inProgress.length ? [para([run("Also in progress", { bold: true })], { spacing: { before: 40, after: 20 } })] : []),
  ...inProgress.map((p) => new Paragraph({
    bullet: { level: 0 }, spacing: { after: 20 },
    children: [run(p.title, { bold: true }), run(" | " + projLine(p)), ...(p.links[0] ? [run(" | "), linkRun(short(p.links[0].href), p.links[0].href)] : [])],
  })),
  h2("Competitions"),
  rowTabbed([run(resume.competition.title, { bold: true }), run(" | " + resume.competition.role)], resume.competition.year),
  para([linkRun(short(amazon.links[0].href), amazon.links[0].href)]),
  ...resume.competition.bullets.map(bullet),
  h2("Achievements & Certifications"), ...certs.map(bullet),
  h2("Additional"), ...resume.leadership.map(bullet), bullet(`Languages: ${resume.languages}`),
];

const doc = new Document({
  creator: profile.name,
  title: `${profile.name} - Resume`,
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 680, bottom: 680, left: 800, right: 800 } } },
    children,
  }],
});
writeFileSync(path.resolve(OUT, "Chaparla_Monish_Resume.docx"), await Packer.toBuffer(doc));
console.log("resume built: PDF + DOCX + HTML in /resume, PDF copied to /public");
