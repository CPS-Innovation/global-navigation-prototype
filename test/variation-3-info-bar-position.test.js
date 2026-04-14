const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-variation-3.html')
const header = fs.readFileSync(headerPath, 'utf8')

const identityIndex = header.indexOf('<section id="case-information" class="app-identity-bar" aria-labelledby="app-case-title">')
const secondaryIndex = header.indexOf('<div class="govuk-width-container app-secondary-navigation__container">')

assert(identityIndex !== -1, 'Expected variation 3 info bar above the secondary nav without the after-secondary-nav modifier')
assert(secondaryIndex !== -1, 'Expected variation 3 secondary navigation')
assert(identityIndex < secondaryIndex, 'Expected variation 3 info bar before the secondary navigation')

console.log('variation 3 info bar position checks passed')
