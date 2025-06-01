// Redux store 
import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/AuthSlice'
import productReducer from '../features/product/ProductSlice'
import cartReducer from '../features/cart/CartSlice'
import orderReducer from "../features/orders/OrderSlice";


// sets up the central redux tool
// registering the authSlice inside the configureState from redux
export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        cart: cartReducer,
        orders: orderReducer,
    }

})
// Data flow for storing in global store
//Dispatch ==> Action with or without payload ==> Reducer ==> Store

//For retriving
//Directly from the store using the key in the reducer (i.e auth in reducer) 

// //Provides strong types for 
export type RootState = ReturnType<typeof store.getState>

// // for dispatch the type of actions and also payload
// // it accepts only action and payload 
export type AppDispatch = typeof store.dispatch


