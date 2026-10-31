class DashboardPage {

    constructor(page) {
        this.page = page;

        this.pimMenu = page
            .locator('span')
            .filter({ hasText: 'PIM' })
            .first();
    }

    async clickPIM() {
        await this.pimMenu.click();
    }

    async navigateToPIM() {
        await this.clickPIM();
    }

    async verifyDashboardPage() {
        await this.page.waitForURL(/dashboard/);
    }
}

module.exports = { DashboardPage };