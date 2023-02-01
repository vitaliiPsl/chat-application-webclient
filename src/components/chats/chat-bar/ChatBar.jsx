import './ChatBar.css'

const ChatBar = ({ icon, name, optionsDropdown, onClick }) => {
	return (
		<div className='chat-bar'>
			<div className='chat-bar-icon'>{icon}</div>
			<div className='chat-bar-name' onClick={onClick}>
				{name}
			</div>
			<div className='chat-bar-options'>{optionsDropdown}</div>
		</div>
	)
}

export default ChatBar
