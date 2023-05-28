// we have to create reducer for product
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    prodcuts: [],
    topProducts:[],
    createProduct: null,
    updateProduct: null,
    page:1,
    pages:1,
    loading: false,
    error: '',
    message: '',
   
    value: 0,
};
// First, create the thunk
export const fetchAllPosts = createAsyncThunk(
    'users/fetchByIdStatus',
    async ({keyword,pageNumber}, { rejectWithValue }) => {
        console.log(keyword)
        try {
            const response = await axios(`http://localhost:5000/api/products?search=${keyword}&pageNumber=${pageNumber}`);
            return response.data;
            
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'delete/product',
    async (args, { rejectWithValue, getState }) => {
        console.log(getState(),"ddddddddddddddddddddddddd");
        try {
            const { token } = getState().userState.user;
            const response = await axios({
                method: 'delete',
                url: 'http://localhost:5000/api/product/' + args,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createProduct = createAsyncThunk(
    'create/product',
    async (args, { rejectWithValue, getState }) => {
        console.log(args);
        try {
            const { token } = getState().userState.user;
            const response = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/product/',
                data: {},
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const updateProduct = createAsyncThunk(
    'update/product',
    async (args, { rejectWithValue, getState }) => {
        try {
            const { token } = getState().userState.user;
            const response = await axios({
                method: 'put',
                url: 'http://localhost:5000/api/product/'+ args._id,
                data: args.formData,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const fetchTop = createAsyncThunk(
    'product/fetchtop',
    async (args, { rejectWithValue }) => {
        try {
            const response = await axios(`http://localhost:5000/api/products/top`);
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
        resetCreateProduct: (state) => {
            state.createProduct = null;
            state.updateProduct=null
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchAllPosts.pending, (state, action) => {
            state.loading = true;
            state.prodcuts = [];
            state.createProduct=null
            state.error = '';
            state.message = '';
        });
        builder.addCase(fetchAllPosts.fulfilled, (state, { payload }) => {
            state.loading = false;

            if (payload.status === 'Success' && !payload.data) {
                state.message = payload.message;
                return;
            }
            state.prodcuts = payload.data || [];
            state.page = payload.page;
            state.pages= payload.pages;
        });
        builder.addCase(fetchAllPosts.rejected, (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            if (payload?.status === 'Error' && !payload.data) {
                state.error = payload.message;
                return;
            }
            state.error = 'Something Went Wrong! Try Again';
        });

        // fetch top products
        builder.addCase(fetchTop.pending, (state, action) => {
            state.loading = true;
            state.error = '';
            state.message = '';
        });
        builder.addCase(fetchTop.fulfilled, (state, { payload }) => {
            state.loading = false;

            if (payload.status === 'Success' && !payload.data) {
                state.message = payload.message;
                return;
            }
            state.topProducts = payload.data || [];
            
        });
        builder.addCase(fetchTop.rejected, (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            if (payload?.status === 'Error' && !payload.data) {
                state.error = payload.message;
                return;
            }
            state.error = 'Something Went Wrong! Try Again';
        });





        // delete Product By Admin
        builder.addCase(deleteProduct.pending, (state, action) => {
            state.loading = true;
            state.error = '';
            state.message = '';
        });
        builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
            state.loading = false;

            if (payload.status === 'Success' && !payload.data) {
                state.message = payload.message;
                return;
            }
            console.log('delted', payload.data);
            console.log(state,"SDAFGdsf")
            state.prodcuts = state.prodcuts.filter(
                (product) => product._id !== payload.data._id
            );
        });
        builder.addCase(deleteProduct.rejected, (state, { payload }) => {
            state.loading = false;
            if (payload.status === 'Error' && !payload.data) {
                state.error = payload.message;
                return;
            }
            state.error = 'Something Went Wrong! Try Again';
        });



        builder.addCase(createProduct.pending, (state, action) => {
            state.loading = true;
            state.error = '';
            state.message = '';
        });
        builder.addCase(createProduct.fulfilled, (state, { payload }) => {
            state.loading = false;

            if (payload.status === 'Success' && !payload.data) {
                state.message = payload.message;
                return;
            }
            console.log(payload.data,"dsfgdh")
            state.createProduct = payload.data;
        });
        builder.addCase(createProduct.rejected, (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            if (payload.status === 'Error' && !payload.data) {
                state.error = payload.message;
                return;
            }
            state.error = 'Something Went Wrong! Try Again';
        });



        // update product
        builder.addCase(updateProduct.pending, (state, action) => {
            state.loading = true;
            state.error = '';
            state.message = '';
        });
        builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
            state.loading = false;

            if (payload.status === 'Success' && !payload.data) {
                state.message = payload.message;
                return;
            }
            console.log(payload.data)
            state.updateProduct = true
        });
        builder.addCase(updateProduct.rejected, (state, { payload }) => {
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

export const { increment,resetCreateProduct } = productSlice.actions;

export default productSlice.reducer;
