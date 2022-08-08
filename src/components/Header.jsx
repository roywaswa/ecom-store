import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="logo">Kate</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/dashboard">Account</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </header>
  );
}

export default Header;
