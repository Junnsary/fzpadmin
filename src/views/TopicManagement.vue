<template>
    <el-table border :data="questionTable" style="width: 100%" :header-cell-style="{ textAlign: 'center' }"
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
        <el-table-column label="题目">
            <template #default="scope">
                {{ scope.row.title }}
            </template>
        </el-table-column>
        <el-table-column label="答案">
            <template #default="scope">
                <el-button @click="previewCotent(scope.row.content)" size="small" type="primary">查看题目</el-button>
            </template>
        </el-table-column>
        <el-table-column label="创建时间">
            <template #default="scope">
                <span>{{ scope.row.created_at }}</span>
            </template>
        </el-table-column>
        <el-table-column label="类型">
            <template #default="scope">
                <span>{{ scope.row.topic_type }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-popconfirm title="确认删除？" @confirm="topicDelete(scope.row)">
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
    <el-dialog v-model="dialogVisible" title="文章内容" width="30%" :before-close="handleClose" draggable top="12vh">
        <span class="text"><span class="stronge">题目：</span>{{ topicContent.title }}</span>
        <div class="text"><span class="stronge">答案(绿色为正确答案)：</span></div>
        <div class="text" v-for="(temp, index) in  topicContent.solutions ">
            <span :class="{ isAccurate: temp.accurate }">{{ String.fromCharCode(index + ('A').charCodeAt(0)) }}. {{ temp.content }}</span>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup>
import { ref, onMounted, reactive, toRaw } from 'vue'
import { deleteTopic, getAllTopic } from '../axios'
import { getFormatDate } from '../utils/date'

//获取文章列表表格数据

const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)

const getTopicTotal = async (size, page) => {
    const result = await getAllTopic(size, page)
    questionTable.splice(0, questionTable.length) //删除当前的数据
    console.log(result)
    result.topic.forEach((v,i) => { //添加新的数据
        questionTable.push({
            num: (i + 1) + ((page-1)*size),
            id: v.topic.id,
            title: truncateString(v.topic.title, 8),
            content: { title: v.topic.title, solutions: v.solutions },
            created_at: getFormatDate(v.topic.created_at),
            topic_type: v.topic.topic_type.name
        })
    });
    total.value = result.total
}

function truncateString(str, num) {
    if (str.length > num) {
        return str.slice(0, num) + "...";
    } else {
        return str;
    }
}

onMounted(async () => {
    getTopicTotal(pageSize.value, currentPage.value)  //初始化的时候获取
})


// 文章列表的表格

const questionTable = reactive([])

const topicDelete = async (row) => {
    console.log(row)
    const result = await deleteTopic(row.id)
    if (result) {
        getTopicTotal(pageSize.value, currentPage.value)
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

const topicContent = ref({})

const dialogVisible = ref(false)

const handleClose = (done) => {
    done()
    topicContent.value = {}
}

const previewCotent = (content) => {
    dialogVisible.value = true
    topicContent.value = content
}

//分页
const changePage = (num) => {
    getTopicTotal(pageSize.value, num)
    currentPage.value = num
}
</script>

<style scoped>
.isAccurate {
    color: rgb(41, 145, 81);
    font-weight: bold;
    font-size: 18px;
}

.text {
    font-size: 16px;
    color: black;
    margin-top: 20px;
}

.stronge {
    /* color: blue; */
}
</style>
  