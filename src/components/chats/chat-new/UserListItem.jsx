import Avatar from '../../avatar/Avatar'

const UserListItem = ({ user, onClick, icon, onIconClick }) => {
	return (
		<div
			className='user-list-item p-2 flex items-center justify-start gap-4 text-zinc-800 bg-white border-b border-b-zinc-500 last-of-type:border-b-0 hover:bg-gray-300 cursor-pointer duration-500'
			onClick={onClick}
		>
			<Avatar size={40} placeholder={user.nickname} />

			<div className='user-details-box flex-1 flex flex-col justify-evenly gap-2'>
				<span className='user-details-nickname font-bold'>
					{user.nickname}
				</span>
			</div>

			<div
				className='user-icon-box w-8 h-8 flex items-center content-center'
				onClick={onIconClick}
			>
				{icon}
			</div>
		</div>
	)
}

export default UserListItem
