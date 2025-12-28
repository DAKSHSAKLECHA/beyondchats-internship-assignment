const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    content: String,
    updatedContent: String,
    sourceUrl: String,
    references: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", articleSchema);
