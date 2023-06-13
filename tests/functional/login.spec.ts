import { test, expect } from "framework/fixtures/ObjectFixture";
import { NOT_SIGNED_IN_STATE } from "framework/utils/Constants";

test.describe(`Sign in tests`, () => {
  //Other tests using sign-in cookies to avoid repeating it in each test. Here we using another state
  test.use({ storageState: NOT_SIGNED_IN_STATE });
  test("should be able to sign in with valid credentials @smoke", async ({ loginPage, profilePage }) => {
    await test.step(`GIVEN user is on Login page`, async () => {
      await loginPage.open();
    });

    await test.step(`WHEN valid credentials are used`, async () => {
      await loginPage.login(process.env.USER_FOR_TESTS!, process.env.USER_FOR_TESTS_PASSWORD!);
    });

    await test.step(`THEN user must be logged in`, async () => {
      await expect(profilePage.logOutBtn).toBeVisible();
    });
  });

  test("should NOT able to sign in with valid credentials @smoke", async ({ loginPage, profilePage }) => {
    await test.step(`GIVEN user is on Login page`, async () => {
      await loginPage.open();
    });

    await test.step(`WHEN invalid credentials are used`, async () => {
      await loginPage.login(process.env.USER_FOR_TESTS!, "Invalid password");
    });

    await test.step(`THEN user should stay on login page`, async () => {
      await expect(loginPage.userNameInput).toBeVisible();
    });

    await test.step(`AND be not logged in`, async () => {
      await expect(profilePage.logOutBtn).not.toBeVisible();
    });

    await test.step(`AND see error message`, async () => {
      await expect(loginPage.validationMessage).toHaveText("Invalid username or password!");
    });
  });
});
