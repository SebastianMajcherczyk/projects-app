import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './PopUpForm.css';

export const PopUpForm = () => {
	const { handleChange, handleBlur, touched, values, errors } = useFormik({
		initialValues: {
			title: '',
			team: '',
		},
		validationSchema: Yup.object({
			title: Yup.string().min(3, 'Minimum 3 znaki').required('Pole wymagane'),
			team: Yup.number().min(1, 'Minimum 1 znak').required('Pole wymagane'),
		}),
	});
	return (
		<>
			<form>
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
						value={values.team}
						onChange={handleChange}
						onBlur={handleBlur}
					/>
					<p className={errors.team && touched.team ? 'error' : 'hidden'}>
						{errors.team && touched.team ? errors.team : 'Placeholder'}
					</p>
				</div>
			</form>
		</>
	);
};
