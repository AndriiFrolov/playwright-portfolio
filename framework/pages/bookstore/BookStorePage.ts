import { Locator, Page } from "@playwright/test";
import { BasePage } from "framework/pages/BasePage";
import { BookSummaryFragment } from "./BookSummaryFragment";
import { ChooseTheBook } from "../profile/ChooseTheBook";

export class BookStorePage extends BasePage {
  url = "/books";

  //locators
  readonly logOutBtn: Locator = this.page.getByRole("button", { name: "Log out" });
  readonly goToBookStoreBtn: Locator = this.page.locator("id=gotoStore");
  readonly bookTitles: Locator = this.page.locator("//span[@class='mr-2']")
  readonly textSearchInput: Locator = this.page.locator("//input[@id='searchBox']");
  readonly chooseTheBook: Locator = this.page.locator("//a[@href='/books?book=9781449331818']");
  readonly addBookToCollection: Locator = this.page.locator("//button[text()='Add To Your Collection']");

  //fragments
  public getBookRow(index: number): BookSummaryFragment {
    return new BookSummaryFragment(this.page, index);
  }

  public getBookLink(title: string): ChooseTheBook {
    return new ChooseTheBook(this.page, title);
  }

  //methods
  pageUrl(): string {
    return "/books";
  }
  getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }
}
