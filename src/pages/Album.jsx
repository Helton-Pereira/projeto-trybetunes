import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      artistAlbum: '',
      albumTracks: [],
      isLoading: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    this.setState({
      artistName: data[0].artistName,
      artistAlbum: data[0].collectionName,
      albumTracks: data.filter((track) => track.trackName),
    });
  }

  handleCheckBox = async (trackObject) => {
    this.setState({ isLoading: true });
    await addSong(trackObject);
    this.setState({ isLoading: false });
  }

  render() {
    const { artistName, artistAlbum, albumTracks, isLoading } = this.state;
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
          favoriteSongs={ () => this.handleCheckBox(e) }
        />
        ))}
      </div>
    );
  }
}

export default Album;
