import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: localStorage.getItem("carts")
    ? JSON.parse(localStorage.getItem("carts"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId } = action.payload;
      const index = state.items.findIndex((item) => item.productId === productId);

      if (index === -1) {
        state.items.push({ productId, quantity: 1 });
      } else {
        state.items[index].quantity += 1;
      }

      localStorage.setItem("carts", JSON.stringify(state.items));
    },
    deleteFromCart(state, action) {
      const { productId } = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
      localStorage.setItem("carts", JSON.stringify(state.items));
    },
    resetCart(state) {
      state.items = [];
      localStorage.removeItem("carts");
    },
  },
});

export const { addToCart, deleteFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
