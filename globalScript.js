const { chromium } = require('@playwright/test');
const { LoginPage } = require('./tests/pages/LoginPage');

async function globalSetup() {
  process.loadEnvFile('.env');
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);

    // Perform login flow
    await loginPage.navigate();
    await loginPage.login(process.env.ORANGEHRM_USERNAME, process.env.ORANGEHRM_PASSWORD);
    await page.waitForURL(/dashboard/);

    // Save auth state
    const storageStatePath = '.auth/user.json';
    await context.storageState({ path: storageStatePath });
  } finally {
    await browser.close();
  }
}

module.exports = globalSetup;