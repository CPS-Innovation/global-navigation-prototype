const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-variation.html')
const sassPath = path.join(__dirname, '..', 'app', 'assets', 'sass', 'application.scss')

const header = fs.readFileSync(headerPath, 'utf8')
const sass = fs.readFileSync(sassPath, 'utf8')

assert(
  header.includes('<header class="app-cps-header app-cps-header--variation" role="banner">'),
  'Expected variation header to use a variation-specific header class'
)

assert(
  sass.includes('.app-cps-header--variation .app-cps-header__service-name {'),
  'Expected variation-specific service name sizing rule'
)

assert(
  sass.includes('font-size: 30px;'),
  'Expected 30px sizing rule for variation service name'
)

console.log('variation header brand size checks passed')
