import { test as basetest ,Page} from "@playwright/test";
import { ENV } from "D:/Training Framework/Playwright-Abhijit-Lannister/tests/utils/env";
import { getLocator, applocators } from "D:/Training Framework/Playwright-Abhijit-Lannister/tests/locators/subscription.locator";
import testData from "D:/Training Framework/Playwright-Abhijit-Lannister/tests/data/testData.json";




// 1. Define custom fixtures type
type MyHooksFixtures = {
  loginlogoutfixture: any;
};

// 2. Extend base test with custom fixture
export const test = basetest.extend<MyHooksFixtures>({
  loginlogoutfixture: async({ page }: { page: Page },use:any)=>{
    const loginlogoutfixture = undefined;

    // Perform Login
    await page.goto(ENV.adminURL);

    await getLocator(page, applocators.adminEmailInput).fill(testData.admin.email);
    await getLocator(page, applocators.adminPasswordInput).fill(testData.admin.password);
    await page.getByRole('button', { name: 'SIGN IN' }).click();

    // Provide the fixture value to the test
    await use(loginlogoutfixture);

    // Perform Logout after test is done
    //await page.getByRole('button', { name: 'Open Menu' }).click();
    //await page.getByRole('link', { name: 'Logout' }).click();
  }
});