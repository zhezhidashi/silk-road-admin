const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/api': {
                // target: 'https://dev_admin.pacificsilkroad.cn/api-service',
                target: 'https://apsr.pku.edu.cn:443/api-service',
                pathRewrite: {'^/api': ''},
                ws: true,
                changeOrigin: true
            },
        },
    },
})
