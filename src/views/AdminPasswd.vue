<template>
    <el-card class="account-container">
        <el-form :model="state.passForm" :rules="state.rules" ref="passRef" label-width="80px" label-position="right"
            class="demo-ruleForm">
            <el-form-item label="原密码：" prop="oldpass">
                <el-input type="password" style="width: 200px" v-model="state.passForm.oldpass"></el-input>
            </el-form-item>
            <el-form-item label="新密码：" prop="newpass">
                <el-input type="password" style="width: 200px" v-model="state.passForm.newpass"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="submitPass">确认修改</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
  
<script setup>
import { reactive, ref, toRaw } from 'vue'
import { getLoginInfo } from '../utils/loginInfo';
import { modifPasswd } from '../axios/index';

const passRef = ref(null)
const state = reactive({
    passForm: {
        oldpass: '',
        newpass: ''
    },
    rules: {
        oldpass: [
            { required: 'true', message: '原密码不能为空', trigger: ['change'] }
        ],
        newpass: [
            { required: 'true', message: '新密码不能为空', trigger: ['change'] }
        ]
    },
})

const submitPass = () => {
    passRef.value.validate((vaild) => {
        if (vaild) {
            const info = getLoginInfo();
            const passwd = toRaw(state.passForm)
            modifPasswd({ id: info.id, oldpasswd: passwd.oldpass, newpasswd: passwd.newpass })
                .then(success => {
                    passRef.value.resetFields()
                    if (success) {
                        ElMessage({
                            message: '修改成功！',
                            type: 'success',
                        })
                    } else {
                        ElMessage({
                            message: '原密码错误！请重新输入',
                            type: 'error',
                        })
                    }
                }).catch(() => {
                    ElMessage({
                        message: '修改失败',
                        type: 'error',
                    })
                })
        } else {
            console.log('验证不通过！')
        }
    })
}
</script>
  
<style >
.account-container {
    width: 400px;
    margin: 20px;
}
</style>