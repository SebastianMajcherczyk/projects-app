import { addNewProject, getProjectsList, removeProject } from './requests';

export const USER_LOG_ACTIONS = {
	logIn: user => ({
		type: 'LOG_IN',
		payload: user,
	}),
	logOut: user => ({
		type: 'LOG_OUT',
		payload: user,
	}),

	addNewProject,
	getProjectsList,
    removeProject
};