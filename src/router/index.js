import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: () => import('../views/Index.vue') },
    { path: '/login', component: () => import('../views/Login.vue') },
    { path: '/articlemanager', component: () => import('../views/ArticleManager.vue') },
    { path: '/viedeomanager', component: () => import('../views/VideoManager.vue') },
    { path: '/postarticle', component: () => import('../views/PostArticle.vue') },
    { path: '/postvideo', component: () => import('../views/PostVideo.vue') },
    { path: '/tagmanager', component: () => import('../views/TagManager.vue') },
    { path: '/usermanager', component: () => import('../views/UserManager.vue') },
    { path: '/usermanager', component: () => import('../views/UserManager.vue') },
    { path: '/modifpasswd', component: () => import('../views/ModifPasswd.vue') },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
