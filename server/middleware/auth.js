const { User } = require("../models/User");
const jwt = require("jsonwebtoken");

// 인증 처리를 하는곳
let auth = async (req, res, next) => {
  // 클라이언트에서 헤더로 보내준 accesstoken
  let accesstoken = req.headers.authorization;
  // 클라이언트에 저장되어있는 refreshtoken
  let refreshtoken = req.cookies.refreshtoken;
  // accesstoken이 있을때 조작된 jwt인지 확인후 미들웨어 종료
  if (accesstoken) {
    try {
      const userdata = jwt.verify(accesstoken.split(" ")[1], "secretToken");
      req.name = userdata.username;
      next();
    } catch (err) {}
  } else if (refreshtoken) {
    // access 토큰이 만료 됐을때
    try {
      // 토큰을 복호화 한후 유저를 찾는다.
      const user = await User.findByToken(refreshtoken);
      // 유저가 업으면 no
      if (!user) return res.json({ isAuth: false, message: "user가 없습니다" });
      // db의 토큰과 client에서 준 refresh토큰을 비교한다.
      if (user.token === refreshtoken) {
        const [userdata, accesstoken] = await user.generateToken();
        // refresh 토큰의 옵션
        const options = {
          httpOnly: true,
          sameSite: "None",
          secure: true,
          // 2주
          maxAge: 14 * 24 * 60 * 60 * 1000,
        };
        // access 토큰은  body로 넘겨주고 refresh 토큰은 cookie에 저장한다.
        res.cookie("refreshtoken", userdata.token, options).status(200).json({
          isAuth: true,
          accesstoken,
          name: userdata.name,
        });
      }
    } catch (err) {
      return res.json({ isAuth: false, error: err });
    }
  } else {
    return res.json({ isAuth: false });
  }
};

module.exports = { auth };
