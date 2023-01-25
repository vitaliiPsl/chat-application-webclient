import './Button.css'

const Button = ({ className = '', children, type, onClick }) => {
	return (
		<button className={`btn ${className}`} type={type} onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
