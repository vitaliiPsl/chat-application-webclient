import './Navbar.css'

import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { logout } from '../../features/auth/authSlice'

import Avatar from '../avatar/Avatar'

const Navbar = ({ user, ...rest }) => {
	const [open, setOpen] = useState(false)

	const dispatch = useDispatch()

	const logOut = () => {
		dispatch(logout())
	}

	return (
		<div className='navbar'>
			<div className='title-box'>
				<h1 className='title'>ChatApp</h1>
			</div>

			{user && (
				<div
					className='profile-box'
					onClick={() => setOpen((open) => !open)}
				>
					<Avatar placeholder={user.nickname} />

					<div className='profile-nickname'>{user.nickname}</div>

					<div className='dropdown-icon'>+</div>

					<div
						className={`dropdown-box ${
							open ? 'open' : ''
						} profile-links-box`}
					>
						<li
							className='dropdown-link profile-link preferences-link'
							onClick={logOut}
						>
							Preferences
						</li>
						<li
							className='dropdown-link profile-link logout-link'
							onClick={logOut}
						>
							Log out
						</li>
					</div>
				</div>
			)}
		</div>
	)
}

export default Navbar
