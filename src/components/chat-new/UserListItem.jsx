import './UserListItem.css'

import Avatar from '../avatar/Avatar'

const UserListItem = ({ user, onClick, icon, onIconClick }) => {
	return (
		<div className='user-list-item' onClick={onClick}>
			<Avatar size={40} placeholder={user.nickname} />

			<div className='user-details-box'>
				<span className='user-details-nickname'>{user.nickname}</span>
			</div>

			<div className='user-icon-box' onClick={onIconClick}>
				{icon}
			</div>
		</div>
	)
}

export default UserListItem
