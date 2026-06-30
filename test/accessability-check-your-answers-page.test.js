const fs = require('fs')
const path = require('path')
const assert = require('assert')

const settingsPagePath = path.join(__dirname, '..', 'app', 'views', 'accessability.html')
const checkAnswersPagePath = path.join(__dirname, '..', 'app', 'views', 'accessability-check-your-answers.html')
const confirmationPagePath = path.join(__dirname, '..', 'app', 'views', 'accessability-confirmation.html')
const layoutPath = path.join(__dirname, '..', 'app', 'views', 'layoutCPS-ACCESSABILITY.html')

assert(fs.existsSync(checkAnswersPagePath), 'Expected accessibility check your answers page to exist')

const settingsPage = fs.readFileSync(settingsPagePath, 'utf8')
const checkAnswersPage = fs.readFileSync(checkAnswersPagePath, 'utf8')
const confirmationPage = fs.readFileSync(confirmationPagePath, 'utf8')
const layout = fs.readFileSync(layoutPath, 'utf8')

assert(
  settingsPage.includes('<form action="/accessability-check-your-answers" method="post" novalidate>') &&
    settingsPage.indexOf('<form action="/accessability-check-your-answers" method="post" novalidate>') < settingsPage.indexOf('text: "Save and continue"'),
  'Expected accessibility settings form to post to the check your answers page'
)

assert(
  checkAnswersPage.includes('{% extends "layoutCPS-ACCESSABILITY.html" %}'),
  'Expected check your answers page to keep the accessibility header, navigation and footer layout'
)

assert(
  layout.includes('{% include "includes/_app-header-accessability.html" %}') &&
    layout.includes('{% block govukFooter %}'),
  'Expected accessibility layout to provide the shared header, navigation and footer chrome'
)

assert(
  checkAnswersPage.includes('{% from "govuk/components/summary-list/macro.njk" import govukSummaryList %}') &&
    checkAnswersPage.includes('{% from "govuk/components/button/macro.njk" import govukButton %}') &&
    checkAnswersPage.includes('{% from "govuk/components/back-link/macro.njk" import govukBackLink %}'),
  'Expected check your answers page to use standard GOV.UK summary list, button and back link macros'
)

assert(
  checkAnswersPage.includes('{% block beforeContent %}') &&
    checkAnswersPage.includes('govukBackLink({') &&
    checkAnswersPage.includes('text: "Back"') &&
    checkAnswersPage.includes('href: "/accessability"'),
  'Expected check your answers page to include a GOV.UK back link to the accessibility settings page'
)

assert(
  /<h1[^>]*class="govuk-heading-l"[^>]*>Check your answers<\/h1>/.test(checkAnswersPage),
  'Expected check your answers page to use the standard Check your answers H1'
)

assert(
  checkAnswersPage.includes('govukSummaryList({') &&
    checkAnswersPage.includes('key: { text: "Show the URN at the beginning of the tab name" }') &&
    checkAnswersPage.includes('value: { text: data["accessability-control"] | default("yes") | capitalize }') &&
    checkAnswersPage.includes('href: "/accessability"') &&
    checkAnswersPage.includes('visuallyHiddenText: "show the URN at the beginning of the tab name"'),
  'Expected check your answers page to summarise the selected accessibility setting with a change link'
)

assert(
  checkAnswersPage.includes('<form action="/accessability-confirmation" method="post" novalidate>') &&
    checkAnswersPage.indexOf('<form action="/accessability-confirmation" method="post" novalidate>') < checkAnswersPage.indexOf('text: "Save and continue"') &&
    checkAnswersPage.indexOf('text: "Save and continue"') < checkAnswersPage.indexOf('</form>'),
  'Expected check your answers page to submit to the existing confirmation page'
)

assert(
  confirmationPage.includes('titleText: "Your accessibility settings have been updated."'),
  'Expected the existing confirmation page with the updated H1 to remain the next step after check your answers'
)

console.log('accessibility check your answers page checks passed')
