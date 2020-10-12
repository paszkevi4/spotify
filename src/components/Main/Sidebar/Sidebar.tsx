import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Store
import { setPlaylistsThunk } from '../../../store/userReducer';
import { RootReducerType } from '../../../store/store';

// Components
import SidebarItem from './SidebarItem/SidebarItem';
import HomeIcon from '@material-ui/icons/Home';
import WidgetsIcon from '@material-ui/icons/Widgets';

// Styles
import './sidebar.css';
import logo from '../../../images/spotify_wide.png';

interface IProps {
  playlists: [];
  setPlaylistsThunk: () => void;
}

const Sidebar: React.FC<IProps> = ({ playlists, setPlaylistsThunk }) => {
  React.useEffect(() => {
    setPlaylistsThunk();
  }, []);
  return (
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
      {playlists.map((list: { id: string; name: string }) => {
        return (
          <NavLink to={`/playlist/${list.id}`} activeClassName="playlistLink_active" key={list.id}>
            <SidebarItem title={list.name} />
          </NavLink>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state: RootReducerType) => {
  return {
    playlists: state.userInfo.playlists,
  };
};

export default connect(mapStateToProps, { setPlaylistsThunk })(Sidebar);
