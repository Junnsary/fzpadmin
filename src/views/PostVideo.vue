<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, onMounted, reactive, watch } from 'vue'
import UploadCover from '../views/UploadCover.vue'
import { getTags } from '../axios'
import { postVideo } from '../axios'
import { val } from 'dom7'
import { useRouter } from 'vue-router'
import { getLoginInfo } from '../utils/loginInfo'

const router = useRouter()

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
    categoryValue.value = ''
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
const postVideoClick = async () => {
    const adminInfo = getLoginInfo()
    const vaildArr = []
    const title = videoTitle.value.trim()
    const tagid = categoryValue.value
    const managerid = adminInfo.id
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
    if (videoRaw.value === null) {
        vaildArr.push('视频')
    }
    if (vaildArr.length == 0) {
        formData.append('title', title)
        formData.append('managerid', managerid)
        formData.append('tagid', tagid)
        formData.append('cover', fileRaw.value)
        formData.append('video', videoRaw.value)
        // console.log(title, managerid, tagid, fileRaw.value, videoRaw.value)
        videoProgress.value = true
        const result = await postVideo(formData, (num) => {
            videoProgressLoaded.value = num
        })
        if (result) {
            ElMessage({
                showClose: true,
                message: '发布视频成功.',
                type: 'success',
            })
            // router.push('/videomanager')
        } else {
            ElMessage({
                showClose: true,
                message: '发布视频失败.',
                type: 'error',
            })
        }
        console.log(result)
    } else {
        ElMessage({
            message: `请完善${vaildArr.join('、')}`,
            type: 'warning',
        })
    }
}

const videoRaw = ref(null)

const onVideoChange = (file, files) => {

    console.log(file)
    const size = 1024 * 1024 * 100
    const type = ['video/mp4']

    if (!type.includes(file.raw.type)) {
        files.splice(0, files.length)
        ElMessage({
            message: '文件类型错误，请重新上传 mp4类型的视频',
            type: 'warning',
        })
    } else if (file.size > size) {
        files.splice(0, files.length)
        ElMessage({
            message: '文件过大，请上传小于100M的文件',
            type: 'warning',
        })
    } else {
        videoRaw.value = file.raw
    }
}

const onVideoRemove = (file, files) => {
    // console.log(videoFiles)
    videoRaw.value = null
}

const videoProgress = ref(false)

const videoProgressLoaded = ref(0)

watch(videoProgressLoaded, (newValue, oldValue) => {
    console.log('old:', oldValue)
    console.log('new:', newValue)
    if (newValue.toString() === '100') {
        setTimeout(() => {
            router.push('/postsuccess/video')
        }, 1500);
    }
})

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
                <el-button @click="postVideoClick" style="height: 40px; width: 120px; font-size: 16px;"
                    type="primary">发布视频</el-button>
            </el-col>
        </el-row>

        <div class="uploadUpload">
            <el-upload class="upload-demo" drag action="#" :auto-upload="false" limit="1"
                :on-change="(file, files) => onVideoChange(file, files)"
                :on-remove="(file, files) => onVideoRemove(file, files)" accept=".mp4">

                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    拖拽文件 或者 <em>点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        <!-- jpg/png files with a size less than 500kb -->
                        上传一个不超过50MB的Mp4类型的视频
                    </div>
                </template>
                <el-progress v-if="videoProgress" style="margin-top: 20px;" :text-inside="true" :stroke-width="24"
                    :percentage="videoProgressLoaded" status="success" />
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
    min-width: 100%;
    height: 100%;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: space-between;

    .title {
        height: 50px;
        // background-color: red;
        align-items: center;

        div {
            text-align: center;
        }
    }

    .uploadUpload {
        margin-top: 100px;
        height: 300px;
        padding-left: 100px;
        padding-right: 100px;
    }

    .footer {
        height: 140px;
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
