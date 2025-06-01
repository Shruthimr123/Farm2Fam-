// src/components/products/Fruits.tsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getProductsAPI } from "../api/product/getProductApi";
import { ProductPayload } from "../../types/product";
import { addToCart } from "../cart/CartSlice";
import { Link } from "react-router-dom";
import "../../styles/ProductList.css";

const Fruits: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.product);
  const email = useAppSelector((state) => state.auth.email);

  useEffect(() => {
    dispatch(getProductsAPI());
  }, [dispatch]);

  const handleAddToCart = (product: ProductPayload) => {
    if (!email) {
      alert("Please login to add products to the cart.");
      return;
    }

    dispatch(
      addToCart({
        email,
        item: {
          _id: product._id!,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: typeof product.imageUrl === "string" ? product.imageUrl : "",
        },
      })
    );
  };

  const fruits = products.filter(
    (product) => product.category.toLowerCase() === "fruit"
  );

  return (
    <div className="container">
      {/* <h2 style={{ textAlign: "center" }}>Fruits</h2> */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div className="product-container">
          {fruits.length > 0 ? (
            fruits.map((product) => (
              <div className="product-card" key={product._id}>
                <img
                  src={`${product.imageUrl}`}
                  alt={product.name}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://www.realfruitpower.com/RealFruit/RealFruitImages/457/image-thumb__457__full-banner/contentimage7-8-2014873623971.42b35659.png";
                  }}
                />
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p>₹{product.price}</p>
                </div>
                <div className="product-actions">
                  <Link to="/products">
                    <button
                      className="add-to-cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No fruits found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Fruits;
