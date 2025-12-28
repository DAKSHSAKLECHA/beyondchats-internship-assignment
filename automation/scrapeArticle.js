const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (url) => {
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  return $("article").text() || $("body").text();
};
