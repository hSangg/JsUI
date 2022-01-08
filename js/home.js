import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import postApi from "./api/postApi";
import { handleFilterChange, initPrecentation, initSearch, renderPagination, renderUI } from './utils';
import showNoti from "./utils/showNoti";

// use fromNow in dayJs 🥳
dayjs.extend(relativeTime)

//query so fast 🙆‍♂️
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);



function initULR() {
    const url = new URL(window.location)

    if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 9)
    if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1)

    history.pushState({}, '', url)

    return url.searchParams

}

function showLoading() {
    const planetElement = $('.planet')
    planetElement.classList.remove('hide')
    planetElement.classList.add('show')

}

function hideLoading() {
    const planetElement = $('.planet')
    planetElement.classList.remove('show')
    planetElement.classList.add('hide')
}

async function handleDeletePost() {
    try {
        document.addEventListener('post-remove', (event) => {
            const myModal = new bootstrap.Modal($('#modal-confirm-delete'))
            myModal.show()

            const yesButton = $('.modal__button-confirm')
            if (!yesButton) return

            yesButton.onclick = async () => {
                showLoading()

                const postId = event.detail.id
                await postApi.remove(postId)

                hideLoading()
                myModal.hide()
                await handleFilterChange()
            }


        })
    } catch (error) {
        console.log(error)
    }
}

// 🚄 main
(async () => {
    try {
        // show welcome message
        showNoti.noti('welcome to my page')
        const parameter = initULR()

        handleDeletePost()

        initPrecentation({
            element: "#postsPagination",
            defaultParam: parameter,
            onChange: page => handleFilterChange('_page', page)
        })

        initSearch({
            element: ".searchInput",
            defaultParam: parameter,
            onChange: data => handleFilterChange('title_like', data)
        })

        const { data, pagination } = await postApi.getAll(parameter);
        renderPagination(pagination)
        renderUI(data)

    } catch (error) {

    }
})()