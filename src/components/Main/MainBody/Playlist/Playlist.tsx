import React from 'react';
import { connect } from 'react-redux';
import { RootReducerType } from '../../../../store/store';
import './playlist.css';
import { withRouter } from 'react-router';
import spotify from '../../../../spotify/spotify';

const Playlist = (props: any) => {
  const currentPlaylist = props.playlists.find((el: any) => {
    return el.id === props.match.params.listId;
  });
  const [songs, setSongs] = React.useState([]);
  const [temp, setTemp] = React.useState(null);
  //@ts-ignore
  window.temp = temp;
  React.useEffect(() => {
    spotify.getPlaylistTracks(props.match.params.listId).then((el: any) => setSongs(el.items));
  }, [props.match.params.listId]);
  //spotify.getMyCurrentPlayingTrack().then((el: any) => setTemp(el));

  return (
    <div className="playlist">
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
            {currentPlaylist?.description.replace(/(&quot\;)/g, '"').replace(/(&#x27;)/g, "'")}
          </h5>
          <h5 className="albumAbout__author">{currentPlaylist?.owner.display_name}</h5>
        </div>
      </div>
      <div className="playlist__songs">
        {songs.map((el: any) => {
          console.log(el);
          return (
            <p
              onClick={() => {
                spotify.getTrack(el.track.id).then((el) => console.log(el));
              }}>
              {el.track.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootReducerType) => {
  return {
    playlists: state.userInfo.playlists,
  };
};

export default withRouter(connect(mapStateToProps)(Playlist));
