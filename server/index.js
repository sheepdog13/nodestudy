require("dotenv").config();
const cors = require("cors");
const { MongoURI } = process.env;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const { User } = require("./models/User");
const nodemailer = require("nodemailer");

app.set("trust proxy", true);

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://sheepdog13.blog",
    "https://d3j4m3dvbn515a.cloudfront.net",
  ],
  credentials: true, // 쿠키 전송을 허용
};

app.use(cors(corsOptions));

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
});

// role 1 어드민 role 2 특정 부서 어드민
// role 0 -> 일반 유저
app.get("/api/users/auth", auth, (req, res) => {
  // 미들웨어 통과후이기 때문에 Authentication이 True라는 말
  res.status(200).json({
    name: req.name,
    isAuth: true,
  });
});

app.get("/api/users/logout", async (req, res) => {
  try {
    // cookie에 저장된 refreshtoken 삭제
    res.clearCookie("refreshtoken");
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
