const catalogoProdutos=document.getElementById('container-produto');

function exibirTodos(){
    const produtosEscondidos = Array.from(catalogoProdutos.getElementsByClassName('hidden'));
    for(const produto of produtosEscondidos){
        produto.classList.remove('hidden');
    }
}

function esconderBebidas(){
    exibirTodos();
    const prrodutosBebida = Array.from(catalogoProdutos.getElementsByClassName('bebida'));
    for(const produto of prrodutosBebida){
        produto.classList.add('hidden')
    }
}

function esconderPorcoes(){
    exibirTodos();
    const prrodutosPorcoes= Array.from(catalogoProdutos.getElementsByClassName('porcao'));
    for(const produto of prrodutosPorcoes){
        produto.classList.add('hidden')
    }
}

export function inicializarFiltros(){
    document.getElementById('exibir-Todos').addEventListener('click',exibirTodos);
    document.getElementById('exibir-Bebidas').addEventListener('click',esconderPorcoes);
    document.getElementById('exibir-Porcoes').addEventListener('click',esconderBebidas);
}