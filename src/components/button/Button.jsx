const Button = ({ className = '', children, type, onClick }) => {
	return (
		<button
			className={`btn ${className} min-w-40 w-full px-3 py-2 flex items-center justify-center text-base bg-white text-zinc-800 border border-zinc-800 rounded-md cursor-pointer duration-500 hover:text-white hover:bg-zinc-800`}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default Button
