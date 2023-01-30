const DropdownOption = ({ option, onClick }) => {
	return (
		<div className='dropdown-option' onClick={onClick}>
			<span>{option}</span>
		</div>
	)
}

export default DropdownOption
