import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LoginPanel } from './components/login-panel/LoginPanel';
import { LogoutPanel } from './components/logout-panel/LogoutPanel';
import { Dashboard } from './components/dashboard/dashboard';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { USER_LOG_ACTIONS } from './store/store';
import { usersList } from './users';

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	useEffect(() => {
		if (Cookies.get('token')) {
			const user = usersList.find(user => user.token === Cookies.get('token'));
			dispatch(USER_LOG_ACTIONS.logIn(user));
		}
		setIsLoading(false);
	}, [dispatch]);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<div className='App'>
			<LogoutPanel />
			<Routes>
				<Route path='/' element={<LoginPanel />} />
				<Route path='/dashboard' element={<Dashboard />} />
			</Routes>
		</div>
	);
}

export default App;
