const { User } = require("../model/User");
const cookieParser = require("cookie-parser");

let auth = (req, res, next) => {
  //인증 처리를 하는곳
  //클라이언트 쿠키에서 토큰을 가져옴
  let token = req.cookies.x_auth; //cookies...

  //토큰을 복호화 한후 유저를 찾는다. -> 유저가 있으면 인증 OK, 없으면 NO
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next(); //미드웨어에서 작업을 끝낸뒤 다음작업으로 넘어가기 위함.
  });
};

module.exports = { auth };
