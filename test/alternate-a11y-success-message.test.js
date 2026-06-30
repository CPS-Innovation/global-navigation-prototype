const fs = require('fs')
const path = require('path')
const assert = require('assert')

const pagePath = path.join(__dirname, '..', 'app', 'views', 'accessability-alternate-a11y.html')
const urnPagePath = path.join(__dirname, '..', 'app', 'views', 'accessability-alternate-a11y-urn-tab-name.html')
const routesPath = path.join(__dirname, '..', 'app', 'routes.js')

const page = fs.readFileSync(pagePath, 'utf8')
const urnPage = fs.readFileSync(urnPagePath, 'utf8')
const routes = fs.readFileSync(routesPath, 'utf8')

assert(
  page.includes('{% from "govuk/components/notification-banner/macro.njk" import govukNotificationBanner %}'),
  'Expected alternate accessibility settings page to import the GOV.UK notification banner macro'
)

assert(
  page.includes('{% if showAccessibilitySettingsSaved %}') &&
    page.includes('govukNotificationBanner({') &&
    page.includes('type: "success"') &&
    page.includes('titleText: "Success"') &&
    page.includes('html: "Accessibility settings saved"') &&
    page.includes('{% endif %}'),
  'Expected alternate accessibility settings page to show a GOV.UK success notification banner only when the flash flag is set'
)

assert(
  page.indexOf('{% if showAccessibilitySettingsSaved %}') < page.indexOf('<h1 class="govuk-heading-l">Accessibility settings</h1>'),
  'Expected success message to appear at the top of the alternate accessibility settings page before the H1'
)

assert(
  urnPage.includes('<form action="/accessability-alternate-a11y" method="post" novalidate>'),
  'Expected alternate URN form to post back to the alternate settings page'
)

assert(
  routes.includes("router.post('/accessability-alternate-a11y'") &&
    routes.includes('req.session.data.showAccessibilitySettingsSaved = true') &&
    routes.includes("res.redirect('/accessability-alternate-a11y')"),
  'Expected POST route to set a one-time success flag and redirect back to the alternate settings page'
)

assert(
  routes.includes("router.get('/accessability-alternate-a11y'") &&
    routes.includes('const showAccessibilitySettingsSaved = Boolean(req.session.data.showAccessibilitySettingsSaved)') &&
    routes.includes('delete req.session.data.showAccessibilitySettingsSaved') &&
    routes.includes("res.render('accessability-alternate-a11y', { showAccessibilitySettingsSaved })"),
  'Expected GET route to render the success flag once and clear it so the message disappears after moving to a new page'
)

console.log('alternate a11y success message checks passed')
