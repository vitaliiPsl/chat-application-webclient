import './AuthForm.css'
import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { setToken } from '../../features/auth/authSlice'
import { useSignInMutation } from '../../features/auth/authApi'

const initCredentials = { email: '', password: '' }

const SignInForm = () => {
	const [credentials, setCredentials] = useState(initCredentials)

	const dispatch = useDispatch()
	const [signIn, { isLoading }] = useSignInMutation()

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			let response = await signIn(credentials).unwrap()
			dispatch(setToken(response.token))
		} catch (err) {
			console.log(err)
		}
	}

	const handleInputChange = (e) => {
		initCredentials[e.target.name] = e.target.value
		setCredentials((credentials) => initCredentials)
	}

	return (
		<form onSubmit={handleSubmit} className={'auth-form sign-in-form'}>
			<h3>Sign in</h3>

			<div className='fields-box'>
				<div className='field-box'>
					<label htmlFor='email-field'>Email</label>
					<input
						type='email'
						name='email'
						id='email-field'
						className='field'
						placeholder='Email'
                        required
						autoComplete='off'
						onChange={handleInputChange}
					/>
				</div>
				<div className='field-box'>
					<label htmlFor='password-field'>Password</label>
					<input
						type='password'
						name='password'
						id='password-field'
						className='field'
						placeholder='Password'
                        required
						autoComplete='off'
						onChange={handleInputChange}
					/>
				</div>

				<button type='submit' className='submit-btn btn'>
					Sign in
				</button>
			</div>
		</form>
	)
}

export default SignInForm
