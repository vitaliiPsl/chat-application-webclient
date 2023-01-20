import './Navbar.css'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setUser, logout } from '../../features/auth/authSlice'
import { useGetAuthenticatedUserQuery } from '../../features/auth/authApi'

const Navbar = ({ ...rest }) => {
    const [open, setOpen] = useState(false)

	const { user, token } = useSelector((state) => state.auth)

	const { data, error, isLoading } = useGetAuthenticatedUserQuery(null, {
		skip: !token,
	})

	const dispatch = useDispatch()

	useEffect(() => {
		console.log(token)
		if (data) {
			console.log('Data')
			console.log(data)
			dispatch(setUser(data))
		}
		if (error) {
			console.log('Error')
			handleUserError(error)
		}
	}, [data, error])

	const handleUserError = (error) => {
		console.log(error)
	}

	const logOut = () => {
		dispatch(logout())
	}

	return (
		<div className='navbar'>
			<div className='title-box'>
				<h1 className='title'>ChatApp</h1>
			</div>

			{user && (
				<div className='profile-box' onClick={() => setOpen(open => !open)}>
					<div className='profile-avatar'>
						<span>{user.nickname[0].toUpperCase()}</span>
					</div>

					<div className='profile-nickname'>{user.nickname}</div>

                    <div className="dropdown-icon">
                        +
                    </div>

					<div className={`dropdown-box ${open ? 'open' : ''} profile-links-box`}>
						<li className='dropdown-link profile-link preferences-link' onClick={logOut}>
							Preferences
						</li>
                        <li className='dropdown-link profile-link logout-link' onClick={logOut}>
							Log out
						</li>
					</div>
				</div>
			)}
		</div>
	)
}

export default Navbar
