import * as yup from 'yup';
import { string } from "yup";
import { setBackgroundImage, setTextContent, setValue } from ".";
import { getRandomImage } from '../constants/bannerListLink';



//query sofast 🥵
const $ = document.querySelector.bind(document);



function getFormData(form) {
    if (!form) return
    const formData = {}
    const data = new FormData(form)

    for (const [name, values] of data) {
        formData[name] = values
    }
    console.log(formData)
    return formData
}


function setDefaultForm(form, post) {

    setValue(form, '[name="author"]', post?.author)
    setValue(form, '[name="title"]', post?.title)
    setValue(form, '[name="description"]', post?.description)
    setValue(form, '[name="backgroundUrl"]', post?.imageUrl)

    //set background
    setBackgroundImage(document, '#postHeroImage', post?.imageUrl)
}


function getPostSchema() {
    return yup.object({
        title: string().required('Please enter your title'),
        author: string().required('Please enter your author')
            .test('uppercase first letter', 'Uppercase the first letter of word', value => {
                return value && value.split(' ').every(x => x[0].toUpperCase() === x[0])
            }),
        backgroundUrl: string().required('Please chose your background image').url('it need to be an url')

    })
}

function setTextError(form, name, error) {
    const inputElement = form.querySelector(`[name="${name}"]`)
    if (!inputElement) return

    inputElement.setCustomValidity(error)

    //set text to warrning user
    setTextContent(inputElement.parentElement, '.invalid-feedback', error)
}


async function validateForm(form, formValue) {
    //reset 
    ['author', 'title', 'backgroundUrl'].forEach(x => setTextError(form, x, ''))

    try {
        const schema = getPostSchema()
        await schema.validate(formValue, { abortEarly: false })


        return true;

    } catch (error) {


        const errorName = {}

        for (const { path, message } of error.inner) {
            if (errorName[path]) continue
            setTextError(form, path, message)
            errorName[path] = true

        }
    }

    const isValid = form.checkValidity()
    if (!isValid) form.classList.add('was-validated')
}

function showLoading(form) {
    const button = $(form).querySelector('.button-submit')
    button.classList.add('newStyle')
    button.innerHTML = '<i class="far fa-spinner-third submit-button-icon"></i> Saving'

}


function hideLoading(form) {
    const button = $(form).querySelector('.button-submit')
    button.classList.remove('newStyle')
    button.textContent = 'Save'

}

function initBanner(form) {
    // get new banner
    // update url to hide input, set banner to UI
    const randomButton = $('.change-image')
    if (!randomButton) return

    randomButton.addEventListener('click', () => {
        const imageUrl = getRandomImage()
        setBackgroundImage(document, '#postHeroImage', imageUrl)
        setValue(form, '[name="backgroundUrl"]', imageUrl)
    })

}

export function handlePostForm({ form, initialValue, onSubmit }) {
    const formElement = $(form)
    if (!formElement) return

    setDefaultForm(formElement, initialValue)

    //init banner
    initBanner(formElement)

    let isSummit = false;

    formElement.addEventListener('submit', async (e) => {
        e.preventDefault()

        //show loading
        showLoading(form)

        //prevent submit continuous 
        if (isSummit) return


        // get form data
        const data = getFormData(formElement)
        const isValid = await validateForm(formElement, data)




        if (!isValid) {
            hideLoading(form)
            isSummit = false
            return;
        }

        await onSubmit?.(data)
        //hide loading
        hideLoading(form)
        isSummit = false

    })



}