export const getProjectsList = () => async dispatch => {
	try {
		// dispatch({ type: 'SET_LOADING', payload: true})
		// const response = await fetch('/projects.json');
		const response = await fetch('http://localhost:3000/api/projects');
		const json = await response.json();
		if (response.ok) {
			console.log("Zaciąganie danych z serwera")
			dispatch({ type: 'SET_PROJECTS_LIST', payload: json });
		}

		// dispatch({ type: 'SET_LOADING', payload: false})
	} catch (error) {
		console.error('Error:', error);
		return null;
	}
};

export const addNewProject = project => async dispatch => {
	try {
		console.log(project)
		const dataToSent = JSON.stringify(project)
		const response = await fetch('http://localhost:3000/api/projects', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: dataToSent,
		});
		// const json = await response.json();
		// console.log('json', json);
		if (response.ok) {
			console.log(project);
			dispatch({ type: 'ADD_NEW_PROJECT', payload: project });
		}
	} catch (error) {
		console.error('Error:', error);
		return null;
	}
};

export const removeProject = uuid => async dispatch => {
	try {
		const response = await fetch(`http://localhost:3000/api/projects/${uuid}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (response.ok) {
			dispatch({ type: 'UPDATE_PROJECTS_LIST_AFTER_DELETE', payload: uuid });
			//uuid powinno być zwrócone z backendu w response
		}
	} catch (error) {
		console.error('Error:', error);
		return null;
	}
};
