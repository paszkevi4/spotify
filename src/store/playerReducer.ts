import store from './store';
import { Dispatch as DispatchType } from 'redux';
import spotify from '../spotify/spotify';

const SET_DEFAULT_SONG = 'SET_DEFAULT_SONG';
const SET_VOLUME = 'SET_VOLUME';
const SET_PLAYLIST = 'SET_PLAYLIST';
const SET_IS_PLAYING = 'SET_IS_PLAYING';
const CHANGE_CURRENT_TRACK = 'CHANGE_CURRENT_TRACK';
const CHANGE_SHUFFLE = 'CHANGE_SHUFFLE';
const CHANGE_LOOP = 'CHANGE_LOOP';

type stateType = {
  playlist: any;
  track: number;
  isPlaying: boolean;
  volume: number;
  shuffle: boolean;
  loop: boolean;
};

type setDefaultTrackACType = {
  type: typeof SET_DEFAULT_SONG;
  track: Object;
};

type setVolumeACType = {
  type: typeof SET_VOLUME;
  volume: number;
};

type setPlaylistACType = {
  type: typeof SET_PLAYLIST;
  playlist: [];
  track: number;
};

type setIsPlayingACType = {
  type: typeof SET_IS_PLAYING;
  isPlaying: boolean;
};

type changeCurrentTrackACType = {
  type: typeof CHANGE_CURRENT_TRACK;
  track: number;
};

type changeShuffleACType = {
  type: typeof CHANGE_SHUFFLE;
};

type changeLoopACType = {
  type: typeof CHANGE_LOOP;
};

const initialState: stateType = {
  playlist: [{ track: null }],
  track: 0,
  isPlaying: false,
  volume: 0.2,
  shuffle: false,
  loop: true,
};

type actionType =
  | setDefaultTrackACType
  | setVolumeACType
  | setPlaylistACType
  | setIsPlayingACType
  | changeCurrentTrackACType
  | changeShuffleACType
  | changeLoopACType;

const currentReducer = (state = initialState, action: actionType) => {
  switch (action.type) {
    case SET_DEFAULT_SONG:
      return {
        ...state,
        playlist: [{ track: { ...action.track } }],
      };
    case SET_VOLUME:
      return { ...state, volume: action.volume };
    case SET_PLAYLIST:
      return { ...state, playlist: action.playlist, track: action.track, isPlaying: true };
    case SET_IS_PLAYING:
      return { ...state, isPlaying: action.isPlaying };
    case CHANGE_CURRENT_TRACK:
      return { ...state, track: action.track };
    case CHANGE_SHUFFLE:
      return { ...state, shuffle: !state.shuffle };
    case CHANGE_LOOP:
      return { ...state, loop: !state.loop };
    default:
      return state;
  }
};

const setDefaultTrackAC = (track: any): setDefaultTrackACType => ({
  type: SET_DEFAULT_SONG,
  track,
});

const changeCurrentTrackAC = (track: number): changeCurrentTrackACType => ({
  type: CHANGE_CURRENT_TRACK,
  track,
});

export const setVolumeAC = (volume: number): setVolumeACType => ({
  type: SET_VOLUME,
  volume,
});

export const setPlaylistAC = (playlist: [], track: number): setPlaylistACType => ({
  type: SET_PLAYLIST,
  playlist,
  track,
});

export const setIsPlayingAC = (isPlaying: boolean): setIsPlayingACType => ({
  type: SET_IS_PLAYING,
  isPlaying,
});

export const changeShuffleAC = (): changeShuffleACType => ({
  type: CHANGE_SHUFFLE,
});

export const changeLoopAC = (): changeLoopACType => ({
  type: CHANGE_LOOP,
});

export const changeCurrentTrackThunk = (track: number) => {
  return (dispatch: DispatchType, getState: any) => {
    if (getState().player.shuffle) {
      track = Math.ceil(Math.random() * getState().player.playlist.length) - 1;
    }
    if (track >= getState().player.playlist.length) {
      track = 0;
    }
    if (track < 0) {
      track = getState().player.playlist.length - 1;
    }
    dispatch(changeCurrentTrackAC(track));
  };
};

export const setSongThunk = () => {
  return (dispatch: DispatchType) => {
    spotify.setAccessToken(sessionStorage.getItem('token'));
    spotify.getTrack('0HPD5WQqrq7wPWR7P7Dw1i').then((track) => dispatch(setDefaultTrackAC(track)));

    spotify.getAlbumTracks('71O60S5gIJSIAhdnrDIh3N').then((el: any) => console.log(el));
    //spotify.getPlaylist('37i9dQZF1DWZd79rJ6a7lp').then((el: any) => console.log(el));
  };
};

export default currentReducer;
