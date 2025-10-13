import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  const navStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    padding: "15px",
    backgroundColor: "#121212",
    color: "white",
    fontWeight: "bold",
  };

  const linkStyle = (path: string) => ({
    color: location.pathname === path ? "#00ffcc" : "white",
    textDecoration: "none",
    borderBottom: location.pathname === path ? "2px solid #00ffcc" : "none",
    paddingBottom: "5px",
  });

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle("/")}>Home</Link>
      <Link to="/upload" style={linkStyle("/upload")}>Upload</Link>
      <Link to="/search" style={linkStyle("/search")}>Search</Link>
    </nav>
  );
};

export default Navbar;
