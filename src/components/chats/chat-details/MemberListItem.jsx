import './MemberListItem.css'

import Avatar from '../../avatar/Avatar'

const MemberListItem = ({ member, onClick, icon, options }) => {
	return (
		<div
			className='member-list-item min-h-18 p-2 flex items-center justify-start gap-4 text-zinc-800 bg-white border-b border-b-zinc-400 last-of-type:border-b-0 hover:bg-zinc-300 cursor-pointer duration-500'
			onClick={onClick}
		>
			<div className='member-avatar-box flex items-center justify-center'>
				<Avatar size={40} placeholder={member.user.nickname} />
			</div>

			<div className='member-details-box flex-1 flex flex-col justify-evenly gap-1'>
				<span className='member-details-nickname text-lg font-bold'>
					{member.user.nickname}
				</span>

				{member.role.toLowerCase() !== 'default' && (
					<span className='member-details-role text-zinc-600 lowercase'>
						{member.role.toLowerCase()}
					</span>
				)}
			</div>

			<div className='member-icons-box w-9 h-9'>{icon}</div>

			<div className='member-options-box flex items-center justify-center w-9 h-9'>{options}</div>
		</div>
	)
}

export default MemberListItem
