import { useRef } from 'react'

import { useSendMessageMutation } from '../../../../features/chats/chatsApi'

import TextField from '../../../text-field/TextField'
import Button from '../../../button/Button'
import Spinner from '../../../spinner/Spinner'

const ChatMessageForm = ({ chatId }) => {
	const messageInputRef = useRef()

	const [sendMessageQuery, { sendMessageIsLoading }] =
		useSendMessageMutation()

	const handleSendMessage = (e) => {
		e.preventDefault()

		let content = messageInputRef.current.value
		messageInputRef.current.value = ''

		if (!content || !content.trim()) {
			return
		}

		sendMessage(content)
	}

	const sendMessage = async (content) => {
		let message = { content }

		try {
			await sendMessageQuery({ id: chatId, message }, false).unwrap()
		} catch (err) {
			console.log(err)
		}
	}

	let buttonContent = sendMessageIsLoading ? <Spinner size={19} /> : 'Send'

	return (
		<div className='chat-message-form-box py-2 px-4 bg-zinc-800'>
			<form
				onSubmit={handleSendMessage}
				className='chat-message-form flex gap-4'
			>
				<TextField
					className='chat-message-input flex-1'
					inputClassName='text-white bg-zinc-800'
					name={'message'}
					placeholder={'Message...'}
					reference={messageInputRef}
				/>

				<Button
					className='chat-message-input-button w-52 text-white bg-zinc-800 border border-white hover:text-zinc-800 hover:bg-white'
					type={'submit'}
				>
					{buttonContent}
				</Button>
			</form>
		</div>
	)
}

export default ChatMessageForm
