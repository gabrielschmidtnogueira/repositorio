import { lerLocalStorage,desenharProdutoNoCarrinhoSimples } from "./utilidades";

function criarPedidoHistorico(pedidoComData){
    const elementoPedido=`
    <p class="text-lg text-bold">${new Date(pedidoComData.dataPedido).toLocaleDateString("pt-BR",{hour:"2-digit",minute:"2-digit"}) }</p>
      <section id="container-pedidos-${pedidoComData.dataPedido}"></section>`;
    const main=document.getElementsByTagName("main")[0];
    main.innerHTML+=elementoPedido
    for(const idProduto in pedidoComData.pedido){
        desenharProdutoNoCarrinhoSimples(idProduto,`container-pedidos-${pedidoComData.dataPedido}`,pedidoComData.pedido[idProduto]);
    }
}

function renderizarHistoricoPedido(){
    const historico=lerLocalStorage("historico");
    for (const pedidoConta of historico){
        criarPedidoHistorico(pedidoConta);
    }
}

renderizarHistoricoPedido();