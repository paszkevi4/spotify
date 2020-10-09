import React from 'react';
import { connect } from 'react-redux';
import { RootReducerType } from '../../../../store/store';
import './playlist.css';
import { withRouter } from 'react-router';
import spotify from '../../../../spotify/spotify';
import { setPlaylistAC } from '../../../../store/playerReducer';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const Playlist = (props: any) => {
  const [currentPlaylist, setCurrentPlaylist] = React.useState<any>(null);
  const [songs, setSongs] = React.useState([]);

  React.useEffect(() => {
    spotify.getPlaylist(props.match.params.listId).then((el: any) => setCurrentPlaylist(el));
    spotify.getPlaylistTracks(props.match.params.listId).then((el: any) => setSongs(el.items));
  }, [props.match.params.listId]);

  return (
    <div className="playlist">
      <div className="playlist__gradient"></div>
      <div className="playlist__header">
        <img
          className="playlist__cover"
          src={
            currentPlaylist?.images[0]?.url ||
            `https://i.pinimg.com/originals/90/e3/41/90e34121229253d293dcd6e8e40b6f44.jpg`
          }
          alt="playlist cover"
        />
        <div className="albumAbout">
          <p className="albumAbout__playlist">PLAYLIST</p>
          <h1 className="albumAbout__name">{currentPlaylist?.name}</h1>
          <h5 className="albumAbout__description">
            {currentPlaylist?.description.replace(/(&quot;)/g, '"').replace(/(&#x27;)/g, "'")}
          </h5>
          <h5 className="albumAbout__author">{currentPlaylist?.owner.display_name}</h5>
        </div>
      </div>
      <div className="play_button">
        <PlayArrowIcon fontSize="large" />
      </div>
      <div className="playlist__table_head">
        <p className="table__name">
          <span>#</span>
          <span>NAME</span>
        </p>
        <p className="table__info">
          <span>ALBUM</span>
          <span>DURATION</span>
        </p>
      </div>
      <div className="playlist__table">
        {songs.map((el: { track: any }, i: number) => {
          const min = Math.floor((el.track?.duration_ms / 1000 / 60) << 0);
          let sec: string | number = Math.floor((el.track?.duration_ms / 1000) % 60);
          if (sec < 10) {
            sec = '0' + sec;
          }
          return (
            <div
              className={
                el.track?.id === props.currTrack
                  ? 'playlist__track  playlist__track_playing'
                  : 'playlist__track'
              }
              key={el.track?.id}
              onClick={() => {
                props.setPlaylistAC(songs, i);
              }}>
              <div>
                <p className="playlist__number">{i + 1}</p>
                <img src={el.track?.album.images[2].url} alt={el.track?.album.name} />
                <div className="playlist__name">
                  <p className="playlist__songName">{el.track?.name}</p>
                  <p>{el.track?.artists[0].name}</p>
                </div>
              </div>
              <div className="playlist__info">
                <p>{el.track?.album.name}</p>
                <p>{min + ':' + sec}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootReducerType) => {
  return {
    //playlists: state.userInfo.playlists,
    // playlistToSearch: state.player.playlist,
    // trackToSearch: state.player.track,
    currTrack: state.player.playlist[state.player.track].track?.id,
  };
};

export default withRouter(connect(mapStateToProps, { setPlaylistAC })(Playlist));
