import { expect, Locator, Page } from "@playwright/test";
import { BookDto } from "framework/dto/Book.dto";
import { BaseFragment } from "../BaseFragment";

//Represents 1 row in table
export class BookSummaryFragment extends BaseFragment {
  // Locators
  // Note that we are using fragment's method locator to search only children elements of this fragment
  readonly avatar: Locator = this.locator("img");
  readonly productTitle: Locator = this.locator("a");
  // No 'good' locators are available for these elements. Ideal approach is to ask developers to add data-testid attributes
  readonly author: Locator = this.findByClass("div", "rt-td").nth(2);
  readonly publisher: Locator = this.findByClass("div", "rt-td").nth(3);

  constructor(page: Page, index: number) {
    super(page, page.locator('//div[@class="rt-tr-group"]').nth(index));
  }

  //This fragment is shown on 2 pages, so make sense to hide assertions here to do not repeat in different tests
  public async verifyBook(expectedBook: BookDto) {
    await expect.soft(this.avatar).toHaveAttribute("src", expectedBook.image);
    await expect.soft(this.productTitle).toHaveText(expectedBook.title);
    await expect.soft(this.productTitle).toHaveAttribute("href", `/books?book=${expectedBook.isbn}`);
    await expect.soft(this.author).toHaveText(expectedBook.author);
    await expect.soft(this.publisher).toHaveText(expectedBook.publisher);
  }
}
