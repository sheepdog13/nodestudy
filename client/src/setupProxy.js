const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://nodestudy-34u2.onrender.com",
      changeOrigin: true,
    })
  );
};
