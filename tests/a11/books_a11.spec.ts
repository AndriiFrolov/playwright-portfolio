import { test } from "framework/fixtures/ObjectFixture";

test.describe(`Books A11 tests`, () => {
  test.beforeEach(async ({ bookStorePage }) => {
    await bookStorePage.open();
    await bookStorePage.verifyPageOpened();
  });

  test("should not have a11 issues on Book store page", async ({ a11 }) => {
    await a11.scan();
  });

  test("should not have a11 issues on Book table", async ({ a11, axe }) => {
    //To demonstrate ability to scan component (part of the page)
    axe.include("#searchBox-wrapper");
    await a11.scan();
  });

    test("should not have a11 issues except known", async ({ a11, axe }) => {
      //To demonstrate ability to scan component disabling some rules
      axe.disableRules("color-contrast");
      axe.include("#searchBox-wrapper");
      await a11.scan();
    });
});
