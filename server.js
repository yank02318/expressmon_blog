const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const methodOverride = require("method-override");
const app = express();
const articles = require("./routes/articles");

mongoose.connect("mongodb://localhost:27017/blog", () => {
  console.log("db runnig");
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

app.get("/", async (req, res) => {
  const articles = await Article.find();
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articles);

app.listen(3000, console.log("server running go to http://localhost:3000/"));
