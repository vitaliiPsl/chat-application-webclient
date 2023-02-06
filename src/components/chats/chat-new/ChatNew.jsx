import { useState } from 'react'

import { useCreateChatMutation } from '../../../features/chats/chatsApi'
import { useNavigate } from 'react-router-dom'

import InnerBox from '../../layout/InnerBox'
import OuterBox from '../../layout/OuterBox'
import UserListItem from './UserListItem'
import Button from '../../button/Button'
import TextField from '../../text-field/TextField'
import Error from '../../error/Error'
import Spinner from '../../spinner/Spinner'
import UsersSearch from '../../users-search/UsersSearch'
import MaterialIcon from '../../material-icon/MaterialIcon'

const initChatDetails = {
	name: '',
	description: '',
}

const ChatNew = () => {
	const [chatDetails, setChatDetails] = useState(initChatDetails)
	const [selectedUsers, setSelectedUsers] = useState(new Map())

	const [error, setError] = useState()

	const navigate = useNavigate()

	const [createChat, { isLoading: isCreateChatLoading }] =
		useCreateChatMutation()

	const handleSubmit = async () => {
		chatDetails['users'] = [...selectedUsers.keys()].map((id) => {
			return { id }
		})

		try {
			let res = await createChat(chatDetails).unwrap()
			navigate(`/chats/${res.id}`)
		} catch (err) {
			handleError(err)
		}
	}

	const handleError = (err) => {
		console.log(err)
		setError((error) => err?.data?.message)
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

	const removeSelectedUser = (user) => {
		let selectedUsersCopy = new Map(selectedUsers)
		selectedUsersCopy.delete(user.id)

		setSelectedUsers((selectedUsers) => selectedUsersCopy)
	}

	const mapSelectedUsers = (selectedUsers) => {
		return [...selectedUsers.values()].map((user, index) =>
			mapSelectedUserListItem(user, index)
		)
	}

	const mapSelectedUserListItem = (user, index) => {
		return (
			<UserListItem
				user={user}
				key={index}
				icon={<MaterialIcon icon={'close'} />}
				onIconClick={() => removeSelectedUser(user)}
			/>
		)
	}

	return (
		<div className='chat-new min-h-0 h-full flex-1 flex flex-col'>
			<div className='chat-new-title-bar-box min-h-18 py-2 px-3 flex items-center justify-center gap-2 text-white bg-zinc-800'>
				<h3>Start new chat</h3>
			</div>

			<div className='chat-new-form-box min-h-0 p-8 flex-1 flex flex-col justify-between gap-3'>
				{error && (
					<Error
						message={error}
						onClose={() => setError(() => null)}
					/>
				)}

				<form className='chat-new-form min-h-0 flex-1 flex flex-col justify-between gap-3 overflow-y-auto'>
					<OuterBox className={'chat-new-details-box'}>
						<InnerBox className={'chat-new-details-name'}>
							<TextField
								label={'Name'}
								type='text'
								name={'name'}
								placeholder={'Chat name...'}
								required={true}
								onChange={handleInputChange}
							/>
						</InnerBox>

						<InnerBox className={'chat-new-details-description'}>
							<TextField
								label={'Description'}
								type='text'
								name={'description'}
								placeholder={'Chat description...'}
								required={false}
								onChange={handleInputChange}
							/>
						</InnerBox>
					</OuterBox>

					<OuterBox className={'chat-new-users-box flex-1'}>
						<UsersSearch onItemClick={addSelectedUser} />

						<InnerBox
							className={'chat-new-users-selected-box flex-1'}
						>
							<label className='users-selected-label'>
								Selected users
							</label>

							{selectedUsers.size === 0 && (
								<div className='no-selected-users-box p-3 flex-1 flex items-center justify-center'>
									<span className='no-selected-users-message'>
										You need to select at least one user to
										start new chat
									</span>
								</div>
							)}

							<div className='chat-new-users-selected-list'>
								{mapSelectedUsers(selectedUsers)}
							</div>
						</InnerBox>
					</OuterBox>
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
