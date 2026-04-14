const fs = require('fs')
const path = require('path')
const assert = require('assert')

const homePath = path.join(__dirname, '..', 'app', 'views', 'index.html')
const home = fs.readFileSync(homePath, 'utf8')

assert(home.includes('Reference version'), 'Expected homepage to list the reference version')
assert(home.includes('Case info sits above the secondary navigation and does not include tags or custody time limit.'), 'Expected reference version description')
assert(home.includes('Variation version'), 'Expected homepage to list the variation version')
assert(home.includes('Moves the case info below the secondary navigation and adds tags plus custody time limit.'), 'Expected variation version description')
assert(home.includes('Variation 2'), 'Expected homepage to list variation 2')
assert(home.includes('Same layout as variation 1, with the tag spacing tightened up.'), 'Expected variation 2 description')
assert(home.includes('Variation 3'), 'Expected homepage to list variation 3')
assert(home.includes('Moves the case info back above the secondary navigation, keeping the tags and custody time limit.'), 'Expected variation 3 description')

console.log('home page version descriptions checks passed')
