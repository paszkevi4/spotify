import { Dispatch as DispatchType } from 'redux';
import spotify from '../spotify/spotify';

const SET_DEFAULT_SONG = 'SET_DEFAULT_SONG';
const SET_VOLUME = 'SET_VOLUME';
const SET_PLAYLIST = 'SET_PLAYLIST';

type stateType = {
  playlist: any;
  song: number;
  isPlaying: boolean;
  volume: number;
};

type setDefaultSongACType = {
  type: typeof SET_DEFAULT_SONG;
  song: Object;
};

type setVolumeACType = {
  type: typeof SET_VOLUME;
  volume: number;
};

type setPlaylistACType = {
  type: typeof SET_PLAYLIST;
  playlist: [];
  song: number;
};

const initialState: stateType = {
  playlist: [{ track: null }],
  song: 0,
  isPlaying: false,
  volume: 0.2,
};

type actionType = setDefaultSongACType | setVolumeACType | setPlaylistACType;

const currentReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case SET_DEFAULT_SONG:
      //@ts-ignore
      return {
        ...state,
        playlist: [{ track: { ...action.song } }],
      };
    case SET_VOLUME:
      return { ...state, volume: action.volume };
    case SET_PLAYLIST:
      return { ...state, playlist: action.playlist, song: action.song };
    default:
      return state;
  }
};

const setDefaultSongAC = (song: any): setDefaultSongACType => ({
  type: SET_DEFAULT_SONG,
  song,
});

export const setVolumeAC = (volume: number): setVolumeACType => ({
  type: SET_VOLUME,
  volume,
});

export const setPlaylistAC = (playlist: [], song: number) => ({
  type: SET_PLAYLIST,
  playlist,
  song,
});

export const setSongThunk = () => {
  return (dispatch: DispatchType) => {
    spotify.setAccessToken(sessionStorage.getItem('token'));
    spotify.getTrack('0HPD5WQqrq7wPWR7P7Dw1i').then((track) => dispatch(setDefaultSongAC(track)));
    //spotify.getMyCurrentPlayingTrack().then((track) => dispatch(setSongAC(track.item)));
  };
};

export default currentReducer;
