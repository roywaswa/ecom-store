import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Header() {
  const { authState } = useContext(AuthContext);
  const isAdmin = authState && authState.isAdmin;

  return (
    <header>
      <div className="logo">Kate</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/dashboard">Account</Link>
        {isAdmin && <Link to="/admin">Admin</Link>}
      </nav>
    </header>
  );
}

export default Header;
