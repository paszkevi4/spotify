import React from 'react';
import { connect } from 'react-redux';
import './main.css';
import Sidebar from './Sidebar/Sidebar';
import MainBody from './MainBody/MainBody';
import Player from './Player/Player';

const Main: React.FC = (props: any) => {
  return (
    <div className="main">
      <Sidebar />
      <MainBody />
      <Player />
    </div>
  );
};

export default connect(null, null)(Main);
