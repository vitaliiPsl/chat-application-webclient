import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { setChats } from '../../../features/chats/chatsSlice'
import { useGetChatsQuery } from '../../../features/chats/chatsApi'

import { useNavigate } from 'react-router-dom'

import ChatListItem from './ChatListItem'
import Button from '../../button/Button'
import Spinner from '../../spinner/Spinner'

const ChatsList = () => {
	const { chats } = useSelector((state) => state.chats)

	const { data, error, isLoading } = useGetChatsQuery(null, {
		pollingInterval: 3000,
	})

	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (data) {
			dispatch(setChats(data))
		}
		if (error) {
			console.log(error?.data?.message)
		}
	}, [data, error])

	const openChat = (id) => {
		navigate(`/chats/${id}`)
	}

	const openChatNew = () => {
		navigate(`/chats/new`)
	}

	const mapChatsToChatListItems = (chats) => {
		return [...chats]
			.sort(compareChatsByLastMessage)
			.map((chat, index) => mapChatToChatListItem(chat, index))
	}

	const compareChatsByLastMessage = (chat1, chat2) => {
		if (!chat1.lastMessage) {
			return 1
		}
		if (!chat2.lastMessage) {
			return -1
		}

		return (
			Date.parse(chat2.lastMessage.sentAt) -
			Date.parse(chat1.lastMessage.sentAt)
		)
	}

	const mapChatToChatListItem = (chat, index) => {
		return (
			<ChatListItem
				chat={chat}
				key={index}
				onClick={() => openChat(chat.id)}
			/>
		)
	}

	return (
		<div className='chats min-h-0 h-full p-2 flex-1 flex flex-col gap-4'>
			<div className='create-chat-box w-full'>
				<Button onClick={openChatNew}>Start chat</Button>
			</div>

			<div className='chats-box min-h-0 flex-1 flex flex-col gap-4'>
				<label className='Chats-label'>Your chats</label>

				{isLoading && (
					<div className='center-box p-6 flex-1 flex items-center justify-center'>
						<Spinner color='#888' />
					</div>
				)}

				{!isLoading && chats && chats.length === 0 && (
					<div className='center-box no-chats-box center-box p-6 flex-1 flex items-center justify-center'>
						<span className='no-chats-message'>
							You don't have any chats. <br /> Click{' '}
							<b>'Create chat'</b> to start chatting
						</span>
					</div>
				)}

				{!isLoading && chats && (
					<div className='chats-list min-h-0 flex-1 flex flex-col overflow-y-auto'>
						{mapChatsToChatListItems(chats)}
					</div>
				)}
			</div>
		</div>
	)
}

export default ChatsList
