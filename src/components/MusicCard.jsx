import React, { Component } from 'react';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId, favoriteSongs } = this.props;
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
        </audio>
        <label
          htmlFor={ `checkbox-music-${trackId}` }
          data-testid={ `checkbox-music-${trackId}` }
        >
          Favorita
          <input
            type="checkbox"
            id={ `checkbox-music-${trackId}` }
            onChange={ favoriteSongs }
          />
        </label>
      </div>
    );
  }
}

export default MusicCard;
