import {configureStore} from '@reduxjs/toolkit';
import authSlice from './Slices/authSlice';
import cartSlice from './Slices/cartSlice';

const Store = configureStore({
    reducer:{
        auth:authSlice,
        cart:cartSlice
    }
})

export default Store;