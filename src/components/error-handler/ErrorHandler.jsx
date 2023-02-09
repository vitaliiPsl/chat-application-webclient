import { Link } from 'react-router-dom'
import Button from '../button/Button'

const ErrorHandler = ({ error }) => {
	return (
		<div className='error-handler min-h-0 h-full flex-1 flex flex-col items-center justify-center gap-6'>
			<div className='error-code-box'>
				<span className='error-code text-7xl'>
					{error.code}
				</span>
			</div>
			<div className='error-message-box text-lg'>
				<span className='error-message'>{error.message}</span>
			</div>

			<div className='error-home-link-box'>
				<Button>
					<Link to={'/'} className={'h-full w-full'}>Go home</Link>
				</Button>
			</div>
		</div>
	)
}

export default ErrorHandler
