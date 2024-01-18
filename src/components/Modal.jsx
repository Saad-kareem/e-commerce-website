import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./Config/Config";
import { getDoc } from "firebase/firestore";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
 

const Modale = ({ TotalPrice, TotalQty, hideModal }) => {
  const navigate = useNavigate();
  const [cell, setCell] = useState(null);
  const [residentialAddress, setResidentialAddress] = useState("");
  const [cartPrice] = useState(TotalPrice);
  const [cartQty] = useState(TotalQty);

  const handleCloseModal = () => {
    hideModal();
  };
  const handleCashOnDelivery = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const userDocRef = doc(db, "Users", uid);
    const userData = await getDoc(userDocRef);
    const newColl = collection(db, "Buyer-Personal-Info");
    addDoc(newColl, {
      Name: userData.data().FullName,
      Email: userData.data().Email,
      CellNo: cell,
      ResidentialAddress: residentialAddress,
      CartPrice: cartPrice,
      CartQty: cartQty,
    });
    const querySnapshot = await getDocs(collection(db, "Cart" + uid));
    for (const snap of querySnapshot.docs) {
      const data = snap.data();
      data.ID = snap.id;
      const MainColl = collection(db, "Buyer-Cart" + uid);
      await addDoc(MainColl, data);
      const dellete = collection(db, "Cart" + uid);
      const docRef = doc(dellete, snap.id);
      await deleteDoc(docRef);
    }
     hideModal();
     navigate('/')
     toast('Your order has been placed successfully', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    })
  };
  return (
    <>
      <div className="shade-area">
        <div className="modal-container">
          <form className="form-group" onSubmit={handleCashOnDelivery}>
            <input
              type="number"
              className="form-control"
              placeholder="Cell No"
              required
              onChange={(e) => setCell(e.target.value)}
              value={cell}
            />
            <br></br>
            <input
              type="text"
              className="form-control"
              placeholder="Residential Address"
              required
              onChange={(e) => setResidentialAddress(e.target.value)}
              value={residentialAddress}
            />
            <br></br>
            <label>Total Quantity</label>
            <input
              type="text"
              className="form-control"
              readOnly
              required
              value={cartQty}
            />
            <br></br>
            <label>Total Price</label>
            <input
              type="text"
              className="form-control"
              readOnly
              required
              value={cartPrice}
            />
            <br></br>
            <button type="submit" className="btn btn-success btn-md">
              Submit
            </button>
          </form>
          <div className="delete-icon" onClick={handleCloseModal}>
            x
          </div>
        </div>
      </div>
    </>
  );
};

export default Modale;
