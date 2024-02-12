import {test, expect} from '@playwright/test'
import {environment} from '../src/environments/environment.development'
import {runLoginTest} from './utility/runLoginTest'

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200')
})

test('should edit title image', async ({page}) => {
  const titleLocator = await page.locator('.overlay__title').first()
  await page.getByRole('button', {name: 'edit'}).first().click()

  const submitButton = page.getByRole('button', {name: 'Submit'})
  expect(submitButton).toBeVisible()

  const titleText = await titleLocator.innerText()
  const expectedTitle = titleText + Math.random()
  await page
    .getByPlaceholder('Voluptate non non ea velit nisi aliquip')
    .fill(expectedTitle)

  expect(page.locator('.form__span--error')).toBeHidden()

  await submitButton.click()

  const newTitle = await titleLocator.innerText()
  expect(newTitle).toEqual(expectedTitle)
  expect(newTitle).not.toEqual(titleText)

  await page.pause()
})

test('should search an image', async ({page}) => {
  const images = await page.locator('app-masonry section app-card').all()
  await page.getByPlaceholder('Search by name').fill('pat')
  await page.keyboard.press('Enter')

  await expect(page.getByText('search')).toBeVisible()

  const newImages = await page.locator('app-masonry section app-card').all()

  expect(images.length).not.toEqual(newImages.length)

  if (newImages.length > 0) {
    for (let image of newImages) {
      const title = await image.locator('.overlay__title').innerText()
      expect(title).toContain('pat')
    }
  } else {
    const notFound = await page.locator('section p')
    expect(notFound).toBeVisible()
  }

  await page.pause()
})

test('should login successfully with Enter', async ({page}) => {
  await runLoginTest({
    page,
    user: environment.user,
    pass: environment.pass,
    keyboard: true,
  })
})

test('should login successfully with Click', async ({page}) => {
  await runLoginTest({
    page,
    user: environment.user,
    pass: environment.pass,
    keyboard: false,
  })
})

test('should add a photo', async ({page}) => {
  await runLoginTest({
    page,
    user: environment.user,
    pass: environment.pass,
  })

  page.getByRole('button', {name: 'Add a photo'}).click()

  await expect(
    page.getByRole('heading', {name: 'Add a new photo'}),
  ).toBeVisible()

  const expectedName = 'Vicuña Test'
  const expectedPhotoUrl =
    'https://images.unsplash.com/photo-1707496964676-8abbf31adb1e'

  const label = page.getByPlaceholder('Quis quis enim est ex')
  const photoUrl = page.getByPlaceholder('https://images.unsplash.com/')

  await label.fill(expectedName)
  await photoUrl.fill(expectedPhotoUrl)
  await page.keyboard.press('Enter')

  await expect(page.getByLabel('Image added')).toBeVisible()

  const title = await page.locator('.overlay__title').first().innerText()
  expect(expectedName).toEqual(title)

  const image = await page
    .locator('article.card img')
    .first()
    .getAttribute('src')
  expect(expectedPhotoUrl).toEqual(image)

  await page.pause()
})

test('should delete a photo', async ({page}) => {
  await runLoginTest({
    page,
    user: environment.user,
    pass: environment.pass,
  })

  const unexpectedName = await page
    .locator('.overlay__title')
    .first()
    .innerText()
  const unexpectedImage = await page
    .locator('article.card img')
    .first()
    .getAttribute('src')

  await page.getByRole('button', {name: 'delete'}).first().click()

  await expect(page.getByRole('heading', {name: 'Are you sure?'})).toBeVisible()
  await page.getByRole('button', {name: 'Delete'}).click()

  await expect(page.getByLabel('Image removed')).toBeVisible()

  const title = await page.locator('.overlay__title').first().innerText()
  const image = await page
    .locator('article.card img')
    .first()
    .getAttribute('src')

  expect(unexpectedName).not.toEqual(title)
  expect(unexpectedImage).not.toEqual(image)

  await page.pause()
})
