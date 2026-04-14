const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-variation-2.html')
const header = fs.readFileSync(headerPath, 'utf8')

assert(
  header.includes('<div class="app-identity-bar__meta govuk-!-margin-bottom-2">'),
  'Expected tag row to add bottom spacing'
)
assert(
  header.includes('<strong class="govuk-tag govuk-tag--blue">Youth</strong>'),
  'Expected Youth tag to have no left margin'
)

console.log('variation 2 tag spacing checks passed')
