const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-variation.html')
const header = fs.readFileSync(headerPath, 'utf8')

const urnIndex = header.indexOf('{{ caseReference }}</span>')
const tagIndex = header.indexOf('>Youth<')

assert(urnIndex !== -1, 'Expected URN span')
assert(tagIndex !== -1, 'Expected YOUTH tag')
assert(tagIndex > urnIndex, 'Expected Youth tag inline after the URN')

console.log('variation youth tag position checks passed')
