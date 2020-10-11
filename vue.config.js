module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '/localHttp': {
                // 1. 处理所有以"/localHttp"开头的请求，比如"/localHttp/test"
                target: process.env.VUE_APP_URL,
                // 2. 在请求地址前拼接上target，比如："http://test.com" + "/localHttp/test"
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/localHttp': '/'
                    // 3. 重写请求地址，将"/localHttp"换成"/"，即：http://test.com/test
                }
            }
        }
    }
}