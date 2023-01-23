import { apiSlice } from '../../app/api'

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsersByNickname: builder.query({
			query: (nickname) => ({
				url: '/users',
				params: { nickname },
			}),
		}),
		getUserById: builder.query({
			query: (id) => ({
				url: `/users/${id}`,
			}),
		}),
	}),
})

export const { useLazyGetUsersByNicknameQuery, useGetUserByIdQuery } = usersApiSlice
