import { fetchData, postData, updateData, URLsearch } from "../services/getData.js"

function userSession(){
    fetchData("/admin").then((response) => {
        const uid = localStorage.getItem("uid")
        if(uid != response.uid){
            window.location.href = "./index.html"
        }
        return true
    }).catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}

userSession()

const producto = URLsearch('edit')
var cat = ""
var id = ""

if(producto != false){
    cat = producto.split('_')[0]
    id = producto.slice(cat.length+1, producto.length)
}

function tallesAddEvent(){
    const p = document.getElementsByClassName("talles")[0].childNodes
    for(let i=0; i < p.length; i++){
        if(p[i].nodeType == 3){
            p[i].remove()
        }
    }
    for(let i=0; i < p.length; i++){
        p[i].addEventListener('click', function () {
            this.classList.toggle("talle-activa")
        })
    }
}

tallesAddEvent()

document.querySelector('[data-form]').addEventListener('submit', function (event) {
    event.preventDefault()
    const name_prd = document.getElementById('name_prd').value
    const url = document.getElementById('url').value
    const categoria = document.getElementById('categoria').value
    const description = document.getElementById('description').value
    const price = document.getElementById('price').value
    const cantidad = document.getElementById('cantidad').value
    const talles_activas = document.getElementsByClassName("talle-activa")

    if(document.getElementById('warnTitle')) document.getElementById('warnTitle').remove()
    if(document.getElementById('warnUrl')) document.getElementById('warnUrl').remove()
    if(document.getElementById('warnDesc')) document.getElementById('warnDesc').remove()
    if(document.getElementById('warnPrice')) document.getElementById('warnPrice').remove()
    if(document.getElementById('warnCantidad')) document.getElementById('warnCantidad').remove()
    if(document.getElementById('warnTalles')) document.getElementById('warnTalles').remove()
    
    if(name_prd.replace(/ /g, "").length == 0 || !/^[a-zA-Z0-9 ]*$/.test(name_prd)){
        const p = document.createElement('p')
        p.innerHTML = "Ingrese un nombre para su producto."
        p.id = "warnTitle"
        this.appendChild(p)
        return
    }

    if(url.replace(/ /g, "").length == 0){
        const p = document.createElement('p')
        p.innerHTML = "Ingrese un enlace a la imagen de su producto."
        p.id = "warnUrl"
        this.appendChild(p)
        return
    }

    if(description.replace(/ /g, "").length == 0  || !/^[a-zA-Z0-9 ]*$/.test(name_prd)){
        const p = document.createElement('p')
        p.innerHTML = "Ingrese una descripcion de su producto."
        p.id = "warnDesc"
        this.appendChild(p)
        return
    }

    if(price.replace(/ /g, "").length == 0 && parseInt(price) > 0){
        const p = document.createElement('p')
        p.innerHTML = "Ingrese el precio de su producto y asegurese que sea mayor a 0."
        p.id = "warnPrice"
        this.appendChild(p)
        return
    }

    if(cantidad.replace(/ /g, "").length == 0 && parseInt(cantidad) > 0){
        const p = document.createElement('p')
        p.innerHTML = "Ingrese el stock de su producto y asegurese que sea mayor a 0."
        p.id = "warnCantidad"
        this.appendChild(p)
        return
    }

    if(talles_activas.length == 0){
        const p = document.createElement('p')
        p.innerHTML = "Ingrese los talles de su producto."
        p.id = "warnTalles"
        this.appendChild(p)
        return
    }

    let talles = []
    for(let i=0; i < talles_activas.length; i++){
        talles.push(talles_activas[i].innerHTML)
    }
    
    var payload = {
        "id": uuid.v4(),
        "url": url,
        "description": description,
        "price": "$" + price,
        "title": name_prd,
        "talles": talles,
        "cantidad": parseInt(cantidad)
    }
    if(cat != ""){
        updateData("/" + cat + '/' + id, payload).then(() => { 
            return true 
        }).catch( err => console.log(err))
    }
    else{
        postData("/" + categoria, payload).then(() => { 
            return true 
        }).catch( err => console.log(err))
    }

})

function fillFormEdit() {
    fetchData("/"+cat+'/'+id).then(response =>{
        document.querySelector("[data-title]").value = response.title
        document.querySelector("[data-url]").value = response.url
        document.querySelector("[data-category]").value = cat
        document.querySelector("[data-description]").value = response.description
        document.querySelector("[data-price]").value = response.price.split("$")[1]
        document.querySelector("[data-cantidad]").value = response.cantidad
        const talles = document.querySelector("[data-talles]").childNodes
        const talles_activas = response.talles
        
        for(let i=0; i < talles_activas.length; i++){
            for(let x=0; x < talles.length; x++){
                if(talles[x].innerHTML == talles_activas[i]){
                    talles[x].classList.add("talle-activa")
                }
            }
        }

        document.getElementById("btnAddPrd").value = "GUARDAR PRODUCTO"

    })
}

if(cat != ""){
    fillFormEdit()
}

// test https://drive.google.com/uc?export=view&id=1yCujLSQh4FgzaBUHJ4gi084-o6UZhxN-

