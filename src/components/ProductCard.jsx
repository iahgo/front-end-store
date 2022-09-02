import React from 'react';
import { Link } from 'react-router-dom';

function components({ product, addProductToCart }) {
  const { title, price, thumbnail, id, shipping } = product;
  return (
    <div data-testid="product" className="produtos">
      <div className="produto">
      <h4>{title}</h4>
      <img src={ thumbnail } alt={ title } />
      <h4>R${price}</h4>
      {shipping.free_shipping && <p data-testid="free-shipping">Frete grátis</p>}
      <button
        type="button"
        data-testid="product-add-to-cart"
        onClick={ (event) => { addProductToCart(event, product); } }
      >
        Adicionar ao Carrinho
      </button>

      </div>
      <Link
        data-testid="product-detail-link"
        to={ `/DetalhesDoProduto/${id}` }
      >
        Detalhes do produto
      </Link>
      <br />
    </div>
  );
}

export default components;
