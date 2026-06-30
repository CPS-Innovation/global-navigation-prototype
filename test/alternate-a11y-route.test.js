const fs = require('fs')
const path = require('path')
const assert = require('assert')

const root = path.join(__dirname, '..')
const home = fs.readFileSync(path.join(root, 'app', 'views', 'index.html'), 'utf8')
const referencePage = fs.readFileSync(path.join(root, 'app', 'views', 'FCT-v1', '2-cps-user-journey', 'E-case-overview.html'), 'utf8')
const referenceHeader = fs.readFileSync(path.join(root, 'app', 'views', 'includes', '_app-header.html'), 'utf8')
const originalA11yPage = fs.readFileSync(path.join(root, 'app', 'views', 'accessability.html'), 'utf8')

const alternatePagePath = path.join(root, 'app', 'views', 'FCT-v1', '2-cps-user-journey', 'E-case-overview-alternate-a11y.html')
const alternateLayoutPath = path.join(root, 'app', 'views', 'layoutCPS-NEW-CASEFILE-alternate-a11y.html')
const alternateHeaderPath = path.join(root, 'app', 'views', 'includes', '_app-header-alternate-a11y.html')
const alternateAccessLayoutPath = path.join(root, 'app', 'views', 'layoutCPS-ACCESSABILITY-alternate-a11y.html')
const alternateAccessHeaderPath = path.join(root, 'app', 'views', 'includes', '_app-header-accessability-alternate-a11y.html')
const alternateSettingsPath = path.join(root, 'app', 'views', 'accessability-alternate-a11y.html')
const alternateUrnPath = path.join(root, 'app', 'views', 'accessability-alternate-a11y-urn-tab-name.html')

assert(fs.existsSync(alternatePagePath), 'Expected alternate a11y case overview page to exist')
assert(fs.existsSync(alternateLayoutPath), 'Expected alternate a11y case layout to exist')
assert(fs.existsSync(alternateHeaderPath), 'Expected alternate a11y header to exist')
assert(fs.existsSync(alternateAccessLayoutPath), 'Expected alternate a11y accessibility layout to exist')
assert(fs.existsSync(alternateAccessHeaderPath), 'Expected alternate a11y accessibility header to exist')
assert(fs.existsSync(alternateSettingsPath), 'Expected alternate a11y settings page to exist')
assert(fs.existsSync(alternateUrnPath), 'Expected alternate a11y URN question page to exist')

const alternatePage = fs.readFileSync(alternatePagePath, 'utf8')
const alternateLayout = fs.readFileSync(alternateLayoutPath, 'utf8')
const alternateHeader = fs.readFileSync(alternateHeaderPath, 'utf8')
const alternateAccessLayout = fs.readFileSync(alternateAccessLayoutPath, 'utf8')
const alternateAccessHeader = fs.readFileSync(alternateAccessHeaderPath, 'utf8')
const alternateSettings = fs.readFileSync(alternateSettingsPath, 'utf8')
const alternateUrn = fs.readFileSync(alternateUrnPath, 'utf8')

assert(
  home.includes('<a class="govuk-link" href="/FCT-v1/2-cps-user-journey/E-case-overview">Reference version</a>') &&
    home.includes('<a class="govuk-link" href="/FCT-v1/2-cps-user-journey/E-case-overview-alternate-a11y">Alternate a11y route</a>') &&
    home.indexOf('Reference version') < home.indexOf('Alternate a11y route') &&
    home.indexOf('Alternate a11y route') < home.indexOf('Variation version'),
  'Expected home page to link Alternate a11y route to its own duplicated reference page underneath Reference version'
)

assert(
  referencePage.includes('{% extends "layoutCPS-NEW-CASEFILE.html" %}') &&
    referenceHeader.includes('href="/accessability"') &&
    !referenceHeader.includes('/accessability-alternate-a11y'),
  'Expected original reference route to keep the original accessibility settings link'
)

assert(
  originalA11yPage.includes('<form action="/accessability-check-your-answers" method="post" novalidate>') &&
    originalA11yPage.includes('govukRadios({') &&
    originalA11yPage.includes('name: "accessability-control"') &&
    !originalA11yPage.includes('govukSummaryList({') &&
    !originalA11yPage.includes('/accessability-urn-tab-name'),
  'Expected original accessibility settings page to be restored to the original Yes/No question page'
)

assert(
  alternatePage.includes('{% extends "layoutCPS-NEW-CASEFILE-alternate-a11y.html" %}') &&
    alternateLayout.includes('{% include "includes/_app-header-alternate-a11y.html" %}') &&
    alternateHeader.includes('href="/accessability-alternate-a11y"') &&
    !alternateHeader.includes('href="/accessability"'),
  'Expected alternate a11y case route to use a duplicated header pointing to the alternate settings journey'
)

assert(
  alternateAccessLayout.includes('{% include "includes/_app-header-accessability-alternate-a11y.html" %}') &&
    alternateAccessHeader.includes('href="/accessability-alternate-a11y"') &&
    !alternateAccessHeader.includes('href="/accessability"') &&
    alternateSettings.includes('{% extends "layoutCPS-ACCESSABILITY-alternate-a11y.html" %}') &&
    /<h1[^>]*class="govuk-heading-l"[^>]*>Accessibility settings<\/h1>/.test(alternateSettings) &&
    alternateSettings.includes('Use this page to define your accessibility settings.') &&
    alternateSettings.includes('View the accessibility statement (opens in new tab)') &&
    alternateSettings.includes('govukSummaryList({') &&
    alternateSettings.includes('href: "/accessability-alternate-a11y-urn-tab-name"') &&
    !alternateSettings.includes('<form action="/accessability-confirmation" method="post" novalidate>') &&
    !alternateSettings.includes('govukButton({'),
  'Expected alternate settings page to be the CYA-style Accessibility settings page without a Save and continue button'
)

assert(
  alternateUrn.includes('{% extends "layoutCPS-ACCESSABILITY-alternate-a11y.html" %}') &&
    /<h1[^>]*class="govuk-heading-l"[^>]*>Show the URN at the beginning of the tab name<\/h1>/.test(alternateUrn) &&
    alternateUrn.includes('<form action="/accessability-alternate-a11y" method="post" novalidate>') &&
    alternateUrn.includes('govukRadios({') &&
    alternateUrn.includes('name: "accessability-control"'),
  'Expected alternate URN question page to post back to the alternate settings page'
)

console.log('alternate a11y route checks passed')
