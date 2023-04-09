import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// 设置 element-plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 设置 vue-router 路由
app.use(router)
// 挂在index.html的 #app的id的div上
app.mount('#app')
