import React from 'react';
import './inicio.css';
import celular from '@/assets/img/PÁGINA PRINCIPAL/celular.png';
import computadora from '@/assets/img/PÁGINA PRINCIPAL/compu.png';
import { Link } from 'react-router-dom';

const Inicio: React.FC = () => {
  return (
    <div className="landing-page">
      <div className="gradient-overlay">
      <section className="hero">
  <div className="hero-content">
    <div className="hero-text">
      <h1>Control Industrial Inteligente</h1>
      <p className="hero-description">Potencia tu producción con ECOBLASTIC. Monitoreo en tiempo real, análisis predictivo y control total de tu inyectora de plástico.</p>
      <div className="cta-group">
        <Link to="/data-entry" className="primary-btn">Iniciar Ahora</Link>
      </div>
    </div>
    <div className="hero-visual">
      <img src={celular} alt="ECOBLASTIC Móvil" className="floating" />
    </div>
  </div>
</section>

<section className="features">
  <div className="features-grid">
    <div className="feature-card">
      <i className="fi fi-rr-temperature-high"></i>
      <h3>Control Térmico</h3>
      <p>Monitoreo en tiempo real</p>
    </div>
    <div className="feature-card">
      <i className="fi fi-rr-time-fast"></i>
      <h3>Optimización</h3>
      <p>Eficiencia productiva</p>
    </div>
    <div className="feature-card">
      <i className="fi fi-rr-chart-line-up"></i>
      <h3>Análisis</h3>
      <p>Datos en tiempo real</p>
    </div>
    <div className="feature-card">
      <i className="fi fi-rr-settings-sliders"></i>
      <h3>Gestión</h3>
      <p>Control integral</p>
    </div>
  </div>
</section>

        <section className="dashboard-preview">
          <div className="preview-content">
            <div className="preview-text">
              <h2>Interfaz Intuitiva y Potente</h2>
              <p>Visualiza, controla y optimiza todos tus procesos desde una única plataforma centralizada.</p>
              <ul className="feature-list">
                <li>✓ Dashboard personalizable</li>
                <li>✓ Alertas en tiempo real</li>
                <li>✓ Reportes automáticos</li>
                <li>✓ Control remoto seguro</li>
              </ul>
            </div>
            <div className="preview-image">
              <img src={computadora} alt="Dashboard" className="dashboard-img" />
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="stats-container">
            <div className="stat-item">
              <h4>99.9%</h4>
              <p>Precisión</p>
            </div>
            <div className="stat-item">
              <h4>50%</h4>
              <p>Ahorro Energético</p>
            </div>
            <div className="stat-item">
              <h4>24/7</h4>
              <p>Monitoreo</p>
            </div>
            <div className="stat-item">
              <h4>+1000</h4>
              <p>Usuarios Activos</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Inicio;
