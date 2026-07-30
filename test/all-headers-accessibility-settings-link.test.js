const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerFiles = [
  '_app-header-variation.html',
  '_app-header-variation-2.html',
  '_app-header-variation-3.html'
]

headerFiles.forEach((file) => {
  const header = fs.readFileSync(path.join(__dirname, '..', 'app', 'views', 'includes', file), 'utf8')

  assert(
    header.includes('<a class="app-cps-header__accessability" href="/accessability">Accessibility settings</a>'),
    `Expected ${file} to include the Accessibility settings link`
  )
})

const referenceHeader = fs.readFileSync(path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header.html'), 'utf8')
const referenceLayout = fs.readFileSync(path.join(__dirname, '..', 'app', 'views', 'layoutCPS-NEW-CASEFILE.html'), 'utf8')
const accessabilityHeader = fs.readFileSync(path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header-accessability.html'), 'utf8')
const accessabilityLayout = fs.readFileSync(path.join(__dirname, '..', 'app', 'views', 'layoutCPS-ACCESSABILITY.html'), 'utf8')

assert(
  !referenceHeader.includes('<a class="app-cps-header__accessability" href="/accessability">Accessibility settings</a>'),
  'Expected reference case overview header not to include the Accessibility settings link because it has moved to the footer'
)

assert(
  referenceLayout.includes('href: "/accessability"') &&
    referenceLayout.includes('text: "Settings (opens in new tab)"') &&
    referenceLayout.indexOf('text: "Settings (opens in new tab)"') < referenceLayout.indexOf('text: "Accessibility statement (opens in new tab)"'),
  'Expected reference case overview footer to include Settings with opens in new tab copy before Accessibility statement'
)

assert(
  !accessabilityHeader.includes('<a class="app-cps-header__accessability" href="/accessability">Accessibility settings</a>'),
  'Expected accessibility pages header not to include the Accessibility settings link because it has moved to the footer'
)

assert(
  accessabilityLayout.includes('href: "/accessability"') &&
    accessabilityLayout.includes('text: "Settings (opens in new tab)"') &&
    accessabilityLayout.indexOf('text: "Settings (opens in new tab)"') < accessabilityLayout.indexOf('text: "Statement (opens in new tab)"'),
  'Expected accessibility pages footer to include Settings with opens in new tab copy before Statement'
)

console.log('all headers accessibility settings link checks passed')
