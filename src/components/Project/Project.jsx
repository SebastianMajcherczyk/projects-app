import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Project.css';
export const Project = () => {
	const { uuid } = useParams();

	const [project, setProject] = useState(null);
	const projectsList = useSelector(state => state.projectsList);

	useEffect(() => {
		if (projectsList) {
			const foundProject = projectsList.find(project => project.uuid === uuid);
			setProject(foundProject);
		}
	}, [uuid, projectsList]);

	return (
		<div className='project'>
			<h3>Project page</h3>
			<table>
				<thead>
					<tr>
						<th>Data utworzenia</th>
						<th>Nazwa projektu</th>
						<th>Wielkość zespołu</th>
						<th>Szczegóły</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{project?.date.split('T')[0]}</td>
						<td>{project?.title}</td>
						<td>{project?.team}</td>
						<td>{project?.details}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};
