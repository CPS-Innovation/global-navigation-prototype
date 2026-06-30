//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

router.post('/accessability-alternate-a11y', (req, res) => {
  req.session.data.showAccessibilitySettingsSaved = true
  res.redirect('/accessability-alternate-a11y')
})

router.get('/accessability-alternate-a11y', (req, res) => {
  const showAccessibilitySettingsSaved = Boolean(req.session.data.showAccessibilitySettingsSaved)
  delete req.session.data.showAccessibilitySettingsSaved

  res.render('accessability-alternate-a11y', { showAccessibilitySettingsSaved })
})
