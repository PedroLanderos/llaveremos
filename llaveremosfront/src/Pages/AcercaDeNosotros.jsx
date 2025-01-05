import React from 'react';
import './CSS/AcercaDeNosotros.css';

const AcercaDeNosotros = () => {
  return (
    <div className="about-us">
      <div className="about-us-container">
        <h1>Acerca de Nosotros</h1>
        <p>
          En <strong>Nuestra Tienda</strong>, estamos comprometidos con ofrecerte los mejores productos
          de calidad, diseñados con cuidado y pasión. Nuestro objetivo es brindar a nuestros clientes
          una experiencia única, llena de confianza y satisfacción.
        </p>
        <p>
          Desde nuestro inicio, nos hemos esforzado por mantener los más altos estándares en cada
          uno de nuestros productos, asegurándonos de que cada artículo refleje nuestra dedicación
          a la excelencia.
        </p>
        <div className="about-us-values">
          <h2>Nuestros Valores</h2>
          <ul>
            <li><strong>Calidad:</strong> Nos aseguramos de que cada producto sea el mejor en su categoría.</li>
            <li><strong>Innovación:</strong> Constantemente buscamos formas de mejorar y destacar.</li>
            <li><strong>Confianza:</strong> Construimos relaciones duraderas con nuestros clientes.</li>
          </ul>
        </div>
        <div className="about-us-mission">
          <h2>Nuestra Misión</h2>
          <p>
            Inspirar confianza y satisfacción en cada cliente, al ofrecer productos de alta calidad y
            un servicio excepcional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcercaDeNosotros;
