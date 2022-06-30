//backend의 시작점
const express = require("express");
const app = express();
const port = 5000;

const { User } = require("./model/User");
const { auth } = require("./middleware/auth");
const bodyParser = require("body-parser");
const config = require("./config/key");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // url parser
app.use(bodyParser.json());

const mongoose = require("mongoose"); //JSON parser
mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log("mongoDB Connected.."))
  .catch((err) => console.log(err));

https: app.get("/", (req, res) => {
  res.send("/register , /login, /auth ");
});

app.get("/api/hello", (req, res) => {
  res.send("Hello~~");
});

app.post("/api/users/register", (req, res) => {
  //회원가입할때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다
  const user = new User(req.body);
  user.save((err, doc) => {
    //error 처리
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  //요청된 email을 DB에서 찾음

  //비밀 번호까지 맞다면 토큰 생성하기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    //요청된 email이 DB에 있다면 비밀번호가 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        //token을 저장한다..
        res
          .cookie("x_auth", user.token, {
            express: new Date(Date.now + 9000000),
            httpOnly: true,
            sameSite: "Lax",
          })
          .status(200)
          .json({
            loginSuccess: true,
            userId: user._id,
          });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  // auth : 미드웨어
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.roll === 0 ? false : true,
    email: req.user.email,
    name: req.user.name,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _di: req.user._id },
    {
      token: "",
    },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
