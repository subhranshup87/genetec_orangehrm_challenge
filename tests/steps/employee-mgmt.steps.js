const { Given, When, Then } = require('../fixtures/fixtures');

Given('user login to OrangeHRM', async ({ loginPage, dashboardPage }) => {
  await loginPage.navigate();
  dashboardPage.verifyDashboardPage();
});

When('user navigates to PIM module', async ({ dashboardPage }) => {
  await dashboardPage.clickPIM();
});

When('user creates a new employee', async ({ pimPage, employeeData }) => {
  await pimPage.clickAddEmployee();
  await pimPage.createEmployee(
    employeeData.firstName,
    employeeData.middleName,
    employeeData.lastName,
    employeeData.employeeId
  );
  console.log(`Employee created with ID: ${employeeData.employeeId}`);
});

When('user searches for the new employee', async ({ pimPage, employeeData }) => {
  await pimPage.searchEmployee(employeeData.employeeId);
});

When('user opens employee details', async ({ pimPage, employeeData, page }) => {
  await pimPage.openEmployeeDetails(employeeData.employeeId);
});

When('user edits employee information', async ({ pimPage, employeeData, page }) => {
  await pimPage.updateEmployeeFirstName(employeeData.updatedFirstName);
});

Then('user verifies the changes were saved successfully', async ({ pimPage, employeeData }) => {
  await pimPage.verifyEmployeeFirstNameUpdated(
    employeeData.employeeId,
    employeeData.updatedFirstName
  );
});

When('user deletes the new employee', async ({ pimPage, employeeData }) => {
  await pimPage.deleteEmployee(employeeData.employeeId);
});

Then('user verifies the employee was deleted', async ({ pimPage, employeeData }) => {
  await pimPage.verifyEmployeeDeleted(employeeData.employeeId);
});