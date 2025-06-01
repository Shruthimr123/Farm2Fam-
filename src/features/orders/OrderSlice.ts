import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  items: Item[];
  date: string;
}

interface OrdersState {
  ordersByEmail: {
    [email: string]: Order[];
  };
}

// Helper functions inside slice file
const loadOrdersFromLocalStorage = (): OrdersState => {
  try {
    const serializedOrders = localStorage.getItem("orders");
    if (serializedOrders === null) {
      return { ordersByEmail: {} };
    }
    return { ordersByEmail: JSON.parse(serializedOrders) };
  } catch (err) {
    console.warn("Could not load orders from localStorage", err);
    return { ordersByEmail: {} };
  }
};

const saveOrdersToLocalStorage = (ordersByEmail: OrdersState["ordersByEmail"]) => {
  try {
    const serializedOrders = JSON.stringify(ordersByEmail);
    localStorage.setItem("orders", serializedOrders);
  } catch (err) {
    console.warn("Could not save orders to localStorage", err);
  }
};

const initialState: OrdersState = loadOrdersFromLocalStorage();

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (
      state,
      action: PayloadAction<{
        email: string;
        order: Order;
      }>
    ) => {
      const { email, order } = action.payload;
      if (!state.ordersByEmail[email]) {
        state.ordersByEmail[email] = [];
      }
      state.ordersByEmail[email].push(order);

      // Save updated orders to localStorage on every add
      saveOrdersToLocalStorage(state.ordersByEmail);
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;

