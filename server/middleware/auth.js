const { User } = require("../models/User");
// 인증 처리를 하는곳
let auth = (req, res, next) => {
  // 클라이언트에서 토큰을 가져온다
  let token = req.cookies.x_auth;
  console.log("token", token);
  // 토큰을 복호화 한후 유저를 찾는다.
  try {
    const userdata = User.findByToken(token);
    // 유저가 업으면 no
    if (!user) return res.json({ isAuth: false, error: true });

  }catch(err){
    throw err;

  }
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    // 유저가 업으면 no
    if (!user) return res.json({ isAuth: false, error: true });
    // 같은 유저가 있으면 ok
    // 미들웨어가 끝나고 req에서 사용할 수 있게 데이터를 보내준다.
    req.token = token;
    req.user = user;
    console.log("user", user);
    next();
  });
};

module.exports = { auth };
