import { CATEGORY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Create a category
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: `${CATEGORY_URL}/create`,
                method: 'POST',
                body: newCategory,
            }),
        }),

        // Get all categories
        getAllCategories: builder.query({
            query: () => ({
                url: `${CATEGORY_URL}/`,
                method: 'GET',
            }),
        }),

        // Get category by ID
        getCategoryById: builder.query({
            query: (id) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: 'GET',
            }),
        }),

       // Update category by ID
updateCategory: builder.mutation({
    query: ({ id, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: 'PUT',
        body: updatedCategory,
    }),
}),

        // Delete category by ID
        deleteCategoryById: builder.mutation({
            query: (id) => ({
                url: `${CATEGORY_URL}/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useCreateCategoryMutation,
    useGetAllCategoriesQuery,
    useGetCategoryByIdQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryByIdMutation,
} = categoryApiSlice;
