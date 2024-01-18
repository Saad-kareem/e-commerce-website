import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./Config/Config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import CartProducts from "./CartProducts";
import Modale from "./Modal";
import { getDoc } from "firebase/firestore";
import StripeCheckout from "react-stripe-checkout";

const Cart = () => {


  const [showModal, setShowModal] = useState(false);

  const triggerModal = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };

  const GetUsrUid = () => {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    });
    return uid;
  };
  const uid = GetUsrUid();

  const [user, setUser] = useState(null);
  const GetCurrentUser = async () => {
    const UserId = auth.currentUser.uid;
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "Users", UserId);
        const userDocSnap = await getDoc(userDocRef);
        setUser(userDocSnap.data().FullName);
      }
      else{
        setUser(null)
      }
    });

    return user;
  };
  GetCurrentUser();;

  const [cartProduct, setCartProduct] = useState([]);
  useEffect(() => {
    if (user) {
      const value = collection(db, "Cart" + uid);
      const getData = async () => {
        const RoomValue = await getDocs(value);
        setCartProduct(
          RoomValue.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      };
      getData();
    } else {
      console.log("User is not sign in to retrieve cart");
    }
  });

  const qty = cartProduct.map((cartProduct) => {
    return cartProduct.qty;
  });
  const reducerOfqty = (accumulater, currentValue) =>
    accumulater + currentValue;
  const totalQty = qty.reduce(reducerOfqty, 0);
  
  const price = cartProduct.map((cartProduct) => {
    return cartProduct.TotalProductPrice;
  });
  const reducerOfPrice = (accumulater, currentValue) =>
    accumulater + currentValue;
  const totalPrice = price.reduce(reducerOfPrice, 0);


  let Product;
  const cartProductIncrease = (cartProduct) => {
   

    Product = cartProduct;
    Product.qty = Product.qty + 1;
    Product.TotalProductPrice = Product.qty * Product.price;

    onAuthStateChanged(auth, async(user) => {
      if (user) {
        const collectionRef = collection(db, "Cart" + uid);
        const docRef = doc(collectionRef, cartProduct.id);
        const data = await updateDoc(docRef, Product)
        
      } else {
        console.log("user is not logged into increment");
      }
    });
  };
  const cartProductDecrease = (cartProduct) => {
    
    Product = cartProduct;
    if (Product.qty > 1) {
      Product.qty = Product.qty - 1;
      Product.TotalProductPrice = Product.qty * Product.price;
      
      onAuthStateChanged(auth, async(user) => {
        if (user) {
          const collectionRef = collection(db, "Cart" + uid);
          const docRef = doc(collectionRef, cartProduct.id);
          const data = await updateDoc(docRef, Product)
          
        } else {
          console.log("user is not logged into Decrement");
        }
      });
    }
  };

  return (
    <>
      <Navbar user={user} />
      <br />
      {cartProduct.length > 0 && (
        <div className="container-fluid">
          <h1 className="text-center">Cart</h1>
          <div className="products-box cart">
            <CartProducts
              cartProduct={cartProduct}
              cartProductIncrease={cartProductIncrease}
              cartProductDecrease={cartProductDecrease}
            />
          </div>
          <div className="summary-box">
            <h5>Cart Summary</h5>
            <br></br>
            <div>
              Total No of Products: <span>{totalQty}</span>
            </div>
            <div>
              Total Price to Pay: <span>{totalPrice}Pkr</span>
            </div>
            <br />
            <StripeCheckout></StripeCheckout>
            <h6 className="text-center" style={{ marginTop: 7 + "px" }}></h6>
            <button
              className="btn btn-secondary btn-md"
              onClick={() => triggerModal()}
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      )}
      {cartProduct.length < 1 && (
        <div className="container-fluid">No products to show</div>
      )}
      {showModal === true && (
        <Modale
          TotalPrice={totalPrice}
          TotalQty={totalQty}
          hideModal={hideModal}
        />
      )}
    </>
  );
};

export default Cart;
