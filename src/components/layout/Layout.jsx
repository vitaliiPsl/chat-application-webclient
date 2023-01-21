import './Layout.css'

const Layout = ({ sidePane, content }) => {
	return (
		<div className='layout'>
			<div className='side-pane-box'>
                {sidePane}
            </div>
			<div className='content-box'>
                {content}
            </div>
		</div>
	)
}

export default Layout
