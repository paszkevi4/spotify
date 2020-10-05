import React, { useEffect } from 'react';
import './player.css';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SyncIcon from '@material-ui/icons/Sync';
import { connect } from 'react-redux';
import {
  setSongThunk,
  setVolumeAC,
  setIsPlayingAC,
  changeCurrentTrackThunk,
  changeShuffleAC,
} from '../../../store/playerReducer';
import { RootReducerType } from '../../../store/store';
import Slider from '@material-ui/core/Slider';

const Player: React.FC = (props: any) => {
  const audioRef = React.useRef(null);
  //const [isPlaying, setIsPlaying] = React.useState(props.isPlaying);
  const volume = React.useState(props.volume)[0];

  // Play/Pause controls
  useEffect(() => {
    props.setSongThunk();
  }, []);

  const togglePlaying = (value: boolean) => {
    props.setIsPlayingAC(value);
    //@ts-ignore
    value ? audioRef.current.play() : audioRef.current.pause();
  };

  // Volume controls
  useEffect(() => {
    //@ts-ignore
    audioRef.current.volume = props.volume;
    //@ts-ignore
    props.isPlaying && audioRef.current.play();
    //@ts-ignore
    audioRef.current.loop = props.loop;
  }, [props]);
  const handleVolume = (_: any, n: any) => {
    props.setVolumeAC(n);
  };

  //@ts-ignore
  window.volume = props.volume;
  return (
    <div className="player">
      <audio
        onEnded={() => props.changeCurrentTrackThunk(props.trackNumber + 1)}
        ref={audioRef}
        src={props.track?.preview_url}></audio>
      <div className="player__song">
        <img src={props.track?.album?.images[2].url} alt="track cover" />
        <h4>{props.track?.name}</h4>
        <p>{props.track?.album?.artists[0].name}</p>
      </div>
      <div className="player__controls">
        <ShuffleIcon onClick={props.changeShuffleAC} />
        <SkipPreviousIcon onClick={() => props.changeCurrentTrackThunk(props.trackNumber - 1)} />
        {props.isPlaying ? (
          <PauseCircleOutlineIcon onClick={() => togglePlaying(false)} />
        ) : (
          <PlayCircleOutlineIcon onClick={() => togglePlaying(true)} />
        )}

        <SkipNextIcon onClick={() => props.changeCurrentTrackThunk(props.trackNumber + 1)} />
        <SyncIcon />
      </div>
      <div className="player__volume">
        <Slider
          onChangeCommitted={handleVolume}
          min={0}
          max={1}
          defaultValue={volume}
          step={0.01}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootReducerType) => {
  return {
    track: state.player.playlist[state.player.track].track,
    trackNumber: state.player.track,
    volume: state.player.volume,
    isPlaying: state.player.isPlaying,
    shuffle: state.player.shuffle,
    loop: state.player.loop,
  };
};

export default connect(mapStateToProps, {
  setSongThunk,
  setVolumeAC,
  setIsPlayingAC,
  changeCurrentTrackThunk,
  changeShuffleAC,
})(Player);
