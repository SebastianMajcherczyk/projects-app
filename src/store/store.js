import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { usersList } from '../users';

const initialState = { usersList };

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOG_IN':
			return {
                ...state,
                usersList: state.usersList.map(user =>
                    (user.mail === action.payload.mail && user.password === action.payload.password) ? { ...user, logged: true } : user
                ),
            };
		case 'LOG_OUT':
			return {
				...state,
				usersList: state.usersList.map(user =>
					user.mail === action.payload.mail ? { ...user, logged: false } : user
				),
			};
		default:
			return state;
	}
};

const USER_LOG_ACTIONS = {
	logIn: user => ({
		type: 'LOG_IN',
		payload: user,
	}),
	logOut: user => ({
		type: 'LOG_OUT',
        payload: user,
	}),
};

const store = createStore(reducer, initialState,  composeWithDevTools());
