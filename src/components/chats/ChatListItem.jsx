import './ChatListItem.css'

import Avatar from '../avatar/Avatar'

const ChatListItem = ({ chat, onClick }) => {
	return (
		<div className='chat-list-item' onClick={onClick}>
			<Avatar size={40} placeholder={chat.name} />
            
			<div className='chat-list-item-info'>
				<span className='chat-list-item-name'>{chat.name}</span>
				<span className='chat-list-item-last-message'>
					{chat.lastMessage && chat.lastMessage}
				</span>
			</div>
		</div>
	)
}

export default ChatListItem
