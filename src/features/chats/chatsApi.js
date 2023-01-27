import { apiSlice } from '../../app/api'

export const chatsApiReducer = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getChats: builder.query({
			query: () => '/chats',
		}),
		getChat: builder.query({
			query: (id) => `/chats/${id}`,
		}),
		getChatMessages: builder.query({
			query: (id) => `/chats/${id}/messages`,
		}),
        // TODO: remove after ws connection is implemented
		sendMessage: builder.mutation({
			query: (args) => ({
				url: `/chats/${args.id}/messages`,
				method: 'post',
				body: args.message,
			}),
		}),
		createChat: builder.mutation({
			query: (chatDetails) => ({
				url: '/chats',
				method: 'post',
				body: chatDetails,
			}),
		}),
	}),
})

export const {
	useGetChatsQuery,
	useGetChatQuery,
	useGetChatMessagesQuery,
	useSendMessageMutation,
	useCreateChatMutation,
} = chatsApiReducer
