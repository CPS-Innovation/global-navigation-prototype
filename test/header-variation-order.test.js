const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-variation.html')
const header = fs.readFileSync(headerPath, 'utf8')

const identityIndex = header.indexOf('<section class="app-identity-bar"')
const secondaryIndex = header.indexOf('<div class="govuk-width-container app-secondary-navigation__container">')

assert(identityIndex !== -1, 'Expected variation header to include the identity bar')
assert(secondaryIndex !== -1, 'Expected variation header to include the secondary navigation')
assert(
  secondaryIndex < identityIndex,
  'Expected variation secondary navigation to appear before the identity bar'
)

console.log('variation header order checks passed')
