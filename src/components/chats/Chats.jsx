import './Chats.css'

import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { setChats } from '../../features/chats/chatsSlice'
import { useGetChatsQuery } from '../../features/chats/chatsApi'

import { useNavigate } from 'react-router-dom'

import ChatListItem from './ChatListItem'
import Button from '../button/Button'
import Spinner from '../spinner/Spinner'

const Chats = () => {
	const { chats } = useSelector((state) => state.chats)

	const { data, error, isLoading } = useGetChatsQuery()

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

		return Date.parse(chat1.lastMessage) - Date.parse(chat2.lastMessage)
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
		<div className='chats'>
			<div className='create-chat-box'>
				<Button onClick={openChatNew}>Start chat</Button>
			</div>

			<div className='chats-box'>
				<label className='Chats-label'>Your chats</label>

				{isLoading && (
					<div className='center-box'>
						<Spinner color='#888' />
					</div>
				)}

				{!isLoading && chats && chats.length === 0 && (
					<div className='center-box no-chats-box'>
						<span className='no-chats-message'>
							You don't have any chats. <br /> Click{' '}
							<b>'Create chat'</b> to start chatting
						</span>
					</div>
				)}

				{!isLoading && chats && (
					<div className='chats-list'>
						{mapChatsToChatListItems(chats)}
					</div>
				)}
			</div>
		</div>
	)
}

export default Chats
