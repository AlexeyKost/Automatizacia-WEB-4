let page;
beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Let’s build from here · GitHub");
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 70000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 80000);
});

test("The h1 header content About page", async () => {
  await page.goto("https://github.com/about");
  await page.$("header div div a");
  await page.waitForSelector("h1");
  const title2 = await page.title();
  expect(title2).toEqual("About · GitHub");
}, 60000);

test("The h1 header content Skills page", async () => {
  await page.goto("https://skills.github.com/");
  await page.$("header div div a");
  await page.waitForSelector("h1");
  const title2 = await page.title();
  expect(title2).toEqual("GitHub Skills");
}, 60000);

test("The h1 header content Services page", async () => {
  await page.goto("https://github.com/services/");
  await page.$("header div div a");
  await page.waitForSelector("h1");
  const title2 = await page.title();
  expect(title2).toEqual("Expert Services | GitHub · GitHub");
}, 60000);
