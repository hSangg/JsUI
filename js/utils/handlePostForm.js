import * as yup from 'yup';
import { string } from "yup";
import { setBackgroundImage, setTextContent, setValue } from ".";


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
        title: string().required('Điền tựa đề vào dùm cái🙏🙏🙏 ngu dốt 😏😏😏'),
        author: string().required('Điền tác giả vô nhanh, khẩn trương🙏🙏🙏')
            .test('uppercase first letter', 'viết hoa chữ cái đầu tên người đi, ngu à 😏', value => {
                return value && value.split(' ').every(x => x[0].toUpperCase() === x[0])
            })
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
    ['author', 'title'].forEach(x => setTextError(form, x, ''))

    try {
        const schema = getPostSchema()
        await schema.validate(formValue, { abortEarly: false })


        return true;

    } catch (error) {
        console.log('error: ', error);

        const errorName = {}

        for (const { path, message } of error.inner) {
            if (errorName[path]) continue
            setTextError(form, path, message)
            errorName[path] = true
            console.log(errorName)
        }
    }



    const isValid = form.checkValidity()
    if (!isValid) form.classList.add('was-validated')
}

export function handlePostForm({ form, initialValue, onSubmit }) {
    const formElement = $(form)
    if (!formElement) return

    setDefaultForm(formElement, initialValue)

    formElement.addEventListener('submit', async (e) => {
        e.preventDefault()
        // get form data
        const data = getFormData(formElement)
        const isValid = await validateForm(formElement, data)
        if (isValid) onSubmit(data)

    })

}