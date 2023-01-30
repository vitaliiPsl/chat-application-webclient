import './ChatNew.css'

import { useState, useEffect } from 'react'

import { useCreateChatMutation } from '../../features/chats/chatsApi'

import UserListItem from './UserListItem'
import Button from '../button/Button'
import TextField from '../text-field/TextField'
import Error from '../error/Error'
import Spinner from '../spinner/Spinner'
import UsersSearch from '../users-search/UsersSearch'

const initChatDetails = {
	name: '',
	description: '',
}

const ChatNew = () => {
	const [chatDetails, setChatDetails] = useState(initChatDetails)
	const [selectedUsers, setSelectedUsers] = useState(new Map())

	const [error, setError] = useState()

	const [
		createChat,
		{
			data: createChatData,
			error: createChatError,
			isLoading: isCreateChatLoading,
		},
	] = useCreateChatMutation()

	useEffect(() => {
		if (createChatData) {
			// TODO: redirect to created chat
		}
		if (createChatError) {
			setError(() => createChatError?.data?.message)
		}
	}, [createChatData, createChatError])

	const handleSubmit = () => {
		chatDetails['users'] = [...selectedUsers.keys()].map((id) => {
			return { id }
		})

		createChat(chatDetails)
	}

	const handleInputChange = (e) => {
		initChatDetails[e.target.name] = e.target.value

		setChatDetails((chatDetails) => initChatDetails)
	}

	const addSelectedUser = (user) => {
		let id = user.id

		let selectedUsersCopy = new Map(selectedUsers)
		selectedUsersCopy.set(id, user)

		setSelectedUsers((selectedUsers) => selectedUsersCopy)
	}

	const removeSelectedUser = (id) => {
		let selectedUsersCopy = new Map(selectedUsers)
		selectedUsersCopy.delete(id)

		setSelectedUsers((selectedUsers) => selectedUsersCopy)
	}

	const mapSelectedUsers = (selectedUsers) => {
		let closeIcon = <span className='material-symbols-outlined'>close</span>

		return [...selectedUsers.values()].map((user, index) =>
			mapUserListItem(user, index, closeIcon, null, () =>
				removeSelectedUser(user.id)
			)
		)
	}

	const mapUserListItem = (user, index, icon, onClick, onIconClick) => {
		return (
			<UserListItem
				user={user}
				key={index}
				onClick={onClick}
				icon={icon}
				onIconClick={onIconClick}
			/>
		)
	}

	return (
		<div className='chat-new'>
			<div className='chat-new-title-bar-box'>
				<h3>Start new chat</h3>
			</div>

			<div className='chat-new-form-box'>
				{error && (
					<Error
						message={error}
						onClose={() => setError(() => null)}
					/>
				)}

				<form className='chat-new-form'>
					<div className='outer-box chat-new-details-box'>
						<div className='inner-box chat-new-details-name'>
							<TextField
								label={'Name'}
								type='text'
								name={'name'}
								placeholder={'Chat name...'}
								required={true}
								onChange={handleInputChange}
							/>
						</div>

						<div className='inner-box chat-new-details-description'>
							<TextField
								label={'Description'}
								type='text'
								name={'description'}
								placeholder={'Chat description...'}
								required={false}
								onChange={handleInputChange}
							/>
						</div>
					</div>

					<div className='outer-box chat-new-users-box'>

						<UsersSearch onItemClick={addSelectedUser} />

						<div className='inner-box chat-new-users-selected-box'>
							<label className='users-selected-label'>
								Selected users
							</label>

							{selectedUsers.size === 0 && (
								<div className='no-selected-users-box'>
									<span className='no-selected-users-message'>
										You need to select at least one user to
										start new chat
									</span>
								</div>
							)}

							<div className='chat-new-users-selected-list'>
								{mapSelectedUsers(selectedUsers)}
							</div>
						</div>
					</div>
				</form>

				<Button onClick={handleSubmit}>
					{isCreateChatLoading ? (
						<Spinner size={19} color={'#888'} />
					) : (
						'Create chat'
					)}
				</Button>
			</div>
		</div>
	)
}

export default ChatNew
