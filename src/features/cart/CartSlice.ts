import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// Utilities for localStorage per user
export const getCartFromLocalStorage = (email: string): CartItem[] => {
  try {
    const cartData = localStorage.getItem(`cart_${email}`);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error("Error reading cart:", error);
    return [];
  }
};

export const setCartToLocalStorage = (email: string, cartItems: CartItem[]): void => {
  try {
    localStorage.setItem(`cart_${email}`, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Error saving cart:", error);
  }
};

export const clearCartFromLocalStorage = (email: string): void => {
  try {
    localStorage.removeItem(`cart_${email}`);
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<{ email: string; item: CartItem }>) {
      const { email, item } = action.payload;
      const existing = state.items.find((i) => i._id === item._id);
      if (existing) {
        existing.quantity += item.quantity; // increment quantity if already present
      } else {
        state.items.push(item);
      }
      setCartToLocalStorage(email, state.items);
    },

    removeFromCart(state, action: PayloadAction<{ email: string; itemId: string }>) {
      state.items = state.items.filter((item) => item._id !== action.payload.itemId);
      setCartToLocalStorage(action.payload.email, state.items);
    },

    increaseQuantity(state, action: PayloadAction<{ email: string; itemId: string }>) {
      const item = state.items.find((i) => i._id === action.payload.itemId);
      if (item) {
        item.quantity += 1;
        setCartToLocalStorage(action.payload.email, state.items);
      }
    },

    decreaseQuantity(state, action: PayloadAction<{ email: string; itemId: string }>) {
      const item = state.items.find((i) => i._id === action.payload.itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        setCartToLocalStorage(action.payload.email, state.items);
      }
    },

    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },

    clearCart(state, action: PayloadAction<{ email: string }>) {
      state.items = [];
      clearCartFromLocalStorage(action.payload.email);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setCartItems,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
