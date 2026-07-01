const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerFiles = [
  '_app-header.html',
  '_app-header-variation.html',
  '_app-header-variation-2.html',
  '_app-header-variation-3.html',
  '_app-header-accessability.html'
]

const headersWithAccessibilitySettingsLink = [
  '_app-header-variation.html',
  '_app-header-variation-2.html',
  '_app-header-variation-3.html'
]

headerFiles.forEach((file) => {
  const header = fs.readFileSync(path.join(__dirname, '..', 'app', 'views', 'includes', file), 'utf8')

  assert(
    !header.includes('<div class="app-cps-header__links">') &&
      !header.includes('<a class="app-cps-header__accessability" href="/feedback">Give feedback</a>') &&
      !header.includes('<span class="app-cps-header__links-divider" aria-hidden="true"></span>'),
    `Expected ${file} to remove Give feedback and the divider from the blue header`
  )
})

headersWithAccessibilitySettingsLink.forEach((file) => {
  const header = fs.readFileSync(path.join(__dirname, '..', 'app', 'views', 'includes', file), 'utf8')

  assert(
    header.includes('<a class="app-cps-header__accessability" href="/accessability">Accessibility settings</a>'),
    `Expected ${file} to keep the Accessibility settings link in the blue header`
  )
})

const referenceHeader = fs.readFileSync(path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header.html'), 'utf8')
const accessabilityHeader = fs.readFileSync(path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-accessability.html'), 'utf8')

assert(
  !referenceHeader.includes('<a class="app-cps-header__accessability" href="/accessability">Accessibility settings</a>'),
  'Expected reference case overview header not to include the Accessibility settings link because it has moved to the footer'
)

assert(
  !accessabilityHeader.includes('<a class="app-cps-header__accessability" href="/accessability">Accessibility settings</a>'),
  'Expected accessibility pages header not to include the Accessibility settings link because it has moved to the footer'
)

console.log('all headers top bar feedback removal checks passed')
