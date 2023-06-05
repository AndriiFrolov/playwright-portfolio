import { Locator, Page } from "@playwright/test";
import { BasePage } from "framework/pages/BasePage";

export class BookDetailsPage extends BasePage {
  productIsbn = "";

  //locators
  readonly isbn: Locator = this.page.locator("//div[@id='ISBN-wrapper']//label").last();
  readonly title: Locator = this.page.locator("//div[@id='title-wrapper']//label").last();
  readonly subtitle: Locator = this.page.locator("//div[@id='subtitle-wrapper']//label").last();
  readonly pages: Locator = this.page.locator("//div[@id='pages-wrapper']//label").last();
  readonly description: Locator = this.page.locator("//div[@id='description-wrapper']//label").last();
  readonly website: Locator = this.page.locator("//div[@id='website-wrapper']//label").last();
  readonly author: Locator = this.page.locator("//div[@id='author-wrapper']//label").last();
  readonly publisher: Locator = this.page.locator("//div[@id='publisher-wrapper']//label").last();

  readonly addToCollectionBtn: Locator = this.page.getByRole("button", { name: "Add To Your Collection" });

  //methods
  async openFor(productIsbn: string): Promise<void> {
    this.productIsbn = productIsbn;
    await super.open();
  }

  async verifyPageOpenedFor(productIsbn: string): Promise<void> {
    this.productIsbn = productIsbn;
    await super.verifyPageOpened();
  }

  pageUrl(): string {
    return `/books?book=${this.productIsbn}`;
  }
}
