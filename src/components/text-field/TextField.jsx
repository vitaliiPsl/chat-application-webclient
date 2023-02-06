import './TextField.css'

const TextField = ({
	className = '',
	inputClassName = '',
	type = 'text',
	name,
	label,
	placeholder,
	required = false,
	autoComplete = false,
	onChange,
	reference,
}) => {
	return (
		<div className={`text-field ${className}`}>
			{label && <label htmlFor='field'>{label}</label>}

			<input
				type={type}
				name={name}
				id={`${name}-field`}
				className={`field ${inputClassName}`}
				placeholder={placeholder}
				required={required}
				autoComplete={autoComplete ? 'on' : 'off'}
				onChange={onChange}
				ref={reference}
			/>
		</div>
	)
}

export default TextField
