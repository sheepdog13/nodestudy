// 배포후 보안이 필요한 정보
module.exports = {
  // 배포의 환경변수랑 이름이 같아야 한다.
  mongoURI: process.env.MongoURI,
};
