import { Locator, Page } from '@playwright/test';

/**
 * Fragment is part of the page. Use cases:
 * - Some repeated block of elements that shared across several pages
 * - If you have large page, make sense to divide into logical parts (fragments)
 * - Logical repeated block of elements, e.g. in Wallet you can add few credit cards. Each of them is shown like a block with same elements inside
 * 
 * Note: Fragments will find only child elements (inside root locator)
 */
export class BaseFragment {
  public page: Page;
  public rootLocator: Locator;

  constructor(page: Page, locator: Locator) {
    this.page = page;
    this.rootLocator = locator;
  }

  protected locator(loc: string): Locator {
    if (this.rootLocator === undefined) {
      return this.page.locator(loc);
    }

    return this.rootLocator.locator(loc);
  }

  protected findByClass(element: string, className: string) {
    return this.locator(`//${element}[contains(@class, "${className}")]`);
  }

  async fillSymbols(symbols: string): Promise<void> {
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols.charAt(i);
      await this.page.keyboard.press(symbol);
    }
  }

  async fillSymbolsInElement(locator: Locator, symbols: string): Promise<void> {
    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols.charAt(i);
      await locator.press(symbol);
    }
  }
}
