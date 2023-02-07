import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setMessages, addMessage } from '../../../../features/chats/chatsSlice'

import { useLazyGetChatMessagesQuery } from '../../../../features/chats/chatsApi'

import { useSubscription } from 'react-stomp-hooks'

import Spinner from '../../../spinner/Spinner'
import ChatMessage from './ChatMessage'
import ChatMessageGroup from './ChatMessageGroup'

const ChatMessages = ({ chatId }) => {
	const { user, token } = useSelector((state) => state.auth)
	const { messages } = useSelector((state) => state.chats)

	const dispatch = useDispatch()

	const [
		getChatMessagesQuery,
		{
			data: messagesData,
			error: messagesError,
			isLoading: messagesIsLoading,
		},
	] = useLazyGetChatMessagesQuery()

	const onMessage = (messageData) => {
		let message = JSON.parse(messageData.body)

		dispatch(addMessage(message))
	}

	useSubscription(`/topic/chats/${chatId}/messages`, onMessage, {
		Authorization: `Bearer ${token}`,
	})

	useEffect(() => {
		if (!messages) {
			getChatMessagesQuery({ chatId })
		}
		if (messagesData) {
			dispatch(setMessages(messagesData.content))
		}
		if (messagesError) {
			handleError(messagesError)
		}
	}, [messagesData, messagesError])

	const handleError = (err) => {
		console.log(err?.data?.message)
	}

	const mapMessages = (messages) => {
		if (!messages || messages.length === 0) return []

        let groups = groupMessages(messages)

		return groups.map((group, index) => mapGroup(group, index))
	}

    const groupMessages = (messages) => {
        let groups = []

        let group = []
        let author = messages[0].user

        for(let message of messages) {
            if (message.user.id !== author.id) {
                groups.push({author, group})
            
                author = message.user
                group = []
            }
            
            group.push(message)
        }
        groups.push({author, group})

        return groups
    }

    const mapGroup = ({author, group}, index) => {
        let messages = group.map(message => mapMessage(message, message.id))

        return <ChatMessageGroup author={author} messages={messages} user={user} key={index} /> 
    }

	const mapMessage = (message, index) => {
		return <ChatMessage message={message} key={index} />
	}

	return (
		<div className='chat-messages-box'>
			{messagesIsLoading && <Spinner />}

			{messages && messages.length === 0 && (
				<div className='chat-messages-list-empty'>
					No messages yet. Be the one to write the first message
				</div>
			)}

			{messages && messages.length > 0 && (
				<div className='chat-messages-list'>
					{mapMessages(messages)}
				</div>
			)}
		</div>
	)
}

export default ChatMessages
