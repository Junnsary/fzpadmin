<template>
    <el-table border :data="articleTable" style="width: 100%" :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }">
        <el-table-column label="序号">
            <template #default="scope">
                <span>{{ scope.row.num }}</span>
            </template>
        </el-table-column>
        <el-table-column label="编号">
            <template #default="scope">
                <span>{{ scope.row.id }}</span>
            </template>
        </el-table-column>
        <el-table-column label="标题">
            <template #default="scope">
                <span>{{ scope.row.title }}</span>
            </template>
        </el-table-column>
        <el-table-column label="视频">
            <template #default="scope">
                <el-button @click="previewCotent(scope.row.content, scope.row.cover)" size="small"
                    type="primary">查看视频</el-button>
                <!-- <span>{{ scope.row.content }}</span> -->
            </template>
        </el-table-column>
        <el-table-column label="创建时间">
            <template #default="scope">
                <span>{{ scope.row.created_at }}</span>
            </template>
        </el-table-column>
        <el-table-column label="更新时间">
            <template #default="scope">
                <span>{{ scope.row.updated_at }}</span>
            </template>
        </el-table-column>
        <el-table-column label="分类">
            <template #default="scope">
                <span>{{ scope.row.type }}</span>
            </template>
        </el-table-column>
        <el-table-column label="标签">
            <template #default="scope">
                <el-tag>{{ scope.row.tag }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="封面">
            <template #default="scope">
                <!-- <span>{{ scope.row.cover }}</span> -->
                <el-image style=" height: 30px" :src="scope.row.cover" :zoom-rate="1.2" :preview-teleported="true"
                    :preview-src-list="[scope.row.cover]" :initial-index="0" fit="cover" />
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-popconfirm title="确认删除？" @confirm="confirmDelete(scope.row)">
                    <template #reference>
                        <el-button size="small" type="danger">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <div style="display: flex; justify-content: center;">
        <el-pagination @current-change="changePage" background :default-page-size="pagesize"
            layout="prev, pager, next, total" :total="total" />
    </div>
    <!-- 对话框 -->
    <el-dialog v-model="dialogVisible" title="视频" width="40%" :before-close="handleClose" draggable top="8vh">
        <vue3VideoPlay v-if="videoPause" v-bind="options" />
        <!-- :poster="videoPoster" /> -->
    </el-dialog>
</template>
  
<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getAllVideo, delVideo } from '../axios'
import { getFormatDate } from '../utils/date'
import { trunKnowlegdeCase } from '../utils/turn'
//获取文章列表表格数据

const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)

const getVideosTotal = async (size, page) => {
    const result = await getAllVideo(size, page)
    // console.log(result)
    articleTable.splice(0, articleTable.length)
    result.articleList.forEach((v,i) => {
        // console.log(typeof element.created_at)  string
        console.log(v)
        articleTable.push({
            num: (i + 1) + ((page-1)*size),
            id: v.id,
            title: v.title,
            content: v.file_name, //文件名字
            created_at: getFormatDate(v.created_at),
            updated_at: getFormatDate(v.updated_at),
            status: v.status,
            type: trunKnowlegdeCase(v.tag.category),
            tag: v.tag.name,
            cover: `/uploads/images/${v.cover}`
        })
    });
    total.value = result.total
}

onMounted(async () => {
    getVideosTotal(pageSize.value, currentPage.value)
})


// 文章列表的表格


const articleTable = reactive([])

const confirmDelete = async (row) => {
    const result = await delVideo(row.id)
    if (result) {
        getVideosTotal(pageSize.value, currentPage.value)
        ElMessage({
            showClose: true,
            message: '删除成功！',
            type: 'success',
        })
    } else {
        ElMessage({
            showClose: true,
            message: '删除失败！',
            type: 'error',
        })
    }
}


// 对话框 - 显示文章内容

const dialogVisible = ref(false)

const handleClose = (done) => {
    done()
    videoPause.value = false
}

const previewCotent = (content, cover) => {
    // console.log(content)
    videoPause.value = true
    dialogVisible.value = true
    //改变视频的播放源
    const BASE_URL = "http://localhost:3000/uploads/videos/"
    options.src = `/uploads/videos/${content}`
    // options.value = `${BASE_URL}${cover}`
}

//分页
const changePage = (num) => {
    getVideosTotal(pageSize.value, num)
    currentPage.value = num
}

//视频播放
const options = reactive({
    width: "100%", //播放器高度 //播放器高度
    color: "#409eff", //主题色
    title: "", //视频名称
    src: "", //视频源
    poster: "",
    muted: false, //静音
    webFullScreen: false,
    speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
    autoPlay: false, //自动播放
    loop: false, //循环播放
    mirror: false, //镜像画面
    ligthOff: false, //关灯模式
    volume: 0.3, //默认音量大小
    control: true, //是否显示控制
    controlBtns: [
        "audioTrack",
        "quality",
        "speedRate",
        "volume",
        "setting",
        // "pip",
        "pageFullScreen",
        "fullScreen",
    ], //显示所有按钮,
});

//暂停
const videoPause = ref(true)

</script>
  

<style lang="scss" scoped>
.container {
    display: flex;
    padding: 40px;
    box-sizing: border-box;
    flex-direction: column;
}
</style>