import postApi from "./api/postApi"
import { handlePostForm } from "./utils"
import showNoti from "./utils/showNoti"

function deleteUnUseField(formValue) {
    if (formValue.imageSource === 'usingUnplash')
        delete formValue.image
    else
        delete formValue.backgroundUrl

    delete formValue.imageSource

    return formValue
}

function jsonToFormData(formValue) {
    const formData = new FormData()

    for (const key in formValue)
        formData.set(key, formValue[key])


    return formData
}

async function handleSubmitForm(formValue) {
    deleteUnUseField(formValue)
    const formData = jsonToFormData(formValue)

    // check post or edit
    const post = formValue.id
        ? await postApi.updateFormData(formData)
        : await postApi.addFormData(formData)

    //show noti
    showNoti.succ('update successfully')

    // move to post detail
    setTimeout(() => {
        window.location.assign(`/post-detail.html?id=${post.id}`)
    }, 1500)

}

//main 😜
(async () => {
    try {
        const queryParam = new URLSearchParams(window.location.search)
        const postId = queryParam.get('id')

        const post = postId ? await postApi.getById(postId) : {
            title: '',
            author: '',
            description: '',
            imageUrl: '',
        }

        handlePostForm({
            form: "#postForm",
            initialValue: post,
            onSubmit: handleSubmitForm
        })

    } catch (error) {

    }
})()
