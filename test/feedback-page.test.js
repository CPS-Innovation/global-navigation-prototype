const fs = require('fs')
const path = require('path')
const assert = require('assert')

const pagePath = path.join(__dirname, '..', 'app', 'views', 'feedback.html')
const layoutPath = path.join(__dirname, '..', 'app', 'views', 'layoutCPS-ACCESSABILITY.html')
const primaryHeaderFiles = [
  '_app-header.html',
  '_app-header-variation.html',
  '_app-header-variation-2.html',
  '_app-header-variation-3.html'
]

assert(fs.existsSync(pagePath), 'Expected feedback page to exist')

const page = fs.readFileSync(pagePath, 'utf8')
const layout = fs.readFileSync(layoutPath, 'utf8')
const sassPath = path.join(__dirname, '..', 'app', 'assets', 'sass', 'application.scss')
const sass = fs.readFileSync(sassPath, 'utf8')

assert(
  page.includes('{% extends "layoutCPS-ACCESSABILITY.html" %}'),
  'Expected feedback page to use the same layout as the accessibility page'
)

assert(
  page.includes('{% from "govuk/components/back-link/macro.njk" import govukBackLink %}') &&
    page.includes('{% block beforeContent %}') &&
    page.includes('govukBackLink({') &&
    page.includes('text: "Back"') &&
    page.includes('href: "javascript:history.back()"'),
  'Expected feedback page to include a GOV.UK back link before the content'
)

assert(
  layout.includes('{% set bodyClasses = "app-accessability-pages" %}') &&
    layout.includes('.app-accessability-pages footer {') &&
    layout.includes('display: block;') &&
    layout.includes('.app-accessability-pages .govuk-footer__copyright-logo') &&
    layout.includes('display: none;'),
  'Expected feedback page layout to show the accessibility footer with Crown and OGL elements hidden'
)

assert(
  page.includes('govukRadios({') &&
    page.includes('text: "What do you want to do?"') &&
    page.includes('classes: "govuk-fieldset__legend--l app-feedback-page-heading"') &&
    page.includes('text: "Report a bug"') &&
    page.includes('text: "Give feedback on Manage cases"'),
  'Expected feedback page to include the question and two radio buttons'
)

assert(
  page.includes('govukButton({') && page.includes('text: "Continue"'),
  'Expected feedback page to include a Continue button'
)

assert(
  sass.includes('.app-feedback-page-heading {') && sass.includes('margin-top: 25px;'),
  'Expected feedback page heading to have a 25px top margin'
)

primaryHeaderFiles.forEach((file) => {
  const header = fs.readFileSync(path.join(__dirname, '..', 'app', 'views', 'includes', file), 'utf8')

  assert(
    header.includes('<a class="app-primary-navigation__action" href="/feedback">Give feedback</a>'),
    `Expected ${file} primary navigation Give feedback link to point to the feedback page`
  )
})

console.log('feedback page checks passed')
