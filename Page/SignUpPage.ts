import { Page, expect } from "@playwright/test";
import { BasePages } from "../Page/BasePage";

export class SignUpPage extends BasePages {
  constructor(page: Page) {
    super(page);
  }

  private get Locators() {
    return {
      navSignup: this.page.locator(".self-center"),
      linkCreateAccount: this.page.getByRole('link', { name: 'Create an account' }),
      fullNameInput: this.page.getByRole('textbox', { name: 'Full Name' }),
      emailInput: this.page.getByRole('textbox', { name: 'Email' }),
      passwordInput: this.page.getByRole('textbox', { name: 'Password' }),
      signupButton: this.page.getByRole('button', { name: 'SIGN UP' }),

    } as const;
  }


  async openNewCustomerForm() {
    await this.Locators.navSignup.nth(1).click();
    await expect(this.Locators.linkCreateAccount).toBeEnabled();
    await this.Locators.linkCreateAccount.click();
  }

  async registerNewUser(name: string, Email: string, Password: string) {
    await this.Locators.fullNameInput.fill(name);
    await this.Locators.emailInput.fill(Email);
    await this.Locators.passwordInput.fill(Password);
    await expect(this.Locators.signupButton).toBeVisible()
    await this.Locators.signupButton.click();
  }
}



/*
await page.getByRole('progressbar').nth(5).click();    // Unanswerd
await page.getByRole('progressbar').first().click();  // Answerd
await page.getByRole('progressbar').nth(1).click();  //Ready for Review


await page.getByRole('progressbar').nth(4).click(); //Reviewed*/


/*
await page.getByRole('progressbar').first().hover();

expect(await this.page.locator("text=answered")).toBeVisible();*/
