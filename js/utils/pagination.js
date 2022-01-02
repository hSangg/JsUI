//query so fast 🙆‍♂️
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

export function renderPagination(pagination) {
    if (!pagination) return
    /** 
     * calc total pages
     * save page and totalPages to ulPagiantion
     * check if e/d pre/nex link 
     *  👑  
     */
    const { _page, _limit, _totalRows } = pagination
    const totalPages = Math.ceil(_totalRows / _limit)

    const ulElement = $('#postsList')
    if (!ulElement) return
    ulElement.dataset.page = _page
    ulElement.dataset.totalPages = totalPages

    // 
    const ulElementLink = $('#postsPagination')
    if (!ulElementLink) return

}


export function initPrecentation({ element, defaultParam, onChange }) {
    const ulElementLink = $(element)
    if (!ulElementLink) return

    const preLink = ulElementLink.firstElementChild.firstElementChild
    const nextLink = ulElementLink.lastElementChild.firstElementChild


    if (!preLink || !nextLink) return

    preLink.addEventListener('click', (e) => {
        e.preventDefault()
        const ulElement = $('#postsList')
        if (!ulElement) return

        const page = +ulElement.dataset.page || 1
        const totalPages = +ulElement.dataset.totalPages

        onChange?.(page - 1 === 0 ? totalPages : page - 1)
    })


    nextLink.addEventListener('click', (e) => {
        e.preventDefault()
        const ulElement = $('#postsList')
        if (!ulElement) return

        const page = +ulElement.dataset.page || 1
        const totalPages = +ulElement.dataset.totalPages

        onChange?.(page + 1 > totalPages ? 1 : page + 1)
    })
}