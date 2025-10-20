import { Page, Locator, expect } from '@playwright/test';
import { BasePages } from "../Page/BasePage";

//npm install --save-dev @cucumber/cucumber

export class CoupenPage1 extends BasePages {
    constructor(page: Page) {
        super(page);
    }


    private get Locators() {
        return {

            newCouponLink: this.page.getByRole('link', { name: 'New Coupon' }),
            couponCodeInput: this.page.getByRole('textbox', { name: 'Enter coupon code' }),
            descriptionInput: this.page.getByRole('textbox', { name: 'Description' }),
            discountAmountInput: this.page.getByRole('textbox', { name: 'Discount amount' }),
            startDateInput: this.page.getByRole('textbox', { name: 'Start date' }),
            startDatePicker: (dateLabel: string) =>
                this.page.getByLabel(dateLabel).first(),
            //  startDatePicker : this.page.getByLabel('September 15,').first(),

            endDatePicker: (dateLabel1: string) =>
                this.page.getByLabel(dateLabel1).nth(1),
            endDateInput: this.page.getByRole('textbox', { name: 'End date' }),
            //endDatePicker: this.page.getByLabel('September 23,').nth(1),
            fixedDiscountRadio: this.page.locator('label').filter({ hasText: 'Fixed discount to entire order' }).locator('span').first(),
            minPurchaseAmountInput: this.page.getByRole('textbox', { name: 'Enter minimum purchase amount' }),
            minPurchaseQtyInput: this.page.getByRole('textbox', { name: 'Enter minimum purchase qty' }),
            saveButton: this.page.getByRole('button', { name: 'Save' }),
            successMessage: this.page.getByText('Coupon saved successfully!'),
        } as const;
    }

    // Actions
    async createCoupon(coupenName: string, 
        Description: string, 
        discountamount: string,
        startDate:string,
        EndDate:string,
        minpurchaseamount:string,
        minPurchaseQtyInput:string
    ) {
        await this.Locators.newCouponLink.click();

        await this.Locators.couponCodeInput.click();
        await this.Locators.couponCodeInput.fill(coupenName);

        await this.Locators.descriptionInput.click();
        await this.Locators.descriptionInput.fill(Description);

        await this.Locators.discountAmountInput.click();
        await this.Locators.discountAmountInput.fill(discountamount);

        await this.Locators.startDateInput.click();
        await this.Locators.startDatePicker(startDate).click();
        //await this.Locators.startDateInput.fill('2025-09-15');

        await this.Locators.endDateInput.click();
        await this.Locators.endDatePicker(EndDate).click();
        //await this.Locators.endDateInput.fill('2025-09-23');

        await this.Locators.fixedDiscountRadio.click();

        await this.Locators.minPurchaseAmountInput.click();
        await this.Locators.minPurchaseAmountInput.fill(minpurchaseamount);

        await this.Locators.minPurchaseQtyInput.click();
        await this.Locators.minPurchaseQtyInput.fill(minPurchaseQtyInput);

        await this.Locators.saveButton.click();
        await expect(this.Locators.successMessage).toBeVisible({timeout:8000})
    }
}
