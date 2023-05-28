import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    order: null,
    orderPayment: null,
    orderDeliverd: null,
    loading: false,
    myOrders: null,
    message: '',
    error: '',
    adminOrders: null,
};

export const orderSlice = createSlice({
    name: 'Order',
    initialState,
    reducers: {
        orderLoading: (state) => {
            state.loading = true;
        },
        orderCreate: (state, { payload }) => {
            const { data, message, status } = payload;
            state.loading = false;
            if (status === 'Success') {
                state.order = data;
                state.message = message;
                state.error = '';
                return;
            } else {
                if (status === 'Error' && !data) {
                    state.error = message;
                    state.message = '';
                    return;
                }
                state.error = 'Something Went Wrong! Try Again';
                state.message = '';
            }
        },
        resetPayment: (state) => {
            state.order = null;
            state.orderPayment = null;
            state.orderDeliverd= null;
            state.loading = false;
            state.message = '';
            state.error = '';
        },
        resetOrder: (state) => {
            state.order = null;
            state.orderPayment = null;
            state.loading = false;
            state.message = '';
            state.myOrders = null;
            state.error = '';
        },
        getOrder: (state, { payload }) => {
            const { data, message, status } = payload;
            state.loading = false;
            if (status === 'Success') {
                state.order = data;
                state.message = message;
                state.error = '';
                return;
            } else {
                if (status === 'Error' && !data) {
                    state.error = message;
                    state.message = '';
                    return;
                }
                state.error = 'Something Went Wrong! Try Again';
                state.message = '';
            }
        },
        orderDelte: (state, { payload }) => {
            const { data, message, status } = payload;
            state.loading = false;
            console.log("Dataaaa",data)
            if (status === 'Success') {
                const del = state.myOrders.filter((ord)=>ord._id !==data._id)
                state.myOrders = del;
                state.error = '';
                return;
            } else {
                if (status === 'Error' && !data) {
                    state.error = message;
                    state.message = '';
                    return;
                }
                state.error = 'Something Went Wrong! Try Again';
                state.message = '';
            }
        },
        orderPayment: (state, { payload }) => {
            const { data, message, status } = payload;
            state.loading = false;
            if (status === 'Success') {
                state.orderPayment = data;
                state.message = message;
                state.error = '';
                return;
            } else {
                if (status === 'Error' && !data) {
                    state.error = message;
                    state.message = '';
                    return;
                }
                state.error = 'Something Went Wrong! Try Again';
                state.message = '';
            }
        },
        orderDelivered: (state, { payload }) => {
            const { data, message, status } = payload;
            state.loading = false;
            if (status === 'Success') {
                state.orderDeliverd = data;
                state.message = message;
                state.error = '';
                return;
            } else {
                if (status === 'Error' && !data) {
                    state.error = message;
                    state.message = '';
                    return;
                }
                state.error = 'Something Went Wrong! Try Again';
                state.message = '';
            }
        },
        getUserOrders: (state, { payload }) => {
            const { data, message, status } = payload;
            state.loading = false;
            if (status === 'Success') {
                state.myOrders = data;
                state.message = '';
                state.error = '';
                return;
            } else {
                if (status === 'Error' && !data) {
                    state.error = message;
                    state.message = '';
                    return;
                }
                state.error = 'Something Went Wrong! Try Again';
                state.message = '';
            }
        },
        getAdminOrders: (state, { payload }) => {
            const { data, message, status } = payload;
            state.loading = false;
            if (status === 'Success') {
                state.adminOrders = data;
                state.message = '';
                state.error = '';
                return;
            } else {
                if (status === 'Error' && !data) {
                    state.error = message;
                    state.message = '';
                    return;
                }
                state.error = 'Something Went Wrong! Try Again';
                state.message = '';
            }
        },
    },
});

export const {
    orderLoading,
    orderCreate,
    getOrder,
    orderPayment,
    orderDelivered,
    resetPayment,
    getUserOrders,
    resetOrder,
    getAdminOrders,
    orderDelte
} = orderSlice.actions;

export const createOrder = (data) => async (dispatch, getState) => {
    dispatch(orderLoading());
    try {
        const { token } = getState().userState.user;
        console.log('order is created!', getState());
        const response = await axios({
            method: 'post',
            url: '/api/order',
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(orderCreate(response.data));
    } catch (error) {
        dispatch(orderCreate(error.response.data));
    }
};

export const getOrderById = (id) => async (dispatch, getState) => {
    console.log('getordrbyid', id);
    dispatch(orderLoading());
    try {
        const { token } = getState().userState.user;
        const response = await axios({
            method: 'get',
            url: `/api/order/${id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('getOrderBy its id:', response.data);
        dispatch(getOrder(response.data));
    } catch (error) {
        dispatch(getOrder(error.response.data));
    }
};

export const updateOrderPay =
    (orderId, paymentResult) => async (dispatch, getState) => {
        dispatch(orderLoading());
        try {
            const { token } = getState().userState.user;
            console.log('order is created!', getState());
            const response = await axios({
                method: 'put',
                url: `/api/order/${orderId}/pay`,
                data: JSON.stringify(paymentResult),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(orderPayment(response.data));
        } catch (error) {
            dispatch(orderPayment(error.response.data));
        }
    };

    export const updateOrderDelivered =
    (orderId) => async (dispatch, getState) => {
        dispatch(orderLoading());
        try {
            const { token } = getState().userState.user;
            const response = await axios({
                method: 'put',
                url: `/api/order/${orderId}/delivered`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch(orderDelivered(response.data));
        } catch (error) {
            dispatch(orderDelivered(error.response.data));
        }
    };
export const getUserOrderList = () => async (dispatch, getState) => {
    dispatch(orderLoading());
    try {
        const { token } = getState().userState.user;
        const response = await axios({
            method: 'get',
            url: `/api/order/myorders`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(getUserOrders(response.data));
    } catch (error) {
        dispatch(getUserOrders(error.response.data));
    }
};

export const getOrderListByAdmin = () => async (dispatch, getState) => {
    dispatch(resetOrder());
    dispatch(orderLoading());
    try {
        const { token } = getState().userState.user;
        const response = await axios({
            method: 'get',
            url: `/api/orders`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(getAdminOrders(response.data));
    } catch (error) {
        dispatch(getAdminOrders(error.response.data));
    }
};


export const deleteOrder = (id) => async (dispatch, getState) => {
    dispatch(orderLoading());
    try {
        const { token } = getState().userState.user;
        const response = await axios({
            method: 'delete',
            url: `/api/order/${id}/delete`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        dispatch(orderDelte(response.data));
    } catch (error) {
        dispatch(orderDelte(error.response.data));
    }
};

export default orderSlice.reducer;
