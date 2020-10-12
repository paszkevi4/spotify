import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

// Store
import { RootReducerType } from '../../../../store/store';
import { setPlaylistsThunk, setCurrentCategoryThunk } from '../../../../store/browseReducer';

// Styles
import './browse.css';

interface IProps {
  match: { params: { listId: string } };
  categories: Array<any>;
  current?: Array<any>;
  setPlaylistsThunk: () => void;
  setCurrentCategoryThunk: (id: string) => void;
}

const Browse: React.FC<IProps> = ({
  match,
  categories,
  current,
  setPlaylistsThunk,
  setCurrentCategoryThunk,
}) => {
  React.useEffect(() => {
    setPlaylistsThunk();
  }, []);
  React.useEffect(() => {
    setCurrentCategoryThunk(match.params.listId);
  }, [match.params.listId]);
  return (
    <>
      <div className="browse__header">
        <p className="browse__name">
          {match.params.listId
            ? categories.find((el: any) => {
                return el.id === match.params.listId;
              }).name
            : 'Browse'}
        </p>
        <div className="browse__gradient"></div>
      </div>
      <div className="browse">
        {!match.params.listId &&
          categories.map((el: any) => {
            return (
              <NavLink to={`/browse/${el.id}`} key={el.id}>
                <div className="browse__plate">
                  <img src={el.icons[0].url} />
                  <span>{el.name}</span>
                </div>
              </NavLink>
            );
          })}
        {match.params.listId &&
          current?.map((el: any) => {
            return (
              <NavLink to={`/playlist/${el.id}`} key={el.id}>
                <img src={el.images[0].url} />
              </NavLink>
            );
          })}
      </div>
    </>
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
