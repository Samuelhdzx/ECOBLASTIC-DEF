import React, { useState } from 'react';
import './Predicciones.css';
import gramaje from '@/assets/img/predicciones/gramaje.svg';
import temperatura from '@/assets/img/predicciones/temperatura.svg';
import tiempo from '@/assets/img/predicciones/tiempo.svg';

const Predicciones: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState('PET');
  const [selectedParameter, setSelectedParameter] = useState('gramaje');

  const getContent = (material: string, parameter: string) => {
    const content = {
      PET: {
        gramaje: { 
          text: "Densidad: 1.34-1.39 g/cm³", 
          image: gramaje,
          energiaEmpleada: "350-400 kWh/ton",
          eficiencia: "92%"
        },
        temperatura: { 
          text: "Temperatura de fusión: 260°C", 
          image: temperatura,
          rangoDePresion: "80-100 bar",
          tiempoDeEnfriamiento: "8-12s"
        },
        tiempo: { 
          text: "Tiempo de ciclo: 15-30 segundos", 
          image: tiempo,
          presion: "40-60 MPa",
          tasaDeCalidad: "98%"
        }
      },
      POLIPROPILENO: {
        gramaje: { 
          text: "Densidad: 0.90-0.91 g/cm³", 
          image: gramaje,
          energiaEmpleada: "280-320 kWh/ton",
          eficiencia: "95%"
        },
        temperatura: { 
          text: "Temperatura de fusión: 165°C", 
          image: temperatura,
          rangoDePresion: "60-80 bar",
          tiempoDeEnfriamiento: "6-10s"
        },
        tiempo: { 
          text: "Tiempo de ciclo: 10-25 segundos", 
          image: tiempo,
          presion: "30-50 MPa",
          tasaDeCalidad: "97%"
        }
      }
    };    return content[material as keyof typeof content][parameter as keyof typeof content.PET];
  };

  const currentContent = getContent(selectedMaterial, selectedParameter);

  return (
    <div className="predicciones-main">
      <div className="predicciones-header">
        <h1>Predicciones de Material</h1>
        <p>Análisis Predictivo</p>
      </div>

      <div className="predicciones-content">
        <div className="predicciones-material-selector">
          <button className={`predicciones-btn ${selectedMaterial === 'PET' ? 'predicciones-active' : ''}`} onClick={() => setSelectedMaterial('PET')}>PET</button>
          <button className={`predicciones-btn ${selectedMaterial === 'POLIPROPILENO' ? 'predicciones-active' : ''}`} onClick={() => setSelectedMaterial('POLIPROPILENO')}>POLIPROPILENO</button>
        </div>

        <div className="predicciones-parameters">
          <button className={`predicciones-param-btn ${selectedParameter === 'gramaje' ? 'predicciones-active' : ''}`} onClick={() => setSelectedParameter('gramaje')}>Gramaje</button>
          <button className={`predicciones-param-btn ${selectedParameter === 'temperatura' ? 'predicciones-active' : ''}`} onClick={() => setSelectedParameter('temperatura')}>Temperatura</button>
          <button className={`predicciones-param-btn ${selectedParameter === 'tiempo' ? 'predicciones-active' : ''}`} onClick={() => setSelectedParameter('tiempo')}>Tiempo</button>
        </div>

        <div className="predicciones-results">
          <img src={currentContent.image} alt="Material visualization" className="predicciones-image" />
          <h3 className="predicciones-text">{currentContent.text}</h3>
          <div className="predicciones-metrics">
            {Object.entries(currentContent)
              .filter(([key]) => key !== 'text' && key !== 'image')
              .map(([key, value]) => (
                <div key={key} className="predicciones-metric-card">
                  <h4 className="predicciones-metric-title">{key.replace(/([A-Z])/g, ' $1').toUpperCase()}</h4>
                  <div className="predicciones-metric-value">{value}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predicciones;