import { Locator, Page } from "@playwright/test";
import { BaseFragment } from "../BaseFragment";

export class ChooseTheBook extends BaseFragment{
    constructor(page: Page, title: string, deleteSelector:string = ''){
        let linkLocator: Locator;
        if (deleteSelector){
            linkLocator = page.locator(`//span[contains(@id, "${title}")]${deleteSelector}`);
            
        }
        else{
            linkLocator = page.locator(`//span[contains(@id, "${title}")]`);
        }
        super(page, linkLocator);
    }
    async click(): Promise<void> {
        await this.rootLocator.click();
    }
}
