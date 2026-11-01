const { defineConfig, devices } = require('@playwright/test');
const { defineBddConfig } = require('playwright-bdd');

const testDir = defineBddConfig({
  features: 'tests/features/**/*.feature',
  steps: ['tests/steps/**/*.js', 'tests/fixtures/**/*.js'],
});

module.exports = defineConfig({
  testDir,
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  globalSetup: './globalScript.js',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : undefined,

  reporter: [['html'], ['allure-playwright']],

  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com/',
    storageState: '.auth/user.json',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});
