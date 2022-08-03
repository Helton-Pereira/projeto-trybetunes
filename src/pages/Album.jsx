import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      artistAlbum: '',
      albumTracks: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    console.log(data);
    this.setState({
      artistName: data[0].artistName,
      artistAlbum: data[0].collectionName,
      albumTracks: data.filter((track) => track.trackName),
    });
  }

  render() {
    const { artistName, artistAlbum, albumTracks } = this.state;
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
        {albumTracks.map((e) => (<MusicCard
          key={ e.trackName }
          trackName={ e.trackName }
          previewUrl={ e.previewUrl }
        />
        ))}
      </div>
    );
  }
}

export default Album;
