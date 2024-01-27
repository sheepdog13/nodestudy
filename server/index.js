require("dotenv").config();
const cors = require("cors");
const { MongoURI } = process.env;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const { User } = require("./models/User");
const nodemailer = require("nodemailer");

app.use(cors({ origin: ["http://localhost:3000", "http://sheepdog13.blog"] }));
// application/x-www-form-urlencoded 이렇게된 데이터를 분석해서 가져올 수 있게 해준다.
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 데이터를 분석해서 가져올 수 있게 해준다
app.use(bodyParser.json());
// cookie 데이터를 사용할 수 있게 해준다.
app.use(cookieparser());

const mongoose = require("mongoose");
const { auth } = require("./middleware/auth");
mongoose
  .connect(MongoURI)
  .then(() => console.log("mongodb connected!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hi"));
app.get("/api/hello", (req, res) => res.send("hello"));

app.post("/api/users/register", async (req, res) => {
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
});

app.post("/api/users/login", async (req, res) => {
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

    // 토큰 쿠키에 저장
    const userdata = await user.generateToken();
    // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
    res
      .cookie("x_auth", userdata.token)
      .status(200)
      .json({ loginSuccess: true, userId: userdata._id });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// role 1 어드민 role 2 특정 부서 어드민
// role 0 -> 일반 유저
app.get("/api/users/auth", auth, (req, res) => {
  // 미들웨어 통과후이기 때문에 Authentication이 True라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
  });
});

app.get("/api/users/logout", auth, async (req, res) => {
  // mongodb user를 찾고 내용을 바꾸는 메소드
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      // 바꿀 내용 token을 없앤다.
      { token: "" }
    );
    return res.status(200).send({
      success: true,
    });
  } catch (err) {
    return res.json({ success: false, err });
  }
});

// nodemailer를 활용한 메일 보내기
app.post("/api/sendmail", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "naver",
    host: "smtp.naver.com", // SMTP 서버명
    port: 465, // SMTP 포트
    auth: {
      user: config.NODEMAILER_USER, // 네이버 아이디
      pass: config.NODEMAILER_PASS, // 네이버 비밀번호
    },
  });

  const mailOptions = {
    from: config.NODEMAILER_email, // 네이버 이메일
    to: req.body.email, // 수신자 이메일
    subject: req.body.subject,
    text: req.body.text,
  };

  try {
    transporter.sendMail(mailOptions);
    return res.status(200).json({ emailsuccess: true, text: req.body.text });
  } catch (err) {
    return res.json({ emailsuccess: false, err });
  }
});

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅ Server listenting on http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
