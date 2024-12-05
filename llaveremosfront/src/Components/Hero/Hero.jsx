import React from 'react'
import './Hero.css'
import handIcon from '../Assets/hand_icon.png'  
import arroIcon from '../Assets/arrow.png'
import heroImage from '../Assets/hero-removebg-preview.png'

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
          <p>Disenos</p>
          <p>De los mejores llaveros</p>
        </div>
        <div className="hero-latest-btn">
          <div>Ultimos disenos</div>
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
