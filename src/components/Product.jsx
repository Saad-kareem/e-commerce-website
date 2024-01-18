import React from "react";
import { IndividualProduct } from "./IndividualProduct";
const Product = ({ products, addToCart }) => {
  return products.map((individualProduct) => (
    <IndividualProduct
      key={individualProduct.id}
      individualProduct={individualProduct}
      addToCart={addToCart}
    />
  ));
};

export default Product;
