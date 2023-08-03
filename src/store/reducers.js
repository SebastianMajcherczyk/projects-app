import Cookies from 'js-cookie';
import { usersList } from '../users';

export const initialState = {
	usersList: usersList,
	loggedInUser: null,
	loginError: null,
	projectsList: [],
};

export const reducer = (state = initialState, action) => {
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
		case 'SET_PROJECTS_LIST':
			return {
				...state,
				projectsList: action.payload,
			};
		case 'ADD_NEW_PROJECT':
			console.log('Action payload' + action)
			return {
				...state,
				projectsList: [...state.projectsList, {}],
			};
		case 'UPDATE_PROJECTS_LIST_AFTER_DELETE':
			return {
				...state,
				projectsList: state.projectsList.filter(
					project => project.uuid !== action.payload
				),
			};

		default:
			return state;
	}
};
