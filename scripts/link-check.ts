import { readdirSync, statSync, readFileSync } from 'fs';
import path from 'path';

function walk(dir: string): string[] {
  let results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (full.endsWith('.tsx')) {
      results.push(full);
    }
  }
  return results;
}

function routeFromPage(file: string): string {
  let route = file.replace(path.join('src', 'app'), '').replace(/\\/g, '/');
  route = route.replace(/\/page\.tsx$/, '');
  if (route === '') return '/';
  return route;
}

const tsxFiles = [
  ...walk('src/app'),
  ...walk('src/components/portfolio'),
  ...walk('src/components/dna'),
];
const pageFiles = walk(path.join('src', 'app')).filter((f) => f.endsWith('page.tsx'));
const routes = new Set(pageFiles.map(routeFromPage));

const idRegex = /id=['"]([A-Za-z0-9_-]+)['"]/g;
const hrefRegex = /href=['"]([^'"]+)['"]/g;

const ids = new Set<string>();
for (const file of tsxFiles) {
  const content = readFileSync(file, 'utf8');
  let match;
  while ((match = idRegex.exec(content))) {
    ids.add(match[1]);
  }
}

const hrefs: { file: string; href: string }[] = [];
for (const file of tsxFiles) {
  const content = readFileSync(file, 'utf8');
  let match;
  while ((match = hrefRegex.exec(content))) {
    hrefs.push({ file, href: match[1] });
  }
}

const broken: string[] = [];

for (const { file, href } of hrefs) {
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    continue;
  }
  const [pathname, hash] = href.split('#');
  if (pathname && pathname.startsWith('/') && !routes.has(pathname)) {
    broken.push(`${file}: missing route ${pathname}`);
  }
  if (hash && !ids.has(hash)) {
    broken.push(`${file}: missing anchor #${hash}`);
  }
  if (!pathname && hash && !ids.has(hash)) {
    broken.push(`${file}: missing anchor #${hash}`);
  }
}

if (broken.length) {
  console.log('Broken links found:');
  for (const b of broken) console.log('-', b);
  process.exitCode = 1;
} else {
  console.log('No broken links found.');
}
