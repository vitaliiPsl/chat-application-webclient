const OuterBox = ({ children, className }) => {
	return (
		<div
			className={`outer-box p-4 flex flex-col gap-4 bg-zinc-600 rounded-lg ${className}`}
		>
			{children}
		</div>
	)
}

export default OuterBox
