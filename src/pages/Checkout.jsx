import React from 'react';
import PropTypes from 'prop-types';
import CartItem from '../components/CartItem';

class Checkout extends React.Component {
  render() {
    const { produtosDoCarrinho, handleQuantity, totalPrice } = this.props;
    return (
      <>
        <div>
          {
            produtosDoCarrinho.map((product, index) => (
              <CartItem
                product={ product }
                key={ index }
                handleQuantity={ handleQuantity }
              />
            ))
          }
        </div>
        <div>
          <p>
            Valor Total:
            {' '}
            {totalPrice}
          </p>
        </div>
        <form>
          <h3>Informações do comprador</h3>
          <input
            type="text"
            placeholder="Nome completo"
            data-testid="checkout-fullname"
          />
          <input type="text" placeholder="CPF" data-testid="checkout-cpf" />
          <input type="text" placeholder="Email" data-testid="checkout-email" />
          <input type="text" placeholder="Telefone" data-testid="checkout-phone" />
          <input type="text" placeholder="CEP" data-testid="checkout-cep" />
          <input type="text" placeholder="Endereço" data-testid="checkout-address" />
          <input type="text" placeholder="Complemento" />
          <input type="text" placeholder="Número" />
          <input type="text" placeholder="Cidade" />
          <select id="UF" name="UF">
            <option value="">Selecione</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espirito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MT">Mato Grosso</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
          <p>Selecione um método de pagamento</p>
          <label htmlFor="boleto">
            Boleto
            <input type="radio" id="boleto" name="payment" value="boleto" />
          </label>
          <label htmlFor="visa">
            Visa
            <input type="radio" id="visa" name="payment" value="visa" />
          </label>
          <label htmlFor="mastercard">
            MasterCard
            <input type="radio" id="mastercard" name="payment" value="mastercard" />
          </label>
          <button
            type="submit"
            onClick={ (event) => { event.preventDefault(); } }
          >
            Finalizar
          </button>
        </form>
      </>
    );
  }
}

Checkout.propTypes = {
  produtosDoCarrinho: PropTypes.array,
}.isRequired;

export default Checkout;
