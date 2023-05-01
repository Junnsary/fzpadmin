<template>
  <div class="layout">
    <el-container v-if="showLayout" class="container">
      <el-aside class="aside">
        <div class="head">
          <div>
            <img style="width: 25px;height:25px;" src="@assets/system.png">
            <span>后台管理</span>
          </div>
        </div>
        <div class="line" />
        <el-menu background-color="#222832" text-color="#fff" :router="true">
          <el-menu-item index="/index">
            <span>平台数据</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <span>发布管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/postarticle"><el-icon>
                  <Edit />
                </el-icon>发布文章</el-menu-item>
              <el-menu-item index="/postvideo"><el-icon>
                  <VideoPlay />
                </el-icon>发布视频</el-menu-item>
              <el-menu-item index="/posttopic"><el-icon>
                  <Plus />
                </el-icon>发布自测题目</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="3">
            <template #title>
              <span>数据管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/articlemanager"><el-icon>
                  <Tickets />
                </el-icon>管理文章</el-menu-item>
              <el-menu-item index="/videomanager"><el-icon>
                  <VideoPlay />
                </el-icon>管理视频</el-menu-item>
              <el-menu-item index="/questionmanagement"><el-icon>
                  <StarFilled />
                </el-icon>管理提问</el-menu-item>
              <el-menu-item index="/topicmanagement"><el-icon>
                  <DocumentCopy />
                </el-icon>自测题目</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <span>模块管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/tagmanager"><el-icon>
                  <PriceTag />
                </el-icon>标签管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/reviewquestion"><el-icon><Select /></el-icon>审核提问</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/topictypemanagement"><el-icon>
                  <CollectionTag />
                </el-icon>自测题目类型</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/adminpasswd"><el-icon>
                  <Lock />
                </el-icon>修改系统密码</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container class="content">
        <Header />
        <div class="main">
          <router-view />
        </div>
        <Footer />
      </el-container>
    </el-container>

    <!-- if是进入仪表盘，else是进入到登录页面 -->
    <el-container v-else class="container">
      <router-view />
    </el-container>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useLoginStore } from './store/UseLoginStore'
import { getLoginInfo } from './utils/loginInfo'

const showLayout = ref(false)

const router = useRouter()

router.afterEach((to, from) => {
  // if (to.path)
  showLayout.value = !(to.path === '/login')
})

</script>

<style scoped>
.main {
  height: 100% !important;
  padding: 20px;
}

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