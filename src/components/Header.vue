<template>
  <div class="header">

    <div class="left">
      <span>{{ name }}</span>
    </div>

    <div class="right">
      <!-- <el-popover placement="bottom" :width="320" trigger="click" popper-class="popper-user-box">
        <template #reference>
          <div class="author">
            <i class="icon el-icon-s-custom" />
            {{ state.LoginInfo && state.LoginInfo.nickName || '' }}
            <i class="el-icon-caret-bottom" />
          </div>
        </template>

        <div class="nickname">
          <p>ID:{{ state.LoginInfo && state.LoginInfo.id || '' }}</p>
          <p>名称：{{ state.LoginInfo && state.LoginInfo.name || '' }}</p>
          <el-tag size="small" effect="dark" class="logout" @click="logout">退出</el-tag>
        </div>
      </el-popover> -->


      <el-icon style="margin-right: 5px;height: 22px; color:  #79bbff;">
        <User />
      </el-icon>
      <span style="font-size: 15px;margin-right: 10px; color:  #79bbff; padding-bottom: 5px;">官方</span>
      <el-divider style="height: 25px;" direction="vertical" />
      <el-button @click="logout" type="primary" text>退出登录</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getLoginInfo, adminLogout } from '../utils/loginInfo'
import { pathMap } from '../utils';

//登录右上角信息
const visible = ref(false)

const router = useRouter()
const state = reactive({
  LoginInfo: null, // 用户信息变量
})
// 初始化执行方法
onMounted(() => {
  state.LoginInfo = getLoginInfo()
})

const name = ref('')

router.afterEach((to, from) => {
  console.log('to.name', to.name)
  // console.log('to//', to)
  // console.log('from//', from)
  name.value = pathMap[to.name]

})

// 退出登录
const logout = () => {
  adminLogout()
  router.push('/login')
}

</script>

<style scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
  border: none;
}

.right {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>