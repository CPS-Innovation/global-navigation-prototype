const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-variation.html')
const header = fs.readFileSync(headerPath, 'utf8')

assert(header.includes('{{ caseReference }}</span>'), 'Expected URN span in variation info bar')
assert(header.includes('govuk-tag govuk-tag--blue'), 'Expected GOV.UK blue tag in variation info bar')
assert(header.includes('>Youth<'), 'Expected Youth tag text')

console.log('variation youth tag checks passed')
