import React from 'react';
import PropTypes from 'prop-types';
import CartItem from './components/CartItem';

class ShoppingCart extends React.Component {
  handleClick = () => {
    const path = '/checkout';
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const { produtosDoCarrinho, handleQuantity, totalPrice } = this.props;
    return (
      <div>
        { produtosDoCarrinho.length > 0 ? produtosDoCarrinho.map((product, index) => (
          <CartItem
            product={ product }
            key={ index }
            handleQuantity={ handleQuantity }
          />
        ))
          : <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
        <div>
          <p>
            Valor Total:
            {' '}
            {totalPrice}
          </p>
        </div>
        <button
          type="button"
          data-testid="checkout-products"
          onClick={ this.handleClick }
          disabled={ produtosDoCarrinho.length < 1 }
        >
          Finalizar Compra
        </button>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  produtosDoCarrinho: PropTypes.array,
}.isRequired;

export default ShoppingCart;
