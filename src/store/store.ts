import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import userReducer from './userReducer';
import browseReducer from './browseReducer';

import playerReducer from './playerReducer';

let rootReducer = combineReducers({
  authInfo: authReducer,
  userInfo: userReducer,
  browse: browseReducer,
  player: playerReducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;

let store = createStore(rootReducer, applyMiddleware(thunk));

//@ts-ignore
window.store = store;

export default store;
