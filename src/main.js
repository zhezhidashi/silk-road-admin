import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import { MessageBox, Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/index.less'

import router from './router'
import store from './store'
import http from 'axios'
import './api/mock'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$http = http
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    store.commit('getToken')
    const token = store.state.user.token
    if (!token && to.name !== 'login') {
        next({
            name: 'login'
        })
    }
    else if (token && to.name === 'login') {
        next({ name: 'home' })
    }
    else {
        next()
    }
})

new Vue({
    store,
    router,
    render: h => h(App),
    created() {
        store.commit('addMenu', router)
    }
}).$mount('#app')
