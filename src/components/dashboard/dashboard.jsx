import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { useSelector, useDispatch } from 'react-redux';
import { USER_LOG_ACTIONS } from '../../store/store';
import { PopUpForm } from '../pop-up-form/PopUpForm';
import { ProjectsList } from '../projects-list/ProjectsList';

export const Dashboard = () => {
	const [isOpenPopup, setIsOpenPopup] = useState(false);

	return (
		<>
			<div className='dashboard'>
				{isOpenPopup && (
					<PopUpForm
						setIsOpenPopup={setIsOpenPopup}
						isOpenPopup={isOpenPopup}
					/>
				)}
				<ProjectsList setIsOpenPopup={setIsOpenPopup} />
			</div>
		</>
	);
};
