import dayjs from "dayjs";
import postApi from "./api/postApi";
import { pictureUrl } from "./constants/bannerListLink.js";
import { resignterLightBox, setTextContent } from "./utils";



//query so fast 🙆‍♂️
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function renderUiPost(post) {
    //selector
    const postDetailElement = $('.post-detail')
    if (!postDetailElement) return
    setTextContent(postDetailElement, '#postDetailTitle', post.title)
    setTextContent(postDetailElement, '.post-description', post.description)

    const imageElement = $('.post-image')
    if (!imageElement) return
    imageElement.src = post.imageUrl
    imageElement.addEventListener('error', () => {
        imageElement.src = `https://images.unsplash.com/photo-1536107026912-d993e101312f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80`
    })

    setTextContent(postDetailElement, '#postDetailAuthor', `${post.author} - `)
    setTextContent(postDetailElement, '#postDetailTimeSpan', dayjs(post.updatedAt).format('DD/MM/YYYY HH:mm'))

    // change banner 
    const bannerElement = $('#postHeroImage')
    if (!bannerElement) return
    bannerElement.style.backgroundImage = `url(${pictureUrl})`;

    const gotoEditPageLinkElement = $('#goToEditPageLink')
    if (!gotoEditPageLinkElement) return;

    gotoEditPageLinkElement.innerHTML = '<i class="far fa-edit"></i> edit post'

    // go to add edit post with the id of the post
    gotoEditPageLinkElement.addEventListener('click', () => {
        window.location.assign(`/add-edit-post.html?id=${post.id}`)
    })




}


// main post detail 🥳
(async () => {
    //when click on the image show light box
    resignterLightBox({
        modalId: '#lightBoxModal',
        preButtonSelector: 'button[data-id="lightBoxModalp"]',
        nextButtonSelector: 'button[data-id="lightBoxModaln"]',
        imgSelector: 'img[data-id="lightBoxModal"]'
    })

    try {
        // get id of the post
        const queryParam = new URLSearchParams(window.location.search)
        const postId = queryParam.get('id')

        // fetch post detail API
        const post = await postApi.getById(postId)


        //render to UI 🙆‍♂️
        renderUiPost(post)

    } catch (error) {

    }









})()