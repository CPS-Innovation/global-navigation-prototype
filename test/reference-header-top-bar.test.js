const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header.html')
const header = fs.readFileSync(headerPath, 'utf8')

assert(
  header.includes('<header class="app-cps-header app-cps-header--variation" role="banner">'),
  'Expected reference header to use the same top blue bar styling as the variations'
)

console.log('reference header top bar checks passed')
