import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import userReducer from './userReducer';

let rootReducer = combineReducers({
  authInfo: authReducer,
  userInfo: userReducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;

let store = createStore(rootReducer, applyMiddleware(thunk));

//@ts-ignore
window.store = store;

export default store;
