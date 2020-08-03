let httpUrl = process.env.VUE_APP_URL;
module.exports = {
    devServer: {
        proxy: {
            '/api': { 
                // 1. 处理所有以"/api"开头的请求，比如"/api/test"
                target: httpUrl, 
                // 2. 在请求地址前拼接上target，比如："http://test.com" + "/api/test"
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/' 
                    // 3. 重写请求地址，将"/api"换成"/"，即：http://test.com/test
                }
            }
        }
    }
}