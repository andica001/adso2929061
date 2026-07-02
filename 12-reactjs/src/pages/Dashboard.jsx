import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = 'http://127.0.0.1:8000/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 1. Obtener la lista de mascotas (Validando el endpoint exacto sin barras sobrantes)
  const { data: mascotas, isLoading, isError } = useQuery({
    queryKey: ['mascotas'],
    queryFn: async () => {
      const activeToken = localStorage.getItem('token');
      
      if (!activeToken) {
        throw new Error('No se encontró un token activo.');
      }

      const response = await axios.get(`${API_URL}/pets/list`, {
        headers: { 
          'Authorization': `Bearer ${activeToken}`,
          'Accept': 'application/json'
        }
      });

      // Mapeo seguro de la estructura de datos que devuelve Laravel
      if (response.data && response.data.Pets) return response.data.Pets;
      if (response.data && response.data.data) return response.data.data;
      if (Array.isArray(response.data)) return response.data;
      return [];
    },
    enabled: !!localStorage.getItem('token'),
    retry: false
  });

  // 2. Mutación para Eliminar una Mascota (DELETE)
  const mutationEliminar = useMutation({
    mutationFn: async (id) => {
      const activeToken = localStorage.getItem('token');
      await axios.delete(`${API_URL}/pets/delete/${id}`, {
        headers: { Authorization: `Bearer ${activeToken}` }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['mascotas']);
      Swal.fire({
        icon: 'success',
        title: '¡Eliminado!',
        text: 'El peludito ha sido removido del sistema.',
        timer: 1500,
        showConfirmButton: false
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al eliminar',
        text: error.response?.data?.message || 'No se pudo completar la acción.'
      });
    }
  });

  // 3. Manejo de Cierre de Sesión (Logout)
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // 4. Confirmación de eliminación con SweetAlert2
  const confirmDelete = (id, name) => {
    Swal.fire({
      title: `¿Eliminar a ${name}?`,
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        mutationEliminar.mutate(id);
      }
    });
  };

  // VISTA ⏳: Cargando datos centrado en el marco móvil
  if (isLoading) {
    return (
      <div className="app-card-container status-view">
        <p style={{ color: '#555' }}>Cargando peluditos...</p>
      </div>
    );
  }

  // VISTA ❌: Pantalla de error limpia y centrada
  if (isError) {
    return (
      <div className="app-card-container status-view">
        <p style={{ color: '#ff5722' }}>Error al conectar con el servidor.</p>
        <button onClick={handleLogout} className="btn-submit-green" style={{ width: '80%' }}>
          Volver al Login
        </button>
      </div>
    );
  }

  return (
    <div className="app-card-container">
      {/* Encabezado del Dashboard */}
      <div className="dashboard-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <button onClick={handleLogout} className="btn-logout-icon" title="Cerrar Sesión" style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
          🚪
        </button>
        
        <div className="app-header-logo" style={{ margin: 0, gap: '8px' }}>
          <div className="logo-circle" style={{ width: '35px', height: '35px', fontSize: '16px' }}>🐾</div>
          <h2 className="app-title" style={{ fontSize: '18px' }}>PET DASHBOARD</h2>
        </div>
      </div>

      {/* Botón para agregar una nueva mascota */}
      <button onClick={() => navigate('/add')} className="btn-submit-green" style={{ marginBottom: '15px', padding: '10px', fontSize: '14px' }}>
        ➕ Nueva Mascota
      </button>

      {/* Contenedor scrolleable interno con la lista de tarjetas */}
      <div className="scrollable-items-container" style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
        {mascotas && mascotas.length > 0 ? (
          mascotas.map((pet) => (
            <div key={pet.id} className="pet-list-item-card" style={{ display: 'flex', alignItems: 'center', background: '#f8f9fa', padding: '10px', borderRadius: '12px', marginBottom: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              
              {/* Miniatura de la Mascota */}
              <div className="pet-avatar" style={{ width: '50px', height: '50px', borderRadius: '8px', background: '#e9ecef', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', marginRight: '12px' }}>
                🐶
              </div>

              {/* Información Básica */}
              <div className="pet-info-meta" style={{ flex: 1 }}>
                <h4 style={{ margin: '0 0 2px 0', fontSize: '15px', color: '#333' }}>{pet.name}</h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#777' }}>{pet.kind} - {pet.breed}</p>
              </div>

              {/* Acciones del CRUD */}
              <div className="pet-action-buttons" style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => navigate(`/view/${pet.id}`)} className="btn-action-view" style={{ background: '#00bcd4', color: '#fff', border: 'none', padding: '6px 8px', borderRadius: '6px', cursor: 'pointer' }} title="Ver">
                  👁️
                </button>
                <button onClick={() => navigate(`/edit/${pet.id}`)} className="btn-action-edit" style={{ background: '#9c27b0', color: '#fff', border: 'none', padding: '6px 8px', borderRadius: '6px', cursor: 'pointer' }} title="Editar">
                  📝
                </button>
                <button onClick={() => confirmDelete(pet.id, pet.name)} className="btn-action-delete" style={{ background: '#f44336', color: '#fff', border: 'none', padding: '6px 8px', borderRadius: '6px', cursor: 'pointer' }} title="Eliminar">
                  🗑️
                </button>
              </div>

            </div>
          ))
        ) : (
          <p style={{ textAlignment: 'center', color: '#999', marginTop: '20px' }}>No hay peluditos registrados aún.</p>
        )}
      </div>
    </div>
  );
}