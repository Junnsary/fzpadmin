<template>
    <el-form :model="topic" label-width="120px">
        <el-form-item label="题目">
            <el-input v-model="topic.title" />
        </el-form-item>
        <el-form-item label="类型">
            <!-- 需要网络获取。。。 -->
            <el-select v-model="topic.type" placeholder="选择该题目类型">
                <el-option v-for="temp in typeSeletc" :label="temp.name" :value="temp.id" />
            </el-select>
        </el-form-item>


        <div style="display: flex; width: 100%;">
            <div style="width: 110px; text-align: right; font-size: 14px; color: #606266; flex-grow: 0;padding-top:15px;">
                设置答案 <br>
                <span style="color: brown;">(单选为正确答案)</span>
            </div>
            <div style="flex-grow: 1;padding-left: 20px;">
                <el-radio-group style="display: flex; flex-direction: column; width: 100%;" v-model="solutionValue"
                    @change="solutionChange">
                    <div v-for="temp in solution" :key="temp.label"
                        style="display: flex;width: 100%; margin-top: 10px; justify-content: flex-start;">

                        <el-col :span="1">
                            <el-radio :label="temp.label" />
                        </el-col>

                        <el-col :span="12">
                            <el-input v-model="temp.content" />
                        </el-col>
                        <el-col :span="4">
                            <el-button v-if="temp.del" style="margin-left: 10px;" @click="delSolution(temp.label)">
                                <el-icon>
                                    <Close />
                                </el-icon>
                            </el-button>
                        </el-col>
                    </div>
                </el-radio-group>

            </div>
        </div>
        <div style="margin-left: 200px;margin-top: 20px;">
            <el-button @click="addSolution">添加答案</el-button>
        </div>
        <div style="margin-left: 400px;margin-top: 40px;">
            <el-button type="primary" @click="onSubmit">发布题目</el-button>
        </div>
    </el-form>
</template>
  
<script setup>
import { onMounted, reactive, ref, toRaw } from 'vue'
import { getType, addTopic } from '../axios';

//********************************************** */
// do not use same name with ref
const topic = reactive({
    title: '',
    type: '',
})

const typeSeletc = reactive([])

onMounted(async () => {
    const result = await getType()
    result.forEach((v) => {
        typeSeletc.push({
            id: v.id,
            name: v.name
        })
    })
})

//发布
const onSubmit = async () => {
    const vaildArr = []
    if (topic.title === '') {
        vaildArr.push('题目')
    }
    if (topic.type === '') {
        vaildArr.push('类型')
    }
    let s = false
    solution.forEach((v) => {
        if (v.content === '') {
            s = true
        }
    })
    if (s) {
        vaildArr.push('答案')
    }

    if (vaildArr.length > 0) {
        ElMessage({
            message: `请完善${vaildArr.join('、')}，再发布`,
            type: 'warning',
        })
    } else {
        solution.forEach((v) => {
            if (solutionValue.value === v.label) {
                v.accurate = 1
            } else {
                v.accurate = 0
            }
        })
        const stringSolution = JSON.stringify(solution)

        const result = await addTopic(topic.title, topic.type, stringSolution)
        console.log(result)
        if (result) {
            ElMessage({
                showClose: true,
                message: '发布题目成功.',
                type: 'success',
            })
            topic.title = ''
            topic.type = ''
            solution.splice(0, solution.length)
            solution.push({ label: 1, content: '', del: false })
            solution.push({ label: 2, content: '', del: false })
        } else {
            ElMessage({
                showClose: true,
                message: '发布题目失败.',
                type: 'error',
            })
        }
    }
}

const solutionValue = ref("A")

const solution = reactive([
    { label: "A", content: '', del: false },
    { label: "B", content: '', del: false },
])

const solutionChange = () => {
    //topic solution
    //发送的数据、topic name、topic type 、 答案 JSON.stringify()

}

const addSolution = () => {
    const s = solution[solution.length - 1]
    solution.push({
        label:String.fromCharCode(s.label.charCodeAt(0) + 1) , content: '', del: true
    })
}

const delSolution = (label) => {
    let index
    solution.forEach((v, i, e) => {
        if (v.label === label) {
            index = i
            solution.splice(i, 1)
        }
    })

    if (solution.length >= (index + 1)) {
        for (let i = index; i < solution.length; i++) {
            solution[i].label = String.fromCharCode(solution[i].label.charCodeAt(0) - 1)
        }
    }
}

//********************************************** */

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


</script>
  
<style >
.account-container {
    width: 400px;
    margin: 20px;
}
</style>