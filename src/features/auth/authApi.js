import { apiSlice } from '../../app/api'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: (credentials) => ({
                url: '/auth/signin',
                method: 'post',
                body: credentials
            }),
        }),
        signUp: builder.mutation({
            query: (user) => ({
                url: '/auth/signup',
                method: 'post',
                body: user
            }),
        }),
        getAuthenticatedUser: builder.query({
            query: () => '/auth/me',
        }),
    })
})

export const {
	useSignInMutation,
	useSignUpMutation,
	useGetAuthenticatedUserQuery,
} = authApiSlice