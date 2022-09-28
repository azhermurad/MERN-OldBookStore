// we have to create reducer for product
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    product: {},
    loading: false,
    error: '',
    message: '',
};
// First, create the thunk
export const fetchProductDetails = createAsyncThunk(
    'fetchProductDetails/By/ID',
    async (args, { rejectWithValue }) => {
        try {
            const response = await axios(`/api/products/${args}`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchProductDetails.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchProductDetails.fulfilled, (state, { payload }) => {
            state.loading = false;

            if (payload.status === 'Success' && !payload.data) {
                state.message = payload.message;
                return;
            }
            state.product = payload.data || [];
        });
        builder.addCase(fetchProductDetails.rejected, (state, { payload }) => {
            state.loading = false;
            if (payload.status === 'Error' && !payload.data) {
                state.error = payload.message;
                return;
            }
            state.error = 'Something Went Wrong! Try Again';
        });
    },
});

export default productDetailSlice.reducer;
