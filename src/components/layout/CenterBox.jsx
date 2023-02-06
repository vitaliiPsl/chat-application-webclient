const CenterBox = ({ children, className }) => {
	return (
		<div
			className={`center-box p-2 flex-1 flex items-center justify-center text-center ${className}`}
		>
			{children}
		</div>
	)
}

export default CenterBox
