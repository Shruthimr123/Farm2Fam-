import { Routes, Route } from "react-router-dom";
import SignIn from "./features/auth/Signin";
import Signup from "./features/auth/Signup";
import ProductList from "./features/product/ProductList";
import Header from "./features/components/Header";
import CartPersistor from "./features/cart/CartPersistor";
import CartPage from "./features/cart/CartPage";
import Hero from "./features/components/Hero";
import Footer from "./features/components/Footer";
import Vegetables from "./features/product/Vegetables";
import Fruits from "./features/product/Fruits";
import PaymentPage from "./features/components/PaymentPage";
import OrdersPage from "./features/components/OrdersPage";
import ForgotPassword from "./features/components/ForgotPassword";
import ResetPassword from "./features/components/ResetPassword";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/products"
          element={
            <>
              <Hero />
              <ProductList />
            </>
          }
        />

        <Route path="/vegetables" element={<Vegetables />} />
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>

      <CartPersistor />
      <Footer />
    </>
  );
}

export default App;
