import './ChatBar.css'

const ChatBar = ({ icon, chat, dropdown, onClick }) => {
	return (
		<div className='chat-bar'>
			<div className='chat-bar-icon'>{icon}</div>

			<div className='chat-bar-name' onClick={onClick}>
				{chat.name}
			</div>

			<div className='chat-bar-dropdown'>{dropdown}</div>
		</div>
	)
}

export default ChatBar
