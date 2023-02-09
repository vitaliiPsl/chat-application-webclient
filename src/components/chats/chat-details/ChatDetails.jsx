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

import OuterBox from '../../layout/OuterBox'
import TextField from '../../text-field/TextField'
import Button from '../../button/Button'
import MaterialIcon from '../../material-icon/MaterialIcon'
import MemberListItem from './MemberListItem'
import UsersSearch from '../../users-search/UsersSearch'
import Dropdown from '../../dropdown/Dropdown'

import ChatBar from '../chat-bar/ChatBar'
import InnerBox from '../../layout/InnerBox'

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

	const { data: chatData, error: chatError } = useGetChatQuery(chatId)

	const [updateChatQuery, { isLoading: updateChatIsLoading }] =
		useUpdateChatMutation()

	const [deleteChatQuery] = useDeleteChatMutation()

	const { data: memberData, error: memberError } = useGetChatMemberQuery(
		{ chatId: chatId, userId: user?.id },
		{ skip: !chat || !user }
	)

	const { data: membersData, error: membersError } = useGetChatMembersQuery(
		chatId,
		{ skip: !chat || !actorMember }
	)

	const [addChatMemberQuery] = useAddChatMemberMutation()

	const [removeChatMemberQuery] = useRemoveChatMemberMutation()

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
		throw { code: error?.status, message: error?.data.message }
	}

	const updateChat = async (e) => {
		e.preventDefault()

		try {
			await updateChatQuery({ chatId, payload: chatDetails }).unwrap()
			toggleEditMode()
		} catch (err) {
			setError((error) => err?.data?.message)
		}
	}

	const deleteChat = async (chat) => {
		try {
			await deleteChatQuery(chat.id)
			navigate('/chats')
		} catch (err) {
			setError((error) => err?.data?.message)
		}
	}

	const addChatMember = async (user) => {
		let payload = { id: user.id }
		try {
			await addChatMemberQuery({ chatId, payload }).unwrap()
		} catch (err) {
			setError((error) => err?.data?.message)
		}
	}

	const leaveChat = async (member) => {
		let payload = { chatId: chat.id, userId: member.user.id }

		try {
			await removeChatMemberQuery(payload).unwrap()
			navigate('/chats')
		} catch (err) {
			setError((error) => err?.data?.message)
		}
	}

	const removeChatMember = async (member) => {
		let payload = { chatId: chat.id, userId: member.user.id }

		try {
			await removeChatMemberQuery(payload).unwrap()
		} catch (err) {
			setError((error) => err?.data?.message)
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
				<div className='chat-options-icon-box w-9 h-9'>
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
		<div className='chat-details min-h-0 h-full flex-1 flex flex-col'>
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

			<div className='chat-details-content min-h-0 p-2 flex-1 flex flex-col gap-3 overflow-y-auto'>
				{error && (
					<Error message={error} onClose={() => setError(null)} />
				)}

				<OuterBox
					className={'chat-details-box flex-row items-stretch'}
					direction={'row'}
				>
					<InnerBox
						className={
							'chat-details-avatar-box min-w-50 flex items-center justify-center'
						}
					>
						<Avatar size={64} placeholder={chat.name} />
					</InnerBox>
					<InnerBox className={'flex-1 p-0'}>
						<form
							onSubmit={updateChat}
							className='chat-details-info-box p-3 flex-1 flex flex-col gap-2 relative'
						>
							<div className='chat-details-info chat-details-info-chat-name-box flex flex-col'>
								<span className='label chat-details-info-chat-name-label text-zinc-500'>
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

							<div className='chat-details-info chat-details-info-chat-description-box flex flex-col'>
								{(chat.description || isEditMode) && (
									<span className='label chat-details-info-chat-description-label text-zinc-500'>
										Description
									</span>
								)}

								{chat.description && !isEditMode && (
									<span className='chat-details-info-chat-description'>
										{chat.description}
									</span>
								)}

								{isEditMode && (
									<TextField
										name={'description'}
										placeholder={
											chat.description || 'Description'
										}
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
								<div className='chat-details-info-icon-box absolute top-1 right-1 w-7 h-7'>
									<MaterialIcon
										icon={'edit'}
										onClick={toggleEditMode}
									/>
								</div>
							)}
						</form>
					</InnerBox>
				</OuterBox>

				<OuterBox
					className={
						'chat-details-members-box min-h-0 flex-1 flex flex-col overflow-y-auto'
					}
				>
					{isUsersSearchOpen && (
						<UsersSearch onItemClick={addChatMember} />
					)}

					<InnerBox className={'chat-details-members'}>
						<div className='inner-box chat-details-members'>
							<div className='chat-details-members-bar flex justify-between items-center'>
								<label className='chat-details-members-bar-label'>
									Chat members
								</label>

								<div className='chat-details-members-bar-add-member-icon w-9 h-9'>
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
					</InnerBox>
				</OuterBox>
			</div>
		</div>
	)
}

export default ChatDetails
