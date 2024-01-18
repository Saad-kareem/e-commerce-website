import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "./Config/Config";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [suucessMsg, setSuccessMsg] = useState("");

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      const SignIn = await signInWithEmailAndPassword(auth, email, password);
      setSuccessMsg(
        "Login Successfull. You will now automatically get redirected to Home Page"
      );
      setEmail("");
      setPassword("");
      setErrMsg("");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/");
      }, 3000);
    } catch (err) {
      setErrMsg(err.message);
    }
  };
  return (
    <>
      <div className="container">
        <h1 className="heaidng">Login</h1>
        <hr />
        {suucessMsg && (
          <>
            <div className="success-msg text-success">{suucessMsg}</div>
          </>
        )}
        <form className="form-group" autoComplete="off">
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
          {/* <button onClick={handleReset}>Reset Password</button>
          {resetSent && <p>Password reset email sent. Check your inbox.</p>} */}
          <div className="btn-box">
            <span>
              Don't have an acount SignUp
              <NavLink to="/signup" className="link">
                {" "}
                Here
              </NavLink>
            </span>
            <button
              type="submit"
              className="btn btn-success btn-md"
              onClick={HandleLogin}
            >
              Login
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

export default Login;
