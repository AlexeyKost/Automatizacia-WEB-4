let page;

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });

  afterEach(() => {
    page.close();
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual(
      "GitHub for teams · Build like the best teams on the planet · GitHub"
    );
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  });
});

describe("GitHub titles tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/");
  });

  afterEach(() => {
    page.close();
  });

  test("Sign in page title test", async () => {
    await page.click(".btn-mktg.width-full");
    await page.waitForTimeout(1000);
    const title = await page.title();
    expect(title).toEqual("Join GitHub · GitHub");
  });

  test("Pricing page title test", async () => {
    await page.click(
      "body > div.logged-out.env-production.page-responsive.header-overlay.home-campaign > div.application-main > main > div:nth-child(1) > div.px-3.home-campaign-hero > div > div > div.col-11.text-left.pt-12.mt-12.pl-2.pl-sm-0 > div.d-flex.flex-column.flex-md-row > a"
    );
    await page.waitForTimeout(1000);
    const title = await page.title();
    expect(title).toEqual("Choose an Enterprise plan · GitHub");
  });

  test("Sponsors page title test", async () => {
    await page.click(
      "#collaboration > div > div.overflow-hidden.rounded-3.mb-3.mb-md-5.home-skew.js-home-skew > div > div.d-md-flex.flex-column.flex-1.p-5.p-sm-6.py-lg-8.pl-lg-8.pr-lg-12.col-md-6.flex-justify-between > div > a"
    );
    await page.waitForTimeout(1000);
    const title = await page.title();
    expect(title).toEqual("GitHub Sponsors · GitHub");
  });
});
