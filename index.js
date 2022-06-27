//backend의 시작점
const express = require("express");
const app = express();
const port = 5000;

const { User } = require("./model/User");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true })); // url parser
app.use(bodyParser.json());

const mongoose = require("mongoose"); //JSON parser
mongoose
  .connect(
    "mongodb+srv://admin:1234@boilerplate.kbehz.mongodb.net/?retryWrites=true&w=majority",
    {}
  )
  .then(() => console.log("mongoDB Connected.."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  //회원가입할때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
