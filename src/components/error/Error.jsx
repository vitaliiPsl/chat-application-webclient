import MaterialIcon from '../material-icon/MaterialIcon'

const Error = ({ message, onClose }) => {
	return (
		<div className='error py-3 px-6 flex items-center justify-between border-1 border-red-700 rounded-lg'>
			<div className='error-message flex-1 text-center text-red-700'>
				<p>{message}</p>
			</div>

			<div className='error-close-icon w-8 h-8'>
				<MaterialIcon icon={'close'} onClick={onClose} />
			</div>
		</div>
	)
}

export default Error
