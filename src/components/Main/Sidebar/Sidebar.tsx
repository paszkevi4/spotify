import React from 'react';
import { connect } from 'react-redux';
import SidebarItem from './SidebarItem/SidebarItem';
import { setPlaylistsThunk } from '../../../store/userReducer';
import { NavLink } from 'react-router-dom';

import { RootReducerType } from '../../../store/store';
import './sidebar.css';
import logo from '../../../images/spotify_wide.png';
import HomeIcon from '@material-ui/icons/Home';
import WidgetsIcon from '@material-ui/icons/Widgets';

const Sidebar: React.FC = (props: any) => {
  React.useEffect(() => {
    props.setPlaylistsThunk();
  }, []);
  return (
    <>
      <div className="sidebar">
        <img src={logo} alt="SPOTIFY" />
        <NavLink to="/home" activeClassName="navLink_active">
          <SidebarItem icon={<HomeIcon />} title="Home" />
        </NavLink>
        <NavLink to="/browse" activeClassName="navLink_active">
          <SidebarItem icon={<WidgetsIcon />} title="Browse" />
        </NavLink>
        <p>PLAYLISTS</p>
        <hr />
        {props.playlists.map((list: any) => {
          return (
            <NavLink
              to={`/playlist/${list.id}`}
              activeClassName="playlistLink_active"
              key={list.id}>
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
