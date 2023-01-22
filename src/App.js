import './App.css'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setUser } from './features/auth/authSlice'
import { useGetAuthenticatedUserQuery } from './features/auth/authApi'

import Navbar from './components/navbar/Navbar'
import AuthPage from './pages/auth/AuthPage'
import SignInForm from './components/auth/SignInForm'

function App() {
	const { user, token } = useSelector((state) => state.auth)

	const { data, error, isLoading } = useGetAuthenticatedUserQuery(null, {
		skip: !token,
	})

	const dispatch = useDispatch()

	useEffect(() => {
		if (data) {
			dispatch(setUser(data))
		}
		if (error) {
			handleUserError(error)
		}
	}, [data, error])

	const handleUserError = (error) => {
		console.log(error)
	}

	return (
		<div className='App'>
			<Navbar user={user} />

			<AuthPage>
				<SignInForm />
			</AuthPage>
		</div>
	)
}

export default App
