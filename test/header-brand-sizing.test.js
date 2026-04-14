const fs = require('fs')
const path = require('path')
const assert = require('assert')

const sassPath = path.join(__dirname, '..', 'app', 'assets', 'sass', 'application.scss')
const sass = fs.readFileSync(sassPath, 'utf8')

assert(
  sass.includes('.app-cps-header__organisation {'),
  'Expected organisation styling block to exist'
)

assert(
  sass.includes('font-size: 30px;'),
  'Expected CPS text to remain 30px'
)

assert(
  sass.includes('.app-cps-header__service-name {'),
  'Expected service name styling block to exist'
)

assert(
  sass.includes('font-size: 24px;'),
  'Expected service name text to be 24px'
)

console.log('header brand sizing checks passed')
