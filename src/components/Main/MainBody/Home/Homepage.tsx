import React from 'react';
import './homepage.css';
import { connect } from 'react-redux';
import { getAlbumsThunk } from '../../../../store/homeReducer';
import { RootReducerType } from '../../../../store/store';
import Row from './Row/Row';

const Home = (props: any) => {
  React.useEffect(() => {
    props.getAlbumsThunk();
  }, []);
  return (
    <div className="homepage">
      <div className="home__header">
        <p className="home__name">Home</p>
        <div className="home__gradient"></div>
      </div>
      <div className="home">
        <Row title="featured" items={props.home.featured} />
        <Row title="pop" items={props.home.pop} />
        <Row title="rock" items={props.home.rock} />
        <Row title="hiphop" items={props.home.hiphop} />
        <Row title="indie" items={props.home.indie} />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootReducerType) => {
  return {
    home: state.home,
  };
};

export default connect(mapStateToProps, { getAlbumsThunk })(Home);
