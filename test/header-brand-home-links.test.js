const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headers = [
  '_app-header.html',
  '_app-header-variation.html',
  '_app-header-variation-2.html',
  '_app-header-variation-3.html'
].map((file) => fs.readFileSync(path.join(__dirname, '..', 'app', 'views', 'includes', file), 'utf8'))

const sass = fs.readFileSync(path.join(__dirname, '..', 'app', 'assets', 'sass', 'application.scss'), 'utf8')

headers.forEach((header, index) => {
  assert(
    header.includes('<a class="app-cps-header__brand" href="/">'),
    `Expected header ${index + 1} brand to link to the prototype homepage`
  )
})

assert(
  sass.includes(`.app-cps-header__brand,
.app-cps-header__brand:link,
.app-cps-header__brand:visited,
.app-cps-header__brand:hover,
.app-cps-header__brand:active {
  text-decoration: none;
}`),
  'Expected the CPS Manage Cases brand link to have no underline in all link states'
)

console.log('header brand home link checks passed')
