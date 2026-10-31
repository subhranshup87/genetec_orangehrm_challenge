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

        this.employeeIdTextBox = page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Employee Id' })
            .locator('input');

        this.saveButton = page.getByRole('button', { name: 'Save' });

        // Search Employee
        this.searchButton = page.getByRole('button', { name: 'Search' });
    }

    async clickAddEmployee() {
        await this.addButton.click();
    }

    async saveEmployee() {
        await this.saveButton.click();
    }

    async createEmployee(firstName, middleName, lastName, employeeId) {
        await this.firstNameTextBox.fill(firstName);
        await this.middleNameTextBox.fill(middleName);
        await this.lastNameTextBox.fill(lastName);

        await this.employeeIdTextBox.clear();
        await this.employeeIdTextBox.fill(employeeId);

        await this.saveButton.click();
    }

    async searchEmployee() {
        await this.searchButton.click();
    }
}

module.exports = { PIMPage };