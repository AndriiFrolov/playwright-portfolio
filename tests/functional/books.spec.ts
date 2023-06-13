import { test, expect } from "framework/fixtures/ObjectFixture";
import { NOT_SIGNED_IN_STATE } from "framework/utils/Constants";

test.describe(`Books tests`, () => {
  test.beforeEach(async ({ bookStorePage }) => {
    await test.step(`GIVEN user is on Book store page`, async () => {
      await bookStorePage.open();
      await bookStorePage.verifyPageOpened();
    });
  });

  test("should be able to see a book summary @smoke", async ({ testDataProvider, bookStorePage }) => {
    const bookForTest = testDataProvider.getBook();
    await test.step(`THEN user should see Book summary right on Book store page`, async () => {
      await bookStorePage.getBookRow(0).verifyBook(bookForTest);
    });
  });

  test("should be able to see a book details", async ({ testDataProvider, bookStorePage, bookDetailsPage }) => {
    const bookForTest = testDataProvider.getBook();
    await test.step(`WHEN user selects a book`, async () => {
      await bookStorePage.getBookRow(0).productTitle.click();
    });

    await test.step(`THEN Book details page should be opened`, async () => {
      await bookDetailsPage.verifyPageOpenedFor(bookForTest.isbn);
    });

    await test.step(`AND book details must be shown`, async () => {
      await expect(bookDetailsPage.isbn).toHaveText(bookForTest.isbn.toString());
      await expect(bookDetailsPage.title).toHaveText(bookForTest.title);
      await expect(bookDetailsPage.subtitle).toHaveText(bookForTest.subTitle);
      await expect(bookDetailsPage.author).toHaveText(bookForTest.author);
      await expect(bookDetailsPage.publisher).toHaveText(bookForTest.publisher);
      await expect(bookDetailsPage.pages).toHaveText(bookForTest.totalPages.toString());
      await expect(bookDetailsPage.description).toHaveText(bookForTest.description);
      await expect(bookDetailsPage.website).toHaveText(bookForTest.website);
    });
  });

  test("should be able to add book to collection", async ({ profilePage, bookDetailsPage, testDataProvider }) => {
    const bookForTest = testDataProvider.getBook();

    await test.step(`WHEN user opens Book Details page for book ${bookForTest.title}`, async () => {
      await bookDetailsPage.openFor(bookForTest.isbn);
    });

    await test.step(`AND adds book to collection`, async () => {
      await bookDetailsPage.addToCollectionBtn.click();
    });

    await test.step(`THEN he is redirected to Profile page`, async () => {
      await profilePage.open();
    });

    await test.step(`AND sees that Book was added to collection`, async () => {
      await profilePage.getBookRow(0).verifyBook(bookForTest);
    });
  });
});
