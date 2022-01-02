



export function resignterLightBox({ modalId, preButtonSelector, nextButtonSelector, imgSelector }) {
    // handle click on image
    // img click --> find all ims with the same album
    // determine index of selected img
    // show modal with selected img
    // hadnle pre/nex click
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    function showModalElement(modalSelector) {
        const myModal = new bootstrap.Modal($(modalSelector))
        if (myModal) myModal.show()
    }

    let albumList, index = 0;
    const imageElement = $(imgSelector)

    const setSourceByIndex = (index) => {
        imageElement.src = albumList[index].src

    }

    document.addEventListener('click', (e) => {
        const { target } = e
        if (target.tagName !== 'IMG' || target.dataset.album !== 'image-post-album') return

        //images in the album
        albumList = [...document.querySelectorAll(`img[data-album="${target.dataset.album}"]`)]
        index = albumList.findIndex(x => x === target)


        //set source by index 


        //selector
        const preButton = $(preButtonSelector)
        const nextButton = $(nextButtonSelector)
        if (!imageElement || !preButton || !nextButton) return

        setSourceByIndex(index)
        showModalElement(modalId)


        //handle onclick button
        preButton.addEventListener('click', () => {
            index = (index + albumList.length - 1) % albumList.length

            setSourceByIndex(index)
        })

        nextButton.addEventListener('click', () => {
            ++index

            if (index === albumList.length) index = 0
            setSourceByIndex(index)
        })

    })

}