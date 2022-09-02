import React from 'react';

class CampoPesquisa extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: 'Digite algum termo de pesquisa ou escolha uma categoria.',
    };
  }

  checarPesquisa = (event) => {
    const { value } = event.target;
    if (value.length > 0) this.setState({ msg: '' });
  };

  render() {
    const { msg } = this.state;
    return (
      <div className="campoPesquisa">
        <input
          type="text"
          onChange={ this.checarPesquisa }
        />
        <div data-testid="home-initial-message">{ msg }</div>
      </div>
    );
  }
}

export default CampoPesquisa;
