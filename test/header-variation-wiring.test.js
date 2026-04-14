const fs = require('fs')
const path = require('path')
const assert = require('assert')

const variationPagePath = path.join(__dirname, '..', 'app', 'views', 'FCT-v1', '2-cps-user-journey', 'E-case-overview-variation.html')
const variationLayoutPath = path.join(__dirname, '..', 'app', 'views', 'layoutCPS-NEW-CASEFILE-variation.html')
const variationHeaderPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-variation.html')

assert(fs.existsSync(variationPagePath), 'Expected variation page to exist')
assert(fs.existsSync(variationLayoutPath), 'Expected variation layout to exist')
assert(fs.existsSync(variationHeaderPath), 'Expected variation header to exist')

const variationPage = fs.readFileSync(variationPagePath, 'utf8')
const variationLayout = fs.readFileSync(variationLayoutPath, 'utf8')

assert(
  variationPage.includes('{% extends "layoutCPS-NEW-CASEFILE-variation.html" %}'),
  'Expected variation page to extend the variation layout'
)

assert(
  variationLayout.includes('{% include "includes/_app-header-variation.html" %}'),
  'Expected variation layout to include the variation header'
)

console.log('header variation wiring checks passed')
