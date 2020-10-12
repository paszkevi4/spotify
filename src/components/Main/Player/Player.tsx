import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

// Store
import {
  setSongThunk,
  setVolumeAC,
  setIsPlayingAC,
  changeCurrentTrackThunk,
  changeShuffleAC,
  changeLoopAC,
} from '../../../store/playerReducer';
import { RootReducerType } from '../../../store/store';

// Components
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SyncIcon from '@material-ui/icons/Sync';
import Slider from '@material-ui/core/Slider';

import './player.css';

interface IProps {
  track: { preview_url: string; album: any; name: string };
  trackNumber: number;
  volume: number;
  isPlaying: boolean;
  shuffle: boolean;
  loop: boolean;
  setSongThunk: () => void;
  changeCurrentTrackThunk: (track: number) => void;
  setVolumeAC: (n: number) => {};
  setIsPlayingAC: (value: any) => {};
  changeShuffleAC: () => {};
  changeLoopAC: () => {};
}

const Player: React.FC<IProps> = (props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const volume = useState(props.volume)[0];
  const [playback, setPlayback] = useState(0);

  useEffect(() => {
    let interval: any;
    if (props.isPlaying) {
      interval = setInterval(() => {
        audioRef.current && setPlayback(audioRef.current.currentTime);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [props.isPlaying]);

  // Play/Pause controls
  useEffect(() => {
    props.setSongThunk();
  }, []);

  const togglePlaying = (value: boolean) => {
    props.setIsPlayingAC(value);
    if (audioRef.current) {
      value ? audioRef.current.play() : audioRef.current.pause();
    }
  };

  // Volume controls
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = props.volume;
      props.isPlaying && audioRef.current.play();
      audioRef.current.loop = props.loop;
    }
  }, [props]);
  const handleVolume = (_: any, n: any) => {
    props.setVolumeAC(n);
  };
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
      <div className="player__controls_container">
        <div className="player__controls">
          <ShuffleIcon
            onClick={props.changeShuffleAC}
            style={props.shuffle ? { color: '#1db954' } : {}}
          />
          <SkipPreviousIcon onClick={() => props.changeCurrentTrackThunk(props.trackNumber - 1)} />
          {props.isPlaying ? (
            <PauseCircleOutlineIcon onClick={() => togglePlaying(false)} fontSize="large" />
          ) : (
            <PlayCircleOutlineIcon onClick={() => togglePlaying(true)} fontSize="large" />
          )}

          <SkipNextIcon onClick={() => props.changeCurrentTrackThunk(props.trackNumber + 1)} />
          <SyncIcon onClick={props.changeLoopAC} style={props.loop ? { color: '#1db954' } : {}} />
        </div>
        <Slider min={0} max={audioRef.current?.duration} defaultValue={0} value={playback} />
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
  changeLoopAC,
})(Player);
