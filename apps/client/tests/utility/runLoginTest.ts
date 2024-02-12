import {Page, expect} from '@playwright/test'
import {LoginPage} from '../pages/login.page'

export const runLoginTest = async ({
  page,
  user,
  pass,
  keyboard = true,
}: {
  page: Page
  user: string
  pass: string
  keyboard?: boolean
}) => {
  const loginPage = new LoginPage(page)

  await loginPage.openLoginDialog()
  await expect(loginPage.dialogHeadingText).toBeVisible()

  await loginPage.fillLoginWithCredentials(user, pass)
  await expect(loginPage.userError).toBeEmpty()
  await expect(loginPage.passError).toBeEmpty()

  if (keyboard) await page.keyboard.press('Enter')
  else await loginPage.clickLogin()

  await expect(page.getByRole('button', {name: 'Add a photo'})).toBeVisible()
}
