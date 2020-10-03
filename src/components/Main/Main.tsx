import React from 'react';
import './main.css';
import Sidebar from './Sidebar/Sidebar';
import MainBody from './MainBody/MainBody';
import Player from './Player/Player';
import { connect } from 'react-redux';
import { setUserThunk } from '../../store/userReducer';

const Main: React.FC = (props: any) => {
  React.useEffect(() => {
    props.setUserThunk();
  }, [props]);
  return (
    <div className="main">
      <Sidebar />
      <MainBody />
      <Player />
    </div>
  );
};

export default connect(null, { setUserThunk })(Main);
