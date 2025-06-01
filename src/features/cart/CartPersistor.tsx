import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  getCartFromLocalStorage,
  setCartToLocalStorage,
  setCartItems,
} from "./CartSlice";

const CartPersistor = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const email = useSelector((state: RootState) => state.auth.email);

  useEffect(() => {
    if (email) {
      const storedCart = getCartFromLocalStorage(email);
      dispatch(setCartItems(storedCart));
    }
  }, [email, dispatch]);

  useEffect(() => {
    if (email) {
      setCartToLocalStorage(email, cartItems);
    }
  }, [cartItems, email]);

  return null;
};

export default CartPersistor;
