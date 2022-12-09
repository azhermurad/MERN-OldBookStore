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
        userLogout: (state)=> {
            localStorage.removeItem("userInfo");
            state.user=null;
            state.error='';
            state.message='';

        },
        loginUser(state, { payload }) {
            const { data, message, status } = payload;
            state.loading = false;
            if (status === 'Success') {
                state.user = { ...data.user, token: data.token };
                state.message = message;
                state.error=''

                localStorage.setItem("userInfo",JSON.stringify(state.user))
            } else {
                if (status === 'Error' && !data) {
                    state.error = message;
                    state.message=''
                    return;
                }
                state.error = 'Something Went Wrong! Try Again';
                state.message=''
            }
        },
    },
    // extraReducers:{

    // }
});

export const { userLoading, loginUser,userLogout } = userSlice.actions;
// Define a thunk that dispatches those action creators
export const loginUsers = (email, password) => async (dispatch) => {
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
};

export const createUser = (name,email, password) => async (dispatch) => {
    dispatch(userLoading());
    try {
        const response = await axios({
            method: 'post',
            url: '/api/user/signup',
            data: JSON.stringify({
                name:name,
                email: email,
                password: password,

            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response)
        dispatch(loginUser(response.data));
    } catch (error) {
        console.log(error)
        dispatch(loginUser(error.response.data));
    }
};


export default userSlice.reducer;

// There are two best ways to fetch the data in react toolkit one is the slicereducer and other is extract reducer
