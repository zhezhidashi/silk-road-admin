const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/api': {
                target: 'https://dev_admin.pacificsilkroad.cn/api-service',
                pathRewrite: {'^/api': ''},
                ws: true,
                changeOrigin: true
            },
        },
    },
})
