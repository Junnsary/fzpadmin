import { createRouter, createWebHashHistory } from 'vue-router'
import { getLoginInfo } from '../utils/loginInfo'
import { useLoginStore } from '../store/UseLoginStore'

const routes = [
    { path: '/index', name: 'index', component: () => import('../views/Index.vue') },
    { path: '/login', name: 'login', component: () => import('../views/Login.vue') },
    {
        path: '/articlemanager',
        name: 'articlemanager',
        component: () => import('../views/ArticleManager.vue'),
    },
    {
        path: '/videomanager',
        name: 'videomanager',
        component: () => import('../views/VideoManager.vue'),
    },
    {
        path: '/postarticle',
        name: 'postarticle',
        component: () => import('../views/PostArticle.vue'),
    },
    { path: '/postvideo', name: 'postvideo', component: () => import('../views/PostVideo.vue') },
    { path: '/tagmanager', name: 'tagmanager', component: () => import('../views/TagManager.vue') },
    // { path: '/usermanager', component: () => import('../views/UserManager.vue') },
    {
        path: '/adminpasswd',
        name: 'adminpasswd',
        component: () => import('../views/AdminPasswd.vue'),
    },
    {
        path: '/postsuccess:/:type',
        name: 'postsuccess',
        component: () => import('../views/PostSuccess.vue'),
    },
    {
        path: '/reviewquestion',
        name: 'reviewquestion',
        component: () => import('../views/ReviewQuestion.vue'),
    },
    {
        path: '/questionmanagement',
        name: 'questionmanagement',
        component: () => import('../views/QuestionManagement.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

//全局的路由前置守卫
router.beforeEach((to, from, next) => {
    // console.log('to///', to)
    // console.log('from///', from)
    // next()
    /**
     * 先检查是否登录了
     */
    const loginStore = useLoginStore()
    if (getLoginInfo()) {
        //登录了
        console.log('login!!!')
        if (to.fullPath === '/login') {
            next('/index')
        } else {
            next()
        }
        loginStore.setLoginState(true)
    } else {
        console.log('logout!!!')
        if (to.fullPath === '/login') {
            next()
        } else {
            next('/login')
        }
        loginStore.setLoginState(false)
    }
})

export default router
