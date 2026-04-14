const fs = require('fs')
const path = require('path')
const assert = require('assert')

const sassPath = path.join(__dirname, '..', 'app', 'assets', 'sass', 'application.scss')
const sass = fs.readFileSync(sassPath, 'utf8')

assert(
  sass.includes('font-size: 30px;'),
  'Expected header brand text to be 30px'
)

assert(
  sass.includes('line-height: 1;'),
  'Expected header brand line-height to be 1 so the blue banner height stays stable'
)

console.log('header brand sizing checks passed')
