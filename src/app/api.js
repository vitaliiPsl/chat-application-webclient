import {
	createApi,
	fetchBaseQuery,
	fetchQuery,
} from '@reduxjs/toolkit/query/react'

import { logout } from '../features/auth/authSlice'

const SERVER_URL = 'http://localhost:8080/api'

const baseQuery = fetchBaseQuery({
	baseUrl: SERVER_URL,
	prepareHeaders: (headers, { getState }) => {
        let token = getState().auth.token

        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }

        return headers
    },
})

const baseQueryWrapper = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 401) {
        api.dispatch(logout())
    }

    return result
}

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWrapper,
    endpoints: builder => ({})
})