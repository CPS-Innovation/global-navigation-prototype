const fs = require('fs')
const path = require('path')
const assert = require('assert')

const sassPath = path.join(__dirname, '..', 'app', 'assets', 'sass', 'application.scss')
const sass = fs.readFileSync(sassPath, 'utf8')

assert(
  sass.includes('.app-identity-bar--after-secondary-nav .app-identity-bar__title {'),
  'Expected variation-specific info bar title rule'
)

assert(
  sass.includes('@include govuk-font(19);'),
  'Expected 19px GOV.UK font sizing for variation info bar title'
)

console.log('variation info bar copy size checks passed')
