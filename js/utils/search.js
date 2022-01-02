import debounce from "lodash.debounce";


//query so fast 🙆‍♂️
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


export function initSearch({ element, defaultParam, onChange }) {
    const searchInputElement = $(element)
    if (!searchInputElement) return
    // debounce
    const debounceSearch = debounce((e) => {
        onChange?.(e.target.value)

    }, 500)
    searchInputElement.value = defaultParam.get('title_like')
    searchInputElement.addEventListener('input', (e) => {
        debounceSearch(e)
    })
}
