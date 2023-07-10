import React from 'react';
import { Formik, useFormik } from 'formik';
import './LoginPanel.css';
import * as yup from 'yup';

export const LoginPanel = () => {
    const onSubmit = async (values, actions) => {
		console.log(values);
		console.log(actions);
		await new Promise((r) => setTimeout(r, 5000));
		actions.resetForm()
	};
    
    const validationSchema = yup.object({
        email: yup.string().email('Email nieprawidłowy').required('Uzupełnij email'),
        password: yup.string().required('Podaj prawidłowe hasło'),
    })

	const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema,
		onSubmit,
	});
	return (
		<div>
			<form className='login-form' onSubmit={handleSubmit} noValidate>
				<div>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						id='email'
						value={values.email}
						onChange={handleChange}
                        onBlur={handleBlur}
					/>
                    <p className={errors.email && touched.email ? 'error' : "hidden"}>{errors.email && touched.email ? errors.email : "Placeholder"}</p>
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
                <p className={errors.password && touched.password ? 'error' : 'hidden'}>{errors.password && touched.password ? errors.password : "Placeholder"}</p>
				<button type='submit' className='button-55'>Login</button>
			</form>
		</div>
	);
};
