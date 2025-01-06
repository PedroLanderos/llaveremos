import React, { useState, useContext } from "react";
import "./Navbar.css";
import logo from "../Assets/Images/logoPrueba.webp";
import cart_icon from "../Assets/Images/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { AuthContext } from "../../Context/AuthContext";

export default function Navbar() {
  const [menu, setMenu] = useState("catalogo");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú móvil
  const { cartItems } = useContext(ShopContext);
  const { auth, logout } = useContext(AuthContext);

  // Calcular el total de ítems en el carrito
  const totalCartItems = cartItems.reduce(
    (total, item) => total + (item.cartQuantity || 0),
    0
  );

  const handleLogout = () => {
    if (window.confirm("¿Cerrar sesión?")) {
      logout();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" className="logo-image" />
        <Link style={{ textDecoration: "none" }} to="/">
          <p>LLAVEREMOS</p>
        </Link>
      </div>

      {/* Botón de menú hamburguesa */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
        <li
          className={menu === "catalogo" ? "active" : ""}
          onClick={() => {
            setMenu("catalogo");
            setIsMenuOpen(false);
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Catalogo
          </Link>
          {menu === "catalogo" && <hr />}
        </li>
        <li
          className={menu === "an" ? "active" : ""}
          onClick={() => {
            setMenu("an");
            setIsMenuOpen(false);
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/AcercaDeNosotros">
            Acerca de nosotros
          </Link>
          {menu === "an" && <hr />}
        </li>
      </ul>

      <div className="nav-login-cart">
        {auth.isAuthenticated && auth.user?.name ? (
          <div className="nav-user">
            <div
              className="user-icon"
              onClick={handleLogout}
              title={`Cerrar sesión (${auth.user.name})`}
            >
              {auth.user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/Login">
            <button>Iniciar sesión</button>
          </Link>
        )}
        <Link style={{ textDecoration: "none", position: "relative" }} to="/cart">
          <img src={cart_icon} alt="Cart" />
          {totalCartItems > 0 && (
            <div className="nav-cart-count">{totalCartItems}</div>
          )}
        </Link>
      </div>
    </div>
  );
}
