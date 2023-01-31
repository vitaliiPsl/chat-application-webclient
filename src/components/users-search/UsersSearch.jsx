import './UsersSearch.jsx'

import { useState, useEffect, useRef } from 'react'

import { useLazyGetUsersByNicknameQuery } from '../../features/users/usersApi'

import TextField from '../text-field/TextField.jsx'
import UserListItem from '../chat-new/UserListItem'
import MaterialIcon from '../material-icon/MaterialIcon.jsx'

const NUMBER_OF_SEARCH_RESULTS = 5

const UsersSearch = ({ onItemClick }) => {
	const usersSearchInputRef = useRef()

	const [usersSearchResult, setSearchResult] = useState([])

	const [
		getUsersByNickname,
		{ data: usersSearchData, isLoading: usersSearchIsLoading },
	] = useLazyGetUsersByNicknameQuery()

	useEffect(() => {
		if (usersSearchData) {
			setSearchResult((usersSearchResult) => usersSearchData)
		}
	}, [usersSearchData])

	const handleSearchByNickname = () => {
		let nickname = usersSearchInputRef.current?.value

		if (!nickname || nickname === '') {
			setSearchResult((usersSearchResult) => [])
		} else {
			getUsersByNickname(nickname, false)
		}
	}

	const handleItemClick = (user) => {
		// clear search bar and search result list
		usersSearchInputRef.current.value = ''
		setSearchResult((usersSearchResult) => [])

		onItemClick(user)
	}

	const mapUserSearchResults = (usersSearchResult) => {
		return usersSearchResult
			.slice(0, NUMBER_OF_SEARCH_RESULTS)
			.map((user, index) => mapUserListItem(user, index))
	}

	const mapUserListItem = (user, index) => {
		return (
			<UserListItem
				user={user}
				key={index}
				onClick={() => handleItemClick(user)}
				icon={<MaterialIcon icon={'add'} />}
				onIconClick={() => handleItemClick(user)}
			/>
		)
	}

	return (
		<div className='inner-box users-search-box'>
			<label className='users-search-label'>User search</label>

			<TextField
				type='text'
				name={'nickname'}
				placeholder={'Nickname...'}
				onChange={handleSearchByNickname}
				reference={usersSearchInputRef}
			/>

			{usersSearchResult.length > 0 && (
				<div className={`users-search-result-list`}>
					{mapUserSearchResults(usersSearchResult)}
				</div>
			)}
		</div>
	)
}

export default UsersSearch
