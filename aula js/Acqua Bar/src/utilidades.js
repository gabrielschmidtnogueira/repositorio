export const catalogo = [
    {
        id: "1",
        nome: 'Hamburgão Top',
        preco: 25.50,
        nomeArquivoImagem: 'produto1.png',
        bebida:false
    },
    {
        id: "2",
        nome: 'Hamburgão Menos Top',
        preco: 20.00,
        nomeArquivoImagem: 'produto2.png',
        bebida:false
    },
    {
        id: "3",
        nome: 'Batata Frita',
        preco: 15.00,
        nomeArquivoImagem: 'produto3.jpg',
        bebida:true
    }
];

export function salvarLocalStorage(chave,informacao){
    localStorage.setItem(chave,JSON.stringify(informacao))
}

export function lerLocalStorage(chave){
    return JSON.parse(localStorage.getItem(chave))
}

export function desenharProdutoNoCarrinhoSimples(idProduto,idContainerHTML,quantidadeProduto){
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutosCarrinhos = document.getElementById(idContainerHTML);

    const elementoArticle = document.createElement('article');
    const articleClasses=['flex', 'bg-stone-200', 'rounded-lg', 'p-1', 'relative', 'm-2'];
    for(const articleClass of articleClasses){
        elementoArticle.classList.add(articleClass)
    }
    const precoBr=produto.preco*quantidadeProduto
    const cardPodutoCarrinho = `
        <img src="assets/${produto.nomeArquivoImagem}" 
        class="h-24 rounded-lg"
        alt="">
        <div class="p-2 flex flex-col justify-between">
            <p class="text-teal-900 text-sm">${produto.nome}</p>
            <p class="text-green-700 text-lg">${precoBr.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</p>
        </div>
        <div class="flex text-lg text-teal-700 items-end absolute right-2 bottom-0">
            <p id="quantidade-${produto.id}" class="ml-2" >${quantidadeProduto}</p>
        </div>`;
    
    elementoArticle.innerHTML=cardPodutoCarrinho;
    containerProdutosCarrinhos.appendChild(elementoArticle);
}

export function apagarLocalStorage(chave){
    localStorage.removeItem(chave)
}