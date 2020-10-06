import React from 'react';
import './homepage.css';
import { connect } from 'react-redux';
import { getAlbumsThunk } from '../../../../store/homeReducer';

const Home = (props: any) => {
  React.useEffect(() => {
    props.getAlbumsThunk();
  }, []);
  return <div className="homepage">HomePage</div>;
};

export default connect(null, { getAlbumsThunk })(Home);
