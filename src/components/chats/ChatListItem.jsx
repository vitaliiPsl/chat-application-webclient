import './ChatListItem.css'

import Avatar from '../avatar/Avatar'

const ChatListItem = ({ chat, onClick }) => {
	const getLastMessageTimestamp = () => {
		let timeOptions = {
			year: '2-digit',
			month: 'numeric',
			day: 'numeric',
			hour12: true,
			hour: '2-digit',
			minute: '2-digit',
		}

		return new Date(chat.lastMessage.sentAt).toLocaleString(
			'en',
			timeOptions
		)
	}

	return (
		<div className='chat-list-item' onClick={onClick}>
			<Avatar size={40} placeholder={chat.name} />

			<div className='chat-list-item-info'>
				<span className='chat-list-item-name'>{chat.name}</span>

				<div className='chat-list-item-last-message-box'>
					<span className='last-message-content'>
						{chat.lastMessage && chat.lastMessage.content}
					</span>

					<span className='last-message-timestamp'>
						{chat.lastMessage && getLastMessageTimestamp()}
					</span>
				</div>
			</div>
		</div>
	)
}

export default ChatListItem
