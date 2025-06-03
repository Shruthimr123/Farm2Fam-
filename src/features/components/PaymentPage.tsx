import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../app/store";
import { clearCart } from "../cart/CartSlice";
import { addOrder } from "../orders/OrderSlice";

const PaymentPage = () => {
  const [isPaid, setIsPaid] = useState(false);
  const email = useSelector((state: RootState) => state.auth.email);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  if (!email) {
    navigate("/login");
    return null;
  }

  if (cartItems.length === 0) {
    return null;
  }

  const handleApprove = () => {
    const orderId = uuidv4();

    dispatch(
      addOrder({
        email,
        order: {
          id: orderId,
          items: cartItems,
          date: new Date().toISOString(),
        },
      })
    );

    dispatch(clearCart({ email }));

    setIsPaid(true);

    setTimeout(() => {
      navigate("/orders");
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      {isPaid ? (
        <div>
          <h2 style={{ color: "green", fontSize: "24px" }}>
            ✅ Order placed successfully!
          </h2>
        </div>
      ) : (
        <>
          <h2>Complete Your Payment</h2>
          <p>Total: ${totalAmount}</p>
          <div style={{ maxWidth: "400px", width: "100%" }}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "USD",
                        value: totalAmount,
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                if (actions.order) {
                  await actions.order.capture();
                  handleApprove();
                }
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentPage;

