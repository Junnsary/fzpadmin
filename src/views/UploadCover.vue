<template>
    <el-upload action="#" list-type="picture-card" :auto-upload="false" limit="1" :disabled="disabledUpload"
        :on-change="(file, files) => changeUpload(file, files)">
        <el-icon>
            <Plus />
        </el-icon>

        <template #file="{ file }">
            <div>
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <el-icon><zoom-in /></el-icon>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                        <el-icon>
                            <Delete />
                        </el-icon>
                    </span>
                </span>
            </div>
        </template>
    </el-upload>

    <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="预览图片" />
    </el-dialog>
</template>
<script  setup>
import { ref, defineProps, defineEmits } from 'vue'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'

const props = defineProps(['fileRaw'])
const emit = defineEmits(['uploadCover'])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const disabledUpload = ref(false)

let fileList = []

const changeUpload = (file, files) => {
    fileList = files
    // console.log(fileList)
    // console.log(files)

    // console.log(file.raw)
    disabledUpload.value = true
    emit('uploadCover', file.raw)
}

const handleRemove = (file) => {
    // console.log(file)
    //删除图片
    fileList.forEach((value, index) => {
        if (file === value) {
            fileList.splice(index, 1)
        }
    })
    // console.log(fileList)
    disabledUpload.value = false
    emit('uploadCover', null)
}

const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url
    dialogVisible.value = true
}



</script>
  