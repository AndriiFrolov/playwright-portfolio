import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://react-portfolio-app-git-main-andriifrolov.vercel.app/');

  // Expect a title "to contain" a substring.
  await expect(page.locator('h2')).toHaveText(/Result: hahaha/);
});

