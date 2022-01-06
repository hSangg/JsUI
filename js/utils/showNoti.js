import Toastify from "toastify-js"

export default {
    noti(message) {
        Toastify({
            text: message,
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to left, #8e2de2, #4a00e0)"
            },
            onClick: function () { } // Callback after click
        }).showToast()
    },
    succ(message) {
        Toastify({
            text: message,
            duration: 1500,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to bottom, #11998e, #38ef7d)"
            },
            onClick: function () { } // Callback after click
        }).showToast()
    },
    err(message) {
        Toastify({
            text: message,
            duration: 1500,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #ed213a, #93291e)"
            },
            onClick: function () { } // Callback after click
        }).showToast()
    },
}