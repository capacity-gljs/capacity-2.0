import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import user from './user';

const rootReducer = combineReducers({
  user,
});
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
