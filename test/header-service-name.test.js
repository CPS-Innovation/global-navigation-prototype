const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header.html')
const overviewPath = path.join(__dirname, '..', 'app', 'views', 'FCT-v1', '2-cps-user-journey', 'E-case-overview.html')

const header = fs.readFileSync(headerPath, 'utf8')
const overview = fs.readFileSync(overviewPath, 'utf8')

assert(
  header.includes('{% set serviceName = headerServiceName or "Manage cases" %}'),
  'Expected header default service name to be "Manage cases"'
)

assert(
  overview.includes('{% set headerServiceName = "Manage cases" %}'),
  'Expected overview page service name to be "Manage cases"'
)

console.log('header service name checks passed')
