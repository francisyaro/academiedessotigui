import { test, expect } from '@playwright/test'

test.describe('Académie des Sotigui - Public Voting Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage
    await page.goto('http://localhost:3000/fr')
  })

  test('should display hero section and countdown', async ({ page }) => {
    // Check main title
    await expect(page.locator('h1')).toContainText('SOTIGUI AWARDS')
    
    // Check countdown container is visible
    const countdown = page.locator('.gold-glow')
    await expect(countdown.first()).toBeVisible()
  })

  test('should successfully complete public vote with OTP', async ({ page }) => {
    // 1. Navigate to voting page
    await page.goto('http://localhost:3000/fr/vote')
    
    // 2. Select category
    const categoryBtn = page.locator('button:has-text("Sotigui du Public")')
    await expect(categoryBtn).toBeVisible()
    await categoryBtn.click()

    // 3. Select nominee (e.g. Eve Guehi)
    const selectNomineeBtn = page.locator('button:has-text("Sélectionner")').first()
    await expect(selectNomineeBtn).toBeVisible()
    await selectNomineeBtn.click()

    // 4. Fill in voter details
    await page.fill('input[type="email"]', 'test.voter@example.com')
    await page.fill('input[placeholder*="Côte d\'Ivoire"]', 'Senegal')
    
    const sendCodeBtn = page.locator('button:has-text("Envoyer le code")')
    await sendCodeBtn.click()

    // 5. Enter mock OTP code
    const otpInput = page.locator('input[placeholder="123456"]')
    await expect(otpInput).toBeVisible()
    await page.fill('input[placeholder="123456"]', '123456') // Mock code accepted by local API

    const confirmVoteBtn = page.locator('button:has-text("Confirmer mon vote")')
    await confirmVoteBtn.click()

    // 6. Check success message and checkmark
    await expect(page.locator('h2')).toContainText('Votre vote a été pris en compte !')
  })

  test('should navigate successfully to nominee profile', async ({ page }) => {
    // Navigate to nominees list
    await page.goto('http://localhost:3000/fr/nomines')
    
    // Click on profile card
    const profileLink = page.locator('a:has-text("Fiche profil")').first()
    await profileLink.click()

    // Verify detail page has heading and biography
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('h2:has-text("Biographie")')).toBeVisible()
  })
})
