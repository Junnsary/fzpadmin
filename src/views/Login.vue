<script setup>
import { reactive, ref, toRaw } from 'vue'
import { adminLogin } from '../axios';
import { saveLoginInfo } from '../utils/loginInfo'
import { useRouter } from 'vue-router';
const router = useRouter()
const loginForm = ref(null)
const state = reactive({
    ruleForm: {
        id: '',
        passwd: ''
    },
    checked: true,
    rules: {
        id: [
            { required: 'true', message: '账户不能为空', trigger: 'blur' }
        ],
        passwd: [
            { required: 'true', message: '密码不能为空', trigger: 'blur' }
        ]
    }
})
const submitForm = async () => {
    //这里点击登录
    loginForm.value.validate((valid) => {
        if (valid) {
            /**
             * 都验证过了，向服务器访问
             */
            console.log(state.ruleForm)
            adminLogin(toRaw(state.ruleForm)).then(result => {
                if (result.success) {
                    console.log(result.data)
                    //进行保存
                    saveLoginInfo(result.data)
                    //跳转
                    router.push('/index')
                    ElMessage({
                        message: '登录成功',
                        type: 'success',
                    })
                } else {
                    ElMessage({
                        message: '登录失败，账号或者密码错误',
                        type: 'warning',
                    })
                }
            })

        } else {
            console.log('error submit!!')
            return false;
        }
    })
}

</script>

<template>
    <div class="login-body">
        <div class="login-container">
            <div class="head">
                <div class="name">
                    <div class="title">大学生校园防诈骗知识学习交流平台</div>
                    <div class="tips">后台管理系统</div>
                </div>
            </div>
            <el-form label-position="top" :rules="state.rules" :model="state.ruleForm" ref="loginForm" class="login-form">
                <el-form-item style="margin-bottom:20px ;" label="账号" prop="id">
                    <el-input type="text" v-model.trim="state.ruleForm.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passwd">
                    <el-input type="password" v-model.trim="state.ruleForm.passwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-top:50px; height: 40px;font-weight: bold;font-size: 16px; width: 100%"
                        type="primary" @click="submitForm">立 即 登
                        录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped>
.login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
}

.login-container {
    width: 500px;
    height: 400px;
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0px 10px 30px 10px rgba(0, 0, 0, 0.2);
}

.head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
}

.head img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
}

.head .title {
    font-size: 28px;
    color: #79bbff;
    font-weight: bold;
}

.head .tips {
    font-size: 14px;
    color: #999;
}

.login-form {
    width: 60%;
    margin: 0 auto;
}



.login-form>>>.el-form--label-top .el-form-item__label {
    padding: 0;
}

.login-form>>>.el-form-item {
    margin-bottom: 0;
}
</style>
