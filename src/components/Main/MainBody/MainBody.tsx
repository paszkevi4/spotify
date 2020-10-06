import React from 'react';
import './mainBody.css';
import Header from './Header/Header';
import Homepage from './Home/Homepage';
import Browse from './Browse/Browse';
import Playlist from './Playlist/Playlist';
import { Route } from 'react-router';

const MainBody: React.FC = (props) => {
  return (
    <div className="mainBody">
      <Header />
      <Route path="/home" render={() => <Homepage />} />
      <Route path="/browse/:listId?" render={() => <Browse />} />
      <Route path="/playlist/:listId" render={() => <Playlist />} />
    </div>
  );
};

export default MainBody;
