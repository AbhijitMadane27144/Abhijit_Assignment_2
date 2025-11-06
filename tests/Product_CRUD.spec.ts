import { test } from "../fixtures/POMfixture"
import { ENV } from "./utils/env";
import { generateRandomProductName, generateRandomEmail, generateRandomUrlkey } from "./utils/helper";
import { generateRandomSKU } from './utils/helper';
import {getDBConnection} from './utils/dbConnection'

import testData from "./data/testData.json";
import { expect } from "@playwright/test";



test.describe("Assignment 2 CRUD Demo", () => {

    const randomEmail = generateRandomEmail(testData.user.email);
    const randomProductName = generateRandomProductName(testData.ProductData.Name)
    const randomUrlkey = generateRandomUrlkey(testData.ProductData.URLkey)
    const randomSKU = generateRandomSKU(testData.ProductData.SKU)
    const UpdatedrandomProductName = generateRandomProductName(testData.ProductData.Name)



    test("New Product Creation @UI", async ({ page, signupPage, AdminLogin, CreateProduct }) => {
        

        // Register New User
        await signupPage.navigate(ENV.baseURL);
        await signupPage.openNewCustomerForm();
        await signupPage.registerNewUser(
            testData.user.name,
            randomEmail,
            testData.user.password);

        //Admin login
        await AdminLogin.navigate(ENV.adminURL);
        await AdminLogin.loginAsAdmin(testData.admin.email,
            testData.admin.password)

        //new Product Creation

        await CreateProduct.openNewProductForm();
        await CreateProduct.fillProductDetails(randomProductName,
            randomSKU,
            testData.ProductData.Price,
            testData.ProductData.Weight,
            randomUrlkey, testData.ProductData.metaTitle,
            testData.ProductData.metaKeywords,
            testData.ProductData.metaDescription,
        );
        await CreateProduct.uploadImage(testData.ProductData.filePath);
        await CreateProduct.validateAttributesVisible();
        await CreateProduct.selectAttributes(testData.ProductData.quantity,
            testData.ProductData.colorselection,
            testData.ProductData.sizeselection);
        await CreateProduct.handleDialogOnSave();
        await CreateProduct.saveProduct();
        await page.waitForTimeout(2000);
        await page.waitForTimeout(2000);

    })

    test("Update Product Name @UI", async ({  AdminLogin, CreateProduct }) => {

               //Admin login
        await AdminLogin.navigate(ENV.adminURL);
        await AdminLogin.loginAsAdmin(testData.admin.email,
            testData.admin.password)

        //new Product Creation

       
        // Update Product Name
        const updatingname = randomProductName;
        await CreateProduct.UpdateProductName(updatingname, UpdatedrandomProductName);
    })


    test("Update Product Image @UI", async ({ AdminLogin, CreateProduct }) => {

        //Admin login
        await AdminLogin.navigate(ENV.adminURL);
        await AdminLogin.loginAsAdmin(testData.admin.email,
            testData.admin.password)

        
        // Update Product Image*/
        const updatingname1 = UpdatedrandomProductName;

        await CreateProduct.UpdateProductImage(updatingname1, testData.ProductData.filePath1);

    })

    test("TC04 - Database Verification @DB", async () => {
    console.log(`Verifying product in database: ${UpdatedrandomProductName}`);
 
    const connection = await getDBConnection();
 
    try {
      console.log("Discovering database schema...");
 
      // Get all product-related tables
      const productTables = await connection.execute(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE '%product%'"
      );
      console.log("Product-related tables:", productTables);
 
      // For each product table, get its columns
      for (const table of productTables) {
        const tableName = table.table_name;
        const columns = await connection.execute(
          "SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = $1 ORDER BY ordinal_position",
          [tableName]
        );
        console.log(`Table: ${tableName}`, columns);
      }
 
      let rows: any[] = [];
 
      const queryAttempts = [
        `
      SELECT pd.name, p.price, p.sku
      FROM public.product_description pd
      JOIN public.product p ON pd.product_id = p.product_id
      WHERE pd.name = $1
      `,
        // If price is in product_description
        `
      SELECT name, price, sku FROM public.product_description WHERE name = $1
      `,
        // If using a single products table
        `
      SELECT name, price, sku FROM public.products WHERE name = $1
      `,
        // If different column names
        `
      SELECT name, cost, sku FROM public.product_description WHERE name = $1
      `,
        // Minimal query - just verify the name exists
        `
      SELECT name FROM public.product_description WHERE name = $1
      `,
      ];
 
      for (const query of queryAttempts) {
        try {
          console.log("Trying query:", query);
          rows = await connection.execute(query, [UpdatedrandomProductName]);
          if (rows.length > 0) {
            console.log("✅ Query succeeded! Found product:", rows[0]);
            break;
          }
        } catch (error) {
          console.log("Query failed, trying next one...");
          continue;
        }
      }
 
      // Step 3: Verify the product exists
      expect(rows.length).toBeGreaterThan(0);
      expect(rows[0].name).toBe(UpdatedrandomProductName);
 
      console.log("✅ Database verification completed successfully");
      console.log("Product details from database:", rows[0]);
 
      // Step 4: Additional verification if price column exists
      if (rows[0].price !== undefined) {
        console.log("Price found:", rows[0].price);
        // You can add price validation here if needed
      }
 
      if (rows[0].sku !== undefined) {
        console.log("SKU found:", rows[0].sku);
      }
    } catch (error) {
      console.error("❌ Database verification failed:", error);
      throw error;
    } finally {
      await connection.end();
    }
  });
});
 



