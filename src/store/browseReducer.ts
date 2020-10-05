import { Dispatch as DispatchType } from 'redux';
import spotify from '../spotify/spotify';

const SET_CATEGORIES = 'SET_CATEGORIES';

type setCategoriesACType = {
  type: typeof SET_CATEGORIES;
  categories: object[];
};

type actionType = setCategoriesACType;

type stateType = {
  categories: object[];
};

const initialState: stateType = {
  categories: [],
};

const userReducer = (state = initialState, action: actionType): stateType => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.categories };
    default:
      return state;
  }
};

export const setCategoriesAC = (categories: object[]): setCategoriesACType => ({
  type: SET_CATEGORIES,
  categories,
});

export const setPlaylistsThunk = () => {
  return (dispatch: DispatchType) => {
    spotify.setAccessToken(sessionStorage.getItem('token'));
    spotify
      .getCategories()
      .then((categories: any) => dispatch(setCategoriesAC(categories.categories.items)));
    spotify.getCategories().then((categories) => console.log(categories));
  };
};

export default userReducer;
