const SET_TOKEN = 'SET_TOKEN';

type stateType = {
  token: string;
};

type setTokenACType = {
  type: typeof SET_TOKEN;
  token: string;
};

const initialState: stateType = {
  token: '',
};

const authReducer = (state = initialState, action: setTokenACType): stateType => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.token };
    default:
      return state;
  }
};

export const setTokenAC = (token: string): setTokenACType => ({
  type: SET_TOKEN,
  token,
});

export default authReducer;
