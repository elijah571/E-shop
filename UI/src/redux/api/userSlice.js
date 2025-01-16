import { USER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //login
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        //logout
        logout: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/logout`,
                method: 'POST',
                body: data,
            }),
        }),
        //signup
        signup: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/signup`,
                method: 'POST',
                body: data,
            }),
        }),
        //get profile
        getProfile: builder.query({
            query: () => ({
                url: `${USER_URL}/profile`,
            }),
            providesTags: ['UserProfile'],
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['UserProfile'],
        }),
        getUser: builder.query({
            query: (id) => ({
                url: `${USER_URL}/profile/${id}`,
            }),
            providesTags: ['User'],
        }),
        updateUserById: builder.mutation({
            query: ({ id, data }) => ({
                url: `${USER_URL}/profile/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/profile/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: `${USER_URL}/allusers`,
            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5,
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useSignupMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useGetUserQuery,
    useUpdateUserByIdMutation,
    useDeleteUserMutation,
    useGetAllUsersQuery,
} = userApiSlice;
