const axios = require("axios");
require("dotenv").config();

module.exports = async (query) => {
  const res = await axios.get("https://www.googleapis.com/customsearch/v1", {
    params: {
      key: process.env.GOOGLE_API_KEY,
      cx: process.env.GOOGLE_CX,
      q: query
    }
  });

  return res.data.items
    .filter(i => !i.link.includes("beyondchats"))
    .slice(0, 2);
};
