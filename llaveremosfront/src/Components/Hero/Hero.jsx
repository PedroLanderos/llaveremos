import React from 'react'
import './Hero.css'
import handIcon from '../Assets/Images/hand_icon.png'  
import arroIcon from '../Assets/Images/arrow.png'
import heroImage from '../Assets/Images/hero-removebg-preview.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>LLaveros</h2>
        <div>
          <div className="hero-hand-icon">
            <p>Nuevos</p>
            <img src={handIcon} alt="" />
          </div>
          <p>Diseños</p>
          <p>De los mejores llaveros</p>
        </div>
        <div className="hero-latest-btn">
          <div>Ultimos diseños</div>
          <img src={arroIcon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={heroImage} alt="" />
      </div>
    </div>
  )
}

export default Hero
