import { Dispatch as DispatchType } from 'redux';
import spotify, { getTokenFromURL } from '../spotify/spotify';

const SET_FEATURED = 'SET_FEATURED';
const SET_POP = 'SET_POP';
const SET_ROCK = 'SET_ROCK';
const SET_HIPHOP = 'SET_HIPHOP';
const SET_INDIE = 'SET_INDIE';

type stateType = {
  featured: any;
  pop: any;
  rock: any;
  hiphop: any;
  indie: any;
};

type setFeaturedACType = {
  type: typeof SET_FEATURED;
  featured: any;
};

type setPopACType = {
  type: typeof SET_POP;
  pop: any;
};

type setRockACType = {
  type: typeof SET_ROCK;
  rock: any;
};

type setHipHopACType = {
  type: typeof SET_HIPHOP;
  hiphop: any;
};

type setIndieACType = {
  type: typeof SET_INDIE;
  indie: any;
};

type actionType =
  | setFeaturedACType
  | setPopACType
  | setRockACType
  | setHipHopACType
  | setIndieACType;

const initialState: stateType = {
  featured: null,
  pop: null,
  rock: null,
  hiphop: null,
  indie: null,
};

const authReducer = (state = initialState, action: actionType): stateType => {
  switch (action.type) {
    case SET_FEATURED:
      return { ...state, featured: action.featured };
    case SET_POP:
      return { ...state, pop: action.pop };
    case SET_ROCK:
      return { ...state, rock: action.rock };
    case SET_HIPHOP:
      return { ...state, hiphop: action.hiphop };
    case SET_INDIE:
      return { ...state, indie: action.indie };
    default:
      return state;
  }
};

const setFeaturedAC = (featured: any): setFeaturedACType => ({
  type: SET_FEATURED,
  featured,
});

const setPopAC = (pop: any): setPopACType => ({
  type: SET_POP,
  pop,
});

const setRockAC = (rock: any): setRockACType => ({
  type: SET_ROCK,
  rock,
});

const setHipHopAC = (hiphop: any): setHipHopACType => ({
  type: SET_HIPHOP,
  hiphop,
});

const setIndieAC = (indie: any): setIndieACType => ({
  type: SET_INDIE,
  indie,
});

export const getAlbumsThunk = () => {
  return (dispatch: DispatchType) => {
    spotify.setAccessToken(sessionStorage.getItem('token'));
    spotify.getFeaturedPlaylists().then((res) => dispatch(setFeaturedAC(res.playlists.items)));
    spotify.getCategoryPlaylists('pop').then((res) => dispatch(setPopAC(res.playlists.items)));
    spotify.getCategoryPlaylists('rock').then((res) => dispatch(setRockAC(res.playlists.items)));
    spotify
      .getCategoryPlaylists('hiphop')
      .then((res) => dispatch(setHipHopAC(res.playlists.items)));
    spotify
      .getCategoryPlaylists('indie_alt')
      .then((res) => dispatch(setIndieAC(res.playlists.items)));
  };
};

export default authReducer;
