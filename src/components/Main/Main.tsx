import React from 'react';
import './main.css';
import Sidebar from './Sidebar/Sidebar';
import MainBody from './MainBody/MainBody';
import Player from './Player/Player';

const Main: React.FC = (props) => {
  return (
    <div className="main">
      <Sidebar />
      <MainBody />
      <Player />
    </div>
  );
};

export default Main;
