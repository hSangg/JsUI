import postApi from "./api/postApi"
import { handlePostForm } from "./utils"
import showNoti from "./utils/showNoti"



async function handleSubmitForm(formValue) {
    // check post or edit
    const post = formValue.id
        ? await postApi.update(formValue)
        : await postApi.add(formValue)

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

        const optionSelect = document.querySelector('.form-select')
        optionSelect.onchange = (e) => {
            console.log(optionSelect.value)
        }



    } catch (error) {
        console.log(error)
    }
})()
