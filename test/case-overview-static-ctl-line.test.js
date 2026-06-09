const fs = require('fs')
const path = require('path')
const assert = require('assert')

const headerPath = path.join(__dirname, '..', 'app', 'views', 'includes', '_app-header.html')
const header = fs.readFileSync(headerPath, 'utf8')

assert(
  header.includes('<div class="app-identity-bar__meta">\n          <span>This is a Digital Case File (DCF) case</span>\n        </div>'),
  'Expected case overview identity bar to include the static DCF line'
)

assert(
  !header.includes('ctlSummary') && !header.includes('futureDate.setDate'),
  'Expected case overview DCF line to be static, with no date logic'
)

console.log('case overview static DCF line checks passed')
