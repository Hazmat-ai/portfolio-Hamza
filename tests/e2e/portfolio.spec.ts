import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() =>
    sessionStorage.setItem("convergence-intro-seen-v1", "true"),
  );
});
test("white default, saved dark mode, tabs, case preview and document pages", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator("#panel-cs [data-project]")).toHaveCount(14);
  await page
    .getByRole("button", { name: "Switch to dark theme", exact: true })
    .click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.locator('[data-project="smart-write"]').click();
  await expect(
    page.getByRole("dialog", { name: "Smart Write", exact: true }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator('[data-project="smart-write"]')).toBeFocused();
  await page
    .getByRole("tab", { name: "UX Design", exact: true })
    .first()
    .click();
  await page.locator('[data-project="wellness"]').click();
  await page
    .getByRole("button", {
      name: "Preview Wellness Hero - Design Sprint ↗",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("dialog", {
      name: "Wellness Hero - Design Sprint",
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Next →", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Page 2 of 20");
  await page.keyboard.press("Escape");
  await page.keyboard.press("Escape");
  await page.locator("#tab-ux").focus();
  await page.keyboard.press("End");
  await expect(page.locator("#tab-resume")).toBeFocused();
  await expect(page.locator("#panel-resume")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("project routes, missing project and automated accessibility", async ({
  page,
}) => {
  for (const slug of ["studymind", "mood-picker", "lotus"]) {
    await page.goto(`/projects/${slug}`);
    await expect(page.locator("h1")).toBeVisible();
  }
  await page.goto("/projects/not-a-real-project");
  await expect(
    page.getByRole("heading", { name: "That page doesn’t exist." }),
  ).toBeVisible();
  await page.goto("/");
  for (const key of ["cs", "ux", "resume"]) {
    await page.locator(`#tab-${key}`).click();
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.filter((v) =>
        ["critical", "serious"].includes(v.impact ?? ""),
      ),
    ).toEqual([]);
  }
});
test("replay uses the right rendition, full white ending, skip restores focus", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  await page.locator("#motionButton").click();
  const video = page.locator(".intro video");
  const intro = page.getByRole("dialog", {
    name: "Computer Science and UX Design intro",
    exact: true,
  });
  // An opaque native backdrop would hide the page until the dialog unmounts.
  expect(
    await intro.evaluate(
      (node) => getComputedStyle(node, "::backdrop").backgroundColor,
    ),
  ).toBe("rgba(0, 0, 0, 0)");
  await expect(video).toHaveJSProperty("muted", true);
  await expect(video).toHaveJSProperty("paused", false);
  await expect(video).toHaveAttribute(
    "src",
    testInfo.project.name === "phone"
      ? "/convergence/intro-mobile.mp4"
      : "/convergence/intro-study.mp4",
  );
  // Check that the rendered overlay actually dissolves before it disappears.
  await expect
    .poll(
      () => intro.evaluate((node) => Number(getComputedStyle(node).opacity)),
      { timeout: 18000 },
    )
    .toBeLessThan(0.98);
  await expect(intro).toBeHidden({ timeout: 22000 });
  await expect(page.locator("#motionButton")).toBeFocused();
  await page.locator("#motionButton").click();
  await page.keyboard.press("Escape");
  await expect(page.locator("#motionButton")).toBeFocused();
});
