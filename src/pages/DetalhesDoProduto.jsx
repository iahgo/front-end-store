import React from 'react';
import PropTypes from 'prop-types';

class DetalhesDoProduto extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      emailComent: '',
      avaliacao: '',
      comentario: '',
      productIDlocal: '',
      arr: [],
    };
  }

  componentDidMount() {
    this.carregarInfos();
  }

  pegarLocalStorage = (chave) => {
    JSON.parse(localStorage.getItem(chave));
  };

  carregarLocalStorage = (chave, valor) => {
    localStorage.setItem(chave, JSON.stringify(valor));
  };

  carregarInfos = () => {
    const {
      products,
      match: {
        params: { productID },
      },
    } = this.props;
    this.setState({
      product: products.find((product) => product.id === productID),
    });
    this.setState({ productIDlocal: productID });

    // ######################### Não é ideal usar rs... ##############################
    const arr = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const ver = JSON.parse(localStorage.getItem(localStorage.key(index)));
      if (ver.productIDlocal === productID) arr.push(ver);
    }
    this.setState({ arr });
    // ######################### Não é ideal usar rs... ##############################
  };

  onComments = (event) => {
    const { value, type } = event.target;
    if (type === 'email') {
      this.setState({ emailComent: value });
    }
    if (type === 'checkbox') {
      this.setState({ avaliacao: value });
    }
    if (type === 'textarea') {
      this.setState({ comentario: value });
    }
  };

  onSaveComments = () => {
    const { comentario, avaliacao, emailComent, productIDlocal } = this.state;
    const comentarios = {
      productIDlocal,
      emailComent,
      avaliacao,
      comentario,
    };
    this
      .carregarLocalStorage(`${productIDlocal}_${localStorage.length + 1}`, comentarios);

    // ######################### Não é ideal usar rs... ##############################
    const arr = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const ver = JSON.parse(localStorage.getItem(localStorage.key(index)));
      if (ver.productIDlocal === productIDlocal) arr.push(ver);
    }
    this.setState({ arr });
    // ######################### Não é ideal usar rs... ##############################
  };

  render() {
    const { product, arr } = this.state;
    const { addProductToCart } = this.props;
    return (
      <div>
        <div data-testid="product">
          <div>
            <span data-testid="product-detail-name">
              {!product ? '' : product.title}
            </span>
            <span>{!product ? '' : product.price}</span>
            <img
              src={ !product ? '' : product.thumbnail }
              alt={ !product ? '' : product.title }
            />
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ (event) => {
                addProductToCart(event, product);
              } }
            >
              Adicionar ao Carrinho
            </button>
          </div>
          <div>Especificações Técnicas</div>
        </div>

        <div>
          <h3>Avaliações</h3>
          <form>
            <label htmlFor="comentario">
              E-mail:
              <input
                data-testid="product-detail-email"
                type="email"
                alt="Campo de e-mail"
                id="email"
                onChange={ this.onComments }
              />
            </label>
            <input
              data-testid="1-rating"
              type="checkbox"
              id="estrela_1"
              name="estrela_1"
              value="1"
              onChange={ this.onComments }
            />
            <input
              data-testid="2-rating"
              type="checkbox"
              id="estrela_2"
              name="estrela_2"
              value="2"
              onChange={ this.onComments }
            />
            <input
              data-testid="3-rating"
              type="checkbox"
              id="estrela_3"
              name="estrela_3"
              value="3"
              onChange={ this.onComments }
            />
            <input
              data-testid="4-rating"
              type="checkbox"
              id="estrela_4"
              name="estrela_4"
              value="4"
              onChange={ this.onComments }
            />
            <input
              data-testid="5-rating"
              type="checkbox"
              id="estrela_5"
              name="estrela_5"
              value="5"
              onChange={ this.onComments }
            />
            <label htmlFor="comentario">

              <textarea
                data-testid="product-detail-evaluation"
                type="textarea"
                id="comentario"
                name="comentario"
                rows="5"
                cols="33"
                onChange={ this.onComments }
              />
            </label>
          </form>
          <button
            data-testid="submit-review-btn"
            type="button"
            onClick={ this.onSaveComments }
          >
            Enviar
          </button>
          <div>
            {arr.map((ma, index) => (
              <div key={ index }>
                <div>
                  <span>{ ma.emailComent }</span>
                  <span>{ma.avaliacao}</span>
                </div>
                <div>{ ma.comentario }</div>
              </div>
            ))}

          </div>
        </div>
      </div>
    );
  }
}

DetalhesDoProduto.propTypes = {
  addProductToCart: PropTypes.func,
  products: PropTypes.array,
}.isRequired;

export default DetalhesDoProduto;
