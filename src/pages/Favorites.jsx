import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="page-favorites">Favoritos</p>
      </div>
    );
  }
}

export default Favorites;
