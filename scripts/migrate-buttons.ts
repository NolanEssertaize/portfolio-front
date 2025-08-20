import * as fs from 'fs';
import * as path from 'path';

const root = path.join(process.cwd(), 'src');
const files: string[] = [];

function collect(dir: string) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collect(full);
    else if (/\.[tj]sx?$/.test(entry.name)) files.push(full);
  }
}

collect(root);

let changed = 0;
let conversions = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let updated = content;

  const importRegex = /import\s+Button\s+from\s+["']@\/components\/(?:ui|atomic\/molecules)\/Button["'];?/g;
  if (importRegex.test(updated)) {
    updated = updated.replace(importRegex, "import { Button } from '@/components/atomic/atoms';");
  }

  const buttonRegex = /<button([^>]*className=\"[^\"]*btn[^\"]*\"[^>]*)>([\s\S]*?)<\/button>/g;
  if (buttonRegex.test(updated)) {
    updated = updated.replace(buttonRegex, '<Button$1>$2</Button>');
    conversions++;
  }

  if (updated !== content) {
    fs.writeFileSync(file, updated, 'utf8');
    changed++;
    console.log(`Updated: ${file}`);
  }
}

console.log(`\nFiles changed: ${changed}`);
console.log(`Conversions attempted: ${conversions}`);
