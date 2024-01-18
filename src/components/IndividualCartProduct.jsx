import React from "react";
import { Icon } from "react-icons-kit";
import { plus } from "react-icons-kit/feather/plus";
import { minus } from "react-icons-kit/feather/minus";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Config/Config";
import { collection, doc, deleteDoc } from "firebase/firestore";

const IndividualCartProduct = ({
  cartProduct,
  cartProductIncrease,
  cartProductDecrease,
}) => {
  const handleCartProductIncrease = () => {
    cartProductIncrease(cartProduct);
  };
  const handleCartProductDecrease = () => {
    cartProductDecrease(cartProduct);
  };
  const handleProductDelete = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const collectionRef = collection(db, "Cart" + user.uid);
        const docRef = doc(collectionRef, cartProduct.id);
        deleteDoc(docRef);
        console.log("Item deleted successfully");
      }
    });
  };
  return (
    <div>
      <div className=" product">
        <div className="product-img CartImage">
          <img src={cartProduct.url} alt="product-img" />
        </div>

        <div className="product-text title ">{cartProduct.title}</div>
        <div className="product-text description">
          {cartProduct.description}
        </div>
        <div className="product-text price">{cartProduct.price}Pkr</div>
        <span>Quantity</span>
        <div className="product-text quantity-box">
          <div
            className="action-btns minus"
            onClick={handleCartProductDecrease}
          >
            <Icon icon={minus} size={20} />
          </div>
          <div>{cartProduct.qty}</div>
          <div className="action-btns plus" onClick={handleCartProductIncrease}>
            <Icon icon={plus} size={20} />
          </div>
        </div>
        <div className="product-text cart-price">
          {cartProduct.TotalProductPrice} Pkr
        </div>
        <div
          className="btn btn-danger btn-md cart-btn"
          onClick={handleProductDelete}
        >
          DELETE
        </div>
      </div>
    </div>
  );
};

export default IndividualCartProduct;
