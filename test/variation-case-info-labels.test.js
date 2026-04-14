const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headers = [
  '_app-header-variation.html',
  '_app-header-variation-2.html',
  '_app-header-variation-3.html'
].map((file) => fs.readFileSync(path.join(__dirname, '..', 'app', 'views', 'includes', file), 'utf8'))

headers.forEach((header, index) => {
  assert(
    header.includes('id="case-information"'),
    `Expected variation ${index + 1} header to include the case-information target`
  )
  assert(
    header.includes('aria-label="Case information"'),
    `Expected variation ${index + 1} header to give the case information box a clear screen reader label`
  )
})

console.log('variation case information label checks passed')
