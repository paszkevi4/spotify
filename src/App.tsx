import React, { useState, useEffect } from 'react';
import spotifyWeb from 'spotify-web-api-js';
import { connect } from 'react-redux';
import './app.css';

//
// Components
import Login from './components/Login/Login';
import Main from './components/Main/Main';

//
const spotify = new spotifyWeb();
//

const App: React.FC = (props: any) => {
  return <div className="app">{props.isAuth ? <Main /> : <Login />}</div>;
};

let mapStateToProps = (state: any) => {
  return {
    isAuth: state.authInfo.isAuth,
  };
};

export default connect(mapStateToProps, null)(App);
