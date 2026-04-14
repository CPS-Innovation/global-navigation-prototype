const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-variation-3.html')
const layoutPath = path.join(__dirname, '..', 'app', 'views', 'layoutCPS-NEW-CASEFILE-variation-3.html')
const sassPath = path.join(__dirname, '..', 'app', 'assets', 'sass', 'application.scss')

const header = fs.readFileSync(headerPath, 'utf8')
const layout = fs.readFileSync(layoutPath, 'utf8')
const sass = fs.readFileSync(sassPath, 'utf8')

assert(
  layout.includes('<a href="#case-information" class="govuk-skip-link">Skip to case information</a>'),
  'Expected variation 3 layout to skip to the case information box'
)
assert(
  header.includes('<section id="case-information" class="app-identity-bar app-identity-bar--variation-3" tabindex="-1" aria-labelledby="app-case-title">'),
  'Expected variation 3 case information box to be the skip target'
)
assert(
  sass.includes('.app-identity-bar--variation-3 .app-identity-bar__title {'),
  'Expected variation 3 title styling rule'
)
assert(
  sass.includes('@include govuk-font(19);'),
  'Expected variation 3 title styling to use 19px body text'
)

console.log('variation 3 info box size checks passed')
