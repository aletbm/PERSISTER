import { fetchData, URLsearch, deleteData} from "../services/getData.js"
const categorias = ['all', 'buzos', 'pantalones', 'accesorios', 'camisas', 'remeras']

function parseCard(categoria, nprd,src, title, description, price) {  
    return `<div class="producto-card" id="${categoria}_${nprd}">
                <img src=${src} alt="producto">
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
                </div>
                <div class="producto-delete no-visible"><img class="x-delete" src="./img/x.png" alt="producto"><p>ELIMINAR</p></div>
            </div>`
}

const showResults = (categoria) => {
    fetchData("/"+ categoria).then((response) => {
        const prd = response
        let cards = document.getElementsByClassName("productos-cards")[0]
        for (let x = 0; x < prd.length; x++) {
            cards.innerHTML += parseCard(categoria, prd[x].id, prd[x].url, prd[x].title, prd[x].description, prd[x].price)
        }
        return true
    }).catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}

function getFilteredByKey(array, key, value) {
    return array.filter(function(e) {
      if(e[key].toUpperCase().search(value.toUpperCase()) != -1) return e;
    });
  }

const showNamePrd = (namePrd, categoria) => {
    fetchData("/"+ categoria).then((response) => {
        const encontrados = getFilteredByKey(response, "title", namePrd)
        let cards = document.getElementsByClassName("productos-cards")[0]
        for (let x = 0; x < encontrados.length; x++) {
            cards.innerHTML += parseCard(categoria, encontrados[x].id, encontrados[x].url, encontrados[x].title, encontrados[x].description, encontrados[x].price)
        }
        return true
    }).catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}

const categoria = URLsearch('search')
const namePrd = URLsearch('searchName')

if(categoria != false){
    if(categoria == 'all'){
        document.getElementsByClassName("busqueda-titulo")[0].innerHTML = "Todos los productos"
        for(let i = 1; i < categorias.length; i++){
            showResults(categorias[i]) 
        }
    }
    else{
        let cat_valida = false
        for (let m = 1; m < categorias.length; m++) {
            if (categoria == categorias[m]) {
                cat_valida = true
            }
        }
        if (cat_valida == true) {
            document.getElementsByClassName("busqueda-titulo")[0].innerHTML = categoria[0].toUpperCase() + categoria.slice(1, categoria.length)
            showResults(categoria)
        }
    }
}
else if(namePrd != false){
    document.getElementsByClassName("busqueda-titulo")[0].innerHTML = "Resultados de buscar: '"+namePrd+"'"
    for (let m = 1; m < categorias.length; m++) {
        showNamePrd(namePrd, categorias[m])
    }
}


function userSession(){
    fetchData("/admin").then((response) => {
        const uid = localStorage.getItem("uid")
        if(uid == response.uid){
            const container = document.querySelector('[data-container]')
            const btns_admin = document.querySelector('[data-admin]')
            const btn_add = document.createElement('a')
            const btn_dlt = document.createElement('a')
            btn_add.innerHTML= "+ AÑADIR PRODUCTO"
            btn_add.classList.add("btn_add")
            btn_add.href = "./addPrd.html"

            btn_dlt.innerHTML= "- ELIMINAR PRODUCTO"
            btn_dlt.classList.add("btn_add")
            btn_dlt.id = "delete"

            btns_admin.appendChild(btn_add)
            btns_admin.appendChild(btn_dlt)

            document.getElementById('delete').addEventListener('click', function () {
                const deletes = document.getElementsByClassName('producto-delete')
                const vermas = document.getElementsByClassName('card-vermas')
                for(let i = 0; i < deletes.length; i++){
                    deletes[i].classList.toggle('no-visible')
                    vermas[i].classList.toggle('no-visible')
                }
                document.getElementById('delete').classList.toggle('btn-activo')
            })
            
            const xdelete = document.getElementsByClassName('x-delete')
            for(let x = 0; x < xdelete.length; x++){
                xdelete[x].addEventListener('click', function(){
                    let id = []
                    id = this.parentNode.parentNode.id.split('_')
                    console.log(id)
                    deleteData("/" + id[0] + '/' + id[1]).then(() => {return true}).catch(err => console.log(err))
                })
            }

            container.classList.add("producto-uid")
        }
        return true
    }).catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}

userSession()
                