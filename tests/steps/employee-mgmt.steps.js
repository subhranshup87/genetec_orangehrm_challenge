const { expect } = require('@playwright/test');
const { Given, When } = require('../fixtures/fixtures');

Given('user login to OrangeHRM', async ({ loginPage, dashboardPage }) => {
  await loginPage.navigate();
  dashboardPage.verifyDashboardPage();
});