import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    sellers: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).sellers
      : [], // sellers là danh sách các nhóm sản phẩm theo sellerId
  },
  reducers: {
    addToCart: (state, action) => {
      const { item, sellerId, shopName } = action.payload; // thêm profileShop

      // Tìm nhóm sản phẩm theo sellerId
      let sellerGroup = state.sellers.find(
        (group) => group.sellerId === sellerId
      );

      if (!sellerGroup) {
        // Nếu nhóm sellerId chưa tồn tại, thêm nhóm mới và thêm profileShop vào nhóm đó
        sellerGroup = {
          sellerId,
          shopName: shopName, // lưu thông tin profileShop
          items: [],
        };
        state.sellers.push(sellerGroup);
      }

      // Tìm sản phẩm trong nhóm seller
      const existingItem = sellerGroup.items.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color
      );

      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        existingItem.count += item.count;
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới
        sellerGroup.items.push(item);
      }

      // Lưu giỏ hàng vào localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const { id, color, size, sellerId } = action.payload;

      // Tìm nhóm sản phẩm theo sellerId
      const sellerGroup = state.sellers.find(
        (group) => group.sellerId === sellerId
      );

      if (sellerGroup) {
        // Lọc bỏ sản phẩm muốn xóa
        sellerGroup.items = sellerGroup.items.filter(
          (item) => item.id !== id || item.color !== color || item.size !== size
        );

        // Xóa nhóm seller nếu không còn sản phẩm nào
        if (sellerGroup.items.length === 0) {
          state.sellers = state.sellers.filter(
            (group) => group.sellerId !== sellerId
          );
        }
      }

      // Lưu giỏ hàng vào localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    increaseCount: (state, action) => {
      const { id, color, size, sellerId } = action.payload;

      // Tìm nhóm sản phẩm theo sellerId
      const sellerGroup = state.sellers.find(
        (group) => group.sellerId === sellerId
      );

      if (sellerGroup) {
        // Tăng số lượng của sản phẩm
        const item = sellerGroup.items.find(
          (cartItem) =>
            cartItem.id === id &&
            cartItem.color === color &&
            cartItem.size === size
        );

        if (item) {
          item.count++;
        }
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    decreaseCount: (state, action) => {
      const { id, color, size, sellerId } = action.payload;

      // Tìm nhóm sản phẩm theo sellerId
      const sellerGroup = state.sellers.find(
        (group) => group.sellerId === sellerId
      );

      if (sellerGroup) {
        // Giảm số lượng của sản phẩm, không để nhỏ hơn 1
        const item = sellerGroup.items.find(
          (cartItem) =>
            cartItem.id === id &&
            cartItem.color === color &&
            cartItem.size === size
        );

        if (item && item.count > 1) {
          item.count--;
        }
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: (state) => {
      // Xóa toàn bộ giỏ hàng
      state.sellers = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
