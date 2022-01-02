import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import postApi from "./api/postApi";
import { handleFilterChange, initPrecentation, initSearch, renderPagination, renderUI } from './utils';

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




// 🚄 main
(async () => {
    try {
        const parameter = initULR()

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