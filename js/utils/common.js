import { renderPagination, renderUI } from "."
import postApi from "../api/postApi"


//query so fast 🙆‍♂️
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


export function setTextContent(parent, child, text) {
    if (!parent) return
    const element = parent.querySelector(child)
    if (element) element.textContent = text
}


export async function handleFilterChange(changeName, changeValue) {
    const url = new URL(window.location)
    url.searchParams.set(changeName, changeValue)

    if (changeName === 'title_like') {
        url.searchParams.set('_page', 1)
        console.log(1)
    }

    history.pushState({}, '', url)



    //render to UI
    const parameter = new URLSearchParams(url.search)
    const { data, pagination } = await postApi.getAll(parameter);
    renderPagination(pagination)


    const ulElement = $('#postsList');
    if (!ulElement) return;
    ulElement.innerHTML = ''
    renderUI(data)
}