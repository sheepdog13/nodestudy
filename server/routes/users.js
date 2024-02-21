const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const authController = require("../controllers/authController");

// 회원가입 API
router.post("/register", authController.registerUser);

// 로그인 API
router.post("/login", authController.loginUser);

// 사용자 인증 API
router.get("/auth", auth, authController.authUser);

// 사용자 로그아웃 API
router.get("/logout", authController.logoutUser);

module.exports = router;
