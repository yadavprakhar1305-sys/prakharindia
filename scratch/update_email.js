const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const filesToUpdate = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.vercel') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (/\.(html|php|js|json|txt|md)$/i.test(entry.name)) {
      filesToUpdate.push(fullPath);
    }
  }
}

walk(rootDir);

let totalChanged = 0;

for (const file of filesToUpdate) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // Replace prakharindiaofficial@gmail.com -> prakharindiaofficial@gmail.com
  content = content.replace(/info@prakharind\.com/g, 'prakharindiaofficial@gmail.com');
  // Replace prakharindiaofficial@gmail.com -> prakharindiaofficial@gmail.com (where used as contact email)
  content = content.replace(/yadavprakhar1305@gmail\.com/g, 'prakharindiaofficial@gmail.com');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    totalChanged++;
    console.log(`Updated: ${path.relative(rootDir, file)}`);
  }
}

console.log(`Successfully updated email in ${totalChanged} files.`);
