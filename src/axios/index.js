import axios from 'axios'

export const getTags = async (type, category) => {
    try {
        const response = await axios.get(`/api/tags/${type}/${category}`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const postArticle = async (data) => {
    try {
        let config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        }
        const response = await axios.post(`/api/article/postarticle`, data, config)
        if (response.data.success) {
            return true
        } else {
            return false
        }
    } catch (error) {
        // console.error(error)
        return false
    }
}

export const postVideo = async (data, cb) => {
    try {
        let config = {
            headers: { 'Content-Type': 'multipart/form-data' },
            // onUploadProgress: (progressEvent) => cb(onHandleUploadProgress(progressEvent)),
            onUploadProgress: (progressEvent) => {
                let event = progressEvent.event
                // console.log(event)
                let num = Math.round((event.loaded / event.total) * 10000) / 100.0
                cb(num)
            },
        }
        const response = await axios.post(`/api/video/`, data, config)
        if (response.data.success) {
            return true
        } else {
            return false
        }
    } catch (error) {
        // console.error(error)
        return false
    }
}
