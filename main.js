import { renderCatalogo } from "./src/cardProduto";
import { inicializarFiltros } from "./src/filtrosCatalogo";
import { atualizarPrecoCarrinho, inicializarCarrinho, renderizarProdutosCarrinho } from "./src/menucarrinho";

renderCatalogo();
inicializarCarrinho();
renderizarProdutosCarrinho();
atualizarPrecoCarrinho();
inicializarFiltros();