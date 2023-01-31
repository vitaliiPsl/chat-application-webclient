import Layout from '../../components/layout/Layout'
import Chats from '../../components/chats/Chats'

import { Outlet } from 'react-router-dom'

const ChatsLayoutPage = () => {
	return <Layout sidePane={<Chats />} content={<Outlet />} />
}

export default ChatsLayoutPage
