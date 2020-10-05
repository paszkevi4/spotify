import React from 'react';
import './mainBody.css';
import Header from './Header/Header';
import Browse from './Browse/Browse';
import Playlist from './Playlist/Playlist';
import { Route } from 'react-router';

const MainBody: React.FC = (props) => {
  return (
    <div className="mainBody">
      <Header />
      <Route path="/browse" render={() => <Browse />} />
      <Route path="/playlist/:listId" render={() => <Playlist />} />
    </div>
  );
};

export default MainBody;
