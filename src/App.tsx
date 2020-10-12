import React from 'react';
import { connect } from 'react-redux';
import { RootReducerType } from './store/store';

// Styles
import './app.css';
//
// Components
import Login from './components/Login/Login';
import Main from './components/Main/Main';

interface IProps {
  isAuth?: boolean;
}

const App: React.FC<IProps> = ({ isAuth }) => {
  return <div className="app">{isAuth ? <Main /> : <Login />}</div>;
};

const mapStateToProps = (state: RootReducerType) => {
  return {
    isAuth: state.authInfo.isAuth,
  };
};

export default connect(mapStateToProps, null)(App);
