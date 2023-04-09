<template>
  <div class="layout">
    <el-container v-if="state.showMenu" class="container">
      <el-aside class="aside">
        <div class="head">
          <div>
            <img src="//s.weituibao.com/1582958061265/mlogo.png" alt="logo">
            <span>后台管理</span>
          </div>
        </div>
        <div class="line" />
        <el-menu background-color="#222832" text-color="#fff" :router="true" :default-openeds="state.defaultOpen"
          :default-active='state.currentPath'>
          <el-menu-item index="1">
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <span>发布</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/postarticle"><el-icon>
                  <Odometer />
                </el-icon>发布文章</el-menu-item>
              <el-menu-item index="/postvideo"><el-icon>
                  <Plus />
                </el-icon>发布视频</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="3">
            <template #title>
              <span>管理数据</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/articlemanager"><el-icon>
                  <Picture />
                </el-icon>已发布的文章</el-menu-item>
              <el-menu-item index="/viedeomanager"><el-icon>
                  <StarFilled />
                </el-icon>已发布的视频</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <span>模块管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/tagmanager"><el-icon>
                  <Menu />
                </el-icon>标签管理</el-menu-item>
              <el-menu-item index="/usermanager"><el-icon>
                  <Goods />
                </el-icon>用户管理</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/modifpasswd"><el-icon>
                  <Lock />
                </el-icon>修改密码</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container class="content">
        <router-view />
      </el-container>
    </el-container>
    <!-- if是进入仪表盘，else是进入到登录页面 -->
    <el-container v-else class="container">
      <router-view />
    </el-container>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
// import Header from '@/components/Header.vue'
// import Footer from '@/components/Footer.vue'
// import { localGet, pathMap } from '@/utils'

const noMenu = ['/login']
const router = useRouter()
const state = reactive({
  showMenu: true,
  defaultOpen: ['1', '2', '3', '4'],
  currentPath: '/',
})

router.afterEach((to, from) => {
  state.showMenu = !noMenu.includes(to.path)
})

router.beforeEach((to, from, next) => {
  next()
  // if (to.path == '/login') {
  //   // 如果路径是 /login 则正常执行
  //   next()
  // } else {
  //   // 如果不是 /login，判断是否有 token
  //   if (!localGet('token')) {
  //     // 如果没有，则跳至登录页面
  //     next({ path: '/login' })
  //   } else {
  //     // 否则继续执行
  //     next()
  //   }
  // }
  // state.currentPath = to.path
  // document.title = pathMap[to.name]
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
  background-color: #ffffff;
}

.container {
  height: 100vh;
}

.aside {
  width: 200px !important;
  background-color: #222832;
}

.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}

.head>div {
  display: flex;
  align-items: center;
}

.head img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.head span {
  font-size: 20px;
  color: #ffffff;
}

.line {
  border-top: 1px solid hsla(0, 0%, 100%, .05);
  border-bottom: 1px solid rgba(0, 0, 0, .2);
}

.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}
</style>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.el-menu {
  border-right: none !important;
}

.el-submenu {
  border-top: 1px solid hsla(0, 0%, 100%, .05);
  border-bottom: 1px solid rgba(0, 0, 0, .2);
}

.el-submenu:first-child {
  border-top: none;
}

.el-submenu [class^="el-icon-"] {
  vertical-align: -1px !important;
}

a {
  color: #409eff;
  text-decoration: none;
}

.el-pagination {
  text-align: center;
  margin-top: 20px;
}

.el-popper__arrow {
  display: none;
}
</style>