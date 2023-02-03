import './Chat.css'

import { useState, useEffect, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import {
	setChat,
	setMessages,
	addMessage,
} from '../../../features/chats/chatsSlice'

import {
	useGetChatQuery,
	useLazyGetChatMessagesQuery,
	useSendMessageMutation,
} from '../../../features/chats/chatsApi'

import { useParams, useNavigate } from 'react-router-dom'

import { Client } from '@stomp/stompjs'

import Avatar from '../../avatar/Avatar'
import TextField from '../../text-field/TextField'
import Button from '../../button/Button'
import Spinner from '../../spinner/Spinner'

import ChatMessageGroup from './ChatMessageGroup'
import ChatBar from '../chat-bar/ChatBar'

const STOMP_BROKER_URL = 'ws://localhost:8080/ws'

const Chat = () => {
	const { chatId } = useParams()

	const { user, token } = useSelector((state) => state.auth)
	const { chat, messages } = useSelector((state) => state.chats)

	const [stompClient, setStompClient] = useState()
	const [stompSubscription, setStompSubscription] = useState()

	const messageInputRef = useRef()

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

	const [sendMessageQuery, { sendMessageIsLoading }] =
		useSendMessageMutation()

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

	useEffect(() => {
		if (chat) {
			openStompConnection(chatId)

			return () => {
				if (stompClient) {
					stompClient.deactivate()
				}
			}
		}
	}, [chat])

	const openChatDetails = () => {
		navigate(`/chats/${chatId}/details`)
	}

	const openStompConnection = (chatId) => {
		const client = new Client({
			brokerURL: STOMP_BROKER_URL,
			connectHeaders: { Authorization: `Bearer ${token}` },

			debug: function (str) {
				console.log(str)
			},
		})

		client.onConnect = function (frame) {
			const subscription = client.subscribe(
				`/topic/chats/${chatId}/messages`,
				onMessage,
				{ Authorization: `Bearer ${token}` }
			)

			setStompClient((stompClient) => client)
			setStompSubscription((stompSubscription) => subscription)
		}

		client.onStompError = function (frame) {
			console.log('Broker reported error: ' + frame.headers['message'])
			console.log('Additional details: ' + frame.body)
		}

		client.activate()
	}

	const onMessage = (messageData) => {
		let message = JSON.parse(messageData.body)

		dispatch(addMessage(message))
	}

	const handleSendMessage = (e) => {
		e.preventDefault()

		let content = messageInputRef.current.value
		messageInputRef.current.value = ''

		if (!content || !content.trim()) {
			return
		}

		sendMessage(content)
	}

	const sendMessage = async (content) => {
		let message = { content }

		try {
			await sendMessageQuery({ id: chatId, message }, false).unwrap()
		} catch (err) {
			console.log(err)
		}
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
