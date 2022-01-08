/**
 * with many methods like: 
 * 🙏 get all -> get url
 * 🙏 get by id -> url/id
 * 🙏 add -> data --> .post(data)
 * 🙏 update --> data --> patch-> id
 * 🙏 remove --> url/id 
 * 
 */

import axiosCilent from "./axiosCilent"

const postApi = {
    getAll(params) {

        const url = '/posts'
        return axiosCilent.get(url, { params },)

    },
    getById(id) {
        const url = `/posts/${id}`
        return axiosCilent.get(url)
    },
    add(data) {
        const url = '/posts'
        return axiosCilent.post(url, data)
    },
    addFormData(data) {
        const url = '/with-thumbnail/posts'
        return axiosCilent.post(url, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    update(data) {
        const url = `/posts/${data.id}`
        return axiosCilent.patch(url, data)
    },
    updateFormData(data) {
        const url = `/with-thumbnail/posts/${data.get('id')}`
        return axiosCilent.patch(url, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    },
    remove(id) {
        const url = `/posts/${id}`
        return axiosCilent.delete(url)
    }
}

export default postApi
