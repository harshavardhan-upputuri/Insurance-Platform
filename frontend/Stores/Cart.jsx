import { createSlice } from "@reduxjs/toolkit";

const initialState={
    Items:localStorage.getItem("carts")? JSON.parse(localStorage.getItem("carts")):[],
}
 
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart(state,action){
            const {productId} = action.payload;
            const indexProductId = (state.Items).findIndex(item => item.productId=== productId);
            
            if(indexProductId == -1){
                state.Items.push({productId,quantity:1});
                localStorage.setItem("carts",JSON.stringify(state.Items));
            }
        },
        deleteFromCart(state,action){
            const {productId} =action.payload;
            state.Items =(state.Items).filter(item => item.productId !== productId);
            localStorage.setItem("carts" , JSON.stringify(state.Items));
        },
        // resetCart(state) {  
        //     state.Items = [];
        //     localStorage.removeItem("carts");
        // }

    }
})

export const {addToCart,deleteFromCart }= cartSlice.actions;
export default cartSlice.reducer;