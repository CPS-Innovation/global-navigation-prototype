const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-variation.html')
const header = fs.readFileSync(headerPath, 'utf8')

const ctlIndex = header.indexOf('id="app-ctl-summary"')
const tagIndex = header.indexOf('>Youth<')

assert(ctlIndex !== -1, 'Expected CTL summary placeholder')
assert(tagIndex !== -1, 'Expected YOUTH tag')
assert(tagIndex > ctlIndex, 'Expected YOUTH tag below the two text lines')

console.log('variation youth tag position checks passed')
