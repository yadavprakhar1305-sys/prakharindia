const fs = require('fs');

const audit = JSON.parse(fs.readFileSync('scratch/audit_results.json', 'utf8'));

console.log('--- ISSUES SUMMARY ---');
audit.forEach(a => {
  const issues = [];
  if (a.desc === 'MISSING') issues.push('Missing Meta Desc');
  if (a.descLen > 165 || (a.descLen < 110 && a.descLen > 0)) issues.push(`Desc length suboptimal (${a.descLen} chars)`);
  if (a.canonical === 'MISSING') issues.push('Missing Canonical');
  if (a.h1Count === 0) issues.push('No H1');
  if (a.h1Count > 1) issues.push(`Multiple H1s (${a.h1Count})`);
  if (!a.hasSchema) issues.push('No Schema');
  if (a.schemas.includes('Invalid-JSON')) issues.push('Invalid JSON-LD Schema');
  if (a.imgNoAlt > 0) issues.push(`${a.imgNoAlt} images missing alt`);
  if (a.wordCount < 350) issues.push(`Thin content (${a.wordCount} words)`);
  if (issues.length > 0) {
    console.log(`[${a.file}]`);
    issues.forEach(i => console.log(`  - ${i}`));
  }
});
