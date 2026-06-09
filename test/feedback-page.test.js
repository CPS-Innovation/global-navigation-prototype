const fs = require('fs')
const path = require('path')
const assert = require('assert')

const pagePath = path.join(__dirname, '..', 'app', 'views', 'feedback.html')
const headerFiles = [
  '_app-header.html',
  '_app-header-variation.html',
  '_app-header-variation-2.html',
  '_app-header-variation-3.html',
  '_app-header-accessability.html'
]

assert(fs.existsSync(pagePath), 'Expected feedback page to exist')

const page = fs.readFileSync(pagePath, 'utf8')
const sassPath = path.join(__dirname, '..', 'app', 'assets', 'sass', 'application.scss')
const sass = fs.readFileSync(sassPath, 'utf8')

assert(
  page.includes('{% extends "layoutCPS-ACCESSABILITY.html" %}'),
  'Expected feedback page to use the same layout as the accessibility page'
)

assert(
  page.includes('govukRadios({') &&
    page.includes('text: "What do you want to do?"') &&
    page.includes('classes: "govuk-fieldset__legend--l app-feedback-page-heading"') &&
    page.includes('text: "Report a bug"') &&
    page.includes('text: "Get feedback"'),
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

headerFiles.forEach((file) => {
  const header = fs.readFileSync(path.join(__dirname, '..', 'app', 'views', 'includes', file), 'utf8')

  assert(
    header.includes('<a class="app-cps-header__accessability" href="/feedback">Give feedback</a>'),
    `Expected ${file} Give feedback link to point to the feedback page`
  )
})

console.log('feedback page checks passed')
