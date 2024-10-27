const header = document.querySelector("#header")
const cep = document.querySelector("#cep")
const rua = document.querySelector("#rua")
const cidade = document.querySelector("#cidade")
const estado = document.querySelector("#estado")
const btn = document.querySelector("#btn")
const bairro = document.querySelector("#bairro");
const input = document.querySelectorAll("input")



function searchAdress() {
    const valueCep = cep.value;
    let error = document.querySelector("#p-error");
    if (!error) {
        error = document.createElement("p");
        error.id = "p-error";
    }
    

    if (valueCep.length > 8 || valueCep.length < 8) {
        cep.classList.add("error")
        rua.value = "";
        cidade.value = "";
        estado.value = "";
        bairro.value = "";
        header.appendChild(error)
        error.innerText = "Cep Inváildo"

    }
    fetch(`https://viacep.com.br/ws/${valueCep}/json/`).then(response => response.json()).then(data => {


        if (!data.erro) {
            rua.value = data.logradouro;
            cidade.value = data.localidade;
            estado.value = data.uf;
            bairro.value = data.bairro;
            console.log(data)
            console.log(cep.value.length)

            cep.classList.remove("error")
            error.remove()
        }
        else {
            cep.classList.add("error")
            rua.value = "";
            cidade.value = "";
            estado.value = "";


        }
    })
}
function verifyInput() {
    rua.disabled = true
    cidade.disabled = true
    estado.disabled = true
    bairro.disabled = true
}
cep.addEventListener("blur", searchAdress)


