const fs = require('fs')
const path = require('path')
const assert = require('assert')

const sassPath = path.join(__dirname, '..', 'app', 'assets', 'sass', 'application.scss')
const sass = fs.readFileSync(sassPath, 'utf8')

assert(
  sass.includes('.app-cps-header--variation .app-cps-header__organisation {'),
  'Expected variation-specific organisation spacing rule'
)

assert(
  sass.includes('margin-right: 0;'),
  'Expected variation-specific organisation spacing to remove the gap'
)

console.log('variation header brand gap checks passed')
