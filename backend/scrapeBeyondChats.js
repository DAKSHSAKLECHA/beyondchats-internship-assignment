const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const Article = require("./models/Article");
require("dotenv").config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for scraper");

    const browser = await puppeteer.launch({
      headless: false, // IMPORTANT (true pe site content load nahi hota)
      defaultViewport: null
    });

    const page = await browser.newPage();

    await page.goto("https://beyondchats.com/blogs/", {
      waitUntil: "networkidle2",
      timeout: 0
    });

    // 🔽 Scroll to load blogs
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 500;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 300);
      });
    });

    // 🧠 Extract blog links correctly
    const blogLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll("a"));
      return links
        .map(a => a.href)
        .filter(
          href =>
            href &&
            href.includes("beyondchats.com/blogs/") &&
            href.split("/blogs/")[1]
        );
    });

    const uniqueLinks = [...new Set(blogLinks)];
    console.log("Blog links found:", uniqueLinks.length);

    if (uniqueLinks.length === 0) {
      console.log("❌ No blogs found even after scroll");
      await browser.close();
      process.exit(0);
    }

    // Oldest 5
    const oldestFive = uniqueLinks.slice(-5);

    for (const link of oldestFive) {
      const exists = await Article.findOne({ sourceUrl: link });
      if (exists) {
        console.log("Already exists, skipping");
        continue;
      }

      await page.goto(link, { waitUntil: "networkidle2", timeout: 0 });

      const data = await page.evaluate(() => {
        const title =
          document.querySelector("h1")?.innerText || "No title";

        const content =
          document.querySelector("article")?.innerText ||
          document.querySelector("main")?.innerText ||
          document.body.innerText;

        return { title, content };
      });

      await Article.create({
        title: data.title,
        content: data.content,
        sourceUrl: link
      });

      console.log("Saved:", data.title);
    }

    await browser.close();
    console.log("✅ BeyondChats articles scraped & saved");
    process.exit();

  } catch (err) {
    console.error("❌ Scraper error:", err);
    process.exit(1);
  }
})();
