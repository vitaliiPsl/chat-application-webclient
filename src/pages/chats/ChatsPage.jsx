import './ChatsPage.css'

import ChatsList from '../../components/chats/chats-list/ChatsList'

import { useOutlet } from 'react-router-dom'
import { StompSessionProvider } from 'react-stomp-hooks'

const STOMP_BROKER_URL = 'ws://localhost:8080/ws'

const ChatsPage = ({ token }) => {
	const outlet = useOutlet()

	const handleStompError = (frame) => {
		console.log(frame)
	}

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
					{outlet || (
						<div className='no-chat-selected-box'>
							<span className='no-chat-selected-message'>
								Select chat from the list or start a new one
							</span>
						</div>
					)}
				</div>
			</div>
		</StompSessionProvider>
	)
}

export default ChatsPage
