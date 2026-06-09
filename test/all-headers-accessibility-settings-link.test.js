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

headerFiles.forEach((file) => {
  const header = fs.readFileSync(path.join(__dirname, '..', 'app', 'views', 'includes', file), 'utf8')

  assert(
    header.includes('<a class="app-cps-header__accessability" href="/accessability">Accessibility settings</a>'),
    `Expected ${file} to include the Accessibility settings link`
  )
})

console.log('all headers accessibility settings link checks passed')
