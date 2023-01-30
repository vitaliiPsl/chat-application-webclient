import './ChatDetails.css'

import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { setChat } from '../../features/chats/chatsSlice'
import { useGetChatQuery } from '../../features/chats/chatsApi'

import Avatar from '../avatar/Avatar'
import Spinner from '../spinner/Spinner'
import Error from '../error/Error'

const chatId = 'bb21ec87-18dc-4af0-be5a-9e84641693d0'

const ChatDetails = () => {
	const { chat } = useSelector((state) => state.chats)

	const [error, setError] = useState()

	const dispatch = useDispatch()

	const {
		data: chatData,
		error: chatError,
		isLoading: chatIsLoading,
	} = useGetChatQuery(chatId)

	useEffect(() => {
		if (chatData) {
			dispatch(setChat(chatData))
		}
	}, [chatData])

	useEffect(() => {
		if (chatError) {
			handleError(chatError)
		}
	}, [chatError])

	const handleError = (err) => {
		console.log(err?.data?.message)

		setError((error) => err?.data?.message)
	}

	return !chat ? (
		<Spinner />
	) : (
		<div className='chat-details'>
			{error && <Error message={error} onClose={() => setError(null)} />}

			<div className='outer-box chat-details-box'>
				<div className='inner-box chat-details-avatar-box'>
					<Avatar size={64} placeholder={chat.name} />
				</div>

				<div className='inner-box chat-details-info-box'>
					<div className='chat-details-info chat-details-info-chat-name-box'>
						<span className='label chat-details-info-chat-name-label'>
							Name
						</span>

						<span className='chat-details-info-chat-name'>
							{chat.name}
						</span>
					</div>

					<div className='chat-details-info chat-details-info-chat-description-box'>
						<span className='label chat-details-info-chat-description-label'>
							Description
						</span>

						<span className='chat-details-info-chat-description'>
							{chat.description}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChatDetails
