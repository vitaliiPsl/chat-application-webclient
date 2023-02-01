import './Navbar.css'

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
		<div className='navbar'>
			<div className='title-box'>
				<h1 className='title'>ChatApp</h1>
			</div>

			{user && (
				<Dropdown options={getDropdownOptions()}>
					<div className='profile-box'>
						<Avatar placeholder={user.nickname} />

						<div className='profile-nickname'>{user.nickname}</div>

						<div className='profile-dropdown-icon'>
							<MaterialIcon icon={'expand_more'} />
						</div>
					</div>
				</Dropdown>
			)}
		</div>
	)
}

export default Navbar
