import { useState } from 'react'

import DropdownOption from './DropdownOption'

const Dropdown = ({ options, children }) => {
	const [isOpen, setOpen] = useState(false)

	const mapDropdownOptions = () => {
		return [...options].map((option, index) => (
			<DropdownOption
				option={option[0]}
				onClick={option[1]}
				key={index}
			/>
		))
	}

	return (
		<div
			className='dropdown relative'
			onClick={() => setOpen((isOpen) => !isOpen)}
		>
			<div className='dropdown-content-box w-fit h-fit'>{children}</div>

			{isOpen && (
				<div
					className={`dropdown-options-box absolute top-full right-0 z-10 min-w-40 w-full p-1 bg-white text-zinc-800 rounded-lg shadow-2xl`}
				>
					<div className='dropdown-options-list flex flex-col'>
						{mapDropdownOptions()}
					</div>
				</div>
			)}
		</div>
	)
}

export default Dropdown
