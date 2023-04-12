<script setup>
import { defineProps } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// const props = defineProps['type']
const router = useRouter()
const route = useRoute()
const type = route.params.type
console.log(type)
const postPage = () => {
    if (type === 'article') {
        router.push('/postarticle')
    } else {
        router.push('/postvideo')
    }
}

const managerPage = () => {
    if (type === 'article') {
        router.push('/articlemanager')
    } else {
        router.push('/videomanager')
    }
}

</script>

<template>
    <el-result icon="success" title="发布成功！" sub-title="选择跳转到..">
        <template #extra>
            <el-button @click="postPage" type="primary">回到发布页面</el-button>
            <el-button @click="managerPage" type="primary">去到管理页面</el-button>
        </template>
    </el-result>
</template>

<style></style>
