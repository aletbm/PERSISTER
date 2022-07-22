function getCard(title, url, talle, cantidad, price) {
    const card_cont = `<img class="carrito-img" src=${url} alt="">
    <div class="carrito-card-text">
        <h5>${title}</h5>
        <div class="carrito-card-detalles">
        <div class="carrito-card-cantidad">
            <h6>Cantidad</h6>
            <p>${cantidad} u.</p>
        </div>
        <div class="carrito-card-talle">
            <h6>Talle</h6>
            <p>${talle}</p>
        </div>
        <div class="carrito-card-price">
            <h6>Precio</h6>
            <p>${price}</p>
        </div>
        </div>
    </div>
    <img class="carrito-basura" src="./img/eliminar.png" alt="">`
    const card = document.createElement('div')
    card.classList.add('carrito-card')
    card.innerHTML = card_cont
    return card
}

function addCardCarrito() {
    const total = document.getElementsByClassName('carrito-total')[0]
    let precio_final = 0
    let cant_prds = 0

    if(localStorage.getItem("uid")){
        cant_prds = localStorage.length - 1
    }
    else{
        cant_prds = localStorage.length
    }

    if (cant_prds != 0) {
        for (let i = 0; i < cant_prds ; i++) {
            const prd = JSON.parse(localStorage.getItem(i.toString()))
            precio_final += parseInt(prd["price"].split('$')[1]) * parseInt(prd["cantidad"])
            const card = getCard(prd["title"], prd["url"], prd["talle"], prd["cantidad"], prd["price"])
            card.id = i
            card.childNodes[4].addEventListener('click', function () {
                const id = this.parentNode.id
                const prd = JSON.parse(localStorage.getItem(id))
                const total = document.getElementsByClassName('carrito-total')[0]
                const precio_total = parseInt(total.innerHTML.split('$')[1]) - parseInt(prd["price"].split('$')[1]) * parseInt(prd["cantidad"])
                total.innerHTML = 'Total: $' + precio_total
                this.parentNode.remove()
                localStorage.removeItem(id)
                if (localStorage.length == 0){
                    const card = document.createElement('div')
                    card.innerHTML = "Su carrito se encuentra vacio."
                    card.style.textAlign = "center"
                    document.getElementsByClassName('carrito-cards')[0].insertBefore(card, total)
                }
            })
            document.getElementsByClassName('carrito-cards')[0].insertBefore(card, total)
        }
        
        total.innerHTML += 'Total: $' + precio_final
    }
    else{
        const card = document.createElement('div')
        card.innerHTML = "Su carrito se encuentra vacio."
        card.style.textAlign = "center"
        document.getElementsByClassName('carrito-cards')[0].insertBefore(card, total)
    }
}

addCardCarrito()