import { configureStore } from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import chatsReducer from '../features/chats/chatsSlice'

import { apiSlice } from './api'

export default configureStore({
	reducer: {
		auth: authReducer,
        chats: chatsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
	},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})
