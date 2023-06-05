import { expect, Locator, Page } from "@playwright/test";

export class BasePage {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
    this.title = this.page.locator("h1");
  }

  //locators
  readonly title: Locator;

  //methods
  pageUrl(): string {
    return ''
  }

  async open(): Promise<void> {
    await this.page.goto(this.pageUrl());
  }

  async verifyPageOpened(): Promise<void> {
    await this.page.waitForLoadState();
    await this.verifyURL();
  }

  async verifyURL(): Promise<void> {
    await expect.soft(this.page).toHaveURL(this.pageUrl());
  }
}