const Avatar = ({ size = 32, image, placeholder = 'avatar' }) => {
	let wrapperStyle = {
		height: size,
		width: size,
	}

	let placeholderStyle = {
		fontSize: size - size / 2,
	}

	return (
		<div
			className='avatar flex-shrink-0 flex items-center justify-center bg-zinc-800 text-white border-2 border-white rounded-full overflow-hidden'
			style={wrapperStyle}
		>
			{image && <img src={image} className={'w-full h-full object-cover'} />}

			{!image && (
				<span style={placeholderStyle}>
					{placeholder[0].toUpperCase()}
				</span>
			)}
		</div>
	)
}

export default Avatar
