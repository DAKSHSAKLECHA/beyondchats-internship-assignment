require("dotenv").config();
const axios = require("axios");
const googleSearch = require("./googleSearch");
const scrape = require("./scrapeArticle");
const rewrite = require("./rewriteLLM");

(async () => {
  const articles = (await axios.get(process.env.API_URL)).data;

  for (let a of articles) {
    const results = await googleSearch(a.title);

    let contents = [];
    let links = [];

    for (let r of results) {
      links.push(r.link);
      contents.push(await scrape(r.link));
    }

    const updated = await rewrite(a.content, contents);

    await axios.put(`${process.env.API_URL}/${a._id}`, {
      updatedContent: updated,
      references: links
    });

    console.log("Updated:", a.title);
  }
})();
