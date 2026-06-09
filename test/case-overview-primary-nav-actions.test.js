const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header.html')
const sassPath = path.join(__dirname, '..', 'app', 'assets', 'sass', 'application.scss')

const header = fs.readFileSync(headerPath, 'utf8')
const sass = fs.readFileSync(sassPath, 'utf8')

assert(
  header.includes('<div class="govuk-width-container app-primary-navigation__actions">') &&
    header.includes('<a class="app-primary-navigation__action" href="/feedback">Give feedback</a>'),
  'Expected case overview primary navigation line to include a right-aligned Give feedback link'
)

assert(
  sass.includes('.app-primary-navigation {') && sass.includes('position: relative;'),
  'Expected primary navigation to allow right-aligned action positioning'
)

assert(
  sass.includes('.app-primary-navigation__actions {') &&
    sass.includes('justify-content: flex-end;'),
  'Expected primary navigation actions to be right aligned'
)

assert(
  sass.includes('.app-primary-navigation__action {') &&
    sass.includes('font-family: $govuk-font-family;') &&
    sass.includes('font-size: 16px;'),
  'Expected primary navigation action to use the same font family and 16px font size'
)

console.log('case overview primary navigation action checks passed')
