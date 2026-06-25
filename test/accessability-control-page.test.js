const fs = require('fs')
const path = require('path')
const assert = require('assert')

const pagePath = path.join(__dirname, '..', 'app', 'views', 'accessability.html')
const confirmationPagePath = path.join(__dirname, '..', 'app', 'views', 'accessability-confirmation.html')
const layoutPath = path.join(__dirname, '..', 'app', 'views', 'layoutCPS-ACCESSABILITY.html')
const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-accessability.html')
const sassPath = path.join(__dirname, '..', 'app', 'assets', 'sass', 'application.scss')

assert(fs.existsSync(pagePath), 'Expected accessability control page to exist')
assert(fs.existsSync(confirmationPagePath), 'Expected accessability confirmation page to exist')
assert(fs.existsSync(layoutPath), 'Expected accessability control layout to exist')
assert(fs.existsSync(headerPath), 'Expected accessability control header to exist')

const page = fs.readFileSync(pagePath, 'utf8')
const confirmationPage = fs.readFileSync(confirmationPagePath, 'utf8')
const layout = fs.readFileSync(layoutPath, 'utf8')
const header = fs.readFileSync(headerPath, 'utf8')
const sass = fs.readFileSync(sassPath, 'utf8')

assert(
  page.includes('{% extends "layoutCPS-ACCESSABILITY.html" %}'),
  'Expected accessability page to use the accessability layout'
)

assert(
  layout.includes('{% include "includes/_app-header-accessability.html" %}'),
  'Expected accessability layout to include the header-only blue bar'
)

assert(
  header.includes('<header class="app-cps-header app-cps-header--variation" role="banner">'),
  'Expected accessability header to use the same blue bar structure'
)

assert(
  !header.includes('govukServiceNavigation') && !header.includes('xGovukSecondaryNavigation'),
  'Expected accessability header not to include primary or secondary navigation'
)

assert(
  page.includes('{% from "govuk/components/back-link/macro.njk" import govukBackLink %}') &&
    page.includes('{% block beforeContent %}') &&
    page.includes('govukBackLink({') &&
    page.includes('text: "Back"') &&
    page.includes('href: "/"') &&
    !page.includes('href: "javascript:history.back()"'),
  'Expected accessability page to include a GOV.UK back link before the content that works without JavaScript'
)

assert(
  /<h1[^>]*class="govuk-heading-l"[^>]*>Accessibility settings<\/h1>/.test(page) ||
    /<h1[^>]*class="govuk-heading-xl"[^>]*>Accessibility settings<\/h1>/.test(page),
  'Expected accessability page to include an H1'
)

assert(
  page.includes('Use this page to define your accessibility settings.'),
  'Expected accessability page to use the updated accessibility settings intro copy'
)

assert(
  page.includes('View the accessibility statement (opens in a new tab)'),
  'Expected accessability page to include the updated accessibility statement link copy'
)

assert(
  !page.includes('<div class="govuk-width-container">'),
  'Expected accessability page content not to add a nested width container because govuk/template.njk already provides one'
)

assert(
  layout.includes('{% set mainClasses = pageMainClasses | default("govuk-main-wrapper--auto-spacing") %}'),
  'Expected accessability layout to use the standard GOV.UK main wrapper spacing by default'
)

assert(
  layout.includes('{% set bodyClasses = "app-accessability-pages" %}') &&
    layout.includes('.app-accessability-pages footer {') &&
    layout.includes('display: block;'),
  'Expected accessability layout to show the standard GOV.UK footer'
)

assert(
  layout.includes('.app-accessability-pages .govuk-footer__crown') &&
    layout.includes('.app-accessability-pages .govuk-footer__copyright-logo') &&
    layout.includes('.app-accessability-pages .govuk-footer__licence-logo') &&
    layout.includes('.app-accessability-pages .govuk-footer__licence-description') &&
    layout.includes('.app-accessability-pages .govuk-footer__copyright') &&
    layout.includes('display: none;'),
  'Expected accessability layout to hide Crown and OGL footer elements'
)

assert(
  layout.includes("{% from 'govuk/components/footer/macro.njk' import govukFooter %}") &&
    layout.includes('{% block govukFooter %}') &&
    layout.includes('text: "Accessibility statement (opens in new tab)"') &&
    !layout.includes('text: "Accessibility statement (opens in a new tab)"') &&
    !layout.includes('text: "Accessibility statement (Opens in new window)"') &&
    !layout.includes('text: "Accessability statement') &&
    layout.includes('{#') &&
    layout.includes('text: "Clear data"') &&
    layout.includes('text: "Manage your prototype"') &&
    layout.includes('#}') &&
    layout.indexOf('text: "Accessibility statement (opens in new tab)"') < layout.indexOf('{#') &&
    layout.indexOf('text: "Clear data"') > layout.indexOf('{#') &&
    layout.includes('target: "_blank"') &&
    layout.includes('rel: "noopener noreferrer"'),
  'Expected accessability layout footer to show Accessibility statement with opens in new tab copy and comment out Clear data'
)

assert(
  !sass.includes('.app-accessability-main {'),
  'Expected accessability page not to override GOV.UK main wrapper top spacing'
)

assert(
  page.includes('govukRadios({') &&
    page.includes('name: "accessability-control"') &&
    page.includes('text: "Show the URN at the beginning of the tab name"') &&
    page.includes('value: "yes"') &&
    page.includes('text: "Yes"') &&
    page.includes('value: "no"') &&
    page.includes('text: "No"'),
  'Expected accessability page to include a Yes/No radio group for the URN tab name option'
)

assert(
  page.includes('classes: "govuk-radios--inline"'),
  'Expected the URN tab name Yes/No radios to use the GOV.UK inline radios option'
)

assert(
  page.includes('value: "yes"') &&
    page.includes('checked: true') &&
    page.indexOf('value: "yes"') < page.indexOf('checked: true') &&
    page.indexOf('checked: true') < page.indexOf('value: "no"'),
  'Expected the accessability page Yes radio option to be selected by default'
)

assert(
  page.includes('<form action="/accessability-confirmation" method="post" novalidate>') &&
    page.indexOf('<form action="/accessability-confirmation" method="post" novalidate>') < page.indexOf('text: "Save and continue"') &&
    page.indexOf('text: "Save and continue"') < page.indexOf('</form>'),
  'Expected Save and continue on the accessability page to submit to the confirmation page using the GOV.UK question page form pattern'
)

assert(
  !page.includes('govukCheckboxes({') &&
    !page.includes('text: "Accessibility options"') &&
    !page.includes('Remove the URN from the beginning of the tab name'),
  'Expected accessability page to remove the checkbox and Accessibility options heading'
)

assert(
  page.includes('govukButton({') &&
    page.includes('text: "Save and continue"') &&
    page.includes('classes: "app-button--green"'),
  'Expected accessability page to include a green Save and continue button'
)

assert(
  page.includes('<div class="govuk-button-group">') &&
    page.includes('text: "Save and continue"') &&
    page.includes('<!-- <a class="govuk-link" href="javascript:history.back()">Cancel</a> -->') &&
    page.includes('</div>'),
  'Expected accessability page to keep the Cancel link commented out next to the green button'
)

assert(
  sass.includes('.app-button--green,') &&
    sass.includes('.app-button--green:hover,') &&
    sass.includes('background-color: #00703c;'),
  'Expected Continue button to use green button styling'
)

assert(
  confirmationPage.includes('{% extends "layoutCPS-ACCESSABILITY.html" %}') &&
    confirmationPage.includes('{% set pageMainClasses = "govuk-main-wrapper--l" %}') &&
    confirmationPage.includes('{% from "govuk/components/panel/macro.njk" import govukPanel %}') &&
    confirmationPage.includes('<div class="govuk-grid-row">') &&
    confirmationPage.includes('<div class="govuk-grid-column-two-thirds">') &&
    confirmationPage.includes('govukPanel({') &&
    confirmationPage.includes('titleText: "Accessibility settings saved"') &&
    confirmationPage.includes('text: "Your changes have been saved"'),
  'Expected accessability confirmation page to use the GOV.UK confirmation page pattern with large top spacing and a two-thirds panel column'
)

assert(
  confirmationPage.includes('govukButton({') &&
    confirmationPage.includes('text: "Continue"') &&
    confirmationPage.includes('href: "/"'),
  'Expected accessability confirmation page to include a Continue link styled as a GOV.UK button'
)

console.log('accessability control page checks passed')
