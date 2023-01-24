import './Chats.css'

import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { setChats } from '../../features/chats/chatsSlice'
import { useGetChatsQuery } from '../../features/chats/chatsApi'

import ChatListItem from './ChatListItem'
import Button from '../button/Button'
import Spinner from '../spinner/Spinner'

const Chats = () => {
	const { chats } = useSelector((state) => state.chats)

	const dispatch = useDispatch()

	const { data, error, isLoading } = useGetChatsQuery()

	useEffect(() => {
		if (data) {
			dispatch(setChats(data))
		}
		if (error) {
			console.log(error)
			console.log(error?.data?.message)
		}
	}, [data, error])

    const openChat = (id) => {
        // TODO: redirect to chat with given id
    }

	const mapChatsToChatListItem = (chats) => {
		return chats.map((chat, index) => (
			<ChatListItem chat={chat} key={index} />
		))
	}

	return (
		<div className='chats'>
			<div className='create-chat-box'>
				<Button onClick={() => alert('Clicked')}>Create chat</Button>
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

				{!isLoading && chats && chats.length > 0 && (
					<div className='chats-list'>
						{mapChatsToChatListItem(chats)}
					</div>
				)}
			</div>
		</div>
	)
}

export default Chats
