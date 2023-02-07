import Avatar from '../../../avatar/Avatar'

const ChatMessageGroup = ({ messages, author, user }) => {
	let isAuthor = user.id === author.id

	return (
		<div
			className={`chat-message-group-box ${
				isAuthor ? 'author self-end' : ''
			} flex gap-2`}
		>
			{!isAuthor && (
				<div className='chat-message-group-avatar-box self-end'>
					<Avatar placeholder={author.nickname} />
				</div>
			)}

			<div className='chat-messages-group-messages-box flex flex-col items-start'>
				{!isAuthor && (
					<span className='chat-messages-group-author-nickname'>
						{author.nickname}
					</span>
				)}

				<div className={`chat-messages-group-messages-list flex flex-col-reverse gap-2 ${isAuthor && 'items-end'}`}>
					{messages}
				</div>
			</div>
		</div>
	)
}

export default ChatMessageGroup
