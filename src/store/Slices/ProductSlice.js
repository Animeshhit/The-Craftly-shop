import { createSlice } from "@reduxjs/toolkit";

const initialProductInfo = {
    productName:"",
    productDescription:"",
    price:"",
    discount:"",
    productImage:"",
    catagories:"",
    productUniqueId:""
}

export const ProductSlice = createSlice({
    name:"product",
    initialState:initialProductInfo,
    reducers:{

    }
})

export const {} = ProductSlice.actions;

export default ProductSlice.reducer;