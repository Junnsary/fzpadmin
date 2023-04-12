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

export const getAllArticle = async (pageSize, currentPage) => {
    try {
        const response = await axios.get('/api/article/all', {
            params: {
                pagesize: pageSize,
                currentpage: currentPage,
            },
        })
        if (response.data.success) {
            return response.data.data
        } else {
            return null
        }
    } catch (error) {
        // console.error(error)
        return false
    }
}

export const delArticle = async (id) => {
    try {
        const response = await axios.delete(`/api/article/${id}`)
        return response.data.success
    } catch (error) {
        // console.error(error)
        return false
    }
}

export const getAllVideo = async (pageSize, currentPage) => {
    try {
        const response = await axios.get('/api/video/all', {
            params: {
                pagesize: pageSize,
                currentpage: currentPage,
            },
        })
        if (response.data.success) {
            return response.data.data
        } else {
            return null
        }
    } catch (error) {
        // console.error(error)
        return false
    }
}

export const delVideo = async (id) => {
    try {
        const response = await axios.delete(`/api/video/${id}`)
        return response.data.success
    } catch (error) {
        // console.error(error)
        return false
    }
}

export const getTagList = async (category, type) => {
    try {
        const response = await axios.get('/api/tags/list', {
            params: {
                category,
                type,
            },
        })
        return response.data.data
    } catch (error) {
        return null
    }
}

export const addTag = async (formData) => {
    console.log(formData)
    try {
        const response = await axios.post('/api/tags', formData)
        return response.data.success
    } catch (error) {
        return false
    }
}

export const delTag = async (id) => {
    try {
        const response = await axios({
            method: 'delete',
            url: '/api/tags',
            data: {
                id,
            },
        })
        return response.data.success
    } catch (error) {
        return false
    }
}

export const adminLogin = async (formData) => {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/manager/login',
            data: formData,
        })
        return response.data
    } catch (error) {
        return false
    }
}

export const modifPasswd = async (formData) => {
    console.log(formData)
    try {
        const response = await axios({
            method: 'post',
            url: '/api/manager/passwd',
            data: formData,
        })
        return response.data.success
    } catch (error) {
        return false
    }
}

export const getQuantity = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/sources/quantity',
        })
        return response.data.data
    } catch (error) {
        return false
    }
}
