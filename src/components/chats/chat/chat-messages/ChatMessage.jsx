import './ChatMessageGroup.css'

const ChatMessage = ({ message }) => {

	let timeOptions = { hour12: true, hour: '2-digit', minute: '2-digit'}
	let time = new Date(message.sentAt).toLocaleTimeString('en', timeOptions)

	return (
		<div className={`chat-message`}>
			<div className='content'>{message.content}</div>
			<div className='timestamp'>{time}</div>
		</div>
	)
}

export default ChatMessage
