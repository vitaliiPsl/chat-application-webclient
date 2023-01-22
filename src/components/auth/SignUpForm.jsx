import './AuthForm.css'

import { useState } from 'react'
import { useSignUpMutation } from '../../features/auth/authApi'

import TextField from '../text-field/TextField'
import Button from '../button/Button'
import Spinner from '../spinner/Spinner'

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
						<Spinner size={19} color={'#f00'} />
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
