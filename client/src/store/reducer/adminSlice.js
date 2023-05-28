import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null,
    userList: null,
    loading: false,
    message: '',
    error: '',
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminLoading: (state) => {
            state.loading = true;
            state.message = '';
            state.error = '';
        },

        userList(state, { payload }) {
            const { data, message, status } = payload;
            state.loading = false;
            if (status === 'Success') {
                state.userList = data;
                state.error = '';
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
        getUser(state, { payload }) {
            const { data, message, status } = payload;
            state.loading = false;
            if (status === 'Success') {
                state.user = data;
                state.error = '';
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
        UserDelete(state, { payload }) {
            const { data, message, status } = payload;
            state.loading = false;
            console.log(data);
            if (status === 'Success') {
                state.userList = state.userList.filter(
                    (user) => user._id !== data._id
                );
                state.error = '';
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
        updateUser(state, { payload }) {
            const { data, message, status } = payload;
            state.loading = false;
            if (status === 'Success') {
                state.user = data;
                state.error = '';
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
        userListReset: (state) => {
            state.userList = null;
            state.error = '';
            state.message = '';
        },
    },
    // extraReducers:{

    // }
});

export const {
    adminLoading,
    userList,
    userListReset,
    UserDelete,
    getUser,
    updateUser,
} = adminSlice.actions;
// Define a thunk that dispatches those action creators

export const getUserList = () => async (dispatch, getState) => {
    dispatch(adminLoading());
    try {
        const { token } = getState().userState.user;
        const response = await axios({
            method: 'get',
            url: '/api/user',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        dispatch(userList(response.data));
    } catch (error) {
        console.log(error);
        dispatch(userList(error.response.data));
    }
};

export const deleteUser = (id) => async (dispatch, getState) => {
    dispatch(adminLoading());
    try {
        const { token } = getState().userState.user;
        const response = await axios({
            method: 'delete',
            url: '/api/user/' + id,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        dispatch(UserDelete(response.data));
    } catch (error) {
        console.log(error);
        dispatch(UserDelete(error.response.data));
    }
};

export const getSingleUser = (id) => async (dispatch, getState) => {
    dispatch(adminLoading());
    try {
        const { token } = getState().userState.user;
        const response = await axios({
            method: 'get',
            url: '/api/user/' + id,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        dispatch(getUser(response.data));
    } catch (error) {
        console.log(error);
        dispatch(getUser(error.response.data));
    }
};

export const editUser = (id,email, name,admin) => async (dispatch, getState) => {
    dispatch(adminLoading());
    try {
        const { token } = getState().userState.user;
        const response = await axios({
            method: 'put',
            url: '/api/user/' + id,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify({
                email: email,
                name: name,
                isAdmin: admin
            }),
        });
        console.log(response);
        dispatch(updateUser(response.data));
    } catch (error) {
        console.log(error);
        dispatch(updateUser(error.response.data));
    }
};


export default adminSlice.reducer;
