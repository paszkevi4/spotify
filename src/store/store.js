import { createStore, combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';

let reducers = combineReducers({
  authInfo: authReducer,
  userInfo: userReducer,
});

let store = createStore(reducers);

window.store = store;

export default store;
