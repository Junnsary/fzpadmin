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

export const postVideo = async (data) => {
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
