import './MemberListItem.css'

import Avatar from '../avatar/Avatar'

const MemberListItem = ({ member, onClick, icon, options }) => {
	return (
		<div className='member-list-item' onClick={onClick}>
			<div className='member-avatar-box'>
				<Avatar size={40} placeholder={member.user.nickname} />
			</div>

			<div className='member-details-box'>
				<span className='member-details-nickname'>
					{member.user.nickname}
				</span>

				{member.role.toLowerCase() !== 'default' && (
					<span className='member-details-role'>
						{member.role.toLowerCase()}
					</span>
				)}
			</div>

			<div className='member-icons-box'>{icon}</div>

			<div className='member-options-box'>{options}</div>
		</div>
	)
}

export default MemberListItem
