import ChatItem from './ChatItem'
import './Chats.css'

const Chats = () => {
	return (
		<div className='chats'>
			<div className='create-chat-box'>
				<button className='create-chat-button'>Create chat</button>
			</div>

			<div className='chats-list'>
				<ChatItem
					chat={{ name: 'first chat', lastMessage: 'First message' }}
				/>
				<ChatItem
					chat={{
						name: 'Second chat',
						lastMessage: 'Second message',
					}}
				/>
				<ChatItem
					chat={{ name: 'Third chat', lastMessage: 'Third message' }}
				/>

			</div>
		</div>
	)
}

export default Chats
