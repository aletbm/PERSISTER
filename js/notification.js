import { URLsearch } from "../services/getData.js"

const status = URLsearch('status')

if(status == "ok"){
    const container = document.createElement('div')
    container.classList.add('container')
    container.innerHTML = `<img class="notification-img" src="./img/ok.png" alt="">
                            <h4>El producto se agrego correctamente</h4>
                            <div class="notification-btns">
                                <a href="./busquedas.html?search=all">VER PRODUCTOS</a>
                                <a href="./addPrd.html">SEGUIR AGREGANDO</a>
                            </div>`
    document.getElementsByClassName("notification")[0].appendChild(container)
}
else if(status == "error"){
    const container = document.createElement('div')
    container.classList.add('container')
    container.innerHTML = `<img class="notification-img" src="./img/error.png" alt="">
                            <h4>Oops! Hubo un error, intentelo mas tarde</h4>
                            <div class="notification-btns">
                                <a href="./busquedas.html?search=all">VER PRODUCTOS</a>
                                <a href="./addPrd.html">SEGUIR AGREGANDO</a>
                            </div>`
    document.getElementsByClassName("notification")[0].appendChild(container)
}
else{
    window.location.href = "./index.html"
}