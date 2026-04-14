const fs = require('fs')
const path = require('path')
const assert = require('assert')

const templatePath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header.html')
const template = fs.readFileSync(templatePath, 'utf8')

assert(
  template.includes('<header class="app-cps-header" role="banner">'),
  'Expected the CPS header to use a header landmark with role="banner"'
)

assert(
  template.includes('visuallyHiddenTitle: "Secondary menu"'),
  'Expected the secondary navigation visually hidden title to match prosecute-a-case'
)

console.log('header accessibility checks passed')
