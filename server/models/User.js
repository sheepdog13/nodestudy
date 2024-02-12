require("dotenv").config();
const { SecretKey } = process.env;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// salt된 비밀번호의 자리수 설정
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    // 띄어쓰기 없애주는 옵션
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    minlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  // 토큰 기간
  tokenExp: {
    type: Number,
  },
});

// save 전 미들웨어 설정
userSchema.pre("save", function (next) {
  var user = this;
  // 비밀번호를 바꿀때만 hash해야 하기 때문에 비밀번호를 바꿀때라는 조건을 걸어줘야한다.
  if (user.isModified("password")) {
    // 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      // hash에 필요한 인수는 plain password, salt, callback
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// 비밀번호 비교 메서드
userSchema.methods.comparePassword = function (plainPassword) {
  // plainpassword와 db에 암호화된 비밀번호가 같은지 확인
  const result = bcrypt.compare(plainPassword, this.password);
  return result;
};

// 토큰 발급 메서드
userSchema.methods.generateToken = async function () {
  var user = this;
  // jsonwebtoken을 이용해서 token을 생성하기
  var accesstoken = jwt.sign({ username: user.name }, SecretKey, {
    expiresIn: "5m",
  });
  var refreshtoken = jwt.sign(user._id.toHexString(), SecretKey);
  // refreshtoken을 db에 저장한다.
  user.token = refreshtoken;

  try {
    const savedUser = await user.save();
    return [user, accesstoken];
  } catch (err) {
    return err;
  }
};

userSchema.statics.findByToken = async function (token) {
  var user = this;
  try {
    // 코인을 decode 한다.
    const decodedtoken = jwt.verify(token, SecretKey);
    // 복호화된 토큰에서 user_id와 같은 유저 찾기
    const userdata = await user.findOne({ _id: decodedtoken });
    return userdata;
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
