import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <p className="copyright">&copy; Kate 2022</p>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/dashboard">Account</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">about</Link>
      </nav>
    </footer>
  );
}

export default Footer;
