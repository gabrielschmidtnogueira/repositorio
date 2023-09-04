import { adiconarAoCarrinho } from "./menucarrinho";
import { catalogo } from "./utilidades"

export function renderCatalogo() {
    for (const produtoCatalogo of catalogo) {
        const cardPoduto = `
        <div class='shadow-xl shadow-slate-400 w-48 m-2 flex justify-between flex-col p-2 rounded-sm group ${produtoCatalogo.bebida ? 'bebida' : 'porcao'}' id="card-produto-${produtoCatalogo.id}">
            <img class="my-3 rounded-sm group-hover:scale-110 duration-300" src="assets/${produtoCatalogo.nomeArquivoImagem}" alt="" srcset="">
            <p class='text-sm'>${produtoCatalogo.nome}</p>
            <p class='text-sm'>R$ ${produtoCatalogo.preco}</p>
            <button class="bg-teal-950 hover:bg-teal-800 text-slate-300 hover:text-teal-50" id="adicionar-${produtoCatalogo.id}"><i class="fa-solid fa-cart-plus"></i></button>
        </div>`

        document.getElementById("container-produto").innerHTML += cardPoduto;
    }
    for (const produtoCatalogo of catalogo) {
        document.getElementById(`adicionar-${produtoCatalogo.id}`).addEventListener('click', () => adiconarAoCarrinho(produtoCatalogo.id));

    }
}

