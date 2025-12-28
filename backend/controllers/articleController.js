const Article = require("../models/Article");
const slugify = require("slugify");

exports.getArticles = async (req, res) => {
  res.json(await Article.find());
};

exports.createArticle = async (req, res) => {
  const article = await Article.create({
    ...req.body,
    slug: slugify(req.body.title)
  });
  res.json(article);
};

exports.updateArticle = async (req, res) => {
  const article = await Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(article);
};
