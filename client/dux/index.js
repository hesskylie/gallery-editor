import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const dummyReducer = (state = {}, action) => state;

const store = createStore(
  dummyReducer,
  applyMiddleware(thunkMiddleware, createLogger()
  )
);

export default store;
