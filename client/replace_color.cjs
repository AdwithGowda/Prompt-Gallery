const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        replaceInDir(fullPath);
      }
    } else if (file.endsWith('.jsx') || file.endsWith('.css') || file.endsWith('.html') || file.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content.replace(/#5C5450/gi, '#262626');
      if (newContent !== content) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log('Updated', fullPath);
      }
    }
  }
}

replaceInDir('c:/Users/adwit/Desktop/prompt_AI/client');
