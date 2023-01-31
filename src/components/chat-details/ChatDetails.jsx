import './ChatDetails.css'

import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { setChat, setMember, setMembers } from '../../features/chats/chatsSlice'
import {
	useGetChatQuery,
	useUpdateChatMutation,
	useGetChatMemberQuery,
	useGetChatMembersQuery,
	useAddChatMemberMutation,
	useRemoveChatMemberMutation,
} from '../../features/chats/chatsApi'

import Avatar from '../avatar/Avatar'
import Spinner from '../spinner/Spinner'
import Error from '../error/Error'

import TextField from '../text-field/TextField'
import Button from '../button/Button'
import MaterialIcon from '../material-icon/MaterialIcon'
import MemberListItem from './MemberListItem'
import UsersSearch from '../users-search/UsersSearch'
import Dropdown from '../dropdown/Dropdown'

import { useParams } from 'react-router-dom'

const initChatDetails = { name: '', description: '' }

const ChatDetails = () => {
    const {chatId} = useParams()

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

	const {
		data: chatData,
		error: chatError,
		isLoading: chatIsLoading,
	} = useGetChatQuery(chatId)

	const [
		updateChat,
		{
			data: updateChatData,
			error: updateChatError,
			isLoading: updateChatIsLoading,
		},
	] = useUpdateChatMutation()

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
	} = useGetChatMembersQuery(chatId, { skip: !chat })

	const [
		addChatMember,
		{
			data: addMemberData,
			error: addMemberError,
			isLoading: addMemberIsLoading,
		},
	] = useAddChatMemberMutation()

	const [
		removeChatMember,
		{ error: removeMemberError, isLoading: removeMemberIsLoading },
	] = useRemoveChatMemberMutation()

	useEffect(() => {
		if (chatData) {
			dispatch(setChat(chatData))
		}
		if (memberData) {
			dispatch(setMember(memberData))
		}
		if (updateChatData) {
			toggleEditMode()
		}
		if (memberData) {
			dispatch(setMembers(membersData))
		}
	}, [chatData, memberData, updateChatData, membersData, addMemberData])

	useEffect(() => {
		if (chatError) {
			handleError(chatError)
		}
		if (memberError) {
			handleError(memberError)
		}
		if (updateChatError) {
			handleError(updateChatError)
		}
		if (membersError) {
			handleError(memberError)
		}
		if (addMemberError) {
			handleError(addMemberError)
		}
		if (removeMemberError) {
			handleError(removeMemberError)
		}
	}, [
		chatError,
		memberError,
		updateChatError,
		membersError,
		addMemberError,
		removeMemberError,
	])

	const handleError = (err) => {
		console.log(err?.data?.message)

		setError((error) => err?.data?.message)
	}

	const isMemberOwnerOrAdmin = (member) => {
		return (
			member.role.toLowerCase() === 'owner' ||
			member.role.toLowerCase() === 'admin'
		)
	}

	const handleChatUpdateSubmit = (e) => {
		e.preventDefault()

		updateChat({ chatId, payload: chatDetails })
	}

	const handleInputChange = (e) => {
		initChatDetails[e.target.name] = e.target.value

		setChatDetails((chatDetails) => initChatDetails)
	}

	const toggleEditMode = () => {
		setEditMode((isEditMode) => !isEditMode)
	}

	const addMember = (user) => {
		let payload = { id: user.id }

		addChatMember({ chatId, payload })
	}

	const removeMember = (user) => {
		removeChatMember({ chatId, userId: user.id })
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
			<Dropdown
				content={
					<div className='chat-details-member-options-icon-box'>
						<MaterialIcon icon={'more_vert'} />
					</div>
				}
				options={getMemberListItemOptions(member)}
			/>
		)
	}

	const getMemberListItemOptions = (member) => {
		let options = new Map()

		options.set('remove', () => removeMember(member.user))

		return options
	}

	const toggleSearchBox = () => {
		setUsersSearchOpen((isUsersSearchOpen) => !isUsersSearchOpen)
	}

	return !chat || !actorMember ? (
		<Spinner />
	) : (
		<div className='chat-details'>
			{error && <Error message={error} onClose={() => setError(null)} />}

			<div className='outer-box chat-details-box'>
				<div className='inner-box chat-details-avatar-box'>
					<Avatar size={64} placeholder={chat.name} />
				</div>

				<form
					onSubmit={handleChatUpdateSubmit}
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
				{isUsersSearchOpen && <UsersSearch onItemClick={addMember} />}

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
	)
}

export default ChatDetails
