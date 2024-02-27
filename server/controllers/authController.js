const { User } = require("../models/User");

const registerUser = async (req, res) => {
  //회원가입시 필요 정보를 client에서 가져오면
  //데이터베이스에 삽입한다
  //body parser를 통해 body에 담긴 정보를 가져온다
  const user = new User(req.body);

  //mongoDB 메서드, user모델에 저장
  const result = await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
};

const loginUser = async (req, res) => {
  try {
    // 같은 이메일의 유저가 있는지 확인
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    // 비밀번호 확인
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    }

    // user 정보와 access 토큰을 받아온다.
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
      accesstoken,
      loginSuccess: true,
      name: userdata.name,
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

// role 1 어드민 role 2 특정 부서 어드민
// role 0 -> 일반 유저
const authUser = (req, res) => {
  // 미들웨어 통과후이기 때문에 Authentication이 True라는 말
  res.status(200).json({
    name: req.name,
    isAuth: true,
  });
};

const logoutUser = async (req, res) => {
  try {
    const options = {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      // 2주
      maxAge: 14 * 24 * 60 * 60 * 1000,
    };
    // cookie에 저장된 refreshtoken 삭제
    res.clearCookie("refreshtoken", options);
    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    return res.json({ success: false, err });
  }
};

module.exports = { registerUser, loginUser, authUser, logoutUser };
