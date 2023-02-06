const OuterBox = ({ children, className, direction = 'col' }) => {
	return (
		<div
			className={`outer-box ${className} p-4 flex flex-${direction} gap-4 bg-zinc-200 rounded-lg`}
		>
			{children}
		</div>
	)
}

export default OuterBox
