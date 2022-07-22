import { fetchData } from "../services/getData.js"

var carrousel = 4

const createCarrousel = () => {
    fetchData("/carrousel").then((response) => {
        const galeria = document.getElementsByClassName("main-galery")[0]
        const info = document.getElementsByClassName('main-galery-info')[0]
        const img_car = response
        const cant_img = Object.keys(img_car).length
        for (let i = 1; i <= cant_img; i++) {
            const img = document.createElement('img')
            if (i < 5) { img.classList.add('carrousel-img', 'previo') }
            else if (i == 5) { img.classList.add('carrousel-img', 'actual') }
            else { img.classList.add('carrousel-img', 'proximo') }
            img.src = img_car[i]
            galeria.insertBefore(img, info)
        }
        return true
    }).catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}

const createPoints = () => {
    var carrousel_points = document.getElementsByClassName("main-carrousel-points")[0]
    for (let y = 0; y < 6; y++) {
        let point = document.createElement('div')
        point.classList.add('point')
        if (y == carrousel) {
            point.classList.add('point-active')
        }
        point.id = y
        carrousel_points.appendChild(point)
    }
}

function createCard(src, title, description, price, categoria, nprd) {
    let prd_card = document.createElement('div')
    prd_card.classList.add("producto-card")
    prd_card.innerHTML = `<img src=${src} alt="Producto">
                                    <div class="producto-card-text">
                                        <h6>${title}</h6>
                                        <p>${description}</p>
                                        <p>${price}</p>
                                        <div class="card-vermas">
                                            <a href="./producto.html?prd=${categoria}_${nprd}">
                                                <div class="arrow">
                                                    <img src="./img/arrow.svg" alt="Flecha">
                                                    <p>VER MAS</p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>`
    return prd_card
}

const createPrd = (categoria) => {
    const marco = { "buzos": 0, "pantalones": 1, "camisas": 2 }
    fetchData("/"+categoria).then((response) => {
        const prd = response
        const prds_cards = document.getElementsByClassName("productos-cards")[marco[categoria]]
        for (let i = 0; i < 4; i++) {
            let id = Object.keys(prd)[i]
            let prd_card = createCard(prd[id].url, prd[id].title, prd[id].description, prd[id].price, categoria, parseInt(id)+1)
            if (categoria == "camisas") prd_card.childNodes[2].classList.add('producto-camisas-text')
            prds_cards.appendChild(prd_card)
        }
        return true
    }).catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}

const createRemeras = () => {
    fetchData("/remeras").then((response) => {
        const remeras = response
        const prds_cards = document.getElementsByClassName("remeras-cards")[0]
        for (let i = 0; i < 6; i++) {
            let prd_card = document.createElement('div')
            prd_card.classList.add("remera-card", "r" + (i+1))
            prd_card.innerHTML = `<img src="${remeras[i].url}" alt="">
                                    <div class="remera-vermas">
                                        <a href="./producto.html?prd=remeras_${remeras[i].id}">VER MAS</a>
                                    </div>`
            prds_cards.appendChild(prd_card)
        }
        return true
    }).catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}

const createAcces = () => {
    fetchData("/accesorios").then((response) => {
        const acces = response
        const prds_cards = document.getElementsByClassName("accesorios-img")[0]
        for (let i = 0; i < 3; i++) {
            let prd_card = document.createElement('img')
            prd_card.src = acces[i].url
            prds_cards.appendChild(prd_card)
        }
        return true
    }).catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}

createCarrousel()
createPoints()
createPrd('buzos')
createPrd('pantalones')
createPrd('camisas')
createAcces()
createRemeras()

document.getElementsByClassName("slider_prev")[0].addEventListener('click', () => {
    document.getElementById(carrousel).classList.remove('point-active')

    const imgs = document.getElementsByClassName('carrousel-img')

    if (carrousel - 1 < 0) var img_prev = imgs[imgs.length - 1]
    else var img_prev = imgs[carrousel - 1]

    var img_act = imgs[carrousel]

    if (carrousel == imgs.length - 1) var img_prox = imgs[0]
    else var img_prox = imgs[carrousel + 1]

    carrousel -= 1
    if (carrousel < 0) carrousel = 5

    let carrousel_prox = carrousel + 1
    if (carrousel_prox == 6) carrousel_prox = 0

    img_act.addEventListener("transitionend", function x() {
        img_act.removeEventListener("transitionend", x);
        img_act.classList.remove("center-slideToRight")
        img_act.classList.remove("actual")
        img_act.classList.add("proximo")
    })

    img_prev.addEventListener("transitionend", function x() {
        img_prev.removeEventListener("transitionend", x);
        img_prev.classList.remove("left-slideToCenter")
        img_prev.classList.remove("previo")
        img_prev.classList.add("actual")
        img_prox.classList.remove("proximo")
        img_prox.classList.add("previo")
        imgs[carrousel_prox].classList.add('proximo')
    })

    img_act.classList.add("center-slideToRight")
    img_prev.classList.add("left-slideToCenter")
    document.getElementById(carrousel).classList.add('point-active')
})

document.getElementsByClassName("slider_next")[0].addEventListener('click', () => {
    document.getElementById(carrousel).classList.remove('point-active')

    carrousel += 1
    if (carrousel == 6) carrousel = 0

    let carrousel_prox = carrousel + 1
    if (carrousel_prox == 6) carrousel_prox = 0

    const imgs = document.getElementsByClassName('carrousel-img')
    var img_act = document.getElementsByClassName("actual")[0]
    var img_prox = document.getElementsByClassName("proximo")[0]

    img_act.addEventListener("transitionend", function x() {
        img_act.removeEventListener("transitionend", x);
        img_act.classList.remove("center-slideToLeft")
        img_act.classList.remove("actual")
        img_act.classList.add("previo")
    })

    img_prox.addEventListener("transitionend", function x() {
        img_prox.removeEventListener("transitionend", x);
        img_prox.classList.remove("right-slideToCenter")
        img_prox.classList.remove("proximo")
        img_prox.classList.add("actual")
        imgs[carrousel_prox].classList.remove('previo')
        imgs[carrousel_prox].classList.add('proximo')
    })

    img_act.classList.add("center-slideToLeft")
    img_prox.classList.add("right-slideToCenter")
    document.getElementById(carrousel).classList.add('point-active')
})