import { catalogo } from "./utilidades";

const idsProdutoCarrinhoQuandtidade = {}

function abrirCarrinho() {
    document.getElementById('carrinho').classList.remove('right-[-350px]');
    document.getElementById('carrinho').classList.add('right-[0px]');
};

function fecharCarrinho() {
    document.getElementById('carrinho').classList.remove('right-[0px]');
    document.getElementById('carrinho').classList.add('right-[-350px]');

};

export function inicializarCarrinho() {
    const botaoFechar = document.getElementById('fecharCarrinho');
    const botaoAbrir = document.getElementById('abrirCarrinho');

    botaoFechar.addEventListener('click', fecharCarrinho);
    botaoAbrir.addEventListener('click', abrirCarrinho);
};

function removerDoCarrinho(idProduto){
    delete idsProdutoCarrinhoQuandtidade[idProduto];
    renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto){
    idsProdutoCarrinhoQuandtidade[idProduto]++
    atualizarInformacaoProduto(idProduto)
}

function decrementarQuantidadeProduto(idProduto){
    if(idsProdutoCarrinhoQuandtidade[idProduto]===1){
        removerDoCarrinho(idProduto);
        return;
    }
    idsProdutoCarrinhoQuandtidade[idProduto]--
    atualizarInformacaoProduto(idProduto)
}

function atualizarInformacaoProduto(idProduto){
    document.getElementById(`quantidade-${idProduto}`).innerText=idsProdutoCarrinhoQuandtidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto){
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutosCarrinhos = document.getElementById('produtos-carrinho');

    const elementoArticle = document.createElement('article');
    const articleClasses=['flex', 'items-center', 'bg-teal-100', 'rounded-lg', 'p-1', 'relative']
    for(const articleClass of articleClasses){
        elementoArticle.classList.add(articleClass)
    }
    const cardPodutoCarrinho = `<button id="remover-item-${produto.id}" class="absolute top-0 right-1"><i
            class="fa-solid fa-circle-xmark text-teal-500 hover:text-teal-900"></i></button>
        <img src="assets/${produto.nomeArquivoImagem}" class="h-14 rounded-lg" alt="">
        <div class="p-2 flex flex-col justify-between">
            <p class="text-teal-900 text-sm">${produto.nome}</p>
            <p class="text-green-700 text-lg">$${produto.preco}</p>
        </div>
        <div class="flex gap-2 text-lg text-teal-950 items-end absolute right-2 bottom-0">
            <button id="decrementar-produto-${produto.id}">-</button>
            <p id="quantidade-${produto.id}" >${idsProdutoCarrinhoQuandtidade[produto.id]}</p>
            <button id="incrementar-produto-${produto.id}">+</button>
        </div>`;
    
    elementoArticle.innerHTML=cardPodutoCarrinho;
    containerProdutosCarrinhos.appendChild(elementoArticle);

    document.getElementById(`decrementar-produto-${produto.id}`).addEventListener('click',()=>decrementarQuantidadeProduto(produto.id))
    document.getElementById(`incrementar-produto-${produto.id}`).addEventListener('click',()=>incrementarQuantidadeProduto(produto.id))
    document.getElementById(`remover-item-${produto.id}`).addEventListener('click',()=>removerDoCarrinho(produto.id))
}

function renderizarProdutosCarrinho(){
    const containerProdutosCarrinhos = document.getElementById('produtos-carrinho');
    containerProdutosCarrinhos.innerHTML='';
    for(const idProduto in idsProdutoCarrinhoQuandtidade){
        desenharProdutoNoCarrinho(idProduto);
    }
}

export function adiconarAoCarrinho(idProduto) {

    if(idProduto in idsProdutoCarrinhoQuandtidade){
        incrementarQuantidadeProduto(idProduto);
        return
    }
    idsProdutoCarrinhoQuandtidade[idProduto] = 1;

    desenharProdutoNoCarrinho(idProduto);
};