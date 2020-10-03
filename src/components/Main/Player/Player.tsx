import React from 'react';
import './player.css';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SyncIcon from '@material-ui/icons/Sync';

const Player: React.FC = (props) => {
  return (
    <div className="player">
      <div className="player__song">
        <img
          src="https://i.scdn.co/image/ab6775700000ee85fcec82ef78e0c2af88e6d967"
          alt="track cover"
        />
        <h4>Song name</h4>
        <p>Author</p>
      </div>
      <div className="player__controls">
        <ShuffleIcon />
        <SkipPreviousIcon />
        <PlayCircleOutlineIcon />
        <SkipNextIcon />
        <SyncIcon />
      </div>
      <div className="player__volume">Volume controols</div>
    </div>
  );
};

export default Player;
