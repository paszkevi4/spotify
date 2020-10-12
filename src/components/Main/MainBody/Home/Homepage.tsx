import React from 'react';
import { connect } from 'react-redux';

import Row from './Row/Row';

// Store
import { RootReducerType } from '../../../../store/store';
import { getAlbumsThunk } from '../../../../store/homeReducer';

// Styles
import './homepage.css';

interface IProps {
  home: { featured: []; pop: []; rock: []; hiphop: []; indie: [] };
  getAlbumsThunk: () => void;
}

const Home: React.FC<IProps> = (props) => {
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
        <Row title="Featured" items={props.home.featured} />
        <Row title="Pop" items={props.home.pop} />
        <Row title="Rock" items={props.home.rock} />
        <Row title="Hip-hop" items={props.home.hiphop} />
        <Row title="Indie" items={props.home.indie} />
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
