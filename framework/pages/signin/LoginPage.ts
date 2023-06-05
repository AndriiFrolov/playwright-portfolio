import { Locator, Page } from "@playwright/test";
import { BasePage } from "framework/pages/BasePage";

export class LoginPage extends BasePage {
  //locators
  readonly userNameInput: Locator = this.page.locator("id=userName");
  readonly passwordInput: Locator = this.page.locator("id=password");
  readonly submitBtn: Locator = this.page.locator("id=login");
  readonly validationMessage: Locator = this.page.locator("id=name");

  //methods
  public async login(username: string, password: string): Promise<void> {
    console.log(`Attemting to login with credentials page ${username}, ${password}`);
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitBtn.click();
  }

  pageUrl(): string {
    return "/login";
  }
}
