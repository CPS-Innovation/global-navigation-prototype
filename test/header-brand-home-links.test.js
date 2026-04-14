const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headers = [
  '_app-header.html',
  '_app-header-variation.html',
  '_app-header-variation-2.html',
  '_app-header-variation-3.html'
].map((file) => fs.readFileSync(path.join(__dirname, '..', 'app', 'views', 'includes', file), 'utf8'))

headers.forEach((header, index) => {
  assert(
    header.includes('<a class="app-cps-header__brand" href="/">'),
    `Expected header ${index + 1} brand to link to the prototype homepage`
  )
})

console.log('header brand home link checks passed')
