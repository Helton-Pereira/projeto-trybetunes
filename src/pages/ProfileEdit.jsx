import React, { Component } from 'react';
import Header from '../components/Header';

class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <p>Editar Perfil</p>
      </div>
    );
  }
}

export default ProfileEdit;
