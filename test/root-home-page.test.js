const fs = require('fs')
const path = require('path')
const assert = require('assert')

const homePath = path.join(__dirname, '..', 'app', 'views', 'index.html')
assert(fs.existsSync(homePath), 'Expected root home page template to exist at app/views/index.html')

const home = fs.readFileSync(homePath, 'utf8')

assert(
  home.includes('/FCT-v1/2-cps-user-journey/E-case-overview'),
  'Expected home page to link to the reference version'
)

assert(
  home.includes('/FCT-v1/2-cps-user-journey/E-case-overview-variation'),
  'Expected home page to link to the variation version'
)

console.log('root home page checks passed')
