import React, { useState } from "react";
import { db, storage } from "./Config/Config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState(null);
  const [category, setCategory] = useState("");

  const [imgErr, setImgErr] = useState("");

  const [uploadError, setUploadError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleProuctImage = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setImg(selectedFile);
        setImgErr("");
      } else {
        setImg(null);
        setImgErr("please select a valid image file type (png or jpg)");
      }
    } else {
      console.log("Please select your file");
    }
  };
  const handleAddProduct = (e) => {
    e.preventDefault();

    if (img) {
      const imgRef = ref(storage, `product-images/${img.name}`);
      uploadBytes(imgRef, img).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const database = collection(db, "Products");
          addDoc(database, {
            title,
            description,
            category,
            price: Number(price),
            url,
          })
            .then(() => {
              setSuccessMsg("Product added successfully");
              setTitle("");
              setDescription("");
              setCategory("");
              setPrice("");
              document.getElementById("file").value = "";
              setImgErr("");
              setUploadError("");
              setTimeout(() => {
                setSuccessMsg("");
                navigate("/");
              }, 3000);
            })
            .catch((error) => setUploadError(error.message));
        });
      });
    }
  };

  return (
    <>
      <div className="container addProducts">
        <h1>Add Products</h1>
        <hr />
        {successMsg && (
          <>
            <div className="success-msg">{successMsg}</div>
            <br></br>
          </>
        )}
        <form
          autoComplete="off"
          className="form-group"
          onSubmit={handleAddProduct}
        >
          <label>Product Title</label>
          <input
            type="text"
            className="form-control"
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />

          <label>Product Description</label>
          <input
            type="text"
            className="form-control"
            required
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
          />

          <label>Product Price</label>
          <input
            type="number"
            className="form-control"
            required
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            value={price}
          />

          <label>Product Category</label>
          <select
            className="form-control"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Product Category</option>
            <option>Electronic Devices</option>
            <option>Mobile Accessories</option>
            <option>TV & Home Appliances</option>
            <option>Sports & outdoors</option>
            <option>Health & Beauty</option>
            <option>Home & Lifestyle</option>
            <option>Men's Fashion</option>
            <option>Watches, bags & Jewellery</option>
            <option>Groceries</option>
          </select>

          <label>Upload Product Image</label>
          <input
            type="file"
            id="file"
            className="form-control"
            required
            onChange={handleProuctImage}
          />
          <br />
          {imgErr && (
            <>
              <br />
              <div className="success-msg text-danger">{imgErr}</div>
            </>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="submit" className="btn btn-success btn-md addbtn">
              SUBMIT
            </button>
          </div>
        </form>
        {uploadError && (
          <>
            <br></br>
            <div className="success-msg text-danger">{uploadError}</div>
          </>
        )}
      </div>
    </>
  );
};

export default AddProduct;
