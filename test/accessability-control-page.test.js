const fs = require('fs')
const path = require('path')
const assert = require('assert')

const pagePath = path.join(__dirname, '..', 'app', 'views', 'accessability.html')
const layoutPath = path.join(__dirname, '..', 'app', 'views', 'layoutCPS-ACCESSABILITY.html')
const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-accessability.html')
const sassPath = path.join(__dirname, '..', 'app', 'assets', 'sass', 'application.scss')

assert(fs.existsSync(pagePath), 'Expected accessability control page to exist')
assert(fs.existsSync(layoutPath), 'Expected accessability control layout to exist')
assert(fs.existsSync(headerPath), 'Expected accessability control header to exist')

const page = fs.readFileSync(pagePath, 'utf8')
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
    page.includes('href: "javascript:history.back()"'),
  'Expected accessability page to include a GOV.UK back link before the content'
)

assert(
  /<h1[^>]*class="govuk-heading-l"[^>]*>Accessibility settings<\/h1>/.test(page) ||
    /<h1[^>]*class="govuk-heading-xl"[^>]*>Accessibility settings<\/h1>/.test(page),
  'Expected accessability page to include an H1'
)

assert(
  page.includes('View the  accessibility statement (opens in new window)'),
  'Expected accessability page to include the accessibility statement link copy'
)

assert(
  !page.includes('<div class="govuk-width-container">'),
  'Expected accessability page content not to add a nested width container because govuk/template.njk already provides one'
)

assert(
  layout.includes('{% set mainClasses = "govuk-main-wrapper--auto-spacing" %}'),
  'Expected accessability layout to use the standard GOV.UK main wrapper spacing'
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
    layout.includes('text: "Accessibility statement (Opens in new window)"') &&
    !layout.includes('text: "Accessability statement (Opens in new window)"') &&
    layout.indexOf('text: "Accessibility statement (Opens in new window)"') < layout.indexOf('text: "Clear data"') &&
    layout.includes('{#') &&
    layout.includes('text: "Manage your prototype"') &&
    layout.includes('#}') &&
    layout.includes('target: "_blank"') &&
    layout.includes('rel: "noopener noreferrer"'),
  'Expected accessability layout footer links to show Accessability statement and Clear data, with Manage your prototype commented out'
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
    page.indexOf('text: "Save and continue"') < page.indexOf('<a class="govuk-link" href="javascript:history.back()">Cancel</a>') &&
    page.includes('<a class="govuk-link" href="javascript:history.back()">Cancel</a>') &&
    page.includes('</div>'),
  'Expected accessability page to include a Cancel link next to the green button'
)

assert(
  sass.includes('.app-button--green,') &&
    sass.includes('.app-button--green:hover,') &&
    sass.includes('background-color: #00703c;'),
  'Expected Continue button to use green button styling'
)

console.log('accessability control page checks passed')
