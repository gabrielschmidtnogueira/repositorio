const catalogo = [
    {
        id: 1,
        nome: 'Hamburgão Top',
        preco: 25.90,
        nomeArquivoImagem: 'produto1.png'
    },
    {
        id: 2,
        nome: 'Hamburgão Menos Top',
        preco: 20.00,
        nomeArquivoImagem: 'produto2.png'
    },
    {
        id: 3,
        nome: 'Batata Frita',
        preco: 15.00,
        nomeArquivoImagem: 'produto3.jpg'
    }
];

for (const produtoCatalogo of catalogo) {
    const cardPoduto = `
    <div id="card-produto-1">
        <img src="assets/${produtoCatalogo.nomeArquivoImagem}" alt="" srcset="">
        <p>${produtoCatalogo.nome}</p>
        <p>R$ ${produtoCatalogo.preco}</p>
        <button>Adiconar</button>
    </div>`

    document.getElementById("container-produto").innerHTML += cardPoduto
}

