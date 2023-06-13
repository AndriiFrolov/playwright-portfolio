import { test } from "framework/fixtures/ObjectFixture";

test.describe(`Books A11 tests`, () => {
  test.beforeEach(async ({ bookStorePage }) => {
    await test.step(`GIVEN user is on Book store page`, async () => {
      await bookStorePage.open();
      await bookStorePage.verifyPageOpened();
    });
  });

  test("should not have a11 issues on Book store page", async ({ a11 }) => {
    await test.step(`THEN all elements must be accessible`, async () => {
      await a11.scan();
    });
  });

  test("should not have a11 issues on Book table", async ({ a11, axe }) => {
    //To demonstrate ability to scan component (part of the page)
    await test.step(`THEN all elements in Search box block must be accessible`, async () => {
      axe.include("#searchBox-wrapper");
      await a11.scan();
    });
  });

  test("should not have a11 issues except known", async ({ a11, axe }) => {
    //To demonstrate ability to scan component disabling some rules
    await test.step(`AND accessibility engine configured to do not count color-contrast rules`, async () => {
      axe.disableRules("color-contrast");
    });
    await test.step(`THEN all elements in Search box block must be accessible`, async () => {
      axe.include("#searchBox-wrapper");
      await a11.scan();
    });
    
  });
});
