import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export default function View() {
  const { id } = useParams(); // Captura el ID de la mascota desde la ruta
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Obtener la información detallada de la mascota usando React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['mascota', id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/pets/show/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // De acuerdo a Postman, tu API devuelve un objeto con { message, Pet: { ... } }
      return data.Pet;
    },
    enabled: !!id && !!token // Solo se ejecuta si hay un ID y un token válidos
  });

  if (isLoading) {
    return (
      <div className="app-card-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: '#555', fontWeight: 'bold' }}>Cargando datos de la mascota...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="app-card-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: '#ff5722', fontWeight: 'bold', textAlign: 'center' }}>
          No se pudo cargar la información de la mascota.
        </p>
        <button onClick={() => navigate('/dashboard')} className="btn-submit-green" style={{ maxWidth: '200px', marginTop: '15px' }}>
          Volver al Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="app-card-container">
      {/* Botón Volver (Flecha naranja en la parte superior izquierda) */}
      <button onClick={() => navigate('/dashboard')} className="btn-back-arrow" title="Volver al panel">
        ↩
      </button>

      {/* Botón flotante superior derecho para ir directamente a editar la mascota */}
      <button 
        onClick={() => navigate(`/edit/${id}`)} 
        style={{
          position: 'absolute',
          top: '30px',
          right: '25px',
          background: 'none',
          border: 'none',
          fontSize: '28px',
          cursor: 'pointer',
          color: '#9c27b0',
          zIndex: 10,
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.15)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        title="Editar Mascota"
      >
        📝
      </button>

      {/* Encabezado con el isotipo circular correspondiente */}
      <div className="app-header-logo">
        <div className="logo-circle">🔍</div>
        <h2 className="app-title">VIEW PET</h2>
      </div>

      {/* Formulario de solo lectura con estilos idénticos al mockup */}
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingRight: '2px' }}>
        
        <div className="form-group-custom">
          <label>Name:</label>
          <input type="text" value={data.name || ''} readOnly className="input-custom-gray" />
        </div>

        <div className="form-group-custom">
          <label>Kind:</label>
          <input type="text" value={data.kind || ''} readOnly className="input-custom-gray" />
        </div>

        <div className="form-group-custom">
          <label>Weight:</label>
          <input type="text" value={`${data.weight || 0} kg`} readOnly className="input-custom-gray" />
        </div>

        <div className="form-group-custom">
          <label>Age (years):</label>
          <input type="text" value={`${data.age || 0} años`} readOnly className="input-custom-gray" />
        </div>

        <div className="form-group-custom">
          <label>Breed:</label>
          <input type="text" value={data.breed || ''} readOnly className="input-custom-gray" />
        </div>

        <div className="form-group-custom">
          <label>Location:</label>
          <input type="text" value={data.location || ''} readOnly className="input-custom-gray" />
        </div>

        <div className="form-group-custom">
          <label>Description:</label>
          <textarea 
            value={data.description || ''} 
            readOnly 
            className="input-custom-gray" 
            style={{ minHeight: '70px', resize: 'none', padding: '10px 15px' }} 
          />
        </div>

        {/* Indicadores inferiores de estado de la Mascota */}
        <div style={{ display: 'flex', gap: '15px', marginTop: '15px', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>Active:</span>
            <div style={{
              backgroundColor: data.active === 1 ? '#76ba8d' : '#ccc',
              color: 'white',
              padding: '8px',
              borderRadius: '15px',
              fontSize: '14px',
              fontWeight: 'bold',
              marginTop: '5px'
            }}>
              {data.active === 1 ? 'Active' : 'Inactive'}
            </div>
          </div>

          <div style={{ flex: 1, textAlign: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>Status:</span>
            <div style={{
              backgroundColor: data.status === 1 ? '#2196f3' : '#cfcfcf',
              color: data.status === 1 ? 'white' : '#555',
              padding: '8px',
              borderRadius: '15px',
              fontSize: '14px',
              fontWeight: 'bold',
              marginTop: '5px'
            }}>
              {data.status === 1 ? 'Adopted' : 'Not Adopted'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}