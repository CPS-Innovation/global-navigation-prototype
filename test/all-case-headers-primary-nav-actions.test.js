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
    header.includes('<!--') &&
      header.includes('<div class="govuk-width-container app-primary-navigation__actions">') &&
      header.includes('<a class="app-primary-navigation__action" href="/not-yet-built">Give Feedback</a>') &&
      header.includes('<a class="app-primary-navigation__action" href="/not-yet-built">Give feedback</a>') &&
      header.includes('-->'),
    `Expected ${file} to keep the primary navigation action links commented out`
  )
})

console.log('all case headers primary navigation action checks passed')
