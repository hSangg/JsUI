import * as yup from 'yup';
import { object } from 'yup';
import { string } from "yup";
import { mixed } from 'yup';
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
        imageSource: string().oneOf(['usingUnplash', 'uploadFromComputer'], 'invalid value'),
        backgroundUrl: string().when('imageSource', {
            is: "usingUnplash",
            then: string().required('Please choose your background').url('it should be an url')
        }),

        // 🙏
        image: mixed().when('imageSource', {
            is: "uploadFromComputer",
            then: mixed()
                .test('upload file plase', 'Please upload your file', (value) => value?.name)
                .test('limited size', 'Please choose file whose size is smaller than 50MB', (value) => value?.size < 50000000)
        }),


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
    ['author', 'title', 'backgroundUrl', 'image', 'imageSource'].forEach(x => setTextError(form, x, ''))

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

function handelMatchValue(form, value) {
    const uploadMethod = form.querySelectorAll('.option-upload')
    if (!uploadMethod) return

    uploadMethod.forEach(x => {
        x.hidden = x.dataset.method !== value
    })

}

function chooseUploadMethod(form) {
    const uploadList = form.querySelectorAll('[name="imageSource"]')
    const uploadMethod = form.querySelectorAll('.option-upload')

    uploadList.forEach((x, i) => {
        if (!x.checked) uploadMethod[i].classList.add('d-none')

        x.addEventListener('change', (e) => {
            uploadMethod[i].classList.remove('d-none')
            handelMatchValue(form, e.target.value)
        })
    })
}

async function initUploadChange(form, formValue, name) {
    try {
        setTextError(form, name, '')

        const schema = getPostSchema()
        await schema.validateAt(name, formValue)

        const field = form.querySelector(`[name="${name}"]`)

        if (field && !field.checkValidity()) field.classList.add('was-validited')


    } catch (error) {
        setTextError(form, name, error.message)
    }


}

function initBackground(form) {
    const inputBackground = form.querySelector('[name="image"]')
    if (!inputBackground) return

    inputBackground.addEventListener('change', (e) => {
        const image = e.target.files[0]
        const imageUrl = URL.createObjectURL(image)

        //render image to UI
        setBackgroundImage(document, '#postHeroImage', imageUrl)

        //validate background image after choosing
        initUploadChange(form, {
            imageSource: 'uploadFromComputer',
            image,
        },
            'image')



    })
}

function validateOnChange(form) {
    ['title', 'author'].forEach(name => {
        const field = form.querySelector(`[name = "${name}"]`)

        field.oninput = (e) => {
            const newValue = e.target.value

            initUploadChange(form, { [name]: newValue }, [name])
        }
    })
}

export function handlePostForm({ form, initialValue, onSubmit }) {
    const formElement = $(form)
    if (!formElement) return

    validateOnChange(formElement)
    setDefaultForm(formElement, initialValue)

    //init banner
    initBanner(formElement)

    chooseUploadMethod(formElement)
    let isSummit = false;

    // handle upload file from my pc
    initBackground(formElement)


    formElement.addEventListener('submit', async (e) => {
        e.preventDefault()

        //show loading
        showLoading(form)
        //prevent submit continuous 
        if (isSummit) return
        // get form data
        const data = getFormData(formElement)
        const isValid = await validateForm(formElement, data)

        if (isValid) await onSubmit?.(data)

        //hide loading
        hideLoading(form)
        isSummit = false

    })
}