import React from 'react';
import { connect } from 'react-redux';
import { RootReducerType } from '../../../../store/store';
import { setPlaylistsThunk, setCurrentCategoryThunk } from '../../../../store/browseReducer';
import { NavLink } from 'react-router-dom';

import { withRouter } from 'react-router';
import './browse.css';

const Browse = (props: any) => {
  console.log('cats in props', props);
  React.useEffect(() => {
    props.setPlaylistsThunk();
  }, []);
  React.useEffect(() => {
    props.setCurrentCategoryThunk(props.match.params.listId);
    if (props.match.params.listId) {
    }
  }, [props.match.params.listId]);
  return (
    <div className="browse">
      {!props.match.params.listId &&
        props.categories.map((el: any) => {
          return (
            <NavLink to={`/browse/${el.id}`} key={el.id}>
              <img src={el.icons[0].url} />
            </NavLink>
          );
        })}
      {props.match.params.listId &&
        props.current?.map((el: any) => {
          return (
            <NavLink to={`/playlist/${el.id}`} key={el.id}>
              <img src={el.images[0].url} />
            </NavLink>
          );
        })}
    </div>
  );
};

const mapStateToProps = (state: RootReducerType) => {
  return {
    categories: state.browse.categories,
    current: state.browse.category,
  };
};

export default withRouter(
  connect(mapStateToProps, { setPlaylistsThunk, setCurrentCategoryThunk })(Browse),
);
