import './TextField.css'

const TextField = ({
	type = 'text',
	name,
	label,
	placeholder,
	required = false,
	autoComplete = false,
	onChange,
}) => {
	return (
		<div className='text-field'>
			{label && <label htmlFor='field'>{label}</label>}

			<input
				type={type}
				name={name}
				id={`${name}-field`}
				className='field'
				placeholder={placeholder}
				required={required}
				autoComplete={autoComplete ? 'on' : 'off'}
				onChange={onChange}
			/>
		</div>
	)
}

export default TextField
