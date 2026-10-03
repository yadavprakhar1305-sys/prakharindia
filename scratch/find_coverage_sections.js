const fs = require('fs');

['index.html', 'pages/manpower.html', 'pages/locations.html'].forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('Coverage') || line.includes('Districts') || line.includes('Noida & Greater Noida') || line.includes('Varanasi')) {
        console.log(`${file}:${idx + 1}: ${line.trim().slice(0, 120)}`);
      }
    });
  }
});
