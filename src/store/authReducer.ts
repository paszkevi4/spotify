import { Dispatch as DispatchType } from 'redux';
import { getTokenFromURL } from '../spotify/spotify';

const SET_IS_AUTH = 'SET_IS_AUTH';

type stateType = {
  isAuth: boolean;
};

type setIsAuthACType = {
  type: typeof SET_IS_AUTH;
};

const initialState: stateType = {
  isAuth: !!sessionStorage.getItem('token'),
};

const authReducer = (state = initialState, action: setIsAuthACType): stateType => {
  switch (action.type) {
    case SET_IS_AUTH:
      return { ...state, isAuth: !!sessionStorage.getItem('token') };
    default:
      return state;
  }
};

export const setIsAuthAC = (): setIsAuthACType => ({
  type: SET_IS_AUTH,
});

export const authorizeThunk = () => {
  return (dispatch: DispatchType) => {
    //@ts-ignore
    const _token = getTokenFromURL().access_token;
    // spotify.setAccessToken(_token);
    sessionStorage.setItem('token', _token ? _token : '');
    dispatch(setIsAuthAC());
    window.location.hash = '';
  };
};

export default authReducer;
