// we have to create the store for our react application 
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducer/productSlice"
import productDetailReducer from "./reducer/productDetailSlice";
const store = configureStore({

    reducer: {
      productState: productReducer,
      productDetailState: productDetailReducer
    },
    
  })
  
  

export default store;