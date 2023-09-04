export const catalogo = [
    {
        id: "1",
        nome: 'Hamburgão Top',
        preco: 25.90,
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