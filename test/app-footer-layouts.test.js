const fs = require('fs')
const path = require('path')
const assert = require('assert')

const layoutNames = [
  'layouts/main.html',
  'layoutCPS-ACCESSABILITY.html',
  'layoutCPS-NEW-CASEFILE.html',
  'layoutCPS-NEW-CASEFILE-variation.html',
  'layoutCPS-NEW-CASEFILE-variation-2.html',
  'layoutCPS-NEW-CASEFILE-variation-3.html'
]

for (const layoutName of layoutNames) {
  const layoutPath = path.join(__dirname, '..', 'app', 'views', layoutName)
  const layout = fs.readFileSync(layoutPath, 'utf8')

  assert(
    layout.includes("{% from 'govuk/components/footer/macro.njk' import govukFooter %}"),
    `Expected ${layoutName} to import the GOV.UK footer macro`
  )

  if (layoutName !== 'layouts/main.html') {
    assert(
      layout.includes('.govuk-template {') &&
        layout.includes('background-color: var(--govuk-template-background-colour, #f4f8fb) !important;'),
      `Expected ${layoutName} to use the GOV.UK template background behind the footer`
    )

    assert(
      layout.includes('footer {') &&
        layout.includes('display: block;'),
      `Expected ${layoutName} to show the footer hidden by the wide layout include`
    )
  }

  assert(
    layout.includes('{% block govukFooter %}') &&
      layout.includes('Accessibility statement (opens in new tab)') &&
      layout.includes('target: "_blank"') &&
      layout.includes('rel: "noopener noreferrer"') &&
      layout.includes('visuallyHiddenTitle: "Footer links"'),
    `Expected ${layoutName} to include the accessibility statement footer link`
  )

  assert(
    layout.includes('.govuk-footer__crown') &&
      layout.includes('.govuk-footer__copyright-logo') &&
      layout.includes('.govuk-footer__licence-logo') &&
      layout.includes('.govuk-footer__licence-description') &&
      layout.includes('.govuk-footer__copyright') &&
      layout.includes('display: none;'),
    `Expected ${layoutName} to hide the Crown and OGL footer elements`
  )

  assert(
    !layout.includes('display: flex;') &&
      !layout.includes('flex-direction: column;'),
    `Expected ${layoutName} not to change the main page layout to flex`
  )
}

console.log('all app footer layout checks passed')
