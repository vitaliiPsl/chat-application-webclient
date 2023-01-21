

const ChatItem = ({ chat }) => {
	return (
		<div className='chat-item'>
			<div className='chat-item-image'>
				<span>{chat.name[0].toUpperCase()}</span>
			</div>
			<div className='chat-item-info'>
				<span className='chat-item-name'>{chat.name}</span>
				<span className='chat-item-last-message'>
					{chat.lastMessage && chat.lastMessage}
				</span>
			</div>
		</div>
	)
}

export default ChatItem
