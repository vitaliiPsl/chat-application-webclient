import './AuthForm.css'
import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { setToken } from '../../features/auth/authSlice'
import { useSignInMutation } from '../../features/auth/authApi'
import TextField from '../text-field/TextField'
import Button from '../button/Button'

const initCredentials = { email: '', password: '' }

const SignInForm = () => {
	const [credentials, setCredentials] = useState(initCredentials)

	const dispatch = useDispatch()
	const [signIn, { isLoading }] = useSignInMutation()

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			let response = await signIn(credentials).unwrap()
			console.log(response)
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
				<TextField
					label={'Email'}
					name={'email'}
					type={'email'}
					placeholder={'Email'}
					required={true}
					onChange={handleInputChange}
				/>

				<TextField
					label={'Password'}
					name={'password'}
					type={'password'}
					placeholder={'Password'}
					required={true}
					onChange={handleInputChange}
				/>

				<Button text={'Sign in'} type={'submit'} />

				<div className='redirect-box'>
					<span className='or-span'>or</span>
					<a href='#' className='redirect-link'>
						Sign up
					</a>
				</div>
			</div>
		</form>
	)
}

export default SignInForm
