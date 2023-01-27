import './Chat.css'

import { useEffect, useState, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { setChat, setMessages } from '../../features/chats/chatsSlice'

import {
	useGetChatQuery,
	useGetChatMessagesQuery,
	useSendMessageMutation,
} from '../../features/chats/chatsApi'

import Avatar from '../avatar/Avatar'
import ChatMessage from './ ChatMessage'
import TextField from '../text-field/TextField'
import Button from '../button/Button'
import Spinner from '../spinner/Spinner'
import ChatMessageGroup from './ChatMessageGroup'

const chatId = 'bb21ec87-18dc-4af0-be5a-9e84641693d0'

const Chat = () => {
	const { user } = useSelector((state) => state.auth)
	const { chat, messages } = useSelector((state) => state.chats)

	const messageInputRef = useRef()

	const dispatch = useDispatch()

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

	return !chat ? (
		<Spinner />
	) : (
		<div className='chat'>
			<div className='chat-info-bar'>
				<Avatar placeholder={chat.name} />
				<div className='chat-name'>{chat.name}</div>
				<div className='chat-options'></div>
			</div>

			<div className='chat-messages-box'>
				
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
