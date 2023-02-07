import { useSelector } from 'react-redux'

const ChatMessage = ({ message }) => {
	const { user } = useSelector((state) => state.auth)

	let timeOptions = { hour12: true, hour: '2-digit', minute: '2-digit' }
	let time = new Date(message.sentAt).toLocaleTimeString('en', timeOptions)

	let isAuthor = message.user.id === user.id

	return (
		<div
			className={`chat-message min-w-20 w-fit px-2 py-1 flex flex-col text-white bg-zinc-800 border border-zinc-800 rounded-lg`}
		>
			<div className='content'>{message.content}</div>
			<div
				className={`timestamp text-xs ${
					isAuthor ? 'self-start' : 'self-end'
				}`}
			>
				{time}
			</div>
		</div>
	)
}

export default ChatMessage
