import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import Categorias from './pages/Catergorias';
import Botao from './Botao';
import ShoppingCart from './ShoppingCart';
import DetalhesDoProduto from './pages/DetalhesDoProduto';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import Checkout from './pages/Checkout';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      searchProduct: '',
      categorias: [],
      categoriaSelecionada: '',
      produtosDoCarrinho: this.loadCart() || [],
      totalPrice: 0,
    };
  }

  componentDidMount = async () => {
    const categorias = await getCategories();
    this.setState({ categorias });
  }

  handleCategories = (event) => {
    const categoriaSelecionada = event.target.value;
    this.setState({ categoriaSelecionada }, this.getProducts);
  }

  getProducts = async () => {
    const { searchProduct, categoriaSelecionada } = this.state;
    const products = await
    getProductsFromCategoryAndQuery(categoriaSelecionada, searchProduct);
    this.setState({
      products: products.results,
    });
  }

  handleSearch = (event, searchFor) => {
    event.preventDefault();
    this.setState({ searchProduct: searchFor }, this.getProducts);
  }

  addProductToCart = (event, product, amount = 1) => {
    event.preventDefault();
    this.setState((prevState) => ({
      produtosDoCarrinho: [
        ...prevState.produtosDoCarrinho,
        {
          item: product,
          amount,
          price: product.price,
        },
      ],
    }), () => { this.updateTotal(); this.saveCart(); });
  }

  saveCart = () => {
    const { produtosDoCarrinho } = this.state;
    const save = JSON.stringify(produtosDoCarrinho);
    localStorage.setItem('produtosDoCarrinho', save);
  }

    loadCart = () => JSON.parse(localStorage.getItem('produtosDoCarrinho'));

  handleQuantity = (productId, toIncrease) => {
    const { produtosDoCarrinho } = this.state;
    const updatedCart = produtosDoCarrinho.map((product) => {
      const { item } = product;
      if (item.id === productId) {
        if (toIncrease && (product.amount + 1 <= product.item.available_quantity)) {
          product.amount += 1;
        } else if (!toIncrease && product.amount > 1) {
          product.amount -= 1;
        }
        product.price = item.price * product.amount;
      }
      return product;
    });
    this.setState({
      produtosDoCarrinho: updatedCart,
    }, this.updateTotal);
  }

  updateTotal = () => {
    const { produtosDoCarrinho } = this.state;
    const totalPrice = produtosDoCarrinho
      .reduce((acc, curr) => acc + Number(curr.price), 0);
    this.setState({
      totalPrice });
  }

  render() {
    const { products, categorias, produtosDoCarrinho,
      totalPrice } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <BrowserRouter>
            <Botao produtosDoCarrinho={ produtosDoCarrinho } />
            <Switch>
              <Route
                exact
                path="/"
                render={ () => (
                  <>
                    <Search
                      handleSearch={ this.handleSearch }
                      products={ products }
                      addProductToCart={ this.addProductToCart }
                    />
                    <Categorias
                      categorias={ categorias }
                      handleChange={ this.handleCategories }
                    />
                  </>
                ) }
              />
              <Route
                path="/ShoppingCart"
                render={ (props) => (
                  <ShoppingCart
                    { ...props }
                    produtosDoCarrinho={ produtosDoCarrinho }
                    handleQuantity={ this.handleQuantity }
                    totalPrice={ totalPrice }
                  />) }
              />
              <Route
                path="/checkout"
                render={
                  () => (<Checkout
                    handleQuantity={ this.handleQuantity }
                    produtosDoCarrinho={ produtosDoCarrinho }
                    totalPrice={ totalPrice }
                  />)
                }
              />
            </Switch>
            <Route
              path="/DetalhesDoProduto/:productID/"
              render={ (props) => (
                <DetalhesDoProduto
                  { ...props }
                  products={ products }
                  addProductToCart={ this.addProductToCart }
                />) }
            />
          </BrowserRouter>
        </header>
      </div>
    );
  }
}

export default App;
