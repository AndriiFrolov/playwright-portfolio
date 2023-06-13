import { test, expect } from "framework/fixtures/ObjectFixture";
import { NOT_SIGNED_IN_STATE } from "framework/utils/Constants";

test.describe(`Profile tests`, () => {
  test("should be able to navigate to Book store from Profile page", async ({ profilePage, bookStorePage }) => {
    await test.step(`GIVEN user is on Profile page `, async () => {
      await profilePage.open();
    });

    await test.step(`WHEN Book store button is clicked`, async () => {
      await profilePage.goToBookStoreBtn.click();
    });

    await test.step(`THEN user is redireccted to Book store page`, async () => {
      await bookStorePage.verifyPageOpened();
    });
  });
});
