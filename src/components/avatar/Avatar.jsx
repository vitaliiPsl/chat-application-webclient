import './Avatar.css'

const Avatar = ({ size = 32, image, placeholder = 'avatar' }) => {
	let wrapperStyle = {
		height: size,
		width: size,
	}

	let placeholderStyle = {
		fontSize: size - size / 2,
	}

	return (
		<div className='avatar' style={wrapperStyle}>
			{image && <img src={image} />}

			{!image && (
				<span style={placeholderStyle}>
					{placeholder[0].toUpperCase()}
				</span>
			)}
		</div>
	)
}

export default Avatar
