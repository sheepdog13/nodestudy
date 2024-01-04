const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const config = require("./config/key");
const { User } = require("./models/User");

// application/x-www-form-urlencoded 이렇게된 데이터를 분석해서 가져올 수 있게 해준다.
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 데이터를 분석해서 가져올 수 있게 해준다
app.use(bodyParser.json());
// cookie 데이터를 사용할 수 있게 해준다.
app.use(cookieparser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hi"));

app.post("/api/users/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    const isMatch = await user.comparePassword(req.body.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    }

    // const token = await user.generateToken();

    // // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
    // res.cookie("x_auth", token).status(200).json({ loginSuccess: true });
  } catch (err) {
    return res.status(400).json({ loginSuccess: false, err });
  }
});

app.listen(port, () => console.log(`app lisening on port ${port}`));
