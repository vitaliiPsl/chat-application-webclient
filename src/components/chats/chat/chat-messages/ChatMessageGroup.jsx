import './ChatMessageGroup.css'

import Avatar from '../../../avatar/Avatar'

const ChatMessageGroup = ({ messages, author, user }) => {
	let isAuthor = user.id === author.id

	return (
		<div className={`chat-message-group-box ${isAuthor ? 'author' : ''}`}>
			{!isAuthor && <Avatar placeholder={author.nickname} />}

			<div className='chat-messages-group-messages-box'>
				{!isAuthor && (
					<span className='chat-messages-group-author-nickname'>
						{author.nickname}
					</span>
				)}

				<div className='chat-messages-group-messages-list'>
					{messages}
				</div>
			</div>
		</div>
	)
}

export default ChatMessageGroup
