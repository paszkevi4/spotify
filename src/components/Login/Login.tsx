import React from 'react';
import { connect } from 'react-redux';

import { loginURL } from '../../spotify/spotify';
import { authorizeThunk } from '../../store/authReducer';

// Styles
import './login.css';
import logo from '../../images/spotify_wide.png';

interface IProps {
  authorizeThunk: () => void;
}

const Login: React.FC<IProps> = ({ authorizeThunk }) => {
  React.useEffect(() => {
    authorizeThunk();
  }, [authorizeThunk]);
  return (
    <div className="login">
      <img src={logo} alt="1" />
      <a href={loginURL}>SIGN IN</a>
    </div>
  );
};

export default connect(null, { authorizeThunk })(Login);
