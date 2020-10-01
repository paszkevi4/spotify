import React, { useState, useEffect } from 'react';
import './app.css';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import { getTokenFromURL } from './spotify/spotify';
import spotifyWeb from 'spotify-web-api-js';
import { connect } from 'react-redux';
import { setUserAC } from './store/userReducer';

const spotify = new spotifyWeb();

const App: React.FC = (props: any) => {
  const [token, setToken] = useState('');
  useEffect(() => {
    // @ts-ignore
    const _token = getTokenFromURL().access_token;
    window.location.hash = '';
    console.log('token: ', _token);
    if (_token) {
      setToken(_token);
      spotify.setAccessToken(_token);
      spotify.getMe().then((el) => props.setUserAC(el));
    }
  }, []);
  return <div className="app">{token ? <Main /> : <Login />}</div>;
};

export default connect(null, { setUserAC })(App);
