import { Dispatch as DispatchType } from 'redux';
import spotify from '../spotify/spotify';

const SET_USER = 'SET_USER';
const SET_PLAYLISTS = 'SET_PLAYLISTS';

type stateType = {
  user: any;
  playlists: any;
  playing: boolean;
  item: any;
};

type setUserACType = {
  type: typeof SET_USER;
  user: any;
};

type setPlaylistsACType = {
  type: typeof SET_PLAYLISTS;
  playlists: any;
};

type actionType = setUserACType | setPlaylistsACType;

const initialState = {
  user: null,
  playlists: [],
  playing: false,
  item: null,
};

const userReducer = (state = initialState, action: actionType): stateType => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case SET_PLAYLISTS:
      return { ...state, playlists: action.playlists };
    default:
      return state;
  }
};

export const setUserAC = (user: any): setUserACType => ({
  type: SET_USER,
  user,
});

export const setPlaylistsAC = (playlists: any): setPlaylistsACType => ({
  type: SET_PLAYLISTS,
  playlists,
});

export const setUserThunk = () => {
  return (dispatch: DispatchType) => {
    spotify.setAccessToken(sessionStorage.getItem('token'));
    spotify.getMe().then((me) => dispatch(setUserAC(me)));
  };
};

export const setPlaylistsThunk = () => {
  return (dispatch: DispatchType) => {
    spotify.setAccessToken(sessionStorage.getItem('token'));
    spotify.getUserPlaylists().then((playlists) => dispatch(setPlaylistsAC(playlists.items)));
  };
};

export default userReducer;
