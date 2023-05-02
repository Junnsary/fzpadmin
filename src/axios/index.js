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

// -----------------------------------------------------------
// 问答

export const getAllQuestion = async (pageSize, currentPage, review) => {
    try {
        const response = await axios.get('/api/question/adminall', {
            params: {
                pagesize: pageSize,
                currentpage: currentPage,
                review,
            },
        })
        if (response.data.success) {
            return response.data.data
        } else {
            return null
        }
    } catch (error) {
        return false
    }
}

// 设置审核

export const questionReview = async (id, code) => {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/question/review',
            data: {
                questionid: id,
                reviewcode: code,
            },
        })
        return response.data.success
    } catch (error) {
        return false
    }
}

// 删除提问

export const deleteQuestion = async (id) => {
    try {
        const response = await axios({
            method: 'delete',
            url: '/api/question/',
            data: {
                questionid: id,
            },
        })
        return response.data.success
    } catch (error) {
        return false
    }
}

// 获取的topictype

export const getType = async () => {
    try {
        const response = await axios.get('/api/topictype/')
        if (response.data.success) {
            return response.data.data
        } else {
            return null
        }
    } catch (error) {
        return false
    }
}

export const addTopic = async (title, type, solution) => {
    // console.log(title, type, solution)
    try {
        const response = await axios({
            method: 'post',
            url: '/api/topic',
            data: {
                title,
                type,
                solution,
            },
        })
        console.log(response.data)
        return response.data.success
    } catch (error) {
        return false
    }
}

export const getAllTopic = async (pageSize, currentPage) => {
    try {
        const response = await axios.get('/api/topic', {
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
        return false
    }
}

export const deleteTopic = async (id) => {
    try {
        const response = await axios({
            method: 'delete',
            url: '/api/topic/',
            data: {
                topicid: id,
            },
        })
        return response.data.success
    } catch (error) {
        return false
    }
}

export const addType = async (raw) => {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/user',
            data: {
                name: raw.name,
                describe: raw.describe,
            },
        })
        return response.data.success
    } catch (error) {
        return false
    }
}
export const delType = async (id) => {
    try {
        const response = await axios({
            method: 'delete',
            url: '/api/topictype',
            data: {
                id,
            },
        })
        return response.data.success
    } catch (error) {
        return false
    }
}
