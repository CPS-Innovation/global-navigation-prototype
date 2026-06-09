const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerFiles = [
  '_app-header.html',
  '_app-header-variation.html',
  '_app-header-variation-2.html',
  '_app-header-variation-3.html'
]

headerFiles.forEach((file) => {
  const header = fs.readFileSync(path.join(__dirname, '..', 'app', 'views', 'includes', file), 'utf8')

  assert(
    header.includes('<div class="govuk-width-container app-primary-navigation__actions">') &&
      header.includes('<a class="app-primary-navigation__action" href="/feedback">Give feedback</a>') &&
      !header.includes('<a class="app-primary-navigation__action" href="/not-yet-built">Give feedback</a>'),
    `Expected ${file} to include a right-aligned Give feedback link to the feedback page in the primary navigation`
  )
})

console.log('all case headers primary navigation action checks passed')
