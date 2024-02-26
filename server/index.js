require("dotenv").config();
const cors = require("cors");
const { MongoURI } = process.env;
const express = require("express");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const nodemailer = require("nodemailer");
const userRouter = require("./routes/users");
const path = require("path");
const fs = require("fs");

const app = express();

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

mongoose
  .connect(MongoURI)
  .then(() => console.log("mongodb connected!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("hi"));
app.get("/api/hello", (req, res) => res.send("hello"));

app.use("/api/users", userRouter);

app.get(`/post/:filePath`, (req, res) => {
  const filePath = req.params.filePath;

  const markdownFilePath = path.join(__dirname, `_post/${filePath}.md`);
  // Markdown 파일을 읽어 응답으로 전송
  fs.readFile(markdownFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file", err);
      return res.status(500).send("Internal Server Error");
    }
    res.setHeader("Content-Type", "text/markdown");
    res.send(data);
  });
});

const markdownDirectory = path.join(__dirname, "_post");

app.get("/allmarkdown", (req, res) => {
  fs.readdir(markdownDirectory, (err, files) => {
    if (err) {
      console.error("Error reading directory", err);
      return res.status(500).send("Internal Server Error");
    }

    const markdownFiles = files.filter((file) => path.extname(file) === ".md");

    const markdownData = [];

    markdownFiles.forEach((file) => {
      const filePath = path.join(markdownDirectory, file);
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error("Error reading file", err);
          return res.status(500).send("Internal Server Error");
        }
        markdownData.push({ filename: file, content: data });

        // Check if all files are read
        if (markdownData.length === markdownFiles.length) {
          res.json(markdownData);
        }
      });
    });
  });
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
