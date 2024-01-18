import React from "react";

export const IndividualProduct = ({ individualProduct, addToCart }) => {
  
  const handleAddToCart = () => {
    addToCart(individualProduct);
  };
  return (
    <div className="col-md-3">
      <div className="MainCard">
        <div className="card product">
          <img src={individualProduct.url} alt="logo" className="product-img" />
          <div className="card-body">
            <h5 className="card-title">{individualProduct.title}</h5>
            <p className="card-text">{individualProduct.description}</p>
            <p>{individualProduct.price}Pkr</p>
            <div
              className="btn btn-danger btn-md cart-btn"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
