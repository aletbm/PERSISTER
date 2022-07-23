import { fetchData } from "../services/getData.js"

document.getElementsByClassName("header-nav-lupa")[0].addEventListener("click", () => {
    document.getElementById('form-buscador').classList.toggle('no-visible')
})

document.getElementsByClassName("header-nav-lupa")[1].addEventListener("click", () => {
    document.getElementById('form-buscador-mobile').classList.toggle('no-visible')
})

document.getElementById('btnMobile').addEventListener("click", function () {
    document.getElementById('linksMobile').classList.toggle('no-visible')
})

document.getElementsByClassName('carrito')[0].addEventListener('click', function () {
    window.location.href = "./carrito.html"
})

document.getElementsByClassName('carrito')[1].addEventListener('click', function () {
    window.location.href = "./carrito.html"
})

function updateCounter() {
    const p = document.getElementsByClassName('carrito')[0].childNodes[3]
    const p_mobile = document.getElementsByClassName('carrito')[1].childNodes[3]
    let prds = localStorage.length
    if (localStorage.getItem("uid")) {
        prds -= 1
    }
    p.innerHTML = prds
    p_mobile.innerHTML = prds
}

window.setInterval(updateCounter, 1000)

function userSession() {
    fetchData("/admin").then((response) => {
        const uid = localStorage.getItem("uid")
        if (uid == response.uid) {
            const btn = document.querySelector('[data-login]')
            const btnMobile = document.querySelector('[data-loginMobile]')
            btn.innerHTML = "CERRAR SESION"
            btn.href = "./index.html"
            btn.addEventListener("click", () => {
                localStorage.removeItem("uid")
            })
            btnMobile.innerHTML = "CERRAR SESION"
            btnMobile.href = "./index.html"
            btnMobile.addEventListener("click", () => {
                localStorage.removeItem("uid")
            })
        }
        return true
    }).catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}

userSession()

document.getElementById('form-buscador').addEventListener('submit', function (event) {
    event.preventDefault()
    const busqueda = document.getElementById("buscador").value
    if (busqueda.replace(/ /g, "").length == 0 || !/^[a-zA-Z0-9 ]*$/.test(busqueda)) return
    else {
        window.location.href = "./busquedas.html?searchName=" + busqueda
    }
})

document.getElementById('form-buscador-mobile').addEventListener('submit', function (event) {
    event.preventDefault()
    const busqueda = document.getElementById("buscador-mobile").value
    if (busqueda.replace(/ /g, "").length == 0 || !/^[a-zA-Z0-9 ]*$/.test(busqueda)) return
    else {
        window.location.href = "./busquedas.html?searchName=" + busqueda
    }
})