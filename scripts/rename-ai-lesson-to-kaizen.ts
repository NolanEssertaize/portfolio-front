import * as fs from 'fs';
import * as path from 'path';

const root = path.join(process.cwd(), 'src');
const files: string[] = [];

function collect(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (full.includes('kaizen')) continue;
      collect(full);
    } else if (/\.[tj]sx?$/.test(entry.name)) {
      files.push(full);
    }
  }
}

collect(root);

let changedFiles = 0;
const replacements: Record<string, number> = {};

for (const file of files) {
  const orig = fs.readFileSync(file, 'utf8');
  let updated = orig;

  const patterns: [RegExp, string][] = [
    [/\/ai-lesson/g, '/kaizen'],
    [/"ai-lesson"/g, '"kaizen"'],
    [/\'ai-lesson\'/g, '\'kaizen\''],
    [/AiLesson/g, 'Kaizen'],
    [/aiLesson/g, 'kaizen'],
  ];

  for (const [regex, repl] of patterns) {
    updated = updated.replace(regex, repl);
  }

  if (updated !== orig) {
    fs.writeFileSync(file, updated, 'utf8');
    changedFiles++;
    const count = (orig.match(/ai-lesson/gi)?.length || 0) + (orig.match(/AiLesson/g)?.length || 0) + (orig.match(/aiLesson/g)?.length || 0);
    replacements[file] = count;
    console.log(`Updated: ${file}`);
  }
}

console.log(`\nFiles changed: ${changedFiles}`);
for (const [file, count] of Object.entries(replacements)) {
  console.log(`${file}: ${count} replacements`);
}
