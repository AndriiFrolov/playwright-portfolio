import { test, expect } from "framework/fixtures/ObjectFixture";
import { NOT_SIGNED_IN_STATE } from "framework/utils/Constants";

test.describe(`Books tests`, () => {
  test.beforeEach(async ({ bookStorePage }) => {
    await bookStorePage.open();
    await bookStorePage.verifyPageOpened();
  });

  test("should be able to see a book summary", async ({ testDataProvider, bookStorePage }) => {
    const bookForTest = testDataProvider.getBook();
    await bookStorePage.getBookRow(0).verifyBook(bookForTest);
  });

  test("should be able to see a book details", async ({ testDataProvider, bookStorePage, bookDetailsPage }) => {
    const bookForTest = testDataProvider.getBook();
    await bookStorePage.getBookRow(0).productTitle.click();
    await bookDetailsPage.verifyPageOpenedFor(bookForTest.isbn);

    await expect(bookDetailsPage.isbn).toHaveText(bookForTest.isbn.toString());
    await expect(bookDetailsPage.title).toHaveText(bookForTest.title);
    await expect(bookDetailsPage.subtitle).toHaveText(bookForTest.subTitle);
    await expect(bookDetailsPage.author).toHaveText(bookForTest.author);
    await expect(bookDetailsPage.publisher).toHaveText(bookForTest.publisher);
    await expect(bookDetailsPage.pages).toHaveText(bookForTest.totalPages.toString());
    await expect(bookDetailsPage.description).toHaveText(bookForTest.description);
    await expect(bookDetailsPage.website).toHaveText(bookForTest.website);
  });

  test("should be able to add book to collection", async ({ profilePage, bookDetailsPage, testDataProvider }) => {
    const bookForTest = testDataProvider.getBook();

    await bookDetailsPage.openFor(bookForTest.isbn);
    await bookDetailsPage.addToCollectionBtn.click();

    await profilePage.open();
    await profilePage.getBookRow(0).verifyBook(bookForTest);
  });
});
