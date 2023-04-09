<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, onMounted, reactive } from 'vue'
import UploadCover from '../views/UploadCover.vue'
import { getTags } from '../axios'
import { postVideo } from '../axios'


// 模拟 ajax 异步获取内容
onMounted(async () => {

})


// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {

})


//标题
const videoTitle = ref('')

//上传图片

/**
 * 设置标签的选择
 * 知识 和 案例，固定的
 * 再获取标签
 */

const typies = reactive([
    { value: 'knowledge', label: '知识区' },
])
const typeValue = ref('')
const categories = reactive([])
const categoryValue = ref('')
const typeChange = async () => {
    // 获取标签
    const result = await getTags('video', typeValue.value)
    const data = result.data
    categories.splice(0, categories.length)
    for (let c of data) {
        categories.push({ value: c.id, label: c.name })
    }
}

// cover封面数据
const fileRaw = ref(null)

const getUploadCover = (raw) => {
    // console.log(fileRaw.value)
    fileRaw.value = raw
    // console.log(fileRaw.value)
}

//发布文章
const postArticleClick = async () => {
    const vaildArr = []
    const title = videoTitle.value.trim()
    const tagid = categoryValue.value
    const managerid = 'admin'
    const formData = new FormData()
    // 检查
    if (title.length == 0) {
        vaildArr.push('标题')
    }
    if (categoryValue.value.length == 0) {
        vaildArr.push('标签')
    }
    if (fileRaw.value === null) {
        vaildArr.push('封面')
    }
    if (vaildArr.length == 0) {
        formData.append('title', title)
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

//上传视频
const videoForm = reactive({
    Video: '',
    videoUploadPercent: '',
    videoUploadId: '',
})
const videoFlag = ref(false)
const uploadUrl = ref("#") //你要上传视频到你后台的地址

</script>

<template>
    <div class="container">
        <el-row class="title">
            <el-col :span="2" style="font-size: 16px; font-weight: bold;">
                视频标题:
            </el-col>
            <el-col :span="19">
                <el-input v-model="videoTitle" placeholder="请输入标题" />
            </el-col>
            <el-col :span="3">
                <el-button @click="postArticleClick" style="height: 40px; width: 120px; font-size: 16px;"
                    type="primary">发布视频</el-button>
            </el-col>
        </el-row>

        <div style="height: 600px;">
            <el-upload class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="handleVideoSuccess"
                :on-progress="uploadVideoProcess" :before-upload="beforeUploadVideo">
                <video v-if="videoForm.Video != '' && videoFlag == false" :src="videoForm.Video" class="avatar"
                    controls="controls">您的浏览器不支持视频播放</video>
                <i v-else-if="videoForm.Video == '' && videoFlag == false" class="el-icon-plus avatar-uploader-icon"></i>
                <!-- 进度条 -->
                <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent"
                    style="margin-top:30px;"></el-progress>

            </el-upload>
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
                            <UploadCover :fileRaw="fileRaw" @uploadCover="getUploadCover"></UploadCover>
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
    min-width: 1000px !important;
    height: 100%;
    min-height: 1000px !important;
    flex-direction: column;
    padding: 10px;
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
