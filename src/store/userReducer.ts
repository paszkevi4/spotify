const SET_USER = 'SET_USER';

type stateType = {
  user: any;
  playLists: Array<any>;
  playing: boolean;
  item: any;
};

type setUserACType = {
  type: typeof SET_USER;
  user: any;
};

const initialState = {
  user: null,
  playLists: [],
  playing: false,
  item: null,
};

const userReducer = (state = initialState, action: any): stateType => {
  debugger;
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export const setUserAC = (user: any): setUserACType => ({
  type: SET_USER,
  user,
});

export default userReducer;
