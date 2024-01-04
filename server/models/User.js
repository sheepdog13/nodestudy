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

// 비밀번호 비교 정적 메서드
userSchema.methods.comparePassword = function (plainPassword) {
  console.log("작동했습니다");
  // plainpassword와 db에 암호화된 비밀번호가 같은지 확인
  const result = bcrypt.compare(plainPassword, this.password);
  return result;
};

// 토큰 발급 정적 메서드
userSchema.methods.generateToken = async function (cb) {
  var user = this;

  // jsonwebtoken을 이용해서 token을 생성하기
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  // user._id(db의 _id) + secreToken = token
  // token으로 user를 판별할 수 있다.
  // const result = await user
  //   .save()
  //   .then(() => {
  //     return cb(null, user);
  //   })
  //   .catch((err) => {
  //     return cb(err);
  //   });
  // user.token = token;
  // user.save(function (err, user) {
  //   if (err) return cb(err);
  //   cb(null, user);
  // });
  user.token = token;

  try {
    const savedUser = await user.save();
    cb(null, savedUser);
  } catch (err) {
    cb(err);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
