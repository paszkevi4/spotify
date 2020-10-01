import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import userReducer from './userReducer';

let reducers = combineReducers({
  authInfo: authReducer,
  userInfo: userReducer,
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;
