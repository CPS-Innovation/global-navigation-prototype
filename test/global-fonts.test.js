const assert = require('assert')
const fs = require('fs')
const path = require('path')

const sassPath = path.resolve(__dirname, '../app/assets/sass/application.scss')
const regularFontPath = path.resolve(__dirname, '../app/assets/fonts/NewTransportCPS/NewTransportCPS-Regular.woff2')
const boldFontPath = path.resolve(__dirname, '../app/assets/fonts/NewTransportCPS/NewTransportCPS-Bold.woff2')

const sass = fs.readFileSync(sassPath, 'utf8')

assert.ok(fs.existsSync(regularFontPath), 'Expected regular CPS font file to exist')
assert.ok(fs.existsSync(boldFontPath), 'Expected bold CPS font file to exist')
assert.ok(
  sass.includes('$govuk-font-family: "NewTransportCPS", Arial, sans-serif;'),
  'Expected GOV.UK font family to be overridden to NewTransportCPS globally'
)
assert.ok(
  sass.includes('/public/fonts/NewTransportCPS/NewTransportCPS-Regular.woff2'),
  'Expected Sass to reference the regular CPS font file'
)
assert.ok(
  sass.includes('/public/fonts/NewTransportCPS/NewTransportCPS-Bold.woff2'),
  'Expected Sass to reference the bold CPS font file'
)

console.log('global font wiring checks passed')
