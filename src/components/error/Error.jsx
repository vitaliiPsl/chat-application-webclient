import './Error.css'

const Error = ({ message, onClose }) => {
	return (
		<div className='error'>
			<div className='error-message'>{message}</div>

			<div className='close-btn' onClick={onClose}>
				<span className='material-symbols-outlined'>close</span>
			</div>
		</div>
	)
}

export default Error
