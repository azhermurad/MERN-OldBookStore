// we have to create reducer for product
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    cardItems: [],
    loading: false,
    error: '',
    message: '',
    shippingAddress: {},
    paymentMethod: '',
};

export const fetchProductById = createAsyncThunk(
    'product/id',
    async ({ id, qty }, { rejectWithValue }) => {
        try {
            const response = await axios(`/api/products/${id}`);
            return { data: response.data, id, qty };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        removeCardItem: (state, { payload }) => {
            state.cardItems = state.cardItems.filter(
                (item) => item._id !== payload
            );
            localStorage.setItem('cardItem', JSON.stringify(state.cardItems));
        },
        EmptyCard: (state, { payload }) => {
            state.cardItems = []
            state.error = ''
            state.message = '';
            localStorage.removeItem('cardItem');
        },
        addShippingAddress: (state, { payload }) => {
            console.log('shipping address is store in localhost');
            state.shippingAddress = payload;
            localStorage.setItem(
                'shippingAddress',
                JSON.stringify(state.shippingAddress)
            );
        },
        addPaymentMethod: (state, { payload }) => {
            state.paymentMethod = payload;
            // localStorage.setItem(
            //     '',
            //     JSON.stringify(state.shippingAddress)
            // );
        },
        addItemsPrice: (state, { payload }) => {
            state.totalPrice = payload.totalPrice;
            state.taxPrice = payload.tax;
            state.itemsPrice = payload.itemsPrice;
            state.shippingPrice = (100).toFixed(2)
        },
    },
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
                qty: payload.qty,
            };

            if (checkItem) {
                state.cardItems = [
                    ...state.cardItems.map((x) =>
                        x._id === checkItem._id ? cardData : x
                    ),
                ];
            } else {
                state.message = 'Item is Add to Card';
                state.cardItems = [...state.cardItems, cardData];
            }
            localStorage.setItem('cardItem', JSON.stringify(state.cardItems));
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

export const {
    removeCardItem,
    addShippingAddress,
    addPaymentMethod,
    addItemsPrice,
    EmptyCard
} = cardSlice.actions;

export default cardSlice.reducer;
