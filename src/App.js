import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LoginPanel } from './components/login-panel/LoginPanel';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<LoginPanel />} />
				<Route path='/dashboard' element={<h1>Dashboard</h1>} />
			</Routes>
		</div>
	);
}

export default App;
