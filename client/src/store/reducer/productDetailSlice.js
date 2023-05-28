// we have to create reducer for product
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    product: {},
    loading: false,
    error: '',
    message: '',
    reviewSuccess: false,
    reviewLoading:false,
    reviewError: '',
    reviewMessage: ''
};
// First, create the thunk
export const fetchProductDetails = createAsyncThunk(
    'fetchProductDetails/By/ID',
    async (args, { rejectWithValue }) => {
        try {
            const response = await axios(`/api/products/${args}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createReview = createAsyncThunk(
    'crearteReview/By/ID',
    async (args, { rejectWithValue,getState }) => {
        const { token } = getState().userState.user;
        try {
            const response = await axios({
                method: "post",
                url: `/api/product/${args.id}/review`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify({
                    rating: Number(args.rating),
                    comment: args.comment
                })
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
        resetResetProductDetail: (state) => {
            state.product = {};
            state.loading = false;
            state.error = '';
            state.message = '';
            state.reviewSuccess=false;
            state.reviewLoading= false;
            state.reviewError=''
            state.reviewMessage =''
        },
    },
    extraReducers: (builder) => {
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






        builder.addCase(createReview.pending, (state, action) => {
            state.reviewLoading = true;
        });
        builder.addCase(createReview.fulfilled, (state, { payload }) => {
            state.reviewLoading = false;

            if (payload.status === 'Success' && !payload.data) {
                state.reviewMessage = payload.message;
                return;
            }
            state.reviewSuccess = true;
        });
        builder.addCase(createReview.rejected, (state, { payload }) => {
            state.reviewLoading = false;
            if (payload.status === 'Error' && !payload.data) {
                state.reviewError = payload.message;
                return;
            }
            state.reviewMessage = 'Something Went Wrong! Try Again';
        });
    },
});

export const { resetResetProductDetail } = productDetailSlice.actions;

export default productDetailSlice.reducer;
