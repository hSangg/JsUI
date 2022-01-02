import postApi from "./api/postApi"

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



    } catch (error) {
        console.log(error)
    }
})()
