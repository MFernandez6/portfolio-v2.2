/**
 * Capture homepage screenshots for project cards.
 * Usage: node scripts/capture-project-screenshots.js
 */

const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const OUT_DIR = path.join(__dirname, "../public/projects");

const TARGETS = [
  {
    slug: "blackline-public-adjusters",
    url: "https://public-adjuster-v2.vercel.app/",
  },
  {
    slug: "claimsaver-plus",
    url: "https://www.claimsaverplus.com/",
  },
  {
    slug: "fernandez-public-adjusters",
    url: "https://www.fernandezpublicadjusters.com/",
  },
  {
    slug: "river-run-miami",
    url: "https://riverrunmiami.com/",
  },
  {
    slug: "portfolio",
    url: process.env.PORTFOLIO_SCREENSHOT_URL || "http://localhost:3000/",
  },
  {
    slug: "needle-and-knead",
    url: "https://www.needleandknead.net/",
  },
];

async function capture(page, target) {
  console.log(`Capturing ${target.slug}…`);
  await page.goto(target.url, {
    waitUntil: "networkidle2",
    timeout: 90000,
  });
  await new Promise((r) => setTimeout(r, 2500));

  const outPath = path.join(OUT_DIR, `${target.slug}.jpg`);
  await page.screenshot({
    path: outPath,
    type: "jpeg",
    quality: 82,
    fullPage: false,
  });
  console.log(`  → ${outPath}`);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });

  for (const target of TARGETS) {
    try {
      await capture(page, target);
    } catch (err) {
      console.error(`Failed ${target.slug}:`, err.message);
    }
  }

  await browser.close();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
