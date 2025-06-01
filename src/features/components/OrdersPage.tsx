import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import "../../styles/OrderPage.css"; // optional

const OrdersPage = () => {
 const email = useSelector((state: RootState) => state.auth.email);
const orders = useSelector((state: RootState) =>
  email ? state.orders.ordersByEmail[email] || [] : []
);

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h4>Order ID: {order.id}</h4>
            <p>Date: {new Date(order.date).toLocaleString()}</p>
            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                  {item.name} - {item.quantity} kg - ₹{item.price * item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
