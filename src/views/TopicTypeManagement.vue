<template>
    <div class="container">
        <div class="select-tag">
            <el-button type="primary" @click="newTypeOpen">新增类型</el-button>
        </div>
        <el-card class="box-card">
            <el-tag v-for="tag in typies" :key="tag.name" class="mx-1 tag" :type="tag.type" @click="typeOpen(tag)"
                style="cursor:pointer;">
                {{ tag.name }}
            </el-tag>
        </el-card>
    </div>


    <el-dialog v-model="dialogAddVisible" title="新增标签" width="400px" top="20vh" draggable @close="closeForm()">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-form-item label="类型名字" prop="name">
                <el-input v-model="ruleForm.name" :disabled="!addOrOpen" />
            </el-form-item>
            <el-form-item label="描述" prop="describe">
                <el-input v-model="ruleForm.describe" :disabled="!addOrOpen" />
            </el-form-item>
            <el-form-item v-if="addOrOpen">
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    确定
                </el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
            <el-form-item v-else>
                <el-button type="primary" @click="deleteType(ruleFormRef)">
                    删除
                </el-button>
                <el-button @click="closeForm()">关闭</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref, toRaw } from 'vue'
import { getType, addType, delType } from '../axios'

onMounted(() => {
    showType()
    console.log(ruleFormRef)
})


// 新增对话框
const dialogAddVisible = ref(false)

//form
const ruleFormRef = ref()


const ruleForm = reactive({
    name: '',
    describe: ''
})


const rules = reactive({
    name: [
        { required: true, message: '请输入类型名字', trigger: 'blur' },
    ],
    describe: [
        { required: true, message: '请输入描述', trigger: 'blur' },
    ],

})



const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // console.log(toRaw(ruleForm))
            addType(toRaw(ruleForm)).then(success => {
                if (success) {
                    ElMessage({
                        message: '添加类型成功！',
                        type: 'success',
                    })
                    dialogAddVisible.value = false
                    formEl.resetFields()
                } else {
                    ElMessage({
                        message: '添加类型失败！',
                        type: 'error',
                    })
                }
                showType()
            }).catch(e => {
                ElMessage({
                    message: '添加标签失败！',
                    type: 'error',
                })
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}

const resetForm = () => {
    ruleForm.name = ''
    ruleForm.describe = ''
}

const closeForm = () => {
    resetForm()
    dialogAddVisible.value = false
}


//显示标签
const typies = reactive([])

const showType = async () => {
    const result = await getType()
    typies.splice(0, typies.length)
    result.forEach(element => {
        typies.push({
            name: element.name,
            describe: element.type_describe,
            id: element.id,
            type: 'success'
        })
    });
}


//打开
const typeOpen = (typeInfo) => {
    try {
        ruleFormRef.value.clearValidate()
    }catch{
        console.log('error clearvalidate')
    }finally{
        dialogAddVisible.value = true
        addOrOpen.value = false

        ruleForm.name = typeInfo.name
        ruleForm.describe = typeInfo.describe
        currentId.value = typeInfo.id
    }
  
}

const currentId = ref('')

const deleteType = () => {
    ElMessageBox.confirm(`确认删除 [${ruleForm.name}] 该类型？，这将会删除该类型的全部自测题目`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
    }).then(async ({ value }) => {
        const result = await delType(currentId.value)
        if (result) {
            await showType()
            dialogAddVisible.value = false
            resetForm()
            ElMessage({
                type: 'success',
                message: `删除类型成功！`,
            })
        } else {
            ElMessage({
                type: 'error',
                message: `删除类型失败！`,
            })
        }
    }).catch(() => {

    })
}

const addOrOpen = ref(true)

const newTypeOpen = () => {
    dialogAddVisible.value = true
    addOrOpen.value = true
}


</script>

<style lang="scss" scoped>
.container {
    height: 100%;
    padding: 40px;

    .select-tag {
        display: flex;
        margin-bottom: 30px;
        align-items: center;

        * {
            margin-left: 20px;
        }
    }
}

.box-card {
    width: 100%;
    min-height: 500px;
    display: flex;

    .tag {
        font-size: 15px;
        padding: 15px;
        margin: 10px;
    }

}
</style>
  