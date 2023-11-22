//const proxy = require("http-proxy-middleware");这个不对，坑！！！！！
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // /api 表示代理路径
  // target 表示目标服务器的地址
  app.use(
  	//这里!
    createProxyMiddleware('/api', {
      target: 'https://123.249.122.174:9999',
      // 跨域时设置该值 为 true
      changeOrigin: true,
      // 重写接口路由
      pathRewrite: {
        '^/api': '' // 最终接口路径为： http://localhost:3000/xxx
      }
    })
  )
}
