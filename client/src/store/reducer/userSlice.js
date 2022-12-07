import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null,
    loading: false,
    message: '',
    error: '',
};

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        userLoading: (state) => {
            state.loading = true;
        },
        loginUser(state, { payload }) {
            const { data, message, status } = payload;
            state.loading = false;
            if (status === 'Success') {
                state.user = { ...data.user, token: data.token };
                state.message = message;

                localStorage.setItem("userInfo",JSON.stringify(state.user))
            } else {
                if (status === 'Error' && !data) {
                    state.error = message;
                    return;
                }
                state.error = 'Something Went Wrong! Try Again';
            }
        },
    },
    // extraReducers:{

    // }
});

export const { userLoading, loginUser } = userSlice.actions;
// Define a thunk that dispatches those action creators
export const createhUsers = (email, password) => async (dispatch) => {
    dispatch(userLoading());
    try {
        const response = await axios({
            method: 'post',
            url: '/api/user/login',
            data: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        dispatch(loginUser(response.data));
    } catch (error) {
        dispatch(loginUser(error.response.data));
    }
    // dispatch(usersReceived(response.data))
};
export default userSlice.reducer;

// There are two best ways to fetch the data in react toolkit one is the slicereducer and other is extract reducer
