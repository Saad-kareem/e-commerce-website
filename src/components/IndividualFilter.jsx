import React from "react";

const IndividualFilter = ({ individualFilteredProduct, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(individualFilteredProduct);
  };
  return (
    <>
      <div className="product">
        <div className="product-img">
          <img src={individualFilteredProduct.url} alt="product-img" />
        </div>
        <div className="product-text title">
          {individualFilteredProduct.title}
        </div>
        <div className="product-text description">
          {individualFilteredProduct.description}
        </div>
        <div className="product-text price">
          {individualFilteredProduct.price}Pkr
        </div>
        <div
          className="btn btn-danger btn-md cart-btn"
          onClick={handleAddToCart}
        >
          ADD TO CART
        </div>
      </div>
    </>
  );
};

export default IndividualFilter;
