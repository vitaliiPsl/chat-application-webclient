import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	chat: null,
	messages: null,
	chats: [],
}

export const chatsSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
		setChat: (state, action) => {
			let chat = action.payload
			state.chat = chat
		},
		setMessages: (state, action) => {
			let messages = action.payload
			state.messages = messages
		},
		setChats: (state, action) => {
			let chats = action.payload
			state.chats = chats
		},
	},
})

export const { setChat, setMessages, setChats } = chatsSlice.actions
export default chatsSlice.reducer
