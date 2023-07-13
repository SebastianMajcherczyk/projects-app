import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import './LoginPanel.css';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { USER_LOG_ACTIONS } from '../../store/store';
import { redirect, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const LoginPanel = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loggedInUser, loginError } = useSelector(state => state);

	useEffect(() => {
		if (Cookies.get('token')) {
			navigate('/dashboard');
		}
		if (loggedInUser) {
			navigate('/dashboard');
		}
	}, [loggedInUser, navigate]);

	const onSubmit = (values, actions) => {
		const user = { email: values.email, password: values.password };
		dispatch(USER_LOG_ACTIONS.logIn(user));
		actions.resetForm();
	};

	const validationSchema = yup.object({
		email: yup
			.string()
			.email('Email nieprawidłowy')
			.required('Uzupełnij email'),
		password: yup.string().required('Podaj prawidłowe hasło'),
	});

	const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
		useFormik({
			initialValues: {
				email: '',
				password: '',
			},
			validationSchema,
			onSubmit,
		});
	return (
		<div className='login-container'>
			<div className='login-box'>
				<form
					className={loggedInUser ? 'hidden' : 'login-form'}
					onSubmit={handleSubmit}
					noValidate>
					<div >
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							id='email'
							value={values.email}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
						<p className={errors.email && touched.email ? 'error' : 'hidden'}>
							{errors.email && touched.email ? errors.email : 'Placeholder'}
						</p>
					</div>
					<div>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							value={values.password}
							onChange={handleChange}
							onBlur={handleBlur}
						/>
					</div>
					<p
						className={
							errors.password && touched.password ? 'error' : 'hidden'
						}>
						{errors.password && touched.password
							? errors.password
							: 'Placeholder'}
					</p>
					<p className={loginError ? 'error' : 'hidden'}>
						{loginError ? loginError : 'Placeholder'}
					</p>
					<button type='submit' className='button-55'>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};
