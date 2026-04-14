const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-variation-3.html')
const header = fs.readFileSync(headerPath, 'utf8')

assert(
  header.includes('<a class="app-cps-header__brand" href="/">'),
  'Expected variation 3 brand to link to the prototype homepage'
)

console.log('variation 3 brand home link checks passed')
