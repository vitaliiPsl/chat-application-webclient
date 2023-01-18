import { createSlice } from '@reduxjs/toolkit'

export const TOKEN_KEY = 'token'

const token = localStorage.getItem(TOKEN_KEY)

const initialState = {
	token,
	user: null,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken: (state, action) => {
			let token = action.payload
			state.token = token

			localStorage.setItem(TOKEN_KEY, token)
		},
		setUser: (state, action) => {
			let user = action.payload
			state.user = user
		},
		logout: (state) => {
			state.user = null
			state.token = null

			localStorage.removeItem(TOKEN_KEY)
		},
	},
})

export const { setToken, setUser, logout } = authSlice.actions

export default authSlice.reducer