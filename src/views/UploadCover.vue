<template>
    <el-upload action="#" list-type="picture-card" :auto-upload="false" limit="1" :disabled="disabledUpload"
        :on-change="(file, files) => changeUpload(file, files)" accept=".jpg,.png,.jpeg">

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
    /**
     * 先判断类型，类型对了，就判断大小
     */
    console.log(file)
    const size = 1024 * 1024 * 5
    const type = ['image/jpeg', 'image/jpg', 'image/png']

    if (!type.includes(file.raw.type)) {
        files.splice(0, files.length)
        ElMessage({
            message: '文件类型错误，请重新上传jpg,png,jpeg类型图片',
            type: 'warning',
        })
    } else if (file.size > size) {
        files.splice(0, files.length)
        ElMessage({
            message: '文件过大，请上传小于5M的文件',
            type: 'warning',
        })
    } else {
        fileList = files
        disabledUpload.value = true
        emit('uploadCover', file.raw)
    }
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


const uploadBefore = (file) => {
    console.log(file)
    console.log(123)
    return true
}


</script>
  