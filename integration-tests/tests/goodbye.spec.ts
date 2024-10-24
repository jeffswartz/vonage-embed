import { expect } from '@playwright/test';
import * as crypto from 'crypto';
import test from '../fixtures/testWithLogging';

test('should render `Reenter` button when exiting a room and it should return user to the room', async ({
  page,
}) => {
  const roomName = crypto.randomBytes(5).toString('hex');
  const roomUrl = `room/${roomName}`;

  await page.goto(`${roomUrl}?bypass=true`);

  await page.getByTestId('CallEndIcon').click();

  // Checking we navigated to the goodbye page
  await expect(page.url()).toContain('goodbye');
  const reenterButton = page.getByRole('button', { name: 'Reenter' });
  await expect(reenterButton).toBeVisible();

  // Checking that you can reenter the exited room
  await reenterButton.click();
  await expect(page.url()).toContain(roomUrl);
});

test('should not render `Reenter` button when navigating directly to goodbye', async ({ page }) => {
  await page.goto('/');
  await page.goto('/goodbye');

  const reenterButton = page.getByRole('button', { name: 'Reenter' });
  await expect(reenterButton).not.toBeVisible();
});

test('should render `Return to landing page` and it should navigate to the landing page', async ({
  page,
}) => {
  await page.goto('/');
  await page.goto('/goodbye');

  const landingPageButton = page.getByRole('button', { name: 'Return to landing page' });
  await expect(landingPageButton).toBeVisible();

  await landingPageButton.click();
  await expect(
    page.getByRole('heading', { name: 'Welcome to the Vonage Video React App' })
  ).toBeVisible();
});
