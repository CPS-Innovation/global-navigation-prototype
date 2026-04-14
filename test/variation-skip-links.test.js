const fs = require('fs')
const path = require('path')
const assert = require('assert')

const layoutPath = path.join(__dirname, '..', 'app', 'views', 'layoutCPS-NEW-CASEFILE-variation.html')
const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-variation.html')

const layout = fs.readFileSync(layoutPath, 'utf8')
const header = fs.readFileSync(headerPath, 'utf8')

assert(
  layout.includes('<a href="#case-information" class="govuk-skip-link">Skip to case information</a>'),
  'Expected variation layout to include a skip link to case information'
)

assert(
  header.includes('<section id="case-information" class="app-identity-bar app-identity-bar--after-secondary-nav"'),
  'Expected variation info bar to expose a case-information skip target'
)

console.log('variation skip link checks passed')
