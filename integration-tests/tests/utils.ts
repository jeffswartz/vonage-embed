// eslint-disable-next-line import/no-extraneous-dependencies
import { Page, expect } from '@playwright/test';

export const openMeetingRoomWithSettings = async ({
  page,
  roomName,
  username,
  videoOff = false,
}: {
  page: Page;
  roomName: string;
  username: string;
  videoOff?: boolean;
}) => {
  await page.goto(`/waiting-room/${roomName}`);
  await page.getByPlaceholder('Enter your name').fill(username);

  if (videoOff) {
    await page.getByTestId('VideocamIcon').click();
    await expect(page.getByTestId('VideocamOffIcon')).toBeVisible();
  }
  await page.getByRole('button', { name: 'Join' }).click();
};

export const waitAndClickFirefox = async (page, browserName) => {
  // Firefox needs delay and then click for publisher to initialize
  if (browserName === 'firefox') {
    await page.waitForTimeout(3000);
    await page.locator('#root').click();
  }
};
