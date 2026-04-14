const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-variation.html')
const sassPath = path.join(__dirname, '..', 'app', 'assets', 'sass', 'application.scss')

const header = fs.readFileSync(headerPath, 'utf8')
const sass = fs.readFileSync(sassPath, 'utf8')

assert(header.includes('id="app-ctl-summary"'), 'Expected CTL summary placeholder')
assert(header.includes('futureDate.setDate(futureDate.getDate() + 9)'), 'Expected 9-day CTL date calculation')
assert(header.includes('Custody time limit ends'), 'Expected CTL copy')
assert(sass.includes('.app-identity-bar__meta {'), 'Expected CTL meta styling')

console.log('variation CTL line checks passed')
