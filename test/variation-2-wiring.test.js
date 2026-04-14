const fs = require('fs')
const path = require('path')
const assert = require('assert')

const pagePath = path.join(__dirname, '..', 'app', 'views', 'FCT-v1', '2-cps-user-journey', 'E-case-overview-variation-2.html')
const layoutPath = path.join(__dirname, '..', 'app', 'views', 'layoutCPS-NEW-CASEFILE-variation-2.html')
const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-variation-2.html')

assert(fs.existsSync(pagePath), 'Expected variation 2 page')
assert(fs.existsSync(layoutPath), 'Expected variation 2 layout')
assert(fs.existsSync(headerPath), 'Expected variation 2 header')

const page = fs.readFileSync(pagePath, 'utf8')
const layout = fs.readFileSync(layoutPath, 'utf8')

assert(page.includes('{% extends "layoutCPS-NEW-CASEFILE-variation-2.html" %}'), 'Expected page to use variation 2 layout')
assert(layout.includes('{% include "includes/_app-header-variation-2.html" %}'), 'Expected layout to use variation 2 header')

console.log('variation 2 wiring checks passed')
