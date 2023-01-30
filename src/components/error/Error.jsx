import './Error.css'

import MaterialIcon from '../material-icon/MaterialIcon'

const Error = ({ message, onClose }) => {
	return (
		<div className='error'>
			<div className='error-message'>
				<p>{message}</p>
			</div>

			<div className='error-close-icon'>
				<MaterialIcon icon={'close'} onClick={onClose} />
			</div>
		</div>
	)
}

export default Error
