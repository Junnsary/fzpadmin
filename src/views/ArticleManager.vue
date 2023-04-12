<template>
    <el-table border :data="articleTable" style="width: 100%" :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }">
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
        <el-table-column label="更新时间">
            <template #default="scope">
                <span>{{ scope.row.updated_at }}</span>
            </template>
        </el-table-column>
        <!-- <el-table-column label="状态">
                <template #default="scope">
                    <span>{{ scope.row.status }}</span>
                </template>
            </el-table-column> -->
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
    <el-dialog v-model="dialogVisible" title="文章内容" width="50%" :before-close="handleClose" draggable top="8vh">
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
import { getAllArticle, delArticle } from '../axios'
import { getFormatDate } from '../utils/date'
import { trunKnowlegdeCase } from '../utils/turn'
//获取文章列表表格数据

const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)

const getArticlesTotal = async (size, page) => {
    const result = await getAllArticle(size, page)
    // console.log(result)
    articleTable.splice(0, articleTable.length)
    console.log(result.articleList)
    result.articleList.forEach(element => {
        // console.log(typeof element.created_at)  string
        console.log()
        articleTable.push({
            id: element.id,
            title: element.title,
            content: element.content,
            created_at: getFormatDate(element.created_at),
            updated_at: getFormatDate(element.updated_at),
            status: element.status,
            type: trunKnowlegdeCase(element.tag.category),
            tag: element.tag.name,
            cover: `/image/${element.cover}`
        })
    });
    total.value = result.total
}

onMounted(async () => {
    getArticlesTotal(pageSize.value, currentPage.value)
})


// 文章列表的表格

const articleTable = reactive([])

const confirmDelete = async (row) => {
    const result = await delArticle(row.id)
    if (result) {
        getArticlesTotal(pageSize.value, currentPage.value)
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
    getArticlesTotal(pageSize.value, num)
    currentPage.value = num
}
</script>
  

<style lang="scss" scoped>
// .container {
//     display: flex;
//     flex-direction: column;
// }
</style>