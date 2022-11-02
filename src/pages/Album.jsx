import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      artistAlbum: '',
      albumTracks: [],
      isLoading: false,
      favoriteList: [],
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    this.setState({
      artistName: data[0].artistName,
      artistAlbum: data[0].collectionName,
      albumTracks: data.filter((track) => track.trackName),
    });
    const response = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteList: response });
  }

  handleCheckBox = async ({ target }, trackObject) => {
    this.setState({ isLoading: true });
    if (!target.checked) await removeSong(trackObject);
    await addSong(trackObject);
    const response = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteList: response });
  }

  render() {
    const { artistName, artistAlbum, albumTracks,
      isLoading, favoriteList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ artistName }</h2>
        <h3 data-testid="album-name">
          { artistAlbum }
          {' '}
          by
          {' '}
          { artistName }
        </h3>
        { isLoading && <Loading /> }
        {albumTracks.map((e) => (<MusicCard
          key={ e.trackName }
          trackName={ e.trackName }
          previewUrl={ e.previewUrl }
          trackId={ e.trackId }
          addFavoriteSongs={ (event) => this.handleCheckBox(event, e) }
          checkedBox={ favoriteList.some((element) => element.trackId === e.trackId) }
        />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
