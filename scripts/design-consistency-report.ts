import { promises as fs } from "fs";
import path from "path";

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, "src");
const DNA_DIR = path.join(SRC_DIR, "components", "dna");

async function walk(dir: string): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const dirent of dirents) {
    const res = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      if (res.includes("node_modules") || res.includes(".next")) continue;
      files.push(...await walk(res));
    } else if (dirent.isFile() && res.endsWith(".tsx")) {
      files.push(res);
    }
  }
  return files;
}

(async () => {
  const files = await walk(SRC_DIR);
  const report: Record<string, string[]> = {};

  for (const file of files) {
    if (file.startsWith(DNA_DIR)) continue; // ignore DNA primitives themselves
    const content = await fs.readFile(file, "utf8");
    const issues: string[] = [];
    if (/<button(?=\s|>)/.test(content)) {
      issues.push("raw <button>");
    }
    if (/<h[1-6](?=\s|>)/.test(content)) {
      issues.push("raw <h1>-<h6>");
    }
    if (/<section(?=\s|>)/.test(content)) {
      issues.push("raw <section>");
    }
    if (/<p(?=\s|>)/.test(content)) {
      issues.push("raw <p>");
    }
    if (issues.length) {
      report[path.relative(ROOT, file)] = issues;
    }
  }

  console.log(JSON.stringify(report, null, 2));
})();

