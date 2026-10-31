class LoginPage {

    constructor(page) {
        this.page = page;

        this.usernameTextBox = page.getByRole('textbox', {
            name: 'Username'
        });

        this.passwordTextBox = page.locator('[name="password"]');

        this.loginButton = page.getByRole('button', {
            name: /Login/i
        });
    }

    async navigate() {
        await this.page.goto(process.env.ORANGEHRM_URL);
    }

    async enterUsername(username) {
        await this.usernameTextBox.fill(username);
    }

    async enterPassword(password) {
        await this.passwordTextBox.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}

module.exports = { LoginPage };