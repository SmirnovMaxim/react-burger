import {applyMiddleware, compose, createStore, StoreEnhancer} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from './root';

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer: StoreEnhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
