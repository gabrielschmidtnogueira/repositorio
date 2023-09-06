import { catalogo,apagarLocalStorage, desenharProdutoNoCarrinhoSimples,lerLocalStorage, salvarLocalStorage } from "./utilidades";

function desenharProdutosCheckout(){
    const idsProdutoCarrinhoQuandtidade=lerLocalStorage('carrinho');
    for(const idProduto in idsProdutoCarrinhoQuandtidade){
        desenharProdutoNoCarrinhoSimples(idProduto,"container-produtos-checkout",idsProdutoCarrinhoQuandtidade[idProduto])
    }

    document.addEventListener("submit",(evt)=>finalizarCompra(evt))

    const total=document.getElementById('preco-total')
    let precoTotalCarrinho=0;
    for(const idProdutoNoCarrinho in idsProdutoCarrinhoQuandtidade){
        precoTotalCarrinho+=catalogo.find(p=>p.id===idProdutoNoCarrinho).preco *idsProdutoCarrinhoQuandtidade[idProdutoNoCarrinho];
    }
    total.innerText=`Total: ${precoTotalCarrinho.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}`;
}

    



desenharProdutosCheckout();

function finalizarCompra(evento){
    evento.preventDefault();
    const idsProdutoCarrinhoQuandtidade=lerLocalStorage("carrinho")??{};

    if(Object.keys(idsProdutoCarrinhoQuandtidade).length===0){
        return
    };
    const dataAtual=new Date();
    const pedidoFeito={
        dataPedido:dataAtual,
        pedido:idsProdutoCarrinhoQuandtidade
    }

    const historicoDePedidos=lerLocalStorage("historico")??[];
    const historicoDePedidosAtualizado=[pedidoFeito, ...historicoDePedidos];

    salvarLocalStorage("historico",historicoDePedidosAtualizado)
    apagarLocalStorage("carrinho")

    window.location.href = window.location.origin+"/pedidos.html"
}
