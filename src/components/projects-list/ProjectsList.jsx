import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { USER_LOG_ACTIONS } from '../../store/store';
import './ProjectsList.css';
import { BsChevronDown } from 'react-icons/bs';

import {useNavigate} from 'react-router-dom';
import { PopUpForm } from '../pop-up-form/PopUpForm';

export const ProjectsList = () => {

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isOpenPopup, setIsOpenPopup] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const { projectsList } = useSelector(state => state);
	const [filterValue, setFilterValue] = useState('');
	useEffect(() => {
		dispatch(USER_LOG_ACTIONS.getProjectsList());
	}, [dispatch]);

	const projectsOnPage = useMemo( () => projectsList.filter(project =>
		project.title?.toLowerCase().includes(filterValue.toLowerCase())),  [projectsList, filterValue] 
	);

	return (
		<>
		{isOpenPopup && <PopUpForm setIsOpenPopup={setIsOpenPopup}/>}
		<div className='projects-container'>
			<div className='list-header' onClick={() => setIsOpen(!isOpen)}>
				<p>Lista projektów</p>
				<BsChevronDown className={`${isOpen ? 'up' : ''}`} />
			</div>
			<div className={`list ${isOpen ? 'open' : 'close'}`}>
				<input
					type='text'
					placeholder='Wyszukaj projekt'
					value={filterValue}
					onChange={e => setFilterValue(e.target.value)}
					className='search-project'
				/>

				<table className='projects-list'>
					<thead>
						<tr>
							<th>Data utworzenia</th>
							<th>Nazwa projektu</th>
							<th>Wielkość zespołu</th>
							<th>Akcje</th>
						</tr>
					</thead>
					<tbody>
						{projectsOnPage &&
							projectsOnPage.map((project, index) => (
								<tr
									key={project.title}
									className={
										index === projectsOnPage.length - 1 ? 'last-row' : ''
									}>
									<td>{project.date.split('T')[0]} </td>
									<td>{project.title}</td>
									<td>{project.team}</td>
									<td><button onClick={() => navigate(`/project/${project.uuid}`)}>Otwórz projekt</button>
									
										<button
											onClick={() =>
												dispatch(USER_LOG_ACTIONS.removeProject(project.uuid))
											}>
											Usuń
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
				<button onClick={() => setIsOpenPopup(true)}>Dodaj projekt</button>
			</div>
		</div>
		</>
	);
};
