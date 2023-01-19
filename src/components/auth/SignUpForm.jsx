import './AuthForm.css'
import { useState } from 'react'

import { useSignUpMutation } from '../../features/auth/authApi'

const initUserDetails = { nickname: '', email: '', password: '' }

const SignUpForm = () => {
	const [userDetails, setUserDetails] = useState(initUserDetails)

	const [signUp, { isLoading }] = useSignUpMutation()

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			let response = await signUp(userDetails).unwrap()
			console.log(response)
		} catch (err) {
			console.log(err)
		}
	}

	const handleInputChange = (e) => {
		initUserDetails[e.target.name] = e.target.value
		setUserDetails((userDetails) => initUserDetails)
	}

	return (
		<form onSubmit={handleSubmit} className={'auth-form sign-up-form'}>
			<h3>Sign up</h3>

			<div className='fields-box'>
				<div className='field-box'>
					<label htmlFor='nickname-field'>Nickname</label>
					<input
						type='text'
						name='nickname'
						id='nickname-field'
						className='field'
						placeholder='Nickname'
						required
						autoComplete='off'
						onChange={handleInputChange}
					/>
				</div>
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
					Sign up
				</button>

				<div className='redirect-box'>
					<span className='or-span'>or</span>
					<a href='#' className='redirect-link'>
						Sign in
					</a>
				</div>
			</div>
		</form>
	)
}

export default SignUpForm
