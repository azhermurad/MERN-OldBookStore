// we have to create reducer for product
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    cardItems: [],
    loading: false,
    error: '',
    message: '',
};

export const fetchProductById = createAsyncThunk(
    'product/id',
    async ({ id, qty }, { rejectWithValue }) => {
        try {
            const response = await axios(`/api/products/${id}`);
            console.log(response.data)
            return { data: response.data, id, qty };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const cardSlice = createSlice({
    name: 'card',
    initialState,
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed

        builder.addCase(fetchProductById.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchProductById.fulfilled, (state, { payload }) => {
            state.loading = false;
            if (payload.data.status === 'Success' && !payload.data.data) {
                state.message = payload.data.message;
                return;
            }
            const checkItem = current(state).cardItems.find(
                (a) => a._id === payload.data.data._id
            );
            const cardData = {
                ...payload.data.data,
                qyt: payload.qty
            }
            if(!checkItem){
                state.message = "Item is Add to Card"
                state.cardItems = [...state.cardItems,cardData]
            }
            localStorage.setItem("cardItem",JSON.stringify(state.cardItems))
        });
        builder.addCase(fetchProductById.rejected, (state, { payload }) => {
            state.loading = false;
            if (payload.data.status === 'Error' && !payload.data.data) {
                state.error = payload.data.message;
                return;
            }
            state.error = 'Something Went Wrong! Try Again';
        });
    },
});

export default cardSlice.reducer;
