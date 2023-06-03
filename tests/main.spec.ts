import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Typenotes/)
})

test('get started link', async ({ page }) => {
  await page.goto('/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Get Started!' }).click()

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/login/)
})

test('login', async ({ page }) => {
  await page.goto('/login')

  // Fill an input.
  await page.fill('[name="email"]', 'test@test.com')
  await page.fill('[name="password"]', 'test')

  // Click a button.
  await page.click('[type="submit"]')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Notes/)
})
