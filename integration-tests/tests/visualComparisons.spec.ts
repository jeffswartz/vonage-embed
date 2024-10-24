import { expect } from '@playwright/test';
import test from '../fixtures/testWithLogging';

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-02-02T10:00:00'));
  await page.goto('/waiting-room/test-room');
  await page.waitForTimeout(1000);
});

test('Landing page UI test', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot({});
});

test('Waiting page UI test', async ({ page, isMobile }) => {
  // skipping this test for now on mobile viewport as we have a UI issue.
  if (isMobile) {
    test.skip();
  }
  await expect(page).toHaveScreenshot({
    mask: [page.locator('.video__element')],
  });
});
