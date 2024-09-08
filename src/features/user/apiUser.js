import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://indoteknikserver-732012365989.herokuapp.com/' }),
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3100/', prepareHeaders: (headers, { getState }) => {
      headers.set('access_token', localStorage.access_token)
      return headers
    }
  }),
  tagTypes: ['Post', 'Get'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (user) => ({
        url: 'users/login',
        method: 'POST',
        body: user,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }),
      invalidatesTags: ['Post']
    }),
    register: builder.mutation({
      query: (user) => ({
        url: 'users/register',
        method: 'POST',
        body: user,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }),
    }),
    getMe: builder.query({
      query: () => "users/me",
      providesTags: ['Post']
    }),
    editMe: builder.mutation({
      query: (updatedUserData) => ({
        url: 'users/me', // URL untuk mengedit profil pengguna
        method: 'PUT', // Gunakan metode PUT untuk mengganti data profil
        body: updatedUserData, // Data yang akan dikirim dalam permintaan
      }),
      invalidatesTags: ['Post']
    }),
    incrementPurchasePoints: builder.mutation({
      query: ({ id, incrementValue }) => ({
        url: `users/incrementPurchasePoints/${id}`,
        method: 'PUT',
        body: { incrementValue },
      }),
    }),
  })
})

export const {
  useEditMeMutation,
  useGetMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useIncrementPurchasePointsMutation,
} = usersApi