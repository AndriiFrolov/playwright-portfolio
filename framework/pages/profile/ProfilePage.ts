import test, { Locator, Page } from "@playwright/test";
import { BasePage } from "framework/pages/BasePage";
import { BookSummaryFragment } from "../bookstore/BookSummaryFragment";
import { ChooseTheBook } from "../profile/ChooseTheBook";

export class ProfilePage extends BasePage {

  //locators
  readonly logOutBtn: Locator = this.page.getByRole("button", { name: "Log out" });
  readonly goToBookStoreBtn: Locator = this.page.locator("id=gotoStore");
  readonly deleteConfirmBtn: Locator = this.page.locator("//button[@id='closeSmallModal-ok']");

  //fragments
  public getBookRow(index: number): BookSummaryFragment {
    return new BookSummaryFragment(this.page, index);
  }
  public getBookLink(title: string, deleteSelector: string): ChooseTheBook {
    return new ChooseTheBook(this.page, title, deleteSelector);
  }

  //methods
  pageUrl(): string {
    return "/profile";
  }
  
}
