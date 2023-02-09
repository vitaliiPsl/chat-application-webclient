import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setChat } from '../../../features/chats/chatsSlice'
import { useGetChatQuery } from '../../../features/chats/chatsApi'

import { useParams, useNavigate } from 'react-router-dom'

import Avatar from '../../avatar/Avatar'
import Spinner from '../../spinner/Spinner'

import ChatBar from '../chat-bar/ChatBar'
import ChatMessageForm from './chat-message-form/ChatMessageForm'
import ChatMessages from './chat-messages/ChatMessages'

const Chat = () => {
	const { chatId } = useParams()
	const { chat } = useSelector((state) => state.chats)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {
		data: chatData,
		error: chatError,
	} = useGetChatQuery(chatId, {
		refetchOnFocus: false,
		refetchOnMountOrArgChange: false,
		refetchOnReconnect: false,
	})

	useEffect(() => {
		if (chatData) {
			dispatch(setChat(chatData))
		}
		if (chatError) {
			handleError(chatError)
		}
	}, [chatData, chatError])

	const handleError = (error) => {
		throw { code: error?.status, message: error?.data.message }
	}

	const openChatDetails = () => {
		navigate(`/chats/${chatId}/details`)
	}

	return !chat ? (
		<Spinner />
	) : (
		<div className='chat min-h-0 h-full flex-1 flex flex-col justify-between'>
			<ChatBar
				icon={<Avatar placeholder={chat.name} />}
				chat={chat}
				onClick={openChatDetails}
			/>

			<ChatMessages chatId={chatId} />

			<ChatMessageForm chatId={chatId} />
		</div>
	)
}

export default Chat
