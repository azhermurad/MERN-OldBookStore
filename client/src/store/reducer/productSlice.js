// we have to create reducer for product
import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    prodcuts: [],
    loading: false,
    error: '',
    message: '',
    value: 0,
};
// First, create the thunk
export const fetchAllPosts = createAsyncThunk(
    'users/fetchByIdStatus',
    async (args, { rejectWithValue }) => {
        try {
            const response = await axios('api/products');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.value += action.payload;
            
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchAllPosts.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchAllPosts.fulfilled, (state, { payload }) => {
            state.loading = false;

            if (payload.status === 'Success' && !payload.data) {
                state.message = payload.message;
                return;
            }
            state.prodcuts = payload.data || [];
        });
        builder.addCase(fetchAllPosts.rejected, (state, { payload }) => {
            console.log(payload)
            state.loading = false;
            if (payload.status === 'Error' && !payload.data) {
                state.error = payload.message;
                return;
            }
            state.error = 'Something Went Wrong! Try Again';
        });
    },
});
// Action creators are generated for each case reducer function

export const { increment } = productSlice.actions;

export default productSlice.reducer;
