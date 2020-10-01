import React from 'react';
import loginURL from '../../spotify/spotify';

const Login: React.FC = () => {
  return (
    <div>
      Spotify
      <a href={loginURL}>signup</a>
    </div>
  );
};

export default Login;
