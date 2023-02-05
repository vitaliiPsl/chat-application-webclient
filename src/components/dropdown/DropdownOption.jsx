const DropdownOption = ({ option, onClick }) => {
	return (
		<div
			className='dropdown-option capitalize p-2 border-b border-b-zinc-800 last:border-0 hover:text-white hover:bg-zinc-800 cursor-pointer duration-500'
			onClick={onClick}
		>
			<span>{option}</span>
		</div>
	)
}

export default DropdownOption
