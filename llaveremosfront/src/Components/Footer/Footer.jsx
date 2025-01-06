import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/Images/logo_big.png'
import insta from '../Assets/Images/instagram_icon.png'
import whats from '../Assets/Images/whatsapp_icon.png'
import pinterest from '../Assets/Images/pintester_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} alt="" />
        <p>Llaveremos</p>
      </div>
      <div className="footer-social-icon">
        <div className="footer-icons-container">
          <a href="https://www.instagram.com/_alexito_gm_/" target="_blank" rel="noopener noreferrer">
            <img src={insta} alt="Instagram" />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
            <img src={whats} alt="WhatsApp" />
          </a>
        </div>
        <div className="footer-icons-container">
          <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
            <img src={pinterest} alt="Pinterest" />
          </a>
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
