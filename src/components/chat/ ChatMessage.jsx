import './ChatMessage.css'

const ChatMessage = ({ message, right }) => {
	return (
		<div className={`chat-message ${right ? 'right' : ''}`}>
			<div className='content'>{message.content}</div>
			<div className='timestamp'>{message.sentAt}</div>
		</div>
	)
}

export default ChatMessage
