const InnerBox = ({ children, className }) => {
	return (
		<div
			className={`inner-box p-3 flex flex-col gap-2 bg-white rounded-lg ${className}`}
		>
			{children}
		</div>
	)
}

export default InnerBox
