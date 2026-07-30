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
  !header.includes('{% from "govuk/components/service-navigation/macro.njk" import govukServiceNavigation %}') &&
    !header.includes('govukServiceNavigation({') &&
    !header.includes('navigationLabel: "Primary navigation"') &&
    !header.includes('text: "Home"') &&
    !header.includes('text: "Tasks"') &&
    !header.includes('text: "Cases"') &&
    !header.includes('active:') &&
    !header.includes('xGovukSecondaryNavigation') &&
    !header.includes('app-identity-bar') &&
    !header.includes('app-primary-navigation__actions') &&
    !header.includes('app-cps-header__accessability') &&
    !header.includes('Accessibility settings</a>'),
  'Expected accessability header to omit primary navigation, case context, extra action row and accessibility settings link'
)

assert(
  !page.includes('{% from "govuk/components/back-link/macro.njk" import govukBackLink %}') &&
    !page.includes('{% block beforeContent %}') &&
    !page.includes('govukBackLink({') &&
    !page.includes('text: "Back"') &&
    !page.includes('href: "javascript:history.back()"'),
  'Expected accessability page to remove the Back link from the journey'
)

assert(
  page.includes('<h1 class="govuk-heading-l">Settings</h1>') &&
    !page.includes('style="margin-top:25px"'),
  'Expected accessability page to use the standard GOV.UK H1 spacing without inline margin overrides'
)

assert(
  page.includes('Use this page to define your settings.'),
  'Expected accessability page to use the updated settings intro copy'
)

assert(
  page.includes('<!-- <h2 class="govuk-heading-m" >Statement</h2> -->') &&
    page.includes('{#') &&
    page.includes('View the statement (opens in new tab)') &&
    page.includes('#}'),
  'Expected accessability page body to comment out the statement link copy'
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
  layout.includes('.govuk-template {') &&
    layout.includes('background-color: var(--govuk-template-background-colour, #f4f8fb) !important;') &&
    !layout.includes('display: flex;') &&
    !layout.includes('flex-direction: column;'),
  'Expected accessability layout to use GOV.UK template background behind the footer without changing the main content layout'
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
    layout.includes('href: "/accessability"') &&
    layout.includes('text: "Settings (opens in new tab)"') &&
    layout.includes('text: "Statement (opens in new tab)"') &&
    layout.indexOf('text: "Settings (opens in new tab)"') < layout.indexOf('text: "Statement (opens in new tab)"') &&
    !layout.includes('text: "Accessibility statement (opens in a new tab)"') &&
    !layout.includes('text: "Accessibility statement (Opens in new window)"') &&
    !layout.includes('text: "Accessability statement') &&
    layout.includes('{#') &&
    layout.includes('text: "Clear data"') &&
    layout.includes('text: "Manage your prototype"') &&
    layout.includes('#}') &&
    layout.indexOf('text: "Statement (opens in new tab)"') < layout.indexOf('{#') &&
    layout.indexOf('text: "Clear data"') > layout.indexOf('{#') &&
    layout.includes('target: "_blank"') &&
    layout.includes('rel: "noopener noreferrer"'),
  'Expected accessability layout footer to show Settings with opens in new tab copy before Statement and comment out Clear data'
)

assert(
  !sass.includes('.app-accessability-main {') &&
    !sass.includes('.app-accessability-pages .app-primary-navigation__actions'),
  'Expected accessability page not to override GOV.UK spacing between primary navigation, back link, H1 or confirmation panel'
)

assert(
  layout.includes('{% set mainClasses = pageMainClasses | default("govuk-main-wrapper--auto-spacing") %}') &&
    page.includes('{% set pageMainClasses = "govuk-!-static-padding-top-7" %}') &&
    confirmationPage.includes('{% set pageMainClasses = "govuk-!-static-padding-top-7" %}') &&
    !confirmationPage.includes('{% set pageMainClasses = "govuk-main-wrapper--l" %}'),
  'Expected accessibility pages to use GOV.UK static spacing override 7, 40px, for the Back link to H1 gap and top-of-page to success panel gap'
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
  page.includes('<form action="/accessability-check-your-answers" method="post" novalidate>') &&
    page.indexOf('<form action="/accessability-check-your-answers" method="post" novalidate>') < page.indexOf('text: "Continue"') &&
    page.indexOf('text: "Continue"') < page.indexOf('</form>'),
  'Expected Continue on the accessability page to submit to the check your answers page using the GOV.UK question page form pattern'
)

assert(
  !page.includes('govukCheckboxes({') &&
    !page.includes('text: "Accessibility options"') &&
    !page.includes('Remove the URN from the beginning of the tab name'),
  'Expected accessability page to remove the checkbox and Accessibility options heading'
)

assert(
  page.includes('govukButton({') &&
    page.includes('text: "Continue"') &&
    !page.includes('text: "Save and continue"') &&
    page.includes('classes: "app-button--green"'),
  'Expected accessability page to include a green Continue button'
)

assert(
  page.includes('<div class="govuk-button-group">') &&
    page.includes('text: "Continue"') &&
    !page.includes('<a class="govuk-link" href="/">Cancel</a>') &&
    !page.includes('Cancel') &&
    !page.includes('href="javascript:history.back()"') &&
    page.includes('</div>'),
  'Expected accessability page to remove the Cancel link and show only the green Continue button'
)

assert(
  sass.includes('.app-button--green,') &&
    sass.includes('.app-button--green:hover,') &&
    sass.includes('background-color: #00703c;'),
  'Expected Continue button to use green button styling'
)

assert(
  confirmationPage.includes('{% extends "layoutCPS-ACCESSABILITY.html" %}') &&
    confirmationPage.includes('{% set pageMainClasses = "govuk-!-static-padding-top-7" %}') &&
    !confirmationPage.includes('{% set pageMainClasses = "govuk-main-wrapper--l" %}') &&
    confirmationPage.includes('{% from "govuk/components/panel/macro.njk" import govukPanel %}') &&
    confirmationPage.includes('<div class="govuk-grid-row">') &&
    confirmationPage.includes('<div class="govuk-grid-column-two-thirds">') &&
    confirmationPage.includes('govukPanel({') &&
    confirmationPage.includes('titleText: "Your settings have been updated"') &&
    confirmationPage.includes('{# text: "Your changes have been saved" #}') &&
    !confirmationPage.includes('text: "Your changes have been saved"\n'),
  'Expected accessability confirmation page to use the GOV.UK confirmation page pattern with the updated H1 and commented-out panel body text'
)

assert(
  !confirmationPage.includes('govukButton({') &&
    !confirmationPage.includes('text: "Continue"'),
  'Expected accessability confirmation page not to include a button'
)

assert(
  !confirmationPage.includes('<p class="govuk-body">Your settings have been updated.</p>') &&
    !confirmationPage.includes('titleText: "Your settings have been updated."') &&
    confirmationPage.includes('{#') &&
    confirmationPage.includes('<h2 class="govuk-heading-m">Next steps</h2>') &&
    confirmationPage.includes('<p class="govuk-body">You can:</p>') &&
    confirmationPage.includes('<ul class="govuk-list govuk-list--bullet">') &&
    confirmationPage.includes('<a class="govuk-link" href="/FCT-v1/2-cps-user-journey/E-case-overview">return to your task</a>') &&
    confirmationPage.includes('<a class="govuk-link" href="/">go to the homepage</a>') &&
    confirmationPage.includes('<a class="govuk-link" href="/accessability">make another change to your settings</a>') &&
    confirmationPage.indexOf('{#') < confirmationPage.indexOf('<h2 class="govuk-heading-m">Next steps</h2>') &&
    confirmationPage.indexOf('<a class="govuk-link" href="/accessability">make another change to your settings</a>') < confirmationPage.lastIndexOf('#}'),
  'Expected accessability confirmation page to comment out the Next steps content underneath the confirmation panel'
)

console.log('accessability control page checks passed')
