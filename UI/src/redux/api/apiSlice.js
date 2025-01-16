import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', // Include cookies with the request
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Product', 'Order', 'Category', 'User'],
    endpoints: () => ({}),
});
