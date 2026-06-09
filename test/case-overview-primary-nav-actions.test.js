const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header.html')
const sassPath = path.join(__dirname, '..', 'app', 'assets', 'sass', 'application.scss')

const header = fs.readFileSync(headerPath, 'utf8')
const sass = fs.readFileSync(sassPath, 'utf8')

assert(
  header.includes('<!--\n<div class="govuk-width-container app-primary-navigation__actions">\n  <a class="app-primary-navigation__action" href="/not-yet-built">Give Feedback</a>\n  <a class="app-primary-navigation__action" href="/not-yet-built">Give feedback</a>\n</div>\n-->'),
  'Expected case overview primary navigation action links to be commented out'
)

assert(
  sass.includes('.app-primary-navigation {') && sass.includes('position: relative;'),
  'Expected primary navigation action styles to remain available'
)

assert(
  sass.includes('.app-primary-navigation__actions {') &&
    sass.includes('justify-content: flex-end;'),
  'Expected primary navigation actions to be right aligned when enabled'
)

assert(
  sass.includes('.app-primary-navigation__action {') &&
    sass.includes('font-family: $govuk-font-family;'),
  'Expected primary navigation actions to use the same font styling when enabled'
)

console.log('case overview primary navigation action checks passed')
