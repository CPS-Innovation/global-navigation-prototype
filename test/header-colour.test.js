const fs = require('fs')
const path = require('path')
const assert = require('assert')

const sassPath = path.join(__dirname, '..', 'app', 'assets', 'sass', 'application.scss')
const sass = fs.readFileSync(sassPath, 'utf8')

assert(
  sass.includes('.app-cps-header {'),
  'Expected app-cps-header block to exist'
)

assert(
  sass.includes('background-color: #002d9d;'),
  'Expected app-cps-header background colour to be #002d9d'
)

console.log('header colour checks passed')
