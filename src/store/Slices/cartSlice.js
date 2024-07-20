import { createSlice } from "@reduxjs/toolkit";

const initialCart = {
    items:[]
}


export const cartSlice = createSlice({
    name:"cart",
    initialState:initialCart,
    reducers:{
        setInitialItems: (state, action) => {
            state.items = action.payload;
          },
        addItem:(state,action) => {
            const newItem = action.payload;
            state.items.push(newItem);
        },
        removeItem:(state,action) => {
            const removeItem = action.payload;
            state.items = state.items.filter(item => item.id !== removeItem)
        },
        clearCart: (state,action) => {
            state.items = []
        }
    }
})

export const {addItem,removeItem,clearCart,setInitialItems} = cartSlice.actions;

export default cartSlice.reducer;               