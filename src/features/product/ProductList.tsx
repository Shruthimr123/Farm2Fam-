// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { getProductsAPI } from "../api/product/getProductApi";
// import { ProductPayload } from "../../types/product";
// import { addToCart } from "../cart/CartSlice";
// import { Link, useLocation } from "react-router-dom";
// import "../../styles/ProductList.css";

// const ProductList: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { products, loading } = useAppSelector((state) => state.product);
//   const email = useAppSelector((state) => state.auth.email);
//   const location = useLocation();

//   const queryParams = new URLSearchParams(location.search);
//   const searchQuery = queryParams.get("search")?.toLowerCase() || "";

//   useEffect(() => {
//     dispatch(getProductsAPI());
//   }, [dispatch]);

//   const handleAddToCart = (product: ProductPayload) => {
//     if (!email) {
//       alert("Please login to add products to the cart.");
//       return;
//     }

//     dispatch(
//       addToCart({
//         email: email,
//         item: {
//           _id: product._id!,
//           name: product.name,
//           price: product.price,
//           quantity: 1,
//           image: typeof product.imageUrl === "string" ? product.imageUrl : "",
//         },
//       })
//     );
//   };

//   const filteredProducts = products.filter((p) =>
//     p.name.toLowerCase().includes(searchQuery)
//   );

//   return (
//     <div className="container">
//       <h2 style={{ textAlign: "center" }}>Products</h2>
//       {loading ? (
//         <p style={{ textAlign: "center" }}>Loading...</p>
//       ) : (
//         <div className="product-container">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((p) => (
//               <div className="product-card" key={p._id}>
//                 <img
//                   src={`${p.imageUrl}`}
//                   alt={p.name}
//                   onError={(e) => {
//                     e.currentTarget.src =
//                       "https://www.realfruitpower.com/RealFruit/RealFruitImages/457/image-thumb__457__full-banner/contentimage7-8-2014873623971.42b35659.png";
//                   }}
//                 />
//                 <div className="product-info">
//                   <h4>{p.name}</h4>
//                   <p>₹{p.price}</p>
//                 </div>
//                 <div className="product-actions">
//                   <Link to="/products">
//                     <button className="add-to-cart" onClick={() => handleAddToCart(p)}>
//                       Add to Cart
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p style={{ textAlign: "center" }}>No products found</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;


import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getProductsAPI } from "../api/product/getProductApi";
import { ProductPayload } from "../../types/product";
import { addToCart } from "../cart/CartSlice";
import { useLocation } from "react-router-dom";
import "../../styles/ProductList.css";

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.product);
  const email = useAppSelector((state) => state.auth.email);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

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
      email: email,
      item: {
        _id: product._id!,
        name: product.name,
        price: product.price,
        quantity: 1, // always add 1, slice increments if exists
        image: typeof product.imageUrl === "string" ? product.imageUrl : "",
      },
    })
  );
};

  const filteredProducts = useMemo(() => 
  products.filter(p => p.name.toLowerCase().includes(searchQuery)),
  [products, searchQuery]
);

return (
  <div className="container">
    {loading ? (
      <p style={{ textAlign: "center" }}>Loading...</p>
    ) : (
      <div className="product-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div className="product-card" key={p._id}>
              <img
                src={ `${p.imageUrl }`}
                alt={p.name}
                onError={(e) => {
                  e.currentTarget.onerror = null; 
                  e.currentTarget.src = "fallback_image_url_here";
                }}
              />
              <div className="product-info">
                <h4>{p.name}</h4>
                <p>₹{p.price}</p>
              </div>
              <div className="product-actions">
                <button
                  className="add-to-cart"
                  onClick={() => handleAddToCart(p)}
                  disabled={loading}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No products found</p>
        )}
      </div>
    )}
  </div>
);

};

export default ProductList;
