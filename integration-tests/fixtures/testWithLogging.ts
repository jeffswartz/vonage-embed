/**
 * This file exports a custom playwright fixture which extends Page to log all browser console messages
 * as well as any uncaught errors.
 * See for reference:
 * - Playwright Fixtures https://playwright.dev/docs/test-fixtures
 * - Console Messages https://playwright.dev/python/docs/api/class-consolemessage
 * - Example override page fixture https://github.com/microsoft/playwright/issues/7051#issuecomment-859916019
 */
import { BrowserContext, Page, test as baseTest } from '@playwright/test';

const addLogger = (page: Page, context: BrowserContext) => {
  // Get page index to help identify which tab logs are coming from
  const index = context.pages().length;
  // log all page Console Messages to node console
  page.on('console', (msg) => {
    console.log(`Browser console ${msg.type()} from page ${index}: ${msg.text()}`);
  });
  // log all uncaught page errors to node console
  page.on('pageerror', (err) => {
    console.error(`Browser uncaught error from page ${index}: "${err.message}" - ${err.stack}`);
  });
  return page;
};

const test = baseTest.extend({
  // override page to add our logging
  page: async ({ page: _page, context }, use) => {
    const page = addLogger(_page, context);
    use(page);
  },
  // override context.newPage to return a page with our logging
  context: async ({ context }, use) => {
    const oldNewPage = context.newPage.bind(context);
    context.newPage = async () => {
      const page = await oldNewPage();
      return addLogger(page, context);
    };
    use(context);
  },
});

export default test;
