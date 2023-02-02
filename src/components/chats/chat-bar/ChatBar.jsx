import './ChatBar.css'

import Dropdown from '../../dropdown/Dropdown'
import MaterialIcon from '../../material-icon/MaterialIcon'

import { useSelector } from 'react-redux'
import { useRemoveChatMemberMutation } from '../../../features/chats/chatsApi'
import { useNavigate } from 'react-router-dom'

const ChatBar = ({ icon, chat, onClick }) => {
	const { user } = useSelector((state) => state.auth)

	const navigate = useNavigate()

	const [removeChatMember, { isLoading }] =
		useRemoveChatMemberMutation()

	const leaveChat = async () => {
		let payload = { chatId: chat.id, userId: user.id }

		try {
			await removeChatMember(payload).unwrap()
			navigate('/chats')
		} catch (err) {
			console.log(err)
			console.log(err?.data?.message)
		}
	}

	const getChatOptions = () => {
		let options = new Map()
		options.set('leave', () => leaveChat())

		return options
	}

	return (
		<div className='chat-bar'>
			<div className='chat-bar-icon'>{icon}</div>

			<div className='chat-bar-name' onClick={onClick}>
				{chat.name}
			</div>

			<div className='chat-bar-options'>
				<Dropdown options={getChatOptions()}>
					<div className='chat-options-icon-box'>
						<MaterialIcon icon={'more_vert'} />
					</div>
				</Dropdown>
			</div>
		</div>
	)
}

export default ChatBar
