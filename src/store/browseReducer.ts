import { Dispatch as DispatchType } from 'redux';
import spotify from '../spotify/spotify';

const SET_CATEGORIES = 'SET_CATEGORIES';
const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';

type setCategoriesACType = {
  type: typeof SET_CATEGORIES;
  categories: object[];
};

type setCurrentCategoryACType = {
  type: typeof SET_CURRENT_CATEGORY;
  category: any;
};

type actionType = setCategoriesACType | setCurrentCategoryACType;

type stateType = {
  categories: object[];
  category: any;
};

const initialState: stateType = {
  categories: [],
  category: null,
};

const userReducer = (state = initialState, action: actionType): stateType => {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.categories };
    case SET_CURRENT_CATEGORY:
      return { ...state, category: action.category };
    default:
      return state;
  }
};

const setCategoriesAC = (categories: object[]): setCategoriesACType => ({
  type: SET_CATEGORIES,
  categories,
});

export const setCurrentCategoryAC = (category: any): setCurrentCategoryACType => ({
  type: SET_CURRENT_CATEGORY,
  category,
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

export const setCurrentCategoryThunk = (category: string) => {
  return (dispatch: DispatchType) => {
    if (category) {
      spotify.setAccessToken(sessionStorage.getItem('token'));
      spotify
        .getCategoryPlaylists(category)
        .then((category: any) => dispatch(setCurrentCategoryAC(category.playlists.items)));
    } else {
      dispatch(setCurrentCategoryAC(null));
    }
  };
};

export default userReducer;
