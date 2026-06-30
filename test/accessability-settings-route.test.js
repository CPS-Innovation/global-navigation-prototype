const fs = require('fs')
const path = require('path')
const assert = require('assert')

const settingsPagePath = path.join(__dirname, '..', 'app', 'views', 'accessability-alternate-a11y.html')
const urnPagePath = path.join(__dirname, '..', 'app', 'views', 'accessability-alternate-a11y-urn-tab-name.html')
const originalSettingsPagePath = path.join(__dirname, '..', 'app', 'views', 'accessability.html')

assert(fs.existsSync(settingsPagePath), 'Expected alternate accessibility settings landing page to exist')
assert(fs.existsSync(urnPagePath), 'Expected alternate URN tab name settings page to exist')
assert(fs.existsSync(originalSettingsPagePath), 'Expected original accessibility settings page to exist')

const settingsPage = fs.readFileSync(settingsPagePath, 'utf8')
const urnPage = fs.readFileSync(urnPagePath, 'utf8')
const originalSettingsPage = fs.readFileSync(originalSettingsPagePath, 'utf8')

assert(
  settingsPage.includes('{% extends "layoutCPS-ACCESSABILITY-alternate-a11y.html" %}') &&
    settingsPage.includes('{% from "govuk/components/summary-list/macro.njk" import govukSummaryList %}') &&
    !settingsPage.includes('{% from "govuk/components/button/macro.njk" import govukButton %}'),
  'Expected alternate accessibility settings landing page to use the shared layout and GOV.UK summary list without a button macro'
)

assert(
  /<h1[^>]*class="govuk-heading-l"[^>]*>Accessibility settings<\/h1>/.test(settingsPage),
  'Expected alternate settings landing page H1 to say Accessibility settings with the correct spelling'
)

assert(
  settingsPage.includes('Use this page to define your accessibility settings.') &&
    settingsPage.includes('View the accessibility statement (opens in new tab)'),
  'Expected alternate settings landing page to include the original accessibility page intro copy and statement link'
)

assert(
  settingsPage.includes('govukSummaryList({') &&
    settingsPage.includes('key: { text: "Show the URN at the beginning of the tab name" }') &&
    settingsPage.includes('value: { text: data["accessability-control"] | default("yes") | capitalize }') &&
    settingsPage.includes('href: "/accessability-alternate-a11y-urn-tab-name"') &&
    settingsPage.includes('visuallyHiddenText: "show the URN at the beginning of the tab name"'),
  'Expected alternate settings landing page to link the URN setting to the alternate second page'
)

assert(
  !settingsPage.includes('govukRadios({') &&
    !settingsPage.includes('name: "accessability-control"'),
  'Expected alternate settings landing page not to contain the Yes/No radio question'
)

assert(
  !settingsPage.includes('<form action="/accessability-confirmation" method="post" novalidate>') &&
    !settingsPage.includes('text: "Save and continue"') &&
    !settingsPage.includes('govukButton({'),
  'Expected alternate settings landing page not to include a Save and continue button or confirmation form'
)

assert(
  originalSettingsPage.includes('govukRadios({') &&
    originalSettingsPage.includes('<form action="/accessability-check-your-answers" method="post" novalidate>') &&
    !originalSettingsPage.includes('govukSummaryList({') &&
    !originalSettingsPage.includes('/accessability-alternate-a11y-urn-tab-name'),
  'Expected original accessibility settings page to remain the original Yes/No question page'
)

assert(
  urnPage.includes('{% extends "layoutCPS-ACCESSABILITY-alternate-a11y.html" %}') &&
    urnPage.includes('{% set pageName = "Show the URN at the beginning of the tab name" %}') &&
    /<h1[^>]*class="govuk-heading-l"[^>]*>Show the URN at the beginning of the tab name<\/h1>/.test(urnPage),
  'Expected alternate second page to focus on showing the URN at the beginning of the tab name'
)

assert(
  urnPage.includes('govukBackLink({') &&
    urnPage.includes('href: "/accessability-alternate-a11y"'),
  'Expected alternate second page back link to return to the alternate accessibility settings landing page'
)

assert(
  urnPage.includes('<form action="/accessability-alternate-a11y" method="post" novalidate>') &&
    !urnPage.includes('/accessability-check-your-answers') &&
    urnPage.includes('govukRadios({') &&
    urnPage.includes('name: "accessability-control"') &&
    urnPage.includes('value: "yes"') &&
    urnPage.includes('value: "no"') &&
    urnPage.includes('text: "Save and continue"'),
  'Expected alternate second page to contain the Yes/No URN form and return to the alternate landing page'
)

console.log('alternate accessibility settings route checks passed')
