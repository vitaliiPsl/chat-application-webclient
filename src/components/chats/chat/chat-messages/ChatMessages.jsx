import { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setMessages, addMessage } from '../../../../features/chats/chatsSlice'

import { useLazyGetChatMessagesQuery } from '../../../../features/chats/chatsApi'

import { useSubscription } from 'react-stomp-hooks'
import { useInView } from 'react-intersection-observer'

import Spinner from '../../../spinner/Spinner'
import ChatMessage from './ChatMessage'
import ChatMessageGroup from './ChatMessageGroup'

const ChatMessages = ({ chatId }) => {
	const { user, token } = useSelector((state) => state.auth)
	const { messages } = useSelector((state) => state.chats)

	const [fetchedAll, setFetchedAll] = useState(false)
	const [lastMessageId, setLastMessageId] = useState()

	const { ref, inView } = useInView()

	const dispatch = useDispatch()

	const [getChatMessagesQuery, { isLoading }] = useLazyGetChatMessagesQuery()

	const onMessage = (messageData) => {
		let message = JSON.parse(messageData.body)

		dispatch(addMessage(message))
	}

	useSubscription(`/topic/chats/${chatId}/messages`, onMessage, {
		Authorization: `Bearer ${token}`,
	})

	useEffect(() => {
		if (!messages) {
			loadMessages(true)
		}
	}, [])

	useEffect(() => {
		if (inView && !fetchedAll) {
			loadMessages()
		}
	}, [inView])

	const loadMessages = async (initLoad) => {
		let args = { chatId, lastId: lastMessageId }

		try {
			let { data } = await getChatMessagesQuery(args, false)

			// return if response page is empty
			if (data.empty) {
				return
			}

			// initialize messages if it is init load, add  fetched otherwise
			let loadedMessages = data.content
			if (initLoad) {
				dispatch(setMessages(loadedMessages))
			} else {
				dispatch(setMessages([...messages, ...loadedMessages]))
			}

			// save id of the last message
			let lastMessage = loadedMessages[loadedMessages.length - 1]
			setLastMessageId(lastMessage.id)

			// check if it is last page
			if (data.last) {
				setFetchedAll(true)
			}
		} catch (err) {
			handleError(err)
		}
	}

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

		for (let message of messages) {
			if (message.user.id !== author.id) {
				groups.push({ author, group })

				author = message.user
				group = []
			}

			group.push(message)
		}
		groups.push({ author, group })

		return groups
	}

	const mapGroup = ({ author, group }, index) => {
		let messages = group.map((message) => mapMessage(message, message.id))

		return (
			<ChatMessageGroup
				author={author}
				messages={messages}
				user={user}
				key={index}
			/>
		)
	}

	const mapMessage = (message, index) => {
		if (message.id === lastMessageId) {
			return <ChatMessage message={message} reference={ref} key={index} />
		}

		return <ChatMessage message={message} key={index} />
	}

	return (
		<div className='chat-messages-box min-h-0 flex-1 flex flex-col justify-center items-center gap-2 overflow-hidden'>
			{isLoading && <Spinner />}

			{messages && messages.length === 0 && (
				<div className='chat-messages-list-empty'>
					No messages yet. Be the one to write the first message
				</div>
			)}

			{messages && messages.length > 0 && (
				<div className='chat-messages-list min-h-0 w-full py-4 px-2 flex-1 flex flex-col-reverse gap-2 overflow-y-auto'>
					{mapMessages(messages)}
				</div>
			)}
		</div>
	)
}

export default ChatMessages
