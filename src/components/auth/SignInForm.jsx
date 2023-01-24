import './AuthForm.css'
import { useState, useEffect } from 'react'

import { useDispatch } from 'react-redux'

import { setToken } from '../../features/auth/authSlice'
import { useSignInMutation } from '../../features/auth/authApi'

import TextField from '../text-field/TextField'
import Button from '../button/Button'
import Spinner from '../spinner/Spinner'
import Error from '../error/Error'

const initCredentials = { email: '', password: '' }

const SignInForm = () => {
	const [credentials, setCredentials] = useState(initCredentials)
	const [error, setError] = useState()

	const dispatch = useDispatch()

	const [signIn, { data: signInData, error: signInError, isLoading }] =
		useSignInMutation()

	useEffect(() => {
		if (signInData) {
            let token = signInData?.token
			dispatch(setToken(token))

            // TODO: redirect to main page
		}
		if (signInError) {
			setError(signInError?.data?.message)
		}
	}, [signInData, signInError])

	const handleSubmit = async (e) => {
		e.preventDefault()

		signIn(credentials)
	}

	const handleInputChange = (e) => {
		initCredentials[e.target.name] = e.target.value

		setCredentials((credentials) => initCredentials)
	}

	const removeError = () => {
		setError((error) => null)
	}

	return (
		<form onSubmit={handleSubmit} className={'auth-form sign-in-form'}>
			<h3>Sign in</h3>

			{error && <Error message={error} onClose={removeError} />}

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

				<Button type={'submit'}>
					{isLoading ? (
						<Spinner size={19} color={'#888'} />
					) : (
						'Sign in'
					)}
				</Button>

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
