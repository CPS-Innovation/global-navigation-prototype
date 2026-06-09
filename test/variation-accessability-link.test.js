const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-variation.html')
const sassPath = path.join(__dirname, '..', 'app', 'assets', 'sass', 'application.scss')

const header = fs.readFileSync(headerPath, 'utf8')
const sass = fs.readFileSync(sassPath, 'utf8')

assert(
  header.includes('<a class="app-cps-header__accessability" href="/accessability">Accessibility settings</a>'),
  'Expected the variation blue header bar to include an Accessibility settings link at the top right'
)

assert(
  sass.includes('.app-cps-header__accessability,') &&
    sass.includes('.app-cps-header__accessability:visited,') &&
    sass.includes('.app-cps-header__accessability:hover,') &&
    sass.includes('color: govuk-colour("white");') &&
    sass.includes('font-size: 16px;') &&
    sass.includes('text-decoration: none;'),
  'Expected the accessability link to stay white, be styled at 16px, and have no underline'
)

console.log('variation accessability link checks passed')
