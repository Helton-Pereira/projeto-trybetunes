import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.handleName();
  }

  handleName = async () => {
    this.setState({ isLoading: true });
    const userName = await getUser();
    this.setState({ name: userName });
    this.setState({ isLoading: false });
  }

  render() {
    const { name, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          Olá,
          {' '}
          { name.name }
        </p>
        <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
