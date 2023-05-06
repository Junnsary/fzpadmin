<template>
    <el-button  style="margin-bottom: 15px;" type="primary"  @click="handleRefresh">刷新</el-button>
    
    <el-table border :data="questionTable" style="width: 100%" :header-cell-style="{ textAlign: 'center' }" :default-sort="{ prop: 'num', order: 'ascending' }"
        :cell-style="{ textAlign: 'center' }">
        <el-table-column label="序号"  sortable prop="num">
            <template #default="scope">
                <span>{{ scope.row.num }}</span>
            </template>
        </el-table-column>
        <el-table-column label="编号">
            <template #default="scope">
                <span>{{ scope.row.id }}</span>
            </template>
        </el-table-column>
        <el-table-column label="内容">
            <template #default="scope">
                <el-button @click="previewCotent(scope.row.content)" size="small" type="primary">查看内容</el-button>
                <!-- <span>{{ scope.row.content }}</span> -->
            </template>
        </el-table-column>
        <el-table-column label="创建时间">
            <template #default="scope">
                <span>{{ scope.row.created_at }}</span>
            </template>
        </el-table-column>
        <el-table-column label="用户">
            <template #default="scope">
                <span>{{ scope.row.user_id }}</span>
            </template>
        </el-table-column>
        <el-table-column label="状态">
            <template #default="scope">
                <span>等待审核</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-popconfirm title="确认？" @confirm="reviewSuccess(scope.row)">
                    <template #reference>
                        <el-button size="small" type="danger">通过</el-button>
                    </template>
                </el-popconfirm>
                <el-popconfirm title="确认？" @confirm="reviewFail(scope.row)">
                    <template #reference>
                        <el-button size="small" type="danger">不通过</el-button>
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
    <el-dialog v-model="dialogVisible" title="提问内容" width="50%" :before-close="handleClose" draggable top="8vh">
        <span v-html="artilceContent"></span>
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
import { questionReview, getAllQuestion } from '../axios'
import { getFormatDate } from '../utils/date'

//获取文章列表表格数据

const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)

const getQuestionsTotal = async (size, page) => {
    const result = await getAllQuestion(size, page, 0)
    questionTable.splice(0, questionTable.length) //删除当前的数据

    result.articleList.forEach((element,i) => { //添加新的数据
        questionTable.push({
            num: i + 1,
            id: element.id,
            content: element.content,
            created_at: getFormatDate(element.created_at),
            user_id: element.user_id
        })
    });
    total.value = result.total
}


const handleRefresh = async () => { 
    await getQuestionsTotal(pageSize.value, currentPage.value)
    ElMessage({
            showClose: true,
            message: '刷新成功！',
            type: 'success',
    })
}

onMounted(async () => {
    getQuestionsTotal(pageSize.value, currentPage.value)  //初始化的时候获取
})


// 文章列表的表格

const questionTable = reactive([])

const reviewSuccess = async (row) => {
    console.log(row)
    const result = await questionReview(row.id, 1)
    if (result) {
        getQuestionsTotal(pageSize.value, currentPage.value)
        ElMessage({
            showClose: true,
            message: '已通过！',
            type: 'success',
        })
    } else {
        ElMessage({
            showClose: true,
            message: '审核失败！',
            type: 'error',
        })
    }
}


const reviewFail = async (row) => {
    console.log(row)
    const result = await questionReview(row.id, 2)
    if (result) {
        getQuestionsTotal(pageSize.value, currentPage.value)
        ElMessage({
            showClose: true,
            message: '不通过！',
            type: 'success',
        })
    } else {
        ElMessage({
            showClose: true,
            message: '审核失败！',
            type: 'error',
        })
    }
}


// 对话框 - 显示文章内容

const artilceContent = ref('')

const dialogVisible = ref(false)

const handleClose = (done) => {
    done()
    artilceContent.value = ''
}

const previewCotent = (content) => {
    dialogVisible.value = true
    artilceContent.value = content
}

//分页
const changePage = (num) => {
    getQuestionsTotal(pageSize.value, num)
    currentPage.value = num
}
</script>
  