import Layout from '../../components/layout/Layout'
import ChatsList from '../../components/chats/chats-list/ChatsList'

import { Outlet } from 'react-router-dom'

const ChatsLayoutPage = () => {
	return <Layout sidePane={<ChatsList />} content={<Outlet />} />
}

export default ChatsLayoutPage
