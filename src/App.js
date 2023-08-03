import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { LoginPanel } from './components/login-panel/LoginPanel';
import { LogoutPanel } from './components/logout-panel/LogoutPanel';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { USER_LOG_ACTIONS } from './store/store';
import { usersList } from './users';
import { ProjectsList } from './components/projects-list/ProjectsList';
import { Navbar } from './Navbar/Navbar';
import { Home } from './components/home/Home';
import { About } from './components/about/About';
import { Project } from './components/Project/Project';
function App() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);

	const dispatch = useDispatch();
	const { loggedInUser } = useSelector(state => state);
	useEffect(() => {
		if (Cookies.get('token')) {
			const user = usersList.find(user => user.token === Cookies.get('token'));
			if (user) {
				dispatch(USER_LOG_ACTIONS.logIn(user));
			} else {
				navigate('/login');
			}
		} else {
			navigate('/login');
		}
		setIsLoading(false);
	}, [dispatch, navigate]);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<div className='App'>
			<div>
				<div className='main-container'>
					{loggedInUser && <Navbar />}
					<div
						className='main'
						style={{ marginLeft: loggedInUser ? '15%' : '0' }}>
						<LogoutPanel />
						<Routes>
							<Route path='/login' element={<LoginPanel />} />
							<Route path='/about' element={<About />} />
							<Route path='/projects' element={<ProjectsList />} />
							<Route path='/project/:uuid' element={<Project/>}/>
							<Route
								path='/'
								element={loggedInUser ? <Home /> : <LoginPanel />}
							/>
						</Routes>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
