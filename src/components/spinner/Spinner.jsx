import './Spinner.css'

const Spinner = ({
	size = 32,
	borderWeight = 4,
	color = '#212121',
}) => {
	return (
		<div
			className='spinner-wrapper'
			style={{
				height: `${size}px`,
				width: `${size}px`,
			}}
		>
			<div className='spinner' style={{
                borderColor: color,
                borderWidth: borderWeight,
                borderRightColor: '#0000'
            }}></div>
		</div>
	)
}

export default Spinner
