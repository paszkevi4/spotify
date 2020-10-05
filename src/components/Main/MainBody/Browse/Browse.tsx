import React from 'react';
import { connect } from 'react-redux';
import { RootReducerType } from '../../../../store/store';
import { setPlaylistsThunk } from '../../../../store/browseReducer';
import './browse.css';

const Browse = (props: any) => {
  console.log('cats in props', props.categories);
  React.useEffect(() => {
    props.setPlaylistsThunk();
  }, []);
  return (
    <div className="browse">
      {props.categories.map((el: any) => {
        return <img src={el.icons[0].url} />;
      })}
    </div>
  );
};

const mapStateToProps = (state: RootReducerType) => {
  return {
    categories: state.browse.categories,
  };
};

export default connect(mapStateToProps, { setPlaylistsThunk })(Browse);
