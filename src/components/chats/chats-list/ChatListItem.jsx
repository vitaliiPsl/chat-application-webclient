import Avatar from '../../avatar/Avatar'

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
		<div
			className='chat-list-item min-h-18 p-2 flex items-center justify-start gap-4 text-zinc-800 bg-white border-b border-b-zinc-300 last-of-type:border-b-0 hover:bg-gray-300 cursor-pointer duration-500'
			onClick={onClick}
		>
			<Avatar size={40} placeholder={chat.name} />

			<div className='chat-list-item-info min-w-0 flex-1 flex flex-col'>
				<span className='chat-list-item-name text-sm font-bold overflow-hidden whitespace-nowrap overflow-ellipsis'>
					{chat.name}
				</span>

				<div className='chat-list-item-last-message-box flex flex-col text-zinc-600'>
					<span className='last-message-content  text-xs overflow-hidden whitespace-nowrap overflow-ellipsis'>
						{chat.lastMessage && chat.lastMessage.content}
					</span>

					<span className='last-message-timestamp self-end text-xs'>
						{chat.lastMessage && getLastMessageTimestamp()}
					</span>
				</div>
			</div>
		</div>
	)
}

export default ChatListItem
