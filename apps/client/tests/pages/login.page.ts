import {Locator, Page} from '@playwright/test'

export class LoginPage {
  readonly loginButton: Locator
  readonly userError: Locator
  readonly passError: Locator
  readonly dialogHeadingText: Locator

  private readonly usernameTextbox: Locator
  private readonly passwordTextbox: Locator

  constructor(page: Page) {
    this.usernameTextbox = page.getByRole('textbox', {name: 'email@email.com'})
    this.passwordTextbox = page.getByRole('textbox', {name: 'Password'})

    this.userError = page
      .locator('div')
      .filter({hasText: /^Email$/})
      .locator('span')

    this.passError = page
      .locator('div')
      .filter({hasText: /^Password$/})
      .locator('span')

    this.loginButton = page.getByRole('button', {name: 'Login'})
    this.dialogHeadingText = page.getByRole('heading', {name: 'Login'})
  }

  async openLoginDialog() {
    await this.loginButton.click()
  }

  async fillLoginWithCredentials(user: string, pass: string) {
    await this.usernameTextbox.fill(user)
    await this.passwordTextbox.fill(pass)
  }

  async clickLogin() {
    await this.loginButton.click()
  }
}
