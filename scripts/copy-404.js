const fs = require('fs')
const path = require('path')

const docsDir = path.join(__dirname, '..', 'docs')
const indexPath = path.join(docsDir, 'index.html')
const fallbackPath = path.join(docsDir, '404.html')

try {
  if (!fs.existsSync(indexPath)) {
    console.error('docs/index.html not found. Run the frontend build first.')
    process.exit(1)
  }

  fs.copyFileSync(indexPath, fallbackPath)
  console.log('Copied docs/index.html to docs/404.html')
} catch (err) {
  console.error('Failed to copy index to 404:', err)
  process.exit(1)
}
