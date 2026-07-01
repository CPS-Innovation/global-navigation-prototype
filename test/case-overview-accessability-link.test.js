const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header.html')
const layoutPath = path.join(__dirname, '..', 'app', 'views', 'layoutCPS-NEW-CASEFILE.html')
const sassPath = path.join(__dirname, '..', 'app', 'assets', 'sass', 'application.scss')

const header = fs.readFileSync(headerPath, 'utf8')
const layout = fs.readFileSync(layoutPath, 'utf8')
const sass = fs.readFileSync(sassPath, 'utf8')

assert(
  !header.includes('<a class="app-cps-header__accessability" href="/accessability">Accessibility settings</a>'),
  'Expected the case overview blue header bar not to include an Accessibility settings link'
)

assert(
  layout.includes('href: "/accessability"') &&
    layout.includes('text: "Accessibility settings (opens in new tab)"') &&
    layout.includes('text: "Accessibility statement (opens in new tab)"') &&
    layout.indexOf('text: "Accessibility settings (opens in new tab)"') < layout.indexOf('text: "Accessibility statement (opens in new tab)"') &&
    layout.indexOf('text: "Accessibility settings (opens in new tab)"') < layout.indexOf('target: "_blank"') &&
    layout.includes('rel: "noopener noreferrer"'),
  'Expected the case overview footer to include Accessibility settings before Accessibility statement and open it in a new tab'
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

console.log('case overview accessability link checks passed')
