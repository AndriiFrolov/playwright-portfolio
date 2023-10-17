import { Locator, Page } from "@playwright/test";
import { BaseFragment } from "../BaseFragment";

export class BookRow extends BaseFragment{
    readonly deleteBtn: Locator = this.locator('//ancestor::div[@role="rowgroup"]//span[@title="Delete"]');
    constructor(page: Page, title: string){
        super(page, page.locator(`//span[contains(@id, "${title}")]`))
    }
    async click(): Promise<void> {
        await this.rootLocator.click();
    }
}
