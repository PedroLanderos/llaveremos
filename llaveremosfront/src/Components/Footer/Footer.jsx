import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_big.png'
import insta from '../Assets/instagram_icon.png'
import whats from '../Assets/whatsapp_icon.png'
import pinterest from '../Assets/pintester_icon.png'


const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>Llaveremos</p>
      </div>
      <ul className="footer-links">
        <li>a</li>
        <li>b</li>
        <li>c</li>
        <li>d</li>
        <li>e</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
            <img src={insta} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={whats} alt="" />
        </div>
        <div className="footer-icons-container">
            <img src={pinterest} alt="" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @ 2024 - Todos los derechos reservados.</p>
      </div>
    </div>
  )
}

export default Footer
