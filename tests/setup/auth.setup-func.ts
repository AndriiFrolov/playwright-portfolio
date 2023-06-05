import { expect } from '@playwright/test';
import { test as setup } from 'framework/fixtures/ObjectFixture';
import { NOT_SIGNED_IN_STATE, SIGNED_IN_STATE } from 'framework/utils/Constants';

setup.describe('Executing sign-in pre-condition for tests', () => {
  setup('Authenticate with a known user', async ({ page, loginPage, profilePage }) => {
    await loginPage.open();
    //Save cookies with not signed-in state (to use in tests where you don't need to sign in)
    await page.context().storageState({ path: NOT_SIGNED_IN_STATE });
    await loginPage.login(process.env.USER_FOR_TESTS!, process.env.USER_FOR_TESTS_PASSWORD!);
    await expect(profilePage.logOutBtn).toBeVisible();
    //Save cookies with signed-in state (to do not repeat login in each test)
    await page.context().storageState({ path: SIGNED_IN_STATE });
  });
});
