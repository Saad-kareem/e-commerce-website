import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "./Config/Config";
import { db } from "./Config/Config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import { setDoc } from "firebase/firestore";

const SignUp = () => {
  const navigate = useNavigate();
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [suucessMsg, setSuccessMsg] = useState("");

  const HandleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (credentails) => {
          const MainColls = collection(db, "Users");
          const DocRefs = doc(MainColls, credentails.user.uid);
          setDoc(DocRefs, {
            FullName: fullname,
            Email: email,
            Password: password,
          });
        }
      );

      setSuccessMsg(
        "SignUp Successfull. You will now redirected to Login Page"
      );
      setName("");
      setEmail("");
      setPassword("");
      setErrMsg("");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/login");
      }, 3000);
    } catch (error) {
      setErrMsg(error.message);
    }
  };
  return (
    <>
      <div className="container">
        <h1 className="heaidng">SignUp</h1>
        <hr />
        {suucessMsg && (
          <>
            <div className="success-msg text-success">{suucessMsg}</div>
          </>
        )}
        <form className="form-group" autoComplete="off">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={fullname}
          />
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <div className="btn-box">
            <span>
              Already have an acount Login
              <NavLink to="/login" className="link">
                {" "}
                Here
              </NavLink>
            </span>
            <button
              type="submit"
              className="btn btn-success btn-md"
              onClick={HandleSignup}
            >
              SignUp
            </button>
          </div>
        </form>
        {errMsg && (
          <>
            <div className="success-msg text-danger">{errMsg}</div>
          </>
        )}
      </div>
    </>
  );
};

export default SignUp;
