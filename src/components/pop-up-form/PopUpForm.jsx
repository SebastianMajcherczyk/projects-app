import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './PopUpForm.css';
import { useDispatch } from 'react-redux';
import { USER_LOG_ACTIONS } from '../../store/store';
import { IoClose } from 'react-icons/io5';
import { v1 as uuidv1 } from 'uuid';

export const PopUpForm = ({ setIsOpenPopup }) => {
	const dispatch = useDispatch();

	const { handleChange, handleBlur, touched, values, errors, handleSubmit } =
		useFormik({
			initialValues: {
				title: '',
				team: null,
			},
			validationSchema: Yup.object({
				title: Yup.string().min(3, 'Minimum 3 znaki').required('Pole wymagane'),
				team: Yup.number().required('Pole wymagane'),
			}),
			onSubmit: values => {
				const actualDate = new Date().toISOString().slice(0, 10).toString();
				const idValue = uuidv1();
				dispatch(
					USER_LOG_ACTIONS.addNewProject({
						...values,
						uuid: idValue,
						date: actualDate,
						team: +values.team,
						details: values.details,
					})
				);

				setIsOpenPopup(false);
			},
		});
	const popupRef = useRef(null);
	const handleClickOutside = event => {
		if (popupRef.current && !popupRef.current.contains(event.target)) {
			setIsOpenPopup(false);
		}
	};
	const handleClose = () => {
		setIsOpenPopup(false);
	};
	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});
	return (
		<>
			<div className='popup-container appear-popup'>
				<div ref={popupRef}>
					<form className='popup-form' onSubmit={handleSubmit}>
						<IoClose className='close-icon' onClick={handleClose} />
						<div>
							<label htmlFor='title'>Nazwa projektu</label>
							<input
								id='title'
								value={values.title}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<p className={errors.title && touched.title ? 'error' : 'hidden'}>
								{errors.title && touched.title ? errors.title : 'Placeholder'}
							</p>
						</div>
						<div>
							<label htmlFor='team'>Wielkość zespołu</label>
							<input
								id='team'
								type="number"
								value={values.team}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<p className={errors.team && touched.team ? 'error' : 'hidden'}>
								{errors.team && touched.team ? errors.team : 'Placeholder'}
							</p>
						</div>
						<div>
							<label htmlFor='details'>Opis</label>
							<input
								id='details'
								type="text"
								value={values.details}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<p className={errors.team && touched.team ? 'error' : 'hidden'}>
								{errors.team && touched.team ? errors.team : 'Placeholder'}
							</p>
						</div>
						<button type='submit'>Dodaj</button>
					</form>
				</div>
			</div>
		</>
	);
};
