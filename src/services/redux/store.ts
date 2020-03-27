import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducers from './reducers';

export default function initStore(initialState = {}) {
  return createStore(
    reducers,
    initialState,
    process.env.NODE_ENV === 'development'
      ? composeWithDevTools(applyMiddleware(...[thunk, promise]))
      : applyMiddleware(thunk, promise),
  );
}
