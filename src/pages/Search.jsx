import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      albumName: [],
      disabled: true,
      isLoading: false,
    };
  }

  handleChange = ({ target }) => {
    const minCharac = 2;
    this.setState({ artist: target.value });
    if (target.value.length >= minCharac) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleSearch = async () => {
    const { artist } = this.state;
    this.setState({ isLoading: true });
    const artistCollection = await searchAlbumsAPI(artist);
    this.setState({ isLoading: false });
    this.setState({ albumName: artistCollection });
  }

  render() {
    const { disabled, artist, isLoading, albumName } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search">
          Pesquisar banda ou artista
          <input
            id="search"
            type="text"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ disabled }
          onClick={ this.handleSearch }
        >
          Pesquisar
        </button>
        <div>
          <ul>
            { albumName.length > 0 ? (
              <div>
                <p>
                  Resultado de álbuns de:
                  {' '}
                  { artist }
                </p>
                {albumName.map((e) => (
                  <li
                    key={ e.collectionId }
                  >
                    {e.collectionName}
                    <img src={ e.artworkUrl100 } alt={ e.collectionName } />
                    <Link
                      to={ `/album/${e.collectionId}` }
                      data-testid={ `link-to-album-${e.collectionId}` }
                    >
                      link
                    </Link>
                  </li>)) }

              </div>)
              : <p>Nenhum álbum foi encontrado</p> }
          </ul>
        </div>
      </div>
    );
  }
}

export default Search;
