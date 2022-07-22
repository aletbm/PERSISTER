import { fetchData } from "../services/getData.js"

function loginAdmin(event){
    event.preventDefault();
    fetchData("/admin").then((response) => {
        const email = document.getElementById('email').value
        const pwd = document.getElementById('pwd').value
        const form = document.querySelector('[data-form]')
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && pwd.replace(/ /g, "").length != 0){
            if(email == response.email && pwd == response.pwd){
                localStorage.setItem("uid", response.uid)
                window.location.href = './busquedas.html?search=all'
            }
            else{
                if(!document.getElementById('warnAcces')){
                    if(document.getElementById('wardEmail')) document.getElementById('wardEmail').remove()
                    if(document.getElementById('wardPwd')) document.getElementById('wardPwd').remove()
                    const input = document.getElementById('btnLogin')
                    const p = document.createElement('p')
                    p.innerHTML = "Usuario o contraseña invalidos"
                    p.id = "warnAcces"
                    form.insertBefore(p, input)
                }
            }
        }
        else{
            if(document.getElementById('wardAcces')) document.getElementById('wardAcces').remove()
            if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
                if(!document.getElementById('warnEmail')){
                    const input = document.getElementById('btnLogin')
                    const p = document.createElement('p')
                    p.innerHTML = "El email ingresado no es valido."
                    p.id = "warnEmail"
                    form.insertBefore(p, input)
                }
            }
            if(pwd.replace(/ /g, "").length == 0){
                if(!document.getElementById('warnPwd')){
                    const input = document.getElementById('btnLogin')
                    const p = document.createElement('p')
                    p.innerHTML = "La constraseña ingresada esta vacia."
                    p.id = "warnPwd"
                    form.insertBefore(p, input)
                }
            }
        }
        return true
    }).catch(function (error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}

document.querySelector('[data-form]').addEventListener('submit', loginAdmin)