// we have to create the store for our react application
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './reducer/productSlice';
import productDetailReducer from './reducer/productDetailSlice';
import cardReducer from './reducer/cardReducer';

const cardItem = localStorage.getItem('cardItem');
const localStorageCardData = cardItem ? JSON.parse(cardItem) : [];
console.log(localStorageCardData);
const store = configureStore({
    reducer: {
        productState: productReducer,
        productDetailState: productDetailReducer,
        cardState: cardReducer,
    },
    preloadedState: {
        cardState: {
            cardItems: localStorageCardData,
            loading: false,
            error: '',
            message: '',
        },
    },
});

export default store;
