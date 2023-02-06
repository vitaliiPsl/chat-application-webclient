import './Chat.css'

import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {
	setChat,
	setMessages,
	addMessage,
} from '../../../features/chats/chatsSlice'

import {
	useGetChatQuery,
	useLazyGetChatMessagesQuery,
} from '../../../features/chats/chatsApi'

import { useParams, useNavigate } from 'react-router-dom'

import Avatar from '../../avatar/Avatar'
import Spinner from '../../spinner/Spinner'

import ChatMessageGroup from './ChatMessageGroup'
import ChatBar from '../chat-bar/ChatBar'
import { useSubscription } from 'react-stomp-hooks'
import MessageForm from './message-form/MessageForm'

const Chat = () => {
	const { chatId } = useParams()

	const { user, token } = useSelector((state) => state.auth)
	const { chat, messages } = useSelector((state) => state.chats)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {
		data: chatData,
		error: chatError,
		isLoading: chatIsLoading,
	} = useGetChatQuery(chatId, {
		refetchOnFocus: false,
		refetchOnMountOrArgChange: false,
		refetchOnReconnect: false,
	})

	const [
		getChatMessagesQuery,
		{
			data: messagesData,
			error: messagesError,
			isLoading: messagesIsLoading,
		},
	] = useLazyGetChatMessagesQuery()

	const onMessage = (messageData) => {
		let message = JSON.parse(messageData.body)

		dispatch(addMessage(message))
	}

	useSubscription(`/topic/chats/${chatId}/messages`, onMessage, {
		Authorization: `Bearer ${token}`,
	})

	useEffect(() => {
		if (chatData) {
			// set chat
			dispatch(setChat(chatData))

			// fetch messages
			getChatMessagesQuery(chatId, false)
		}
		if (chatError) {
			console.log(chatError?.data?.message)
		}
		if (messagesData) {
			// set messages
			dispatch(setMessages(messagesData.content))
		}
		if (messagesError) {
			console.log(chatError?.data?.message)
		}
	}, [chatData, chatError, messagesData, messagesError])

	const openChatDetails = () => {
		navigate(`/chats/${chatId}/details`)
	}

	const mapMessagesToMessageGroups = (messages) => {
		if (!messages || !messages.length) {
			return []
		}

		let groups = groupMessages(messages)

		return [...groups].map((group, index) => (
			<ChatMessageGroup group={group} user={user} key={index} />
		))
	}

	const groupMessages = (messages) => {
		let groups = new Map()

		let user = null
		let groupMessages = []

		for (let message of messages) {
			if (!user) {
				user = message.user
			} else if (message.user.id !== user.id) {
				groups.set(user, groupMessages)

				user = message.user
				groupMessages = []
			}

			groupMessages.push(message)
		}

		groups.set(user, groupMessages)
		return groups
	}

	return !chat ? (
		<Spinner />
	) : (
		<div className='chat'>
			<ChatBar
				icon={<Avatar placeholder={chat.name} />}
				chat={chat}
				onClick={openChatDetails}
			/>

			<div className='chat-messages-box'>
				{messagesIsLoading && <Spinner />}

				{messages && messages.length > 0 && (
					<div className='chat-messages-list'>
						{mapMessagesToMessageGroups(messages)}
					</div>
				)}

				{messages && messages.length === 0 && (
					<div className='chat-messages-list-empty'>
						No messages yet. Be the one to write the first message
					</div>
				)}
			</div>

			<MessageForm chatId={chatId} />
		</div>
	)
}

export default Chat
