import React from "react";
import IndividualCartProduct from "./IndividualCartProduct";

const CartProducts = ({ cartProduct,cartProductIncrease,cartProductDecrease }) => {
  return cartProduct.map((cartProduct) => (
    <IndividualCartProduct key={cartProduct.id} cartProduct={cartProduct} 
      cartProductIncrease = {cartProductIncrease}
      cartProductDecrease ={cartProductDecrease}
    />
  ));
};

export default CartProducts;
