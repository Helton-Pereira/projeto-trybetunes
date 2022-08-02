import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { getUser } from '../services/userAPI';

class Header extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     name: '',
  //     isLoading: false,
  //   };
  // }

  // handleName = async () => {
  //   const { name } = this.state;
  //   const userName = await getUser();
  //   this.setState({ name: userName });
  // }

  render() {
    return (
      <header data-testid="header-component">
        Trybe Tubos
        <p data-testid="header-user-name" />
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
