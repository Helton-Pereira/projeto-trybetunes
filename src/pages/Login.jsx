import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      name: '',
      isLoading: false,
    };
  }

  handleChange = ({ target }) => {
    const minimumCharacters = 3;
    this.setState({ name: target.value });
    if (target.value.length >= minimumCharacters) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  handleUserCreation = async (e) => {
    e.preventDefault();
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name });
    history.push('/search');
  }

  render() {
    const { disabled, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        <form>
          <label htmlFor="login-input">
            insira seu nome
            <input
              type="text"
              id="login-input"
              onChange={ this.handleChange }
              data-testid="login-name-input"
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ disabled }
            onClick={ this.handleUserCreation }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};

export default Login;
