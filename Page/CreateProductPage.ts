import { Page, expect } from "@playwright/test";
import { BasePages } from "../Page/BasePage";

export class AdminProductPage extends BasePages {
  constructor(page: Page) {
    super(page);
  }

   get Locators() {
    return {
      emailInput: this.page.getByRole("textbox", { name: "Email" }),
      passwordInput: this.page.getByRole("textbox", { name: "Password" }),
      signInButton: this.page.getByRole("button", { name: "SIGN IN" }),

      productsLink: this.page.getByRole("link", { name: "Products", exact: true }),
      newProductLink: this.page
        .locator("div")
        .filter({ hasText: /^New Product$/ })
        .getByRole("link"),

        ProductName:(ProdName: string)=>
          this.page.getByRole('link', { name: ProdName }),



      nameInput: this.page.getByRole("textbox", { name: "Name" }),
      skuInput: this.page.getByRole("textbox", { name: "SKU" }),
      priceInput: this.page.getByRole("textbox", { name: "Price" }),
      weightInput: this.page.getByRole("textbox", { name: "Weight" }),

      urlKeyInput: this.page.locator("#urlKey"),
      metaTitleInput: this.page.locator("#metaTitle"),
      metaKeywordsInput: this.page.locator("#metaKeywords"),
      metaDescriptionInput: this.page.getByRole("textbox", { name: "Meta description" }),

      fileInput: this.page.locator('input[type="file"]'),
      uploadedImage: this.page.locator("#images div").first(),
     Deleteicon: this.page.getByRole('img').nth(2),

      attributesHeader: this.page.getByRole("heading", { name: "Attributes" }),
      colorCell: this.page.getByRole("cell", { name: "Color" }),
      sizeCell: this.page.getByRole("cell", { name: "Size" }),

      colorSelect: this.page.locator('select[name="attributes[0][value]"]'),
      sizeSelect: this.page.locator('select[name="attributes[1][value]"]'),
      quantityselect: this.page.getByRole('textbox', { name: 'Quantity' }),

      saveButton: this.page.getByRole("button", { name: "Save" }),
    } as const;
  }



  async login(email: string, password: string) {
    await this.Locators.emailInput.fill(email);
    await this.Locators.passwordInput.fill(password);
    await this.Locators.signInButton.click();
  }

  async openNewProductForm() {
    await expect(this.Locators.productsLink).toBeEnabled();
    await this.Locators.productsLink.click();
    await expect(this.Locators.newProductLink).toBeVisible();
    await this.Locators.newProductLink.click();
  }

  async UpdateProductName(ProductName:string,UpdatedProdyctName:string) {
    await expect(this.Locators.productsLink).toBeEnabled();
    await this.Locators.productsLink.click();
    await this.Locators.ProductName(ProductName).click()
    await this.Locators.nameInput.fill(UpdatedProdyctName);
    await expect(this.Locators.saveButton).toBeEnabled()
    await this.Locators.saveButton.click();
  }

  async UpdateProductImage(ProductName:string,filePath:string)
  {

    await expect(this.Locators.productsLink).toBeEnabled();
    await this.Locators.productsLink.click();
    await this.Locators.ProductName(ProductName).click()
    await this.Locators.Deleteicon.click();
    await this.Locators.fileInput.setInputFiles(filePath);
    await expect(this.Locators.uploadedImage).toBeVisible();
    await this.Locators.saveButton.click();



  }



  async fillProductDetails(ProductName: string,
    SKU: string,
    ProductPrice: string,
    productweight: string,
    URLkey: string,
    Metatitle: string,
    metaKeywords: string,
    metaDescription: string
  ) {
    await this.Locators.nameInput.fill(ProductName);
    await this.Locators.skuInput.fill(SKU);
    await this.Locators.priceInput.fill(ProductPrice);
    await this.Locators.weightInput.fill(productweight);
    await this.Locators.urlKeyInput.fill(URLkey);
    await this.Locators.metaTitleInput.fill(Metatitle);
    await this.Locators.metaKeywordsInput.fill(metaKeywords);
    await this.Locators.metaDescriptionInput.fill(metaDescription);
  }

  async uploadImage(filePath: string) {
    await this.Locators.fileInput.setInputFiles(filePath);
    await expect(this.Locators.uploadedImage).toBeVisible();
  }

  async validateAttributesVisible() {
    await expect(this.Locators.attributesHeader).toBeVisible();
    await expect(this.Locators.colorCell).toBeVisible();
    await expect(this.Locators.sizeCell).toBeVisible();
  }

  async selectAttributes(quantity:string,color: string, size: string) {
    await this.Locators.quantityselect.click()
    await this.Locators.quantityselect.fill(quantity)

    await this.Locators.colorSelect.selectOption({ label: color });
    await this.Locators.sizeSelect.selectOption({ label: size });
  }

  async saveProduct() {
    await expect(this.Locators.saveButton).toBeEnabled()
    await this.Locators.saveButton.click();
  }

  async handleDialogOnSave() {
    this.page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
  }
}

