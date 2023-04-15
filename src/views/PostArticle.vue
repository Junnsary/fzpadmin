<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted, reactive, nextTick } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import UploadCover from '../views/UploadCover.vue'
import { getTags } from '../axios'
import { postArticle } from '../axios'
import { useRouter } from 'vue-router'
import { getLoginInfo } from '../utils/loginInfo'

const router = useRouter()

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
// const valueHtml = ref('<p>hello world!</p>')
const valueHtml = ref('')

// 模拟 ajax 异步获取内容
onMounted(async () => {
    // setTimeout(() => {
    //     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
    // }, 1500)

})

const toolbarConfig = {}
const editorConfig = {
    placeholder: '请输入内容...', MENU_CONF: [],
    withCredentials: true,
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

//标题
const articleTitle = ref('')

//上传图片

editorConfig.MENU_CONF['uploadImage'] = {
    server: '/api/article/articlepicture',
    // form-data fieldName ，默认值 'wangeditor-uploaded-image'
    fieldName: 'articlepicture',

    // 单个文件的最大体积限制，默认为 2M
    maxFileSize: 10 * 1024 * 1024, // 1M

    // 最多可上传几个文件，默认为 100
    maxNumberOfFiles: 10,

    // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
    allowedFileTypes: ['image/*'],

    // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
    // meta: {
    //     token: 'xxx',
    //     otherKey: 'yyy'
    // },

    // 将 meta 拼接到 url 参数中，默认 false
    // metaWithUrl: false,

    // 自定义增加 http  header
    // headers: {
    //     Accept: 'text/x-json',
    //     otherKey: 'xxx'
    // },

    // 跨域是否传递 cookie ，默认为 false
    // withCredentials: true,

    // 超时时间，默认为 10 秒
    timeout: 5 * 1000, // 5 秒

    // 上传之前触发
    onBeforeUpload(file) { // TS 语法
        // onBeforeUpload(file) {    // JS 语法
        // file 选中的文件，格式如 { key: file }
        // console.log(file)

        // const size = 1024 * 1024 * 5
        // const type = ['image/jpeg', 'image/jpg', 'image/png']

        // if (!type.includes(file.type)) {
        //     ElMessage({
        //         message: '文件类型错误，请重新上传jpg,png,jpeg类型图片',
        //         type: 'warning',
        //     })
        //     return false
        // } else if (file.size > size) {
        //     ElMessage({
        //         message: '文件过大，请上传小于5M的文件',
        //         type: 'warning',
        //     })
        //     return false
        // } else {
        //     return file
        // }

        return file
        // 可以 return
        // 1. return file 或者 new 一个 file ，接下来将上传
        // 2. return false ，不上传这个 file
    },

    // 上传进度的回调函数
    onProgress(progress) {  // TS 语法
        // onProgress(progress) {       // JS 语法
        // progress 是 0-100 的数字
        console.log('progress', progress)
    },

    // 单个文件上传成功之后
    onSuccess(file, res) {  // TS 语法
        // onSuccess(file, res) {          // JS 语法
        ElMessage({
            message: '上传图片成功',
            type: 'success',
        })
    },

    // 单个文件上传失败
    onFailed(file, res) {   // TS 语法
        // onFailed(file, res) {           // JS 语法
        console.log(`${file.name} 上传失败`, res)
    },

    // 上传错误，或者触发 timeout 超时
    onError(file, err, res) {  // TS 语法
        // onError(file, err, res) {               // JS 语法
        console.log(`${file.name} 上传出错`, err, res)
    },
}

/**
 * 设置标签的选择
 * 知识 和 案例，固定的
 * 再获取标签
 */

const typies = reactive([
    { value: 'knowledge', label: '知识区' },
    { value: 'case', label: '案例区' }
])
const typeValue = ref('')

const categories = reactive([])
const categoryValue = ref('')


const typeChange = async () => {
    categoryValue.value = ''
    // 获取标签
    const result = await getTags('article', typeValue.value)
    const data = result.data
    categories.splice(0, categories.length)
    for (let c of data) {
        categories.push({ value: c.id, label: c.name })
    }
}

const fileRaw = ref(null)

const getUploadCover = (raw) => {
    // console.log(fileRaw.value)
    fileRaw.value = raw
    // console.log(fileRaw.value)
}

//发布文章
const postArticleClick = async () => {
    const adminInfo = getLoginInfo()
    const vaildArr = []
    const title = articleTitle.value.trim()
    const content = valueHtml.value.trim()
    const tagid = categoryValue.value
    const managerid = adminInfo.id
    const formData = new FormData()
    // 检查
    if (title.length == 0) {
        vaildArr.push('标题')
    }
    // console.log(content)
    if (content === '<p><br></p>') {
        vaildArr.push('内容')
    }
    if (categoryValue.value.length == 0) {
        vaildArr.push('标签')
    }
    if (fileRaw.value === null) {
        vaildArr.push('封面')
    }

    if (vaildArr.length == 0) {
        formData.append('title', title)
        formData.append('content', content)
        formData.append('managerid', managerid)
        formData.append('tagid', tagid)
        formData.append('cover', fileRaw.value)
        const result = await postArticle(formData)
        if (result) {
            ElMessage({
                showClose: true,
                message: '发布文章成功.',
                type: 'success',
            })
            //重置
            // articleTitle.value = ''
            // valueHtml.value = ''
            // categoryValue.value = ''
            // typeValue.value = ''
            // forceRerender()
            router.push('/postsuccess/article')

        } else {
            ElMessage({
                showClose: true,
                message: '发布文章失败.',
                type: 'error',
            })
        }
        // console.log(result)

    } else {
        ElMessage({
            message: `请完善${vaildArr.join('、')}`,
            type: 'warning',
        })
    }
}
//重新渲染
const renderComponent = ref(true)

const forceRerender = () => {
    renderComponent.value = false
    nextTick(() => {
        renderComponent.value = true
    })
}
</script>

<template>
    <div class="container">
        <el-row class="title">
            <el-col :span="2" style="font-size: 16px; font-weight: bold;">
                文章标题:
            </el-col>
            <el-col :span="19">
                <el-input v-model="articleTitle" placeholder="请输入标题" />
            </el-col>
            <el-col :span="3">
                <el-button @click="postArticleClick" style="height: 40px; width: 120px; font-size: 16px;"
                    type="primary">发布文章</el-button>
            </el-col>
        </el-row>

        <div style="border: 1px solid #ccc; ">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                :mode="mode" />
            <Editor style="height: 580px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
                :mode="mode" @onCreated="handleCreated" />
        </div>

        <div class="footer">
            <el-row class="send">
                <el-col :span="12" class="tag">
                    <el-row>
                        <el-col :span="3">
                            选择标签:
                        </el-col>
                        <el-col :span="7">
                            <el-select @change="typeChange" v-model="typeValue" class="m-2" placeholder="选择类别">
                                <el-option v-for="item in typies" :key="item.value" :label="item.label"
                                    :value="item.value" />

                            </el-select>
                        </el-col>
                        <el-col :span="10">
                            <el-select v-model="categoryValue" class="m-2" placeholder="选择标签">
                                <el-option v-for="item in categories" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-col>
                    </el-row>
                </el-col>

                <el-col :span="12">
                    <el-row>
                        <el-col :span="4">
                            <p>上传封面：</p>
                        </el-col>
                        <el-col :span="20">
                            <UploadCover v-if="renderComponent" :fileRaw="fileRaw" @uploadCover="getUploadCover">
                            </UploadCover>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    width: 100% !important;
    min-width: 800px;
    height: 100%;
    flex-direction: column;
    box-sizing: border-box;

    .title {
        height: 50px;
        // background-color: red;
        align-items: center;

        div {
            text-align: center;
        }
    }

    .footer {
        height: 120px;
        margin-top: 20px;

        .send {
            height: 100%;

            .tag {
                .el-row {
                    margin-top: 15px;
                    padding-left: 15px;
                }
            }
        }
    }
}
</style>
