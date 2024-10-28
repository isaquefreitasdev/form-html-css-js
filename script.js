const header = document.querySelector("#header")
const cep = document.querySelector("#cep")
const rua = document.querySelector("#rua")
const cidade = document.querySelector("#cidade")
const estado = document.querySelector("#estado")
const bairro = document.querySelector("#bairro");
const input = document.querySelectorAll("input")
const btn = document.querySelector("#btn")
const form = document.querySelector("#form")
const numero = document.querySelector("#numero")

function searchAdress() {
    const valueCep = cep.value;
    let error = document.querySelector("#p-error");
    if (!error) {
        error = document.createElement("p");
        error.id = "p-error";
    }


    if (valueCep.length != 8) {
        error.remove()
        cep.classList.add("error")
        rua.value = "";
        cidade.value = "";
        estado.value = "";
        bairro.value = "";
        header.appendChild(error)
        error.style.color = "red"

        error.innerText = "Cep Inválido"

    }
    fetch(`https://viacep.com.br/ws/${valueCep}/json/`).then(response => response.json()).then(data => {


        if (!data.erro) {
            rua.value = data.logradouro;
            cidade.value = data.localidade;
            estado.value = data.uf;
            bairro.value = data.bairro;
            
            error.style.color = "red"

            cep.classList.remove("error")
            error.remove()
        }
        else {
            cep.classList.add("error")
            error.innerText = "";

            rua.value = "";
            cidade.value = "";
            estado.value = "";
            bairro.value = ""
            numero.value = ""
            header.appendChild(error)
            error.innerText = "Cep Inválido"



        }
    })
}
function validationForm(e) {
    e.preventDefault()
    const valueCep = cep.value;
    let error = document.querySelector("#p-error")
    if (!error) {
        error = document.createElement("p");
        error.id = "p-error";
    }


    if (valueCep.length < 8 || valueCep.length > 8) {
        error.remove()
        cep.classList.add("error")
        rua.value = "";
        cidade.value = "";
        estado.value = "";
        bairro.value = "";
        numero.value = "";
        error.innerText = "";
        header.appendChild(error)
        error.style.color = "red"

        error.innerText = "Cep Inválido"
        return;

    } else {
        error.innerText = "";

        header.appendChild(error)
        error.innerText = "Dados cadastrados com Sucesso!"
        error.style.color = "black"
    }
    let formValid = true;
    [cep, rua, cidade, estado, bairro, rua, numero].forEach((field) => {
        if (!field.value) {
            formValid = false;
            error.remove()

            error.style.color = "red"
            header.appendChild(error)
            error.innerText = "Preencha todos os dados!"
        } else {
            error.remove()

            field.classList.remove("error");
            header.appendChild(error)
            error.innerText = "Dados cadastrados com Sucesso!"
            error.style.color = "black"
        }
    });

}
cep.addEventListener("blur", searchAdress)
form.addEventListener("submit", validationForm)


