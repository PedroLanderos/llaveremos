import React from 'react'
import './CSS/LoginSignup.css'
const LoginSignup = () => {
  return (
    <div className='loginsingup'>
      <div className="loginSingup-container">
        <h1>Registrarse</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder='Tu nombre'/>
          <input type="text" placeholder='Direccion de correco electronico'/>
          <input type="text" placeholder='Contrasena'/>
        </div>
        <button>Contiunar</button>
        <p className='loginsignup-login'>Ya tienes una cuenta? <span> Inicia sesion aqui<span/> </span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id=''/>
          <p>Al continuar, aceptas los términos y condiciones.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
