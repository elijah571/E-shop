import { USER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
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
        
    }),
});

// Correctly destructuring the mutation
export const {
    useLoginMutation,
    useLogoutMutation,
    useSignupMutation,
    useProfileMutation
}
 = userApiSlice;
