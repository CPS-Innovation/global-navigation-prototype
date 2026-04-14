const fs = require('fs')
const path = require('path')
const assert = require('assert')

const pagePath = path.join(__dirname, '..', 'app', 'views', 'FCT-v1', '2-cps-user-journey', 'E-case-overview-variation-3.html')
const layoutPath = path.join(__dirname, '..', 'app', 'views', 'layoutCPS-NEW-CASEFILE-variation-3.html')
const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-variation-3.html')
const homePath = path.join(__dirname, '..', 'app', 'views', 'index.html')

assert(fs.existsSync(pagePath), 'Expected variation 3 page')
assert(fs.existsSync(layoutPath), 'Expected variation 3 layout')
assert(fs.existsSync(headerPath), 'Expected variation 3 header')

const page = fs.readFileSync(pagePath, 'utf8')
const layout = fs.readFileSync(layoutPath, 'utf8')
const header = fs.readFileSync(headerPath, 'utf8')
const home = fs.readFileSync(homePath, 'utf8')

assert(page.includes('{% extends "layoutCPS-NEW-CASEFILE-variation-3.html" %}'), 'Expected page to use variation 3 layout')
assert(layout.includes('{% include "includes/_app-header-variation-3.html" %}'), 'Expected layout to use variation 3 header')
assert(header.includes('/FCT-v1/2-cps-user-journey/E-case-overview-variation-3'), 'Expected header links to variation 3 route')
assert(home.includes('/FCT-v1/2-cps-user-journey/E-case-overview-variation-3'), 'Expected home page to link to variation 3')

console.log('variation 3 wiring checks passed')
