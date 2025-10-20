import { Page } from "@playwright/test";
import { error } from "console";

// Generate random email
export function generateRandomEmail(baseEmail: string): string {
  const part = baseEmail.split("@");
  const name = part[0];
  const domain = part[1];
  //const [name, domain] = baseEmail.split('@');
  return `${name}+${Date.now()}@${domain}`;
}

export function generateRandomCoupen(baseName: string): string {
  const randomNumber = Math.floor(10000 + Math.random() * 90000); // 5-digit random number
  return `${baseName}${randomNumber}`;
}

export function generateRandomProductName(baseName: string): string {
  const randomNumber = Math.floor(10000 + Math.random() * 90000); // 5-digit random number
  return `${baseName}${randomNumber}`;
}

export function generateRandomSKU(baseSKU: string): string {
    return `${baseSKU}-${Math.floor(Math.random() * 10000)}`;
}
export function generateRandomUrlkey(baseURL:string): string {
      return `${baseURL}-${Math.floor(Math.random() * 10000)}`;
}




export function getFormattedDate(daysFromToday: number): string {
  const today = new Date();
  today.setDate(today.getDate() + daysFromToday);
 
  // Format as "Wed Sep 18"
  return today.toLocaleDateString("en-US", {
    weekday: "short",  // Mon, Tue, Wed
    month: "short",    // Jan, Feb, Mar
    day: "2-digit"     // 01, 02, 18
  }).replace(",", "");
}
 



export async function findRecordAndClick(page: Page, recordtext: string) {
  while (true) {
    const rows = page.getByRole("row", { name: recordtext });

    if ((await rows.count()) > 0) {
      await rows.first().getByRole("link").click();
      break;
    }
    const nextButton = page.locator(".next");
    if (!(await nextButton.isVisible())) {
      throw  error(`record not found`);
    }
    await nextButton.click();
    await page.waitForTimeout(1000);
  }
}

export function getFutureDate(daysForToday: number): {
  month: string;
  day: number;
} {
  const date = new Date();
  date.setDate(date.getDate() + daysForToday);
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  return { month, day };
}

export async function selectdate(
  page: Page,
  daysFromToday: number,
  isEndDate: boolean = false
) {
  const target = getFutureDate(daysFromToday);
  const targetlabel = `${target.month} ${target.day}`;
  //August 26
  console.log("@@@@@Debug@@@@@@@");
  console.log(target.month);
  console.log(target.day);

  const calendar = page.locator(".flatpickr-calendar.open");
  const nextBtn = isEndDate
    ? calendar.locator(".flatpickr-next-month").first()
    : page.locator(".flatpickr-next-month").nth(1);

  // const nextBtn = page.locator('.flatpickr-next-month').nth(1);

  const targetLocator = calendar.getByLabel(targetlabel);
  if (await targetLocator.count()) {
    await targetLocator.first().click();
    return;
  }
  for (let i = 0; i < 12; i++) {
    await nextBtn.click();
    if (await targetLocator.count()) {
      await targetLocator.first().click();
      return;
    }
  }
  throw new Error("date not found");
}
