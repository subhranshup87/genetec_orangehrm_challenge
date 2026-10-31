const { test: base, createBdd } = require('playwright-bdd');
const { DashboardPage } = require('../pages/DashboardPage');
const { LoginPage } = require('../pages/LoginPage');
const { PIMPage } = require('../pages/PIMPage');
const { createEmployeeData } = require('../utils/employeeData');

const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  pimPage: async ({ page }, use) => {
    await use(new PIMPage(page));
  },
  employeeData: async ({}, use) => {
    await use(await createEmployeeData());
  },
});

module.exports = { test, ...createBdd(test) };