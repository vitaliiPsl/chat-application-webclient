import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	chats: [],
	chat: null,
    member: null,
	members: null,
	messages: null,
}

export const chatsSlice = createSlice({
	name: 'chats',
	initialState,
	reducers: {
        setChats: (state, action) => {
            let chats = action.payload
            state.chats = chats
        },
		setChat: (state, action) => {
			let chat = action.payload
			state.chat = chat
		},
        setMember: (state, action) => {
            let member = action.payload
            state.member = member
        },
        setMembers: (state, action) => {
            let members = action.payload
            state.members = members
        },
        setMessages: (state, action) => {
            let messages = action.payload
            state.messages = messages
        },
        addMessage: (state, action) => {
            let message = action.payload
            let messagesCopy = state.messages

            state.messages = [message, ...messagesCopy]
        }
	},
})

export const { setChats, setChat, setMember, setMembers, setMessages, addMessage} = chatsSlice.actions
export default chatsSlice.reducer
