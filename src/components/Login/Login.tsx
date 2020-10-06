import React from 'react';
import './login.css';
import { loginURL } from '../../spotify/spotify';
import logo from '../../images/spotify_wide.png';

import { connect } from 'react-redux';

import { authorizeThunk } from '../../store/authReducer';

const Login: React.FC = (props: any) => {
  React.useEffect(() => {
    props.authorizeThunk();
  }, [props]);
  return (
    <div className="login">
      <img src={logo} alt="1" />
      <a href={loginURL}>SIGN IN</a>
    </div>
  );
};

export default connect(null, { authorizeThunk })(Login);
