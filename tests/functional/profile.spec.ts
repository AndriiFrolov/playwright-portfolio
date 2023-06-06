import { test, expect } from "framework/fixtures/ObjectFixture";
import { NOT_SIGNED_IN_STATE } from "framework/utils/Constants";

test.describe(`Profile tests`, () => {

  test("should be able to navigate to Book store from Profile page", async ({ profilePage, bookStorePage }) => {
    await profilePage.open();
    await profilePage.goToBookStoreBtn.click();
    await bookStorePage.verifyPageOpened();
  });

});
