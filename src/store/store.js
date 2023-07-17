import Cookies from 'js-cookie';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { usersList } from '../users';
import { projectsList } from '../data/projects';
const initialState = {
	usersList,
	loggedInUser: null,
	loginError: null,
	projectsList: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOG_IN':
			const loggedInUser = state.usersList.find(
				user =>
					user.email === action.payload.email &&
					user.password === action.payload.password
			);
			if (loggedInUser) {
				Cookies.set('token', loggedInUser.token, { expires: 7 });
				return {
					...state,
					loggedInUser: { ...loggedInUser, logged: true },
					usersList: state.usersList.map(user =>
						user.email === loggedInUser.email ? { ...user, logged: true } : user
					),
					loginError: null,
				};
			} else {
				return { ...state, loginError: 'Błędne dane logowania' };
			}
		case 'LOG_OUT':
			Cookies.set('token', '', { expires: 0 });
			return {
				...state,
				loggedInUser: null,
				usersList: state.usersList.map(user =>
					user.email === action.payload.email
						? { ...user, logged: false }
						: user
				),
			};
		case 'GET_PROJECTS_LIST':
			return {
				...state,
				projectsList: projectsList,
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
	getProjectsList: () => ({
		type: 'GET_PROJECTS_LIST',
		payload: '',
	}),
};

const store = createStore(reducer, initialState, composeWithDevTools());

export { store, USER_LOG_ACTIONS };
