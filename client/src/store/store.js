// we have to create the store for our react application
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducer/productSlice';
import productDetailReducer from './reducer/productDetailSlice';
import cardReducer from './reducer/cardReducer';
import userSlice from './reducer/userSlice';

const cardItem = localStorage.getItem('cardItem');
const user = localStorage.getItem("userInfo");
const shippingAddress = localStorage.getItem("shippingAddress");

const localStorageCardData = cardItem ? JSON.parse(cardItem) : [];
const localStorageUserData = user ? JSON.parse(user) : null;
const localStorageShippingAddress = shippingAddress ? JSON.parse(shippingAddress) : {};
const store = configureStore({
    reducer: {
        productState: productReducer,
        productDetailState: productDetailReducer,
        cardState: cardReducer,
        userState: userSlice
    },
    preloadedState: {
        cardState: {
            cardItems: localStorageCardData,
            loading: false,
            error: '',
            message: '',
            shippingAddress: localStorageShippingAddress
        },
        userState: {
            user:localStorageUserData,
            loading: false,
            error: '',
            message: '',
        }
        

    },
});

export default store;
