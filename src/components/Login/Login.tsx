import React from 'react';
import { loginURL } from '../../spotify/spotify';

import { connect } from 'react-redux';

import { authorizeThunk } from '../../store/authReducer';

const Login: React.FC = (props: any) => {
  React.useEffect(() => {
    props.authorizeThunk();
  }, [props]);
  return (
    <div>
      Spotify
      <hr />
      <a href={loginURL}>signup</a>
    </div>
  );
};

export default connect(null, { authorizeThunk })(Login);
