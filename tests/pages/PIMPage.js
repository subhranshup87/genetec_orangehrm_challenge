const { expect } = require('@playwright/test');
const { DashboardPage } = require("./DashboardPage");
const { waitFor } = require('../utils/wait');

class PIMPage {

    constructor(page) {
        this.page = page;

        // Add Employee
        this.addButton = page.getByRole('button', { name: 'Add' });

        // Employee Details
        this.firstNameTextBox = page.getByRole('textbox', {
            name: 'First Name'
        });
        this.middleNameTextBox = page.getByRole('textbox', {
            name: 'Middle Name'
        });
        this.lastNameTextBox = page.getByRole('textbox', {
            name: 'Last Name'
        });

        this.employeeId = page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Employee Id' })
            .locator('input');

        this.initialSaveButton = page.getByRole('button', { name: 'Save' }).first();
        this.successToast = page
            .locator('.oxd-toast-content-text')
            .filter({ hasText: 'Successfully' });
        // Search Employee
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.employeeRows = page.locator('.oxd-table-body .oxd-table-row');
        this.openEmployeeDetailsButton = (employeeId) =>
            this.employeeRow(employeeId).getByRole('button').first();
        this.deleteEmployeeButton = (employeeId) =>
            this.employeeRow(employeeId).getByRole('button').nth(1);
        this.noRecordsFound = page.locator('span.oxd-text--span').filter({
            hasText: 'No Records Found',
        });
        this.deleteConfirmationDialog = page.getByRole('dialog');
        this.confirmDeleteButton = this.deleteConfirmationDialog.getByRole('button', {
            name: /Yes, Delete/i,
        });
    }

    async clickAddEmployee() {
        await this.addButton.click();
    }

    async createEmployee(firstName, middleName, lastName, employeeId) {
        await this.firstNameTextBox.fill(firstName);
        await this.middleNameTextBox.fill(middleName);
        await this.lastNameTextBox.fill(lastName);

        await this.employeeId.clear();
        await this.employeeId.fill(employeeId);

        await this.initialSaveButton.click();
        await expect(this.successToast).toContainText('Successfully Saved');
    }

    async searchEmployee(employeeId) {
        const dashboardPage = new DashboardPage(this.page);
        await dashboardPage.navigateToPIM();
        await this.employeeId.clear();
        await this.employeeId.fill(employeeId);

        await this.searchButton.click();
        await expect(this.employeeRow(employeeId)).toBeVisible();
        console.log(`Employee with ID: ${employeeId} found in search results.`);
    }

    async openEmployeeDetails(employeeId) {
        await this.openEmployeeDetailsButton(employeeId).click();
        await expect(this.page).toHaveURL(/viewPersonalDetails/);
    }

    async updateEmployeeFirstName(firstName) {
        await waitFor.loadState(this.page, 'networkidle');
        const firstNameInitialValue = await this.firstNameTextBox.inputValue();
        console.log(`Current First Name: ${firstNameInitialValue}`);
        await this.firstNameTextBox.fill(firstName);
        await this.initialSaveButton.click();
        const updatedFirstName = await this.firstNameTextBox.inputValue();
        console.log(`Updated First Name: ${updatedFirstName}`);
        await expect(this.successToast).toContainText('Successfully Updated');
    }

    async verifyEmployeeFirstNameUpdated(employeeId, firstName) {
        await this.searchEmployee(employeeId);
        const employeeNameCell = this.employeeRow(employeeId).getByRole('cell').nth(2);
        await expect(employeeNameCell).toContainText(firstName);
        console.log(`Employee with ID: ${employeeId} has updated first name: ${firstName}`);
    }

    async deleteEmployee(employeeId) {
        const row = this.employeeRow(employeeId);
        await expect(row).toBeVisible();
        await this.deleteEmployeeButton(employeeId).click();
        await expect(this.deleteConfirmationDialog).toBeVisible();
        await this.confirmDeleteButton.click();
        await expect(this.successToast).toContainText('Successfully Deleted');
    }

    async verifyEmployeeDeleted(employeeId) {
        const dashboardPage = new DashboardPage(this.page);
        await dashboardPage.navigateToPIM();
        await this.employeeId.clear();
        await this.employeeId.fill(employeeId);
        await this.searchButton.click();
        await expect(this.employeeRow(employeeId)).toHaveCount(0);
        await expect(this.noRecordsFound).toBeVisible();
    }

    employeeRow(employeeId) {
        return this.employeeRows.filter({
            has: this.page.getByText(employeeId, { exact: true }),
        });
    }
}

module.exports = { PIMPage };