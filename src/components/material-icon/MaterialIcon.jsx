import './MaterialIcon.css'

const MaterialIcon = ({ icon, onClick }) => {
	return (
		<div className='material-icon' onClick={onClick}>
			<span className='material-symbols-outlined'>{icon}</span>
		</div>
	)
}

export default MaterialIcon
