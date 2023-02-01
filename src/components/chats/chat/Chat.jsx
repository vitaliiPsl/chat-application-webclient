import './Chat.css'

import { useEffect, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setChat, setMessages } from '../../../features/chats/chatsSlice'

import {
	useGetChatQuery,
	useGetChatMessagesQuery,
	useSendMessageMutation,
} from '../../../features/chats/chatsApi'

import { useParams, useNavigate } from 'react-router-dom'

import Avatar from '../../avatar/Avatar'
import TextField from '../../text-field/TextField'
import Button from '../../button/Button'
import Spinner from '../../spinner/Spinner'
import MaterialIcon from '../../material-icon/MaterialIcon'
import Dropdown from '../../dropdown/Dropdown'

import ChatMessageGroup from './ChatMessageGroup'
import ChatBar from '../chat-bar/ChatBar'

const Chat = () => {
	const { chatId } = useParams()

	const { user } = useSelector((state) => state.auth)
	const { chat, messages } = useSelector((state) => state.chats)

	const messageInputRef = useRef()

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {
		data: chatData,
		error: chatError,
		isLoading: chatIsLoading,
	} = useGetChatQuery(chatId)

	const {
		data: messagesData,
		error: messagesError,
		isLoading: messagesIsLoading,
	} = useGetChatMessagesQuery(chatId, {
		skip: !chat,
	})

	const [
		sendMessage,
		{
			data: sendMessageData,
			error: sendMessageError,
			sendMessageIsLoading,
		},
	] = useSendMessageMutation()

	useEffect(() => {
		if (chatData) {
			dispatch(setChat(chatData))
		}
		if (chatError) {
			console.log(chatError?.data?.message)
		}
	}, [chatData, chatError])

	useEffect(() => {
		if (messagesData) {
			dispatch(setMessages(messagesData.content))
		}
		if (messagesError) {
			console.log(chatError?.data?.message)
		}
	}, [messagesData, messagesError])

	useEffect(() => {
		if (sendMessageData) {
			console.log(sendMessageData)
		}
		if (sendMessageError) {
			console.log(sendMessageError)
		}
	}, [sendMessageData, sendMessageError])

	const openChatDetails = () => {
		navigate(`/chats/${chatId}/details`)
	}

	const handleSendMessage = (e) => {
		e.preventDefault()

		let content = messageInputRef.current.value

		if (content && content.trim()) {
			let message = { content }
			console.log(message)
			sendMessage({ id: chatId, message })
		}

		messageInputRef.current.value = ''
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

	const leaveChat = () => {}

	const getChatOptionsDropdown = () => {
		return (
			<Dropdown
				content={
					<div className='chat-options-icon-box'>
						<MaterialIcon icon={'more_vert'} />
					</div>
				}
				options={getChatOptions()}
			/>
		)
	}

	const getChatOptions = () => {
		let options = new Map()

		options.set('leave', () => leaveChat())

		return options
	}

	return !chat ? (
		<Spinner />
	) : (
		<div className='chat'>
			{/* <div className='chat-info-bar' onClick={openChatDetails}>
				<Avatar placeholder={chat.name} />
				<div className='chat-name'>{chat.name}</div>
				<div className='chat-options'></div>
			</div> */}

			<ChatBar
				icon={<Avatar placeholder={chat.name} />}
				name={chat.name}
				optionsDropdown={getChatOptionsDropdown()}
				onClick={openChatDetails}
			/>

			<div className='chat-messages-box'>
				{messagesIsLoading && <Spinner />}
				{messages && messages.length > 0 && (
					<div className='chat-messages-list'>
						{mapMessagesToMessageGroups(messages)}
					</div>
				)}
			</div>

			<div className='chat-message-input-box'>
				<form
					className='chat-message-form'
					onSubmit={handleSendMessage}
				>
					<TextField
						className='chat-message-input'
						name={'message'}
						placeholder={'Message...'}
						reference={messageInputRef}
					/>

					<Button
						type={'submit'}
						className='chat-message-input-button'
					>
						{sendMessageIsLoading ? (
							<Spinner size={19} color={'#888'} />
						) : (
							'Send'
						)}
					</Button>
				</form>
			</div>
		</div>
	)
}

export default Chat
