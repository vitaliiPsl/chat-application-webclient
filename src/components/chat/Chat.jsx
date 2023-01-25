import './Chat.css'

import { useEffect, useState } from 'react'

import Avatar from '../avatar/Avatar'
import ChatMessage from './ ChatMessage'
import TextField from '../text-field/TextField'
import Button from '../button/Button'

const Chat = () => {
	const [chat, setChat] = useState({
		name: 'First chat',
	})

	const [messages, setMessages] = useState([
		{ content: 'Hello, m8', sentAt: '6.45' },
		{ content: 'Hi. How are you?', sentAt: '6.47' },
		{
			content:
				'Fine. Working on a new project. Trying to build chat application',
			sentAt: '6.50',
		},
		{ content: 'That is cool', sentAt: '6.55' },
	])

	return (
		<div className='chat'>
			<div className='chat-info-bar'>
				<Avatar placeholder={chat.name} />
				<div className='chat-name'>{chat.name}</div>
				<div className='chat-options'></div>
			</div>

			<div className='chat-message-box'>
				{messages.map((message, index) => (
					<ChatMessage message={message} key={index} />
				))}
                <ChatMessage message={messages[0]} right={true} key={123} />
			</div>

			<div className='chat-message-input-box'>
				<TextField
					className='chat-message-input'
					name={'message'}
					placeholder={'Message...'}
				/>

				<Button className='chat-message-input-button'>Send</Button>
			</div>
		</div>
	)
}

export default Chat
