import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'

export default function Navbar() {

    const[menu, setMenu] = useState("catalogo");
  return (
    <div div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>TIENDA</p>
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("catalogo")}}>Catalogo{menu==="catalogo"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("nuevo")}}>Nuevo{menu==="nuevo"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("ubicacion")}}>Ubicacion{menu==="ubicacion"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("an")}}>Acerca de nosotros{menu==="an"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        <button>Iniciar sesion</button>
        <img src={cart_icon} alt="" />
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  )
}
