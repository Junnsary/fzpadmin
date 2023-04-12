<script setup>
import { reactive, onMounted } from 'vue'
import { getQuantity } from '@/axios'
const num = reactive({
    article: 0,
    video: 0,
    user: 0,
})

onMounted(async () => {
    const result = await getQuantity()
    console.log(result)
    num.article = result.article
    num.video = result.video
    num.user = result.user
})

</script>

<template>
    <el-row>
        <el-col class="col-card" :xs="24" :sm="24" :md="8">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>发布文章数量</span>
                    </div>
                </template>
                <div class="card-body">
                    <img class="show-img" src="@assets/post-article.png" alt="">
                    <span class="show-num">{{ num.article }}</span>
                </div>
            </el-card>
        </el-col>
        <el-col class="col-card" :xs="24" :sm="24" :md="8">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>发布视频数量</span>
                    </div>
                </template>
                <div class="card-body">
                    <img class="show-img" src="@assets/post-video.png" alt="">
                    <span class="show-num">{{ num.video }}</span>
                </div>
            </el-card>
        </el-col>
        <el-col class="col-card" :xs="24" :sm="24" :md="8">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span>用户数量</span>
                    </div>
                </template>
                <div class="card-body">
                    <img class="show-img" src="@assets/user.png" alt="">
                    <span class="show-num">{{ num.user }}</span>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>



<style scoped>
.index-container {
    display: flex;
    justify-content: space-around;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 80%;
}

.col-card {
    display: flex;
    justify-content: center;
}

.show-img {
    width: 100px;
}

.show-num {
    font-size: 2.5em;
    font-weight: bold;
    margin-right: 70px;
    color: #79bbff;
}

.card-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
