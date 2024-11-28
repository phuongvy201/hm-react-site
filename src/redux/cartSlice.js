import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setItemCount: (state, action) => {
      state.itemCount = action.payload;
    },
    incrementItemCount: (state) => {
      state.itemCount += 1;
    },
    decrementItemCount: (state) => {
      state.itemCount = Math.max(0, state.itemCount - 1);
    },
  },
});

export const { setItemCount, incrementItemCount, decrementItemCount } =
  cartSlice.actions;
export default cartSlice.reducer;

// Thunk action để fetch số lượng item
export const fetchCartItemCount = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/cart/quantity");
    dispatch(setItemCount(response.data.quantity));
  } catch (error) {
    console.error("Lỗi khi lấy số lượng giỏ hàng:", error);
  }
};
