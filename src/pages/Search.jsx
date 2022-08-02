import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
    };
  }

  handleChange = ({ target }) => {
    const minCharac = 2;
    if (target.value.length >= minCharac) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search">
          Pesquisar banda ou artista
          <input
            id="search"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ disabled }
          >
            Pesquisar
          </button>
        </label>
      </div>
    );
  }
}

export default Search;
