import './ChatsPage.css'

import ChatsList from '../../components/chats/chats-list/ChatsList'

import { Outlet } from 'react-router-dom'

const ChatsPage = () => {
	return (
		<div className='chats-page'>
			<div className='chats-page-chats-list-box'>
				<ChatsList />
			</div>
			<div className='chats-page-chats-content-box'>
				<Outlet />
			</div>
		</div>
	)
}

export default ChatsPage
