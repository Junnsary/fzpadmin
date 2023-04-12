import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
import { createPinia } from 'pinia'

const app = createApp(App)
// 设置 element-plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//设置pinia
const pinia = createPinia()
app.use(pinia)
//设置视频播放器
app.use(vue3videoPlay)
//设置中文
app.use(ElementPlus, {
    locale: zhCn,
})
// 设置 vue-router 路由
app.use(router)
// 挂在index.html的 #app的id的div上
app.mount('#app')
