import './ChatDetails.css'

import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import {
	setChat,
	setMember,
	setMembers,
} from '../../../features/chats/chatsSlice'

import {
	useGetChatQuery,
	useUpdateChatMutation,
	useDeleteChatMutation,
	useGetChatMemberQuery,
	useGetChatMembersQuery,
	useAddChatMemberMutation,
	useRemoveChatMemberMutation,
} from '../../../features/chats/chatsApi'

import Avatar from '../../avatar/Avatar'
import Spinner from '../../spinner/Spinner'
import Error from '../../error/Error'

import TextField from '../../text-field/TextField'
import Button from '../../button/Button'
import MaterialIcon from '../../material-icon/MaterialIcon'
import MemberListItem from './MemberListItem'
import UsersSearch from '../../users-search/UsersSearch'
import Dropdown from '../../dropdown/Dropdown'

import ChatBar from '../chat-bar/ChatBar'

const initChatDetails = { name: '', description: '' }

const ChatDetails = () => {
	const { chatId } = useParams()

	const { user } = useSelector((state) => state.auth)

	const {
		chat,
		member: actorMember,
		members,
	} = useSelector((state) => state.chats)

	const [chatDetails, setChatDetails] = useState(initChatDetails)
	const [isEditMode, setEditMode] = useState()

	const [isUsersSearchOpen, setUsersSearchOpen] = useState(false)

	const [error, setError] = useState()

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {
		data: chatData,
		error: chatError,
		isLoading: chatIsLoading,
	} = useGetChatQuery(chatId)

	const [updateChatQuery, { isLoading: updateChatIsLoading }] =
		useUpdateChatMutation()

	const [deleteChatQuery, { isLoading: deleteChatQueryIsLoading }] =
		useDeleteChatMutation()

	const {
		data: memberData,
		error: memberError,
		isLoading: memberIsLoading,
	} = useGetChatMemberQuery(
		{ chatId: chatId, userId: user?.id },
		{ skip: !chat || !user }
	)

	const {
		data: membersData,
		error: membersError,
		isLoading: membersIsLoading,
	} = useGetChatMembersQuery(chatId, { skip: !chat || !actorMember })

	const [addChatMemberQuery, { isLoading: addMemberIsLoading }] =
		useAddChatMemberMutation()

	const [removeChatMemberQuery, { isLoading: removeMemberQueryIsLoading }] =
		useRemoveChatMemberMutation()

	useEffect(() => {
		if (chatData) {
			dispatch(setChat(chatData))
		}
		if (memberData) {
			dispatch(setMember(memberData))
		}
		if (membersData) {
			dispatch(setMembers(membersData))
		}
	}, [chatData, memberData, membersData])

	useEffect(() => {
		if (chatError) {
			handleError(chatError)
		}
		if (memberError) {
			handleError(memberError)
		}
		if (membersError) {
			handleError(memberError)
		}
	}, [chatError, memberError, membersError])

	const handleError = (err) => {
		console.log(err?.data?.message)

		setError((error) => err?.data?.message)
	}

	const updateChat = async (e) => {
		e.preventDefault()

		try {
			await updateChatQuery({ chatId, payload: chatDetails }).unwrap()
		} catch (err) {
			handleError(err)
		}
	}

	const deleteChat = async (chat) => {
		try {
			await deleteChatQuery(chat.id)
			navigate('/chats')
		} catch (err) {
			handleError(err)
		}
	}

	const addChatMember = async (user) => {
		let payload = { id: user.id }
		try {
			await addChatMemberQuery({ chatId, payload }).unwrap()
		} catch (err) {
			handleError(err)
		}
	}

	const leaveChat = async (member) => {
		let payload = { chatId: chat.id, userId: member.user.id }

		try {
			await removeChatMemberQuery(payload).unwrap()
			navigate('/chats')
		} catch (err) {
			handleError(err)
		}
	}

	const removeChatMember = async (member) => {
		let payload = { chatId: chat.id, userId: member.user.id }

		try {
			await removeChatMemberQuery(payload).unwrap()
		} catch (err) {
			handleError(err)
		}
	}

	const isMemberOwnerOrAdmin = (member) => {
		return (
			member.role.toLowerCase() === 'owner' ||
			member.role.toLowerCase() === 'admin'
		)
	}

	const handleInputChange = (e) => {
		initChatDetails[e.target.name] = e.target.value

		setChatDetails((chatDetails) => initChatDetails)
	}

	const toggleEditMode = () => {
		setEditMode((isEditMode) => !isEditMode)
	}

	const mapMembersToMemberListItems = (members) => {
		return members.map((member, index) => mapMemberListItem(member, index))
	}

	const mapMemberListItem = (member, index) => {
		if (!isMemberOwnerOrAdmin(actorMember)) {
			return <MemberListItem member={member} key={index} />
		}

		return (
			<MemberListItem
				member={member}
				key={index}
				options={getMemberListItemOptionsDropdown(member)}
			/>
		)
	}

	const getMemberListItemOptionsDropdown = (member) => {
		return (
			<Dropdown options={getMemberListItemOptions(member)}>
				<div className='chat-details-member-options-icon-box'>
					<MaterialIcon icon={'more_vert'} />
				</div>
			</Dropdown>
		)
	}

	const getMemberListItemOptions = (member) => {
		let options = new Map()

		options.set('remove', () => removeChatMember(member))

		return options
	}

	const toggleSearchBox = () => {
		setUsersSearchOpen((isUsersSearchOpen) => !isUsersSearchOpen)
	}

	const getChatBarDropdown = () => {
		return (
			<Dropdown options={getChatBarDropdownOptions()}>
				<div className='chat-options-icon-box'>
					<MaterialIcon icon={'more_vert'} />
				</div>
			</Dropdown>
		)
	}

	const getChatBarDropdownOptions = () => {
		let options = new Map()

		options.set('leave', () => leaveChat(actorMember))

		if (isMemberOwnerOrAdmin(actorMember)) {
			options.set('delete', () => deleteChat(chat))
		}

		return options
	}

	return !chat || !actorMember ? (
		<Spinner />
	) : (
		<div className='chat-details'>
			<ChatBar
				icon={
					<MaterialIcon
						icon={'arrow_back'}
						onClick={() => navigate(-1)}
					/>
				}
				chat={chat}
				dropdown={getChatBarDropdown()}
			/>

			<div className='chat-details-content'>
				{error && (
					<Error message={error} onClose={() => setError(null)} />
				)}

				<div className='outer-box chat-details-box'>
					<div className='inner-box chat-details-avatar-box'>
						<Avatar size={64} placeholder={chat.name} />
					</div>

					<form
						onSubmit={updateChat}
						className='inner-box chat-details-info-box'
					>
						<div className='chat-details-info chat-details-info-chat-name-box'>
							<span className='label chat-details-info-chat-name-label'>
								Name
							</span>

							{!isEditMode && (
								<span className='chat-details-info-chat-name'>
									{chat.name}
								</span>
							)}

							{isEditMode && (
								<TextField
									name={'name'}
									placeholder={chat.name}
									onChange={handleInputChange}
									required={true}
								/>
							)}
						</div>

						<div className='chat-details-info chat-details-info-chat-description-box'>
							<span className='label chat-details-info-chat-description-label'>
								Description
							</span>

							{!isEditMode && (
								<span className='chat-details-info-chat-description'>
									{chat.description}
								</span>
							)}

							{isEditMode && (
								<TextField
									name={'description'}
									placeholder={chat.description}
									onChange={handleInputChange}
								/>
							)}
						</div>

						{isEditMode && (
							<Button type={'submit'}>
								{updateChatIsLoading ? (
									<Spinner size={19} color='#888' />
								) : (
									'Save'
								)}
							</Button>
						)}

						{isMemberOwnerOrAdmin(actorMember) && (
							<div className='chat-details-info-icon-box'>
								<MaterialIcon
									icon={'edit'}
									onClick={toggleEditMode}
								/>
							</div>
						)}
					</form>
				</div>

				<div className='outer-box chat-details-members-box'>
					{isUsersSearchOpen && (
						<UsersSearch onItemClick={addChatMember} />
					)}

					<div className='inner-box chat-details-members'>
						<div className='chat-details-members-bar'>
							<label className='chat-details-members-bar-label'>
								Chat members
							</label>

							<div className='chat-details-members-bar-add-member-icon'>
								<MaterialIcon
									icon={'person_add'}
									onClick={toggleSearchBox}
								/>
							</div>
						</div>

						{members && (
							<div className='chat-details-members-list'>
								{mapMembersToMemberListItems(members)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ChatDetails
