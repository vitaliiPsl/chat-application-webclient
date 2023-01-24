import './ChatNew.css'

import { useState, useEffect, useRef } from 'react'

import { useLazyGetUsersByNicknameQuery } from '../../features/users/usersApi'
import { useCreateChatMutation } from '../../features/chats/chatsApi'

import UserListItem from './UserListItem'
import Button from '../button/Button'
import TextField from '../text-field/TextField'
import Error from '../error/Error'
import Spinner from '../spinner/Spinner'

const initChatDetails = {
	name: '',
	description: '',
}

const ChatNew = () => {
	const [chatDetails, setChatDetails] = useState(initChatDetails)
	const [selectedUsers, setSelectedUsers] = useState(new Map())

	const searchInputRef = useRef()
	const [searchResult, setSearchResult] = useState([])

	const [error, setError] = useState()

	const [trigger, { data: userSearchData, isLoading: isGetUsersLoading }] =
		useLazyGetUsersByNicknameQuery()

	const [
		createChat,
		{
			data: createChatData,
			error: createChatError,
			isLoading: isCreateChatLoading,
		},
	] = useCreateChatMutation()

	useEffect(() => {
		if (userSearchData) {
			setSearchResult((searchResult) => userSearchData)
		}
	}, [userSearchData])

	useEffect(() => {
		if (createChatData) {
			console.log(createChatData)

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

		// clear search bar and search result list
		searchInputRef.current.value = ''
		setSearchResult((searchResult) => [])
	}

	const removeSelectedUser = (id) => {
		let selectedUsersCopy = new Map(selectedUsers)
		selectedUsersCopy.delete(id)

		setSelectedUsers((selectedUsers) => selectedUsersCopy)
	}

	const handleSearchByNickname = (e) => {
		let nickname = e.target.value

		if (nickname === '') {
			setSearchResult((searchResult) => [])
		} else {
			trigger(nickname, false)
		}
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
					<div className='outer-box chat-details-box'>
						<div className='inner-box'>
							<TextField
								label={'Name'}
								type='text'
								name={'name'}
								placeholder={'Chat name...'}
								required={true}
								onChange={handleInputChange}
							/>
						</div>

						<div className='inner-box'>
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

					<div className='outer-box chat-users-box'>
						<div className={`inner-box users-search-box`}>
							<label className='users-search-label'>
								User search
							</label>

							<TextField
								type='text'
								name={'nickname'}
								placeholder={'Nickname...'}
								onChange={handleSearchByNickname}
								reference={searchInputRef}
							/>

							{searchResult.length > 0 && (
								<div className={`users-search-result-list`}>
									{searchResult
										.slice(0, 5)
										.map((user, index) => (
											<UserListItem
												user={user}
												key={index}
												onClick={() =>
													addSelectedUser(user)
												}
												icon={
													<span className='material-symbols-outlined'>
														add
													</span>
												}
											/>
										))}
								</div>
							)}
						</div>

						<div className='inner-box users-selected-box'>
							<label className='users-selected-label'>
								Selected users
							</label>

							{selectedUsers.size == 0 && (
								<div className='no-selected-users-box'>
									<span className='no-selected-users-message'>
										You need to select at least one user to
										start new chat
									</span>
								</div>
							)}
							<div className='users-selected-list'>
								{[...selectedUsers.values()].map(
									(user, index) => (
										<UserListItem
											user={user}
											key={index}
											icon={
												<span className='material-symbols-outlined'>
													close
												</span>
											}
											onIconClick={() =>
												removeSelectedUser(user.id)
											}
										/>
									)
								)}
							</div>
						</div>
					</div>
				</form>

				<Button onClick={handleSubmit}>
					{isCreateChatLoading ? <Spinner /> : 'Create chat'}
				</Button>
			</div>
		</div>
	)
}

export default ChatNew
