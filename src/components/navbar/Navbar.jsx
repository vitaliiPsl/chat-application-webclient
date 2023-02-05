import { useDispatch } from 'react-redux'

import { logout } from '../../features/auth/authSlice'

import Avatar from '../avatar/Avatar'
import Dropdown from '../dropdown/Dropdown'
import MaterialIcon from '../material-icon/MaterialIcon'

const Navbar = ({ user }) => {
	const dispatch = useDispatch()

	const logOut = () => {
		dispatch(logout())
	}

	const getDropdownOptions = () => {
		let options = new Map()
		options.set('Log out', () => logOut())

		return options
	}

	return (
		<div className='navbar w-full min-h-12 p-1 flex items-center justify-between text-white bg-zinc-800'>
			<div className='title-box p-1 text-xl font-bold'>
				<h1 className='title'>ChatApp</h1>
			</div>

			{user && (
				<Dropdown options={getDropdownOptions()}>
					<div className='profile-box h-full min-w-40 py-1 flex items-center justify-around gap-2 text-zinc-800 bg-white rounded-lg cursor-pointer'>
						<Avatar placeholder={user.nickname} />

						<div className='profile-nickname'>{user.nickname}</div>

						<div className='profile-dropdown-icon w-8 h-8'>
							<MaterialIcon icon={'expand_more'} />
						</div>
					</div>
				</Dropdown>
			)}
		</div>
	)
}

export default Navbar
