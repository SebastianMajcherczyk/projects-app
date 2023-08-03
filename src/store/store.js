
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { initialState, reducer } from './reducers';

import { USER_LOG_ACTIONS } from './actions';

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(thunk))
);

export { store, USER_LOG_ACTIONS };
