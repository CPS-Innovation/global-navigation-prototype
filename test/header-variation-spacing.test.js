const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-variation.html')
const sassPath = path.join(__dirname, '..', 'app', 'assets', 'sass', 'application.scss')

const header = fs.readFileSync(headerPath, 'utf8')
const sass = fs.readFileSync(sassPath, 'utf8')

assert(
  header.includes('classes: "app-secondary-navigation app-secondary-navigation--variation"'),
  'Expected variation header to use a variation-specific secondary nav class'
)

assert(
  header.includes('<section class="app-identity-bar app-identity-bar--after-secondary-nav"'),
  'Expected variation info box to use a variation-specific identity bar class'
)

assert(
  sass.includes('.app-secondary-navigation--variation {'),
  'Expected Sass rule for variation secondary nav spacing'
)

assert(
  sass.includes('.app-identity-bar--after-secondary-nav {'),
  'Expected Sass rule for variation identity bar spacing'
)

console.log('variation spacing checks passed')
