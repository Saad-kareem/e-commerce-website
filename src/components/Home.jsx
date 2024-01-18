import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Product from "./Product";
import { auth, db } from "./Config/Config";
import { ref } from "firebase/storage";
import { getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, doc, collection, setDoc, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import IndividualFilter from "./IndividualFilter";

const Home = (props) => {
  const navigate = useNavigate();
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
    });

    return user;
  };
  GetCurrentUser();

  const [products, setProducts] = useState([]);

  const GetProduct = async () => {
    const product = collection(db, "Products");
    const ProductValue = await getDocs(product);
    setProducts(
      ProductValue.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };
  useEffect(() => {
    GetProduct();
  }, []);
  const [totalProducts, setTotalProducts] = useState(0);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const collectionSnapshot = await getDocs(collection(db, "Cart" + uid));
        const length = collectionSnapshot.size;
        setTotalProducts(length);
      }
    });
  });

  let Productese;
  const addToCart = async (product) => {
    if (uid !== null) {
      Productese = product;
      Productese["qty"] = 1;
      Productese["TotalProductPrice"] = Productese.qty * Productese.price;
      const collectionRef = collection(db, "Cart" + uid);
      const docRef = doc(collectionRef, product.id);
      await setDoc(docRef, Productese);
    } else {
      navigate("/login");
    }
  };
  const [spans] = useState([
    { id: "ElectronicDevices", text: "Electronic Devices" },
    { id: "MobileAccessories", text: "Mobile Accessories" },
    { id: "TVAndHomeAppliances", text: "TV & Home Appliances" },
    { id: "SportsAndOutdoors", text: "Sports & outdoors" },
    { id: "HealthAndBeauty", text: "Health & Beauty" },
    { id: "HomeAndLifestyle", text: "Home & Lifestyle" },
    { id: "MensFashion", text: `Men's Fashion` },
    { id: "WatchesBagsAndJewellery", text: `Watches, bags & Jewellery` },
    { id: "Groceries", text: "Groceries" },
  ]);
  const [active, setActive] = useState("");

  const [category, setCategory] = useState("");

  const handleChange = (individualSnap) => {
    setActive(individualSnap.id);
    setCategory(individualSnap.text);
    filterFunction(individualSnap.text);
  };
  // Filtered Products
  const [filteredProduct, setFilterProduct] = useState([]);
  const filterFunction = (text) => {
    const filter = products.filter((product) => product.category === text);
    setFilterProduct(filter);
  };
  const returntoAllProducts = () => {
    setActive("");
    setCategory("");
    setFilterProduct([]);
  };

  return (
    <>
      <Navbar user={user} totalProducts={totalProducts} />
      <br />
      <div className="container-fluid filter-products-main-box">
        <div className="filter-box">
          <h6>Filter by category</h6>
          {spans.map((individualSpan, index) => (
            <span
              key={index}
              id={individualSpan.id}
              onClick={() => handleChange(individualSpan)}
              className={individualSpan.id === active ? active : "deactive"}
            >
              {individualSpan.text}
            </span>
          ))}
        </div>
        {filteredProduct.length > 0 && (
          <div className="my-products">
            <h1 className="text-center">{category}</h1>
            <a href="javascript:void(0)" onClick={returntoAllProducts}>
              Return to All Products
            </a>
            <div className="products-box ">
              {filteredProduct.map((individualFilteredProduct) => (
                <IndividualFilter
                  key={individualFilteredProduct.ID}
                  individualFilteredProduct={individualFilteredProduct}
                  addToCart={addToCart}
                />
              ))}
            </div>
          </div>
        )}
        {filteredProduct.length < 1 && (
          <>
            {products.length > 0 && (
              <div className="my-products">
                <h1 className="text-center">All Products</h1>
                <div className="products-box">
                  <Product products={products} addToCart={addToCart} />
                </div>
              </div>
            )}
            {products.length < 1 && (
              <div className="my-products please-wait">Please wait...</div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
