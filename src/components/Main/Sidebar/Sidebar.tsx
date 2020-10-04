import React from 'react';
import { connect } from 'react-redux';
import SidebarItem from './SidebarItem/SidebarItem';
import { setPlaylistsThunk } from '../../../store/userReducer';
import { NavLink } from 'react-router-dom';

import { RootReducerType } from '../../../store/store';
import './sidebar.css';
import logo from './spotify_wide.png';

const Sidebar: React.FC = (props: any) => {
  React.useEffect(() => {
    props.setPlaylistsThunk();
  }, [props]);
  return (
    <>
      <div className="sidebar">
        <img src={logo} alt="SPOTIFY" />
        <NavLink to="/home" activeClassName="navLink_active">
          <SidebarItem title="Home" />
        </NavLink>
        <NavLink to="/search" activeClassName="navLink_active">
          <SidebarItem title="Search" />
        </NavLink>
        <NavLink to="/library" activeClassName="navLink_active">
          <SidebarItem title="My library" />
        </NavLink>
        <p>PLAYLISTS</p>
        <hr />
        {props.playlists.map((list: any) => {
          return (
            <NavLink to={`/playlist/${list.id}`} key={list.id}>
              <SidebarItem title={list.name} />
            </NavLink>
          );
        })}
      </div>
      <div></div>
    </>
  );
};

const mapStateToProps = (state: RootReducerType) => {
  return {
    playlists: state.userInfo.playlists,
  };
};

export default connect(mapStateToProps, { setPlaylistsThunk })(Sidebar);
