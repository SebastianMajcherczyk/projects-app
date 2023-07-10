import React from 'react';
import { useFormik } from 'formik';
import './LoginPanel.css';

export const LoginPanel = () => {
	const onSubmit = values => {};
	const { handleSubmit, handleChange, values } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit,
	});
	return (
		<div>
			<form className='login-form' onSubmit={handleSubmit}>
				<div>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						id='email'
						value={values.email}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						id='password'
						value={values.password}
						onChange={handleChange}
					/>
				</div>
				<button type='submit' className='button-55'>Login</button>
			</form>
		</div>
	);
};
