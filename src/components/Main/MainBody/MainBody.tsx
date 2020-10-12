import React from 'react';
import { Route, Redirect } from 'react-router';

// Components
import Header from './Header/Header';
import Homepage from './Home/Homepage';
import Browse from './Browse/Browse';
import Playlist from './Playlist/Playlist';

import './mainBody.css';

const MainBody: React.FC = () => {
  return (
    <div className="mainBody">
      <Header />
      <Route path="/home" render={() => <Homepage />} />
      <Route path="/browse/:listId?" render={() => <Browse />} />
      <Route path="/playlist/:listId" render={() => <Playlist />} />
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
    </div>
  );
};

export default MainBody;
