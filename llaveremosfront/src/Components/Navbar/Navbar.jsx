import React, { useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logoPrueba.webp'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom';

export default function Navbar() {

    const[menu, setMenu] = useState("catalogo");
  return (
    <div div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" style={{ width: '65px', height: '65px', borderRadius: '10%'}} />
        <Link style={{textDecoration:'none'}} to='/'><p>TIENDA</p></Link>
        
        
      </div>
      <ul className="nav-menu">
        <li onClick={()=>{setMenu("catalogo")}}><Link style={{textDecoration:'none'}} to='/'>Catalogo</Link> {menu==="catalogo"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("an")}}><Link style={{textDecoration:'none'}} to='/AcercaDeNosotros'>Acerca de nosotros</Link>{menu==="an"?<hr/>:<></>}</li>
      </ul>
      <div className="nav-login-cart">
        <Link style={{textDecoration:'none'}} to='/Login'><button>Iniciar sesion</button></Link>
        <Link style={{textDecoration:'none'}} to='/CarritoDeCompras'><img src={cart_icon} alt="" /></Link>
        <div className="nav-cart-count">0</div>
      </div>
    </div>
  )
}
