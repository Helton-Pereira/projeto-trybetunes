import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { trackName, previewUrl, trackId,
      addFavoriteSongs, checkedBox } = this.props;
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
            onChange={ addFavoriteSongs }
            checked={ checkedBox }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  addFavoriteSongs: PropTypes.func.isRequired,
  checkedBox: PropTypes.bool.isRequired,
};

export default MusicCard;
