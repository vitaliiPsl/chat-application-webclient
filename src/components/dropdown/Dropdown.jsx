import { useState } from 'react'
import './Dropdown.css'

import DropdownOption from './DropdownOption'

const Dropdown = ({ content, options }) => {
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
		<div className='dropdown' onClick={() => setOpen((isOpen) => !isOpen)}>
			<div className='dropdown-content-box'>{content}</div>

			<div className={`dropdown-options-box ${isOpen ? 'open' : ''}`}>
				<div className='dropdown-options-list'>
					{mapDropdownOptions()}
				</div>
			</div>
		</div>
	)
}

export default Dropdown
