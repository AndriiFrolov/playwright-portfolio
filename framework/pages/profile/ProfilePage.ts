import { Locator, Page } from "@playwright/test";
import { BasePage } from "framework/pages/BasePage";
import { BookSummaryFragment } from "../bookstore/BookSummaryFragment";

export class ProfilePage extends BasePage {

  //locators
  readonly logOutBtn: Locator = this.page.getByRole("button", { name: "Log out" });
  readonly goToBookStoreBtn: Locator = this.page.locator("id=gotoStore");

  //fragments
  public getBookRow(index: number): BookSummaryFragment {
    return new BookSummaryFragment(this.page, index);
  }

  //methods
  pageUrl(): string {
    return "/profile";
  }
}
