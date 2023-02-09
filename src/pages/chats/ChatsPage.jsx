import './ChatsPage.css'

import ChatsList from '../../components/chats/chats-list/ChatsList'

import { useOutlet } from 'react-router-dom'
import { StompSessionProvider } from 'react-stomp-hooks'

import { ErrorBoundary } from 'react-error-boundary'
import ErrorHandler from '../../components/error-handler/ErrorHandler'
import { useEffect, useState } from 'react'

const STOMP_BROKER_URL = 'ws://localhost:8080/ws'

const ChatsPage = ({ token }) => {
	const [error, setError] = useState(false)

	const outlet = useOutlet()

	const handleStompError = (frame) => {
		console.log(frame)
	}

	useEffect(() => {
		if (outlet) {
			setError((error) => false)
		}
	}, [outlet])

	return (
		<StompSessionProvider
			url={STOMP_BROKER_URL}
			connectHeaders={{ Authorization: `Bearer ${token}` }}
			onStompError={handleStompError}
			reconnectDelay={100}
			debug={(str) => {
				console.log(str)
			}}
		>
			<div className='chats-page'>
				<div className='chats-page-chats-list-box'>
					<ChatsList />
				</div>
				<div className='chats-page-chats-content-box'>
					<ErrorBoundary
						FallbackComponent={ErrorHandler}
						onError={() => setError((error) => true)}
						resetKeys={[error]}
					>
						{outlet || (
							<div className='no-chat-selected-box'>
								<span className='no-chat-selected-message'>
									Select chat from the list or start a new one
								</span>
							</div>
						)}
					</ErrorBoundary>
				</div>
			</div>
		</StompSessionProvider>
	)
}

export default ChatsPage
