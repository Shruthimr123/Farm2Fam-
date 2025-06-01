import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCartFromLocalStorage, setCartItems } from "./CartSlice";

const CartLoader: React.FC = () => {
  const email = useAppSelector((state) => state.auth.email);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (email) {
      const savedCart = getCartFromLocalStorage(email);
      dispatch(setCartItems(savedCart));
    }
  }, [email, dispatch]);

  return null; // no UI needed, this is a sync component only
};

export default CartLoader;
