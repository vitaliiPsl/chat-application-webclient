import { apiSlice } from '../../app/api'

export const chatsApiReducer = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getChats: builder.query({
			query: () => '/chats',
			providesTags: ['Chats'],
		}),
		getChat: builder.query({
			query: (id) => `/chats/${id}`,
			providesTags: ['Chat'],
		}),
		createChat: builder.mutation({
			query: (chatDetails) => ({
				url: '/chats',
				method: 'post',
				body: chatDetails,
			}),
			invalidatesTags: ['Chats'],
		}),
		updateChat: builder.mutation({
			query: (args) => ({
				url: `/chats/${args.chatId}`,
				method: 'put',
				body: args.payload,
			}),
			invalidatesTags: ['Chat'],
		}),
		deleteChat: builder.mutation({
			query: (chatId) => ({
				url: `/chats/${chatId}`,
				method: 'delete',
			}),
            invalidatesTags: ['Chats']
		}),
		getChatMember: builder.query({
			query: (args) => `/chats/${args.chatId}/members/${args.userId}`,
		}),
		getChatMembers: builder.query({
			query: (id) => `/chats/${id}/members`,
			providesTags: ['Members'],
		}),
		addChatMember: builder.mutation({
			query: (args) => ({
				url: `/chats/${args.chatId}/members`,
				method: 'post',
				body: args.payload,
			}),
			invalidatesTags: ['Members'],
		}),
		removeChatMember: builder.mutation({
			query: (args) => ({
				url: `/chats/${args.chatId}/members/${args.userId}`,
				method: 'delete',
			}),
			invalidatesTags: ['Members', 'Chats'],
		}),
		getChatMessages: builder.query({
			query: (id) => `/chats/${id}/messages`,
			providesTags: ['Messages'],
		}),
		// TODO: remove after ws connection is implemented
		sendMessage: builder.mutation({
			query: (args) => ({
				url: `/chats/${args.id}/messages`,
				method: 'post',
				body: args.message,
			}),
		}),
	}),
})

export const {
	useGetChatsQuery,
	useGetChatQuery,
	useCreateChatMutation,
	useUpdateChatMutation,
    useDeleteChatMutation,
	useGetChatMemberQuery,
	useGetChatMembersQuery,
	useAddChatMemberMutation,
	useRemoveChatMemberMutation,
	useGetChatMessagesQuery,
	useSendMessageMutation,
} = chatsApiReducer
