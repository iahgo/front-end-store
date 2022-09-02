import React from 'react';
import PropTypes from 'prop-types';

class CartItem extends React.Component {
  render() {
    const { product: { amount, price, item }, handleQuantity } = this.props;
    const { title, id } = item;
    return (
      <div>
        <p data-testid="shopping-cart-product-name">{title}</p>
        <p>{price}</p>
        <button
          data-testid="product-decrease-quantity"
          type="button"
          onClick={ () => { handleQuantity(id, false); } }
        >
          -
        </button>
        <span data-testid="shopping-cart-product-quantity">{amount}</span>
        <button
          data-testid="product-increase-quantity"
          type="button"
          onClick={ () => { handleQuantity(id, true); } }
        >
          +
        </button>
      </div>
    );
  }
}

CartItem.propTypes = {
  product: PropTypes.object,
}.isRequired;

export default CartItem;
