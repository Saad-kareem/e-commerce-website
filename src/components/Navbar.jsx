import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../Images/logo2.jpg";
import Icon from "react-icons-kit";
import { shoppingCart } from "react-icons-kit/feather/shoppingCart";
import { signOut } from "firebase/auth";
import { auth } from "./Config/Config";

const Navbar = ({ user,totalProducts }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };
  return (
    <>
      <div className="navbar  navbar-light bg-light">
        <div className="leftside">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="rightside">
          {!user && (
            <>
              <div>
                <NavLink className="navlink" to="/signup">
                  SIGNUP
                </NavLink>
              </div>
              <div>
                <NavLink className="navlink" to="/login">
                  LOGIN
                </NavLink>
              </div>
            </>
          )}

          {user && (
            <>
              <div>
                <NavLink className="navlink" to="/">
                {user}
                </NavLink>
              </div>
              <div className="cart-menu-btn">
                <NavLink className="navlink" to="/cart">
                  <Icon icon={shoppingCart} size={20} />
                </NavLink>
                <span className='cart-indicator'>{totalProducts}</span>
              </div>
              <div className="btn btn-danger btn-md" onClick={handleLogout}>
                LOGOUT
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
