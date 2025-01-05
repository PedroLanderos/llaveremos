import React, { useState, useContext } from "react";
import "./Navbar.css";
import logo from "../Assets/Images/logoPrueba.webp";
import cart_icon from "../Assets/Images/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { AuthContext } from "../../Context/AuthContext"; // Importa el contexto

export default function Navbar() {
  const [menu, setMenu] = useState("catalogo");
  const { cartItems } = useContext(ShopContext);
  const { auth, logout } = useContext(AuthContext); // Usa el estado y la función logout

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" style={{ width: "65px", height: "65px", borderRadius: "10%" }} />
        <Link style={{ textDecoration: "none" }} to="/">
          <p>TIENDA</p>
        </Link>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu("catalogo")}>
          <Link style={{ textDecoration: "none" }} to="/">
            Catalogo
          </Link>
          {menu === "catalogo" && <hr />}
        </li>
        <li onClick={() => setMenu("an")}>
          <Link style={{ textDecoration: "none" }} to="/AcercaDeNosotros">
            Acerca de nosotros
          </Link>
          {menu === "an" && <hr />}
        </li>
      </ul>
      <div className="nav-login-cart">
        {auth.isAuthenticated ? (
          <div className="nav-user">
            <div
              className="user-icon"
              onClick={() => {
                if (window.confirm("¿Cerrar sesión?")) logout();
              }}
            >
              {auth.user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/Login">
            <button>Iniciar sesión</button>
          </Link>
        )}
        <Link style={{ textDecoration: "none" }} to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        {totalCartItems > 0 && <div className="nav-cart-count">{totalCartItems}</div>}
      </div>
    </div>
  );
}
