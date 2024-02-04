const { User } = require("../models/User");
// 인증 처리를 하는곳
let auth = async (req, res, next) => {
  // 클라이언트에서 토큰을 가져온다
  let token = req.headers.authorization;
  if (token) {
    const userdata = await User.findByToken(token);
    req.user = userdata;
    return next();
  } else {
    // refresh 토큰으로 access 토큰 재발급
  }
  try {
    // 토큰을 복호화 한후 유저를 찾는다.
    const userdata = await User.findByToken(token);
    // 유저가 업으면 no
    if (!userdata) return res.json({ isAuth: false, error: true });
    // 같은 유저가 있으면 ok
    // 미들웨어가 끝나고 req에서 사용할 수 있게 데이터를 보내준다.
    req.token = token;
    req.user = userdata;
    next();
  } catch (err) {
    return res.json({ isAuth: false, error: err });
  }
};

module.exports = { auth };
