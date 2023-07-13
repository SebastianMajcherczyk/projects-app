import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { USER_LOG_ACTIONS } from '../../store/store';
import {  useNavigate } from 'react-router-dom';
import './LogoutPanel.css';

export const LogoutPanel = () => {
	const dispatch = useDispatch();

	const { loggedInUser } = useSelector(state => state);
	const navigate = useNavigate();
	const logOutUser = () => {
		dispatch(USER_LOG_ACTIONS.logOut(loggedInUser));
		navigate('/');
	};
	if (!loggedInUser) return null;
	return (
		<div className={loggedInUser ? 'logout-panel' : 'hidden'}>
			<p>Użytkownik:</p>
			<p>{loggedInUser?.email}</p>
			<button className='logout-btn' onClick={logOutUser}>
				Wyloguj
			</button>
		</div>
	);
};
