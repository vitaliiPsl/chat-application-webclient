import './UserListItem.css'

import Avatar from '../avatar/Avatar'

const UserListItem = ({ user, onClick, icon, iconSize = 40, onIconClick }) => {
	return (
		<div className='user-list-item' onClick={onClick}>
			<Avatar size={40} placeholder={user.nickname} />

			<div className='user-nickname'>{user.nickname}</div>

			<div
				className='icon-box'
				style={{
					height: iconSize,
					width: iconSize,
				}}
				onClick={onIconClick}
			>
				{icon}
			</div>
		</div>
	)
}

export default UserListItem
