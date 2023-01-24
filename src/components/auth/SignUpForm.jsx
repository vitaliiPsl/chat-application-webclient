import './AuthForm.css'

import { useState } from 'react'
import { useSignUpMutation } from '../../features/auth/authApi'

import TextField from '../text-field/TextField'
import Button from '../button/Button'
import Spinner from '../spinner/Spinner'
import { useEffect } from 'react'
import Error from '../error/Error'

const initUserDetails = { nickname: '', email: '', password: '' }

const SignUpForm = () => {
	const [userDetails, setUserDetails] = useState(initUserDetails)
	const [error, setError] = useState()

	const [signUp, { data: signUpData, error: signUpError, isLoading }] =
		useSignUpMutation()

	useEffect(() => {
		if (signUpData) {
			// TODO: redirect to log in page
		}
		if (signUpError) {
			setError(() => signUpError?.data?.message)
		}
	}, [signUpData, signUpError])

	const handleSubmit = async (e) => {
		e.preventDefault()

		signUp(userDetails)
	}

	const handleInputChange = (e) => {
		initUserDetails[e.target.name] = e.target.value

		setUserDetails((userDetails) => initUserDetails)
		removeError()
	}

	const removeError = () => {
        console.log('Remove error')
		setError((error) => null)
	}

	return (
		<form onSubmit={handleSubmit} className={'auth-form sign-up-form'}>
			<h3>Sign up</h3>

			{error && <Error message={error} onClose={removeError} />}

			<div className='fields-box'>
				<TextField
					label={'Nickname'}
					name={'nickname'}
					type={'text'}
					placeholder={'Nickname'}
					required={true}
					onChange={handleInputChange}
				/>

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

				<Button type='submit'>
					{isLoading ? (
						<Spinner size={19} color={'#888'} />
					) : (
						'Sign up'
					)}
				</Button>

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
