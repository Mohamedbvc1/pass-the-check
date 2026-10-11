import puppeteer from "puppeteer";
import {
  AhsFacility,
  connectDatabase,
  disconnectDatabase,
} from "../database.js";
import { timeout } from "puppeteer";

async function startScrape() {
  const browser = await puppeteer.launch({
    headless: false,
  });

  let crawelAgain = true;

  let isDisabled = false;

  const page = await browser.newPage();

  await page.goto(
    "https://ephisahs.albertahealthservices.ca/inspections/food/",
    { waitUntil: ["domcontentloaded", "networkidle0"] },
    { timeout: 80000 }
  );

  const btn = await page.waitForSelector(
    "body > div.container > div.row > div > div > div.entity-grid.entitylist > div.view-toolbar.grid-actions.clearfix > div > div > div > button"
  );

  await page.type(
    "body > div.container > div.row > div > div > div.entity-grid.entitylist > div.view-toolbar.grid-actions.clearfix > div > div > input",
    "calgary",
    { delay: 100 }
  );

  await btn.click(
    { waitUntil: ["domcontentloaded", "networkidle0"] },
    { timeout: 80000 }
  );

  crawelAgain = true;

  while (crawelAgain) {
    await page.waitForSelector(
      "body > div.container > div.row > div > div > div.entity-grid.entitylist > div.view-grid.has-pagination > table > tbody > tr:nth-child(1) > td:nth-child(1) > a"
    );

    const result = await page.evaluate(() => {
      const data = Array.from(
        document.querySelectorAll(
          "tr[data-id]",
          "tr[data-name]",
          "td[data-attribute]"
        )
      ).map((e) => {
        return e.innerHTML;
      });

      return data;
    });

    // console.log(result);
    const finalData = result.map((e) => {
      const facilityid = e.match(/facilitydetails\/\?id=(.*?)\/?" class/)[1];
      const name = e.match(/"name" data-value="(.*?)" aria/)[1];
      const address = e.match(/data-th="Address" aria-label="(.*?)">/)[1];
      const area = e.match(/data-th="Community" aria-label="(.*?)">/)[1];
      const category = e.match(/"Facility Category" aria-label="(.*?)">/)[1];
      return { facilityid, name, address, area, category };
    });

    console.log("Final Data", finalData);

    const facilities = finalData;

    for (let i = 0; i < facilities.length; i++) {
      const inspection = facilities[i];
      console.log("Facilities", inspection);
      const newFacility = new AhsFacility(inspection);
      await newFacility.save();
    }

    await page.waitForSelector(".entity-pager-next-link");

    await page.click(".entity-pager-next-link", (elm) => elm.click());

    isDisabled =
      (await page.$(".entity-pager-next-link[aria-disabled]")) !== null;

    if (isDisabled) {
      crawelAgain = false;
      await browser.close();
    } else {
    }
    crawelAgain = true;
  }
}

await connectDatabase();
await startScrape();
disconnectDatabase();
