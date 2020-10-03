import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './app.css';

//
// Components
import Login from './components/Login/Login';
import Main from './components/Main/Main';

import { RootReducerType } from './store/store';

interface IProps {
  isAuth?: boolean;
}

const App: React.FC<IProps> = (props) => {
  return <div className="app">{props.isAuth ? <Main /> : <Login />}</div>;
};

const mapStateToProps = (state: RootReducerType) => {
  return {
    isAuth: state.authInfo.isAuth,
  };
};

export default connect(mapStateToProps, null)(App);
