import { apiSlice } from '../../app/api'

export const chatsApiReducer = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getChats: builder.query({
			query: () => '/chats',
		}),
		getChatById: builder.query({
			query: (id) => `/chats/${id}`,
		}),
        createChat: builder.mutation({
            query: chatDetails => ({
                url: '/chats',
                method: 'post',
                body: chatDetails
            })
        }),
	}),
})

export const { useGetChatsQuery, useGetChatByIdQuery, useCreateChatMutation } = chatsApiReducer
