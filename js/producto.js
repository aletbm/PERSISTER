import { URLsearch, fetchData } from "../services/getData.js"

const producto = URLsearch('prd')
const categoria = producto.split('_')[0]
const id = producto.slice(categoria.length+1, producto.length)

const showProduct = (categoria, id) => {
    fetchData("/" + categoria + '/' + id).then((response) => {
        const prd = response
        document.querySelector('[data-img]').src = prd.url
        document.querySelector('[data-title]').innerHTML = prd.title
        document.querySelector('[data-description]').innerHTML = prd.description
        document.querySelector('[data-price]').innerHTML += prd.price
        const talles = document.querySelector('[data-talles]')
        for(let i = 0; i < prd.talles.length; i++){
            const p = document.createElement('p')
            p.innerHTML = prd.talles[i]
            p.addEventListener('click', function() {
                const talle_activa = document.getElementsByClassName('talle-activa')[0]
                if(talle_activa) talle_activa.classList.remove('talle-activa')
                this.classList.toggle("talle-activa")
                if(document.getElementById('talleWar')){
                    document.getElementById('talleWar').remove()
                }
            })
            talles.appendChild(p)
        }
        const cant = document.getElementById("cantidad")
        cant.max = prd.cantidad
        cant.min = 1
        cant.value = 1
        return true
    }).catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}

showProduct(categoria, id)


function userSession(categoria, id){
    fetchData("/admin").then((response) => {
        const uid = localStorage.getItem("uid")
        if(uid == response.uid){
            const btns_admin = document.querySelector('[data-admin]')
            const btn_add = document.createElement('a')
            btn_add.innerHTML= "EDITAR PRODUCTO"
            btn_add.classList.add("btn_edit")
            btn_add.href = "./addPrd.html?edit="+categoria+'_'+id

            btns_admin.appendChild(btn_add)
            btns_admin.classList.remove("no-visible")
        }
        return true
    }).catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}

userSession(categoria, id)

document.querySelector('[data-carrito]').addEventListener('click', () => {
    const title = document.querySelector('[data-title]').innerHTML
    const price = '$' + document.querySelector('[data-price]').innerHTML.split('$')[1]
    const cantidad = document.querySelector('[data-cantidad]').value
    const url = document.querySelector('[data-img]').src
    const talle = document.getElementsByClassName('talle-activa')[0]
    if(!talle){
        if(!document.getElementById('talleWar')){
            const p = document.createElement('p')
            p.innerHTML = "Elija el talle que desea."
            p.style.padding = "5px"
            p.style.border= "1px solid #FF0000"
            p.style.textAlign = "center"
            p.id = "talleWar"
            const parent = document.getElementsByClassName('producto-utils')[0]
            const child = document.getElementsByClassName('producto-carrito')[0]
            parent.insertBefore(p, child)
        }
        return
    }
    const producto = {
        title,
        price,
        cantidad,
        url,
        "talle":talle.innerHTML
    }
    if(localStorage.getItem("uid")){
        localStorage.setItem(localStorage.length-1, JSON.stringify(producto))
    }
    else{
        localStorage.setItem(localStorage.length, JSON.stringify(producto))
    }
})