import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    chat,
	chats: [],
}

export const chatsSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
        setChat: (state, chats) => {
            let chat = action.payload
            state.chat = chat
        },
		setChats: (state, action) => {
			let chats = action.payload
			state.chats = chats
		},
	},
})

export const { setChat, setChats } = chatsSlice.actions
export default chatsSlice.reducer
