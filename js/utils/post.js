import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { setTextContent } from ".";

// use fromNow in dayJs 🥳
dayjs.extend(relativeTime)

//query so fast 🙆‍♂️
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const randomNumber = () => {
    return `00${Math.floor(Math.random() * 100)}`.slice(-2)
}

export function createLiElement(post) {
    try {
        const template = $('#postItemTemplate');
        if (!template) return;

        const liElement = template.content.firstElementChild.cloneNode(true);
        if (!liElement) return

        // set image ULR
        const image = liElement.querySelector('[data-id = "thumbnail"]');
        //get image from unplash

        image.src = `https://source.unsplash.com/random/5${randomNumber()}x2${randomNumber()}`


        // set text content
        // setTextContent recive parentElement, childElement, content 
        // --> set textContent of childElement from parentElement
        setTextContent(liElement, '[data-id = "title"]', post.title)
        setTextContent(liElement, '[data-id = "description"]', post.description)
        setTextContent(liElement, '[data-id = "author"]', post.author)
        setTextContent(liElement, '[data-id = "timeSpan"]', `- ${dayjs(post.updatedAt).fromNow()}`)

        //dispatch event
        const divElement = liElement.firstElementChild

        // go to post detail
        divElement.addEventListener('click', (e) => {

            //get the menu --> if the target in the menu --> return
            const menu = liElement.querySelector('[data-id="menu"]')
            if (menu.contains(e.target)) return

            window.location.assign(`/post-detail.html?id=${post.id}`)
        })

        const buttonEdit = liElement.querySelector('[data-id="edit"]')
        if (!buttonEdit) return

        buttonEdit.addEventListener('click', () => {

            window.location.assign(`/add-edit-post.html?id=${post.id}`)
        })

        return liElement

    } catch (error) {



    }
}

export function renderUI(postList) {
    const ulElement = $('#postsList');
    if (!ulElement) return;

    postList.forEach((post) => {
        const liElement = createLiElement(post);
        ulElement.appendChild(liElement)
    })


}