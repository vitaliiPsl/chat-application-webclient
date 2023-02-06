const ChatBar = ({ icon, chat, dropdown, onClick }) => {
	return (
		<div className='chat-bar min-h-18 p-2 flex items-stretch justify-between gap-2 text-white bg-zinc-800 cursor-pointer'>
			<div className='chat-bar-icon min-w-20 flex items-center justify-center'>
				{icon}
			</div>

			<div
				className='chat-bar-name flex-1 text-center min-w-20 flex items-center justify-center'
				onClick={onClick}
			>
				{chat.name}
			</div>

			<div className='chat-bar-dropdown min-w-20 flex items-center justify-center'>
				{dropdown}
			</div>
		</div>
	)
}

export default ChatBar
