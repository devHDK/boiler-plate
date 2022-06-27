//backend의 시작점
const express = require("express");
const app = express();
const port = 5000;

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://admin:1234@boilerplate.kbehz.mongodb.net/?retryWrites=true&w=majority",
    {}
  )
  .then(() => console.log("mongoDB Connected.."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  ß;
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
