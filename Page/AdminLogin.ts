import { Page, expect } from "@playwright/test";
import { BasePages } from "../Page/BasePage";

export class AdminPage extends BasePages {
  constructor(page: Page) {
    super(page);
  }

  private get Locators() {
    return {
      adminEmailInput: this.page.getByRole('textbox', { name: 'Email' }),
      adminPasswordInput: this.page.getByRole('textbox', { name: 'Password' }),
      adminSigninButton: this.page.getByRole('button', { name: 'SIGN IN' }),
      customersLink: this.page.getByRole('link', { name: "Customers" }),

    } as const
  }

  async loginAsAdmin(email: string, password: string) {

    await this.Locators.adminEmailInput.fill(email);
    await this.Locators.adminPasswordInput.fill(password);
    await expect(this.Locators.adminSigninButton).toBeEnabled()
    await this.Locators.adminSigninButton.click();
    await expect(this.Locators.customersLink).toBeVisible();
    await expect(this.page).toHaveURL(/.*\/admin/);
  }
}
