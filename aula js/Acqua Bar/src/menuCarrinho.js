import { catalogo, salvarLocalStorage, lerLocalStorage} from "./utilidades";

export const idsProdutoCarrinhoQuandtidade = lerLocalStorage('carrinho') ?? {}


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
    const botaoFinalizarCompra = document.getElementById('finalizar-compra')

    botaoFinalizarCompra.addEventListener('click',irParaCheckout)

    botaoFechar.addEventListener('click', fecharCarrinho);
    botaoAbrir.addEventListener('click', abrirCarrinho);
};

function removerDoCarrinho(idProduto){
    delete idsProdutoCarrinhoQuandtidade[idProduto];
    salvarLocalStorage('carrinho',idsProdutoCarrinhoQuandtidade);
    atualizarPrecoCarrinho();
    renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto){
    idsProdutoCarrinhoQuandtidade[idProduto]++;
    salvarLocalStorage('carrinho',idsProdutoCarrinhoQuandtidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoProduto(idProduto);
}

function decrementarQuantidadeProduto(idProduto){
    if(idsProdutoCarrinhoQuandtidade[idProduto]===1){
        removerDoCarrinho(idProduto);
        return;
    }
    idsProdutoCarrinhoQuandtidade[idProduto]--;
    salvarLocalStorage('carrinho',idsProdutoCarrinhoQuandtidade);
    atualizarPrecoCarrinho();
    atualizarInformacaoProduto(idProduto);
}
function atualizarInformacaoProduto(idProduto){
    const produto = catalogo.find((p) => p.id === idProduto);
    const precoBr = produto.preco*idsProdutoCarrinhoQuandtidade[idProduto]
    document.getElementById(`quantidade-${idProduto}`).innerText=idsProdutoCarrinhoQuandtidade[idProduto];
    document.getElementById(`preco-${idProduto}`).innerText=`${precoBr.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}`
}

export function desenharProdutoNoCarrinho(idProduto){
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutosCarrinhos = document.getElementById('produtos-carrinho');
    const elementoArticle = document.createElement('article');
    const articleClasses=['flex', 'items-center', 'bg-teal-100', 'rounded-lg', 'p-1', 'relative']
    for(const articleClass of articleClasses){
        elementoArticle.classList.add(articleClass)
    }
    const precoBr=produto.preco*idsProdutoCarrinhoQuandtidade[idProduto]
    const cardPodutoCarrinho = `<button id="remover-item-${produto.id}" class="absolute top-0 right-1"><i
            class="fa-solid fa-circle-xmark text-teal-500 hover:text-teal-900"></i></button>
        <img src="assets/${produto.nomeArquivoImagem}" class="h-14 rounded-lg" alt="">
        <div class="p-2 flex flex-col justify-between">
            <p class="text-teal-900 text-sm">${produto.nome}</p>
            <p class="text-green-700 text-lg" id="preco-${produto.id}">${precoBr.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
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

export function renderizarProdutosCarrinho(){
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
    salvarLocalStorage('carrinho',idsProdutoCarrinhoQuandtidade);
    atualizarPrecoCarrinho();
    desenharProdutoNoCarrinho(idProduto);
};

export function atualizarPrecoCarrinho(){
    const precoCarrinho= document.getElementById('preco-total');
    let precoTotalCarrinho=0;
    for(const idProdutoNoCarrinho in idsProdutoCarrinhoQuandtidade){
        precoTotalCarrinho+=catalogo.find(p=>p.id===idProdutoNoCarrinho).preco *idsProdutoCarrinhoQuandtidade[idProdutoNoCarrinho];
    }
    precoCarrinho.innerText=`Total:R$ ${precoTotalCarrinho}`;
}

function irParaCheckout(){
    if(Object.keys(idsProdutoCarrinhoQuandtidade).length===0){
        return;
    }
    window.location.href=window.location.origin+"/checkout.html";
}