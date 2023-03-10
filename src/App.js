import './App.css'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setUser } from './features/auth/authSlice'
import { useGetAuthenticatedUserQuery } from './features/auth/authApi'

import { Routes, Route, Navigate } from 'react-router-dom'

import Navbar from './components/navbar/Navbar'

import ChatsPage from './pages/chats/ChatsPage'
import Chat from './components/chats/chat/Chat'
import ChatNew from './components/chats/chat-new/ChatNew'
import ChatDetails from './components/chats/chat-details/ChatDetails'

import AuthPage from './pages/auth/AuthPage'

import SignInForm from './components/auth/SignInForm'
import SignUpForm from './components/auth/SignUpForm'
import ProtectedRoute from './pages/ProtectecRoute'

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
            
			<Routes>
				<Route path='/auth'>
					<Route
						path='signin'
						element={
							<AuthPage>
								<SignInForm />
							</AuthPage>
						}
					/>
					<Route
						path='signup'
						element={
							<AuthPage>
								<SignUpForm />
							</AuthPage>
						}
					/>
				</Route>
				<Route path='/' element={<ProtectedRoute user={token} />}>
					<Route path='/' element={<Navigate to={'/chats'} />} />
                    
					<Route path='/chats' element={<ChatsPage token={token} />}>
						<Route path=':chatId' element={<Chat />} />
						<Route
							path=':chatId/details'
							element={<ChatDetails />}
						/>
						<Route path='new' element={<ChatNew />} />
					</Route>
				</Route>
			</Routes>
		</div>
	)
}

export default App
