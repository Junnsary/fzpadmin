<template>
    <div class="container">
        <div class="select-tag">
            <span>筛选标签：</span>
            <el-select v-model="cateValue" placeholder="选择" @change="cateChange">
                <el-option v-for="item in cateOptions" :key="item.value" :label="item.label" :value="item.value"
                    :disabled="item.disabled" />
            </el-select>
            <el-select v-model="typeValue" :disabled="typeShow" placeholder="选择">
                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"
                    :disabled="item.disabled" />
            </el-select>
            <el-button type="primary" @click="
                dialogAddVisible = true">新增标签</el-button>
        </div>
        <el-card class="box-card">
            <el-tag style="cursor: pointer;" v-for="tag in tags" :key="tag.name" class="mx-1 tag" :type="tag.type"
                @close="deleteTag(tag.id, tag.name)">
                {{ tag.name }}
            </el-tag>
        </el-card>
    </div>


    <el-dialog v-model="dialogAddVisible" title="新增标签" width="400px" top="20vh" draggable>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
            :size="formSize" status-icon>

            <el-form-item label="标签区域" prop="category">
                <el-select v-model="ruleForm.category" placeholder="选择标签区域">
                    <el-option label="知识区" value="knowledge" />
                    <el-option label="案例区" value="case" />
                </el-select>
            </el-form-item>
            <el-form-item label="标签类型" prop="type">
                <el-select v-model="ruleForm.type" placeholder="选择标签类型">
                    <el-option label="文章类" value="article" />
                    <el-option label="视频类" value="video" />
                </el-select>
            </el-form-item>
            <el-form-item label="标签名字" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">
                    确定
                </el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { reactive, ref, watchEffect, onMounted, toRaw } from 'vue'
import { getTagList, addTag, delTag } from '../axios'

// 新增对话框
const dialogAddVisible = ref(false)

//form
const ruleFormRef = ref()
const ruleForm = reactive({
    name: '',
    category: '',
    type: ''
})


const rules = reactive({
    name: [
        { required: true, message: '请输入标签名字', trigger: 'blur' },
    ],
    category: [
        {
            required: true,
            message: '请选择标签区域',
            trigger: 'change',
        },
    ],
    type: [
        {
            required: true,
            message: '请选择标签类型',
            trigger: 'change',
        },
    ],

})

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            // console.log(toRaw(ruleForm))
            addTag(toRaw(ruleForm)).then(success => {
                if (success) {
                    typeValue.value = ruleForm.type
                    cateValue.value = ruleForm.category
                    ElMessage({
                        message: '添加标签成功！',
                        type: 'success',
                    })
                    dialogAddVisible.value = false
                    formEl.resetFields()
                } else {
                    ElMessage({
                        message: '添加标签失败！',
                        type: 'error',
                    })
                }
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

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}

//筛选
const cateValue = ref('all')
const cateOptions = [
    {
        value: 'all',
        label: '全部',
    },
    {
        value: 'knowledge',
        label: '知识区',
    },
    {
        value: 'case',
        label: '案例区',
    }
]

const typeShow = ref(true)
const typeValue = ref('all')
const typeOptions = [
    {
        value: 'all',
        label: '全部',
    },
    {
        value: 'article',
        label: '文章类',
    },
    {
        value: 'video',
        label: '视频类',
    }
]


// const cateChange = () => {
//     if (cateValue.value !== 'all') {
//         typeShow.value = false
//     } else {
//         typeShow.value = true
//         typeValue.value = 'all'
//     }
// }

//显示标签
const tags = reactive([])
const showTag = async () => {
    const result = await getTagList(cateValue.value, typeValue.value)
    // console.log(result)
    tags.splice(0, tags.length)
    result.forEach(element => {
        tags.push({
            name: element.name,
            id: element.id,
            type: 'success'
        })
    });
}

watchEffect(async () => {
    if (cateValue.value !== 'all') {
        typeShow.value = false
    } else {
        typeShow.value = true
        typeValue.value = 'all'
    }
    await showTag()
})


//删除标签
const deleteTag = (id, name) => {
    console.log(id)
    ElMessageBox.confirm(`确认删除 [${name}] 该标签？,这将会删除该标签下的内容`, '提示', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
    }).then(async ({ value }) => {
        const success = await delTag(id)
        if (success) {
            await showTag()
            ElMessage({
                type: 'success',
                message: `删除标签成功！`,
            })
        } else {
            ElMessage({
                type: 'error',
                message: `删除标签失败！`,
            })
        }
    }).catch(() => {

    })
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
  