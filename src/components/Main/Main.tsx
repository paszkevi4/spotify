import React from 'react';
import { connect } from 'react-redux';

import { setUserThunk } from '../../store/userReducer';

// Components
import './main.css';
import Sidebar from './Sidebar/Sidebar';
import MainBody from './MainBody/MainBody';
import Player from './Player/Player';

interface IProps {
  setUserThunk: () => void;
}

const Main: React.FC<IProps> = ({ setUserThunk }) => {
  React.useEffect(() => {
    setUserThunk();
  }, [setUserThunk]);
  return (
    <div className="main">
      <Sidebar />
      <MainBody />
      <Player />
    </div>
  );
};

export default connect(null, { setUserThunk })(Main);
