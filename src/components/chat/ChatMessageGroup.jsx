import './ChatMessageGroup.css'

import Avatar from '../avatar/Avatar'
import ChatMessage from './ ChatMessage'

const ChatMessageGroup = ({ group, user }) => {
	let author = group[0]
	let messages = group[1]

	let isAuthor = user.id === author.id

	const mapMessages = () => {
		return messages?.map((message, index) => (
			<ChatMessage message={message} user={user} key={index} />
		))
	}

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
					{mapMessages()}
				</div>
			</div>
		</div>
	)
}

export default ChatMessageGroup
