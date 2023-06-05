import { test, expect } from "framework/fixtures/ObjectFixture";
import { NOT_SIGNED_IN_STATE } from "framework/utils/Constants";

test.describe(`Sign in tests`, () => {

  //Other tests using sign-in cookies to avoid repeating it in each test. Here we using another state
  test.use({ storageState: NOT_SIGNED_IN_STATE });
  test("should be able to sign in with valid credentials", async ({ loginPage, profilePage }) => {
    await loginPage.open();
    await loginPage.login(process.env.USER_FOR_TESTS!, process.env.USER_FOR_TESTS_PASSWORD!);

    await expect(profilePage.logOutBtn).toBeVisible();
  });

  test("should NOT able to sign in with valid credentials", async ({ loginPage, profilePage }) => {
    await loginPage.open();
    await loginPage.login(process.env.USER_FOR_TESTS!, 'Invalid password');

    await expect(loginPage.validationMessage).toHaveText("Invalid username or password!");
    await expect(profilePage.logOutBtn).not.toBeVisible();
  });
});
