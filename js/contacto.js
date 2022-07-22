(function () {
    emailjs.init("Rj2LM1O8KXPnMkSyE");
})();

function sendEmail(){
    const email = document.getElementById('email').value
    const message = document.getElementById('mensaje').value
    const form = document.querySelector('[data-formContact]')

    if(document.getElementById('warnAcces')) document.getElementById('warnAcces').remove()
    if(document.getElementById('send')) document.getElementById('send').remove()

    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        if(message.replace(/ /g, "").length > 0){
            var contactParams = {
                from_email: email,
                message: message
            }
            emailjs.send("service_persister", 'persister-template', contactParams).then(function (res) {})
            const input = document.getElementById('sendEmail')
            const p = document.createElement('p')
            p.innerHTML = "MENSAJE ENVIADO"
            p.id = "send"
            form.insertBefore(p, input)
        }
        else{
            const input = document.getElementById('sendEmail')
            const p = document.createElement('p')
            p.innerHTML = "MENSAJE VACIO"
            p.id = "warnAcces"
            form.insertBefore(p, input)
        }
    }
    else{
        const input = document.getElementById('sendEmail')
        const p = document.createElement('p')
        p.innerHTML = "CORREO INVALIDO"
        p.id = "warnAcces"
        form.insertBefore(p, input)
    }
}

document.getElementById('sendEmail').addEventListener('click', function(){
    sendEmail();
})