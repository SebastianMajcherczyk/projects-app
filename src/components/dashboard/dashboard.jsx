import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { useSelector, useDispatch } from 'react-redux';
import { USER_LOG_ACTIONS } from '../../store/store';
import { PopUpForm } from '../pop-up-form/PopUpForm';

export const Dashboard = () => {
	const [isOpenPopup, setIsOpenPopup] = useState(false);
console.log(isOpenPopup);
	const dispatch = useDispatch();

	const { projectsList } = useSelector(state => state);

	useEffect(() => {
		dispatch(USER_LOG_ACTIONS.getProjectsList());
	}, []);

	return (
		<>
			{isOpenPopup && (
				<PopUpForm setIsOpenPopup={setIsOpenPopup} />
			)}
			<div className='dashboard'>
				<table className='projects-list'>
					<thead>
						<tr>
							<th>Data utworzenia</th>
							<th>Nazwa projektu</th>
							<th>Wielkość zespołu</th>
						</tr>
					</thead>
					<tbody>
						{projectsList.map(project => (
							<tr key={project.title}>
								<td>{project.date} </td>
								<td>{project.title}</td>
								<td>{project.team}</td>
							</tr>
						))}
					</tbody>
				</table>
				<button onClick={() => setIsOpenPopup(true)}>Dodaj projekt</button>
			</div>
		</>
	);
};
