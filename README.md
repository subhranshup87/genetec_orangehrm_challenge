# OrangeHRM PIM Regression Tests

## Coverage

The `@regression` suite covers:

- Create an employee, edit personal information and verify it was saved.
- Create an employee, delete it and verify it no longer appears in search.
- Update job details, then reopen the employee and verify they persisted.

## Design choices

- **Gherkin features** describe workflows in `tests/features`; step definitions connect them to reusable page objects.
- **Page objects** keep selectors and UI actions together, making locator changes easier to maintain.
- **Test data** is managed through fixtures: `tests/utils/employeeData.js` uses Faker to generate unique employee names and IDs, while shared job information values live in `tests/data/jobDetails.json`. `tests/fixtures/fixtures.js` provides this data and the page objects to the steps.
- **Global setup and authentication** are handled by `globalScript.js`: it loads credentials from `.env` when present, logs in once, and saves the authenticated browser state to `.auth/user.json` for the tests to reuse. Set `ORANGEHRM_USERNAME` and `ORANGEHRM_PASSWORD` in `.env` locally or as CI secrets.
- **GitHub Actions** runs the regression suite on pushes and pull requests to `main` or `master`. Add `ORANGEHRM_USERNAME` and `ORANGEHRM_PASSWORD` as repository secrets. The workflow uploads the Playwright HTML and Allure reports as artifacts, which can be downloaded from the workflow run.

## Run

Install dependencies and the Chromium browser, then run the regression suite:

```bash
npm ci
npx playwright install chromium
npm run test_regression
```

The command generates the Allure report in `allure-report/`. To open it locally:

```bash
npm run allure:open
```
