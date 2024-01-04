// local(development) 환경일때와 deploy(production)환경일때 env를 어디서 들고올지 정한다.
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
