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
  ["Visakhapatnam, Andhra Pradesh", null],
  [resume.phone, null],
  [profile.email, `mailto:${profile.email}`],
  ["Portfolio: " + short(resume.portfolio), resume.portfolio],
  ["GitHub: monishchaparla", profile.github],
  ["LinkedIn: chaparla-monish", profile.linkedin],
];

const mainProjects = projects.filter((p) => ["pathguard", "teju", "resume-analyzer", "railway"].includes(p.id));
const projLine = (p) => p.stack.join(", ");
const projLink = (p) => p.links[0]?.href;
const projectBullets = (p) => (p.id === "pathguard" || p.id === "teju" ? p.bullets.slice(0, 3) : p.bullets);
const amazon = projects.find((p) => p.id === "amazon-ml");

const certs = [
  "Amazon ML Challenge 2026: recall 99.6%, F0.5 0.98.",
  "Academic excellence: Class XII 98.4%, Class X 96.83%, B.Tech CGPA 8.7/10.",
  "NPTEL certified: Quantum Computing; Software Engineering.",
  "District-level champion in Cricket and Badminton.",
  "Reading Comprehensive Assessment (RCA), FFE Foundation.",
];

// ---------- HTML (for the PDF) ----------
const link = (t, h) => (h ? `<a href="${h}">${esc(t)}</a>` : esc(t));
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${profile.name} - Resume</title>
<style>
@page { size: A4; margin: 12mm 14mm; }
* { box-sizing: border-box; }
body { font: 9.6pt/1.32 "Calibri", "Segoe UI", Arial, sans-serif; color: #111; margin: 0; }
a { color: #0b4f9c; text-decoration: none; }
h1 { font-size: 22pt; margin: 0; letter-spacing: .5px; }
.sub { color: #333; margin: 1px 0 3px; }
.contact { color: #222; font-size: 8.8pt; }
.contact span + span::before { content: "  |  "; color: #888; }
h2 { font-size: 10.5pt; letter-spacing: 1px; border-bottom: 1.2px solid #111; padding-bottom: 1px; margin: 9px 0 4px; text-transform: uppercase; }
.row { display: flex; justify-content: space-between; gap: 8px; }
.row b { font-weight: 700; }
.muted { color: #444; }
ul { margin: 2px 0 4px 15px; padding: 0; }
li { margin: 0 0 1px; }
.item { margin-bottom: 5px; break-inside: avoid; }
.skills div { margin-bottom: 1.5px; }
</style></head><body>
<h1>${esc(profile.name.toUpperCase())}</h1>
<div class="sub">${esc(resume.headline)}</div>
<div class="contact">${contact.map(([t, h]) => `<span>${link(t, h)}</span>`).join("")}</div>

<h2>Professional Summary</h2><div>${esc(resume.summary)}</div>

<h2>Education</h2>
${resume.education.map((e) => `<div class="row"><div><b>${esc(e.school)}</b> | ${esc(e.degree)}</div><div>${esc(e.years)}</div></div><div class="muted">${esc(e.score)}</div>`).join("")}
<div class="muted"><b>Relevant coursework:</b> ${esc(resume.coursework)}</div>

<h2>Technical Skills</h2>
<div class="skills">${resume.skills.map(([k, v]) => `<div><b>${esc(k)}:</b> ${esc(v)}</div>`).join("")}</div>

<h2>Competitions & Experience</h2>
<div class="item"><div class="row"><div><b>${esc(resume.competition.title)}</b> | ${esc(resume.competition.role)}</div><div>${resume.competition.year}</div></div>
<ul>${resume.competition.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
<div class="muted">Code: ${link(short(amazon.links[0].href), amazon.links[0].href)}</div></div>

<h2>Projects</h2>
${mainProjects.map((p) => `<div class="item"><div class="row"><div><b>${esc(p.title)}</b> | ${esc(projLine(p))}${projLink(p) ? ` | ${link(short(projLink(p)), projLink(p))}` : ""}</div><div>${p.year}</div></div>
<ul>${projectBullets(p).map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div>`).join("")}

<h2>Achievements & Certifications</h2>
<ul>${certs.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>

<h2>Leadership & Extracurricular</h2>
<ul>${resume.leadership.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>

<h2>Languages</h2><div>${esc(resume.languages)}</div>
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
const linkRun = (t, h) => new ExternalHyperlink({ link: h, children: [run(t, { color: "0B4F9C" })] });
const h2 = (t) => new Paragraph({
  spacing: { before: 160, after: 60 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "111111", space: 1 } },
  children: [run(t.toUpperCase(), { bold: true, size: 21 })],
});
const bullet = (t) => new Paragraph({ bullet: { level: 0 }, spacing: { after: 20 }, children: [run(t)] });
const para = (children, o = {}) => new Paragraph({ spacing: { after: 20 }, children, ...o });
const rowTabbed = (left, right) => new Paragraph({
  tabStops: [{ type: TabStopType.RIGHT, position: 10300 }],
  spacing: { before: 40 },
  children: [...left, run("\t"), run(right)],
});

const children = [
  new Paragraph({ children: [run(profile.name.toUpperCase(), { bold: true, size: 44 })] }),
  para([run(resume.headline)]),
  para(contact.flatMap(([t, h], i) => [i ? run("  |  ", { color: "888888" }) : run(""), h ? linkRun(t, h) : run(t)])),
  h2("Professional Summary"), para([run(resume.summary)]),
  h2("Education"),
  ...resume.education.flatMap((e) => [
    rowTabbed([run(e.school, { bold: true }), run(" | " + e.degree)], e.years),
    para([run(e.score, { color: "444444" })]),
  ]),
  para([run("Relevant coursework: ", { bold: true }), run(resume.coursework)]),
  h2("Technical Skills"),
  ...resume.skills.map(([k, v]) => para([run(k + ": ", { bold: true }), run(v)])),
  h2("Competitions & Experience"),
  rowTabbed([run(resume.competition.title, { bold: true }), run(" | " + resume.competition.role)], resume.competition.year),
  ...resume.competition.bullets.map(bullet),
  para([run("Code: "), linkRun(short(amazon.links[0].href), amazon.links[0].href)]),
  h2("Projects"),
  ...mainProjects.flatMap((p) => [
    rowTabbed(
      [run(p.title, { bold: true }), run(" | " + projLine(p)), ...(projLink(p) ? [run(" | "), linkRun(short(projLink(p)), projLink(p))] : [])],
      p.year,
    ),
    ...projectBullets(p).map(bullet),
  ]),
  h2("Achievements & Certifications"), ...certs.map(bullet),
  h2("Leadership & Extracurricular"), ...resume.leadership.map(bullet),
  h2("Languages"), para([run(resume.languages)]),
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
