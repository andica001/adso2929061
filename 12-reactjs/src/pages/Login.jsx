import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = 'http://127.0.0.1:8000/api';

export default function Login() {
  const navigate = useNavigate();
  const queryClientContext = useQueryClient();

  // Mutación de React Query para controlar el inicio de sesión
  const mutationLogin = useMutation({
    mutationFn: async (credenciales) => {
      const { data } = await axios.post(`${API_URL}/login`, credenciales);
      return data; 
    },
    onSuccess: (data) => {
      // Validar si el backend responde con HTTP 200 pero con mensaje de credenciales inválidas (image_9fec5d.png)
      if (data.message && data.message.includes('Invalid Credentials')) {
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'El correo electrónico o la contraseña son incorrectos.',
        });
        return; 
      }

      // Guardar el Token de manera exitosa
      if (data.token) {
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      }

      // Limpiar las queries previas de mascotas para que cargue los nuevos datos limpios
      queryClientContext.invalidateQueries(['mascotas']);

      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Inicio de sesión correcto',
        timer: 1500,
        showConfirmButton: false
      });
      
      // Redirección por ruta real hacia el Dashboard (image_41a421.png)
      navigate('/dashboard');
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Error de servidor',
        text: 'No se pudo conectar con el servidor en este momento.',
      });
    }
  });

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const credenciales = Object.fromEntries(formData);
    mutationLogin.mutate(credenciales);
  };

  return (
    <div className="vista-container login" style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', textAlign: 'center', background: '#fff', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
      {/* Contenedor del Logo adaptado a tus propiedades visuales */}
      <div style={{ height: '50px', maxWidth: '180px', padding: '15px', margin: '0 auto' }}>
        <h2 style={{ color: '#333', margin: 0 }}>Larapi</h2>
      </div>
      
      <h3 style={{ color: '#444', marginTop: '10px' }}>¡Bienvenido!</h3>
      <p style={{ color: '#777' }}>Por favor, inicia sesión para continuar.</p>
      
      <form onSubmit={handleSubmitForm} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <div style={{ textAlign: 'left' }}>
          <label style={{ color: '#555', fontSize: '14px' }}><strong>Correo Electrónico:</strong></label>
          <input 
            name="email" 
            type="email" 
            placeholder="ejemplo@correo.com" 
            required 
            style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', marginTop: '5px', boxSizing: 'border-box' }} 
          />
        </div>
        
        <div style={{ textAlign: 'left' }}>
          <label style={{ color: '#555', fontSize: '14px' }}><strong>Contraseña:</strong></label>
          <input 
            name="password" 
            type="password" 
            placeholder="***********" 
            required 
            style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', marginTop: '5px', boxSizing: 'border-box' }} 
          />
        </div>
        
        <p style={{ fontSize: '12px', color: '#888', cursor: 'pointer', textAlign: 'right', margin: '0' }}>
          ¿Olvidaste tu contraseña?
        </p>
        
        <button 
          type="submit" 
          disabled={mutationLogin.isPending}
          style={{ 
            backgroundColor: mutationLogin.isPending ? '#ccc' : '#76ba8d', 
            color: 'white', 
            padding: '12px', 
            borderRadius: '20px', 
            border: 'none', 
            cursor: mutationLogin.isPending ? 'not-allowed' : 'pointer', 
            fontWeight: 'bold',
            fontSize: '16px',
            marginTop: '10px'
          }}
        >
          {mutationLogin.isPending ? 'Validando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
}