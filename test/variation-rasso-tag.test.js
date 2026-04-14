const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-variation.html')
const header = fs.readFileSync(headerPath, 'utf8')

assert(header.includes('>Youth<'), 'Expected Youth tag')
assert(header.includes('>Rasso<'), 'Expected Rasso tag')

console.log('variation rasso tag checks passed')
