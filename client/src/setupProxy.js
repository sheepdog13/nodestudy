const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://admin.dump-in.co.kr/",
      changeOrigin: true,
    })
  );
};
