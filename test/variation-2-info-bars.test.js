const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-variation-2.html')
const header = fs.readFileSync(headerPath, 'utf8')

const primaryNavEnd = header.indexOf('}) }}')
const upperBar = header.indexOf('<section class="app-identity-bar" aria-labelledby="app-case-title">')
const secondaryNav = header.indexOf('<div class="govuk-width-container app-secondary-navigation__container">')
const lowerBar = header.indexOf('<section id="case-information" class="app-identity-bar app-identity-bar--after-secondary-nav" aria-label="Case information">')

assert(primaryNavEnd !== -1, 'Expected primary nav block')
assert(upperBar !== -1, 'Expected upper info bar')
assert(secondaryNav !== -1, 'Expected secondary nav block')
assert(lowerBar !== -1, 'Expected lower case information bar')
assert(upperBar < secondaryNav, 'Expected defendants/URN bar before secondary nav')
assert(lowerBar > secondaryNav, 'Expected tags/CTL bar after secondary nav')
assert(header.includes('{{ caseReference }}</span>'), 'Expected URN in upper bar')
assert(header.includes('id="app-ctl-summary"'), 'Expected CTL in lower bar')

console.log('variation 2 info bar checks passed')
