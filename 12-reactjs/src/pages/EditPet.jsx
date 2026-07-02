import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = 'http://127.0.0.1:8000/api';

export default function EditPet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  // 1. Obtener los datos actuales de la mascota para rellenar el formulario
  const { data: mascota, isLoading } = useQuery({
    queryKey: ['mascota', id],
    queryFn: async () => {
      const { data } = await axios.get(`${API_URL}/pets/show/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data.Pet;
    },
    enabled: !!id && !!token
  });

  // 2. Mutación para enviar los datos actualizados (PUT /update)
  const mutationEditar = useMutation({
    mutationFn: async (datosActualizados) => {
      const { data } = await axios.put(`${API_URL}/pets/edit/${id}`, datosActualizados, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data;
    },
    onSuccess: () => {
      // Invalidar cachés para forzar actualización global de datos
      queryClient.invalidateQueries(['mascotas']);
      queryClient.invalidateQueries(['mascota', id]);
      
      Swal.fire({
        icon: 'success',
        title: '¡Actualizado!',
        text: 'Los cambios fueron guardados con éxito',
        timer: 1500,
        showConfirmButton: false
      });
      navigate('/dashboard');
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar',
        text: error.response?.data?.message || 'No se pudieron guardar los cambios.'
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const datosFormulario = Object.fromEntries(formData);

    // Ajuste de tipos de datos requeridos por la base de datos de Laravel
    const dataEstructurada = {
      name: datosFormulario.name,
      kind: datosFormulario.kind,
      weight: parseFloat(datosFormulario.weight),
      age: parseInt(datosFormulario.age, 10),
      breed: datosFormulario.breed,
      location: datosFormulario.location,
      description: datosFormulario.description,
      active: parseInt(datosFormulario.active, 10),
      status: parseInt(datosFormulario.status, 10)
    };

    mutationEditar.mutate(dataEstructurada);
  };

  if (isLoading) {
    return (
      <div className="app-card-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: '#555', fontWeight: 'bold' }}>Cargando datos del peludito...</p>
      </div>
    );
  }

  return (
    <div className="app-card-container">
      <button onClick={() => navigate('/dashboard')} className="btn-back-arrow">↩</button>

      <div className="app-header-logo">
        <div className="logo-circle">📝</div>
        <h2 className="app-title">EDIT PET</h2>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', paddingRight: '2px' }}>
        
        <div className="form-group-custom">
          <label>Name:</label>
          <input name="name" defaultValue={mascota?.name || ''} required className="input-custom-gray" />
        </div>

        <div className="form-group-custom">
          <label>Kind:</label>
          <input name="kind" defaultValue={mascota?.kind || ''} required className="input-custom-gray" />
        </div>

        <div className="form-group-custom">
          <label>Weight (kg):</label>
          <input name="weight" type="number" step="0.1" defaultValue={mascota?.weight || ''} required className="input-custom-gray" />
        </div>

        <div className="form-group-custom">
          <label>Age (years):</label>
          <input name="age" type="number" defaultValue={mascota?.age || ''} required className="input-custom-gray" />
        </div>

        <div className="form-group-custom">
          <label>Breed:</label>
          <input name="breed" defaultValue={mascota?.breed || ''} required className="input-custom-gray" />
        </div>

        <div className="form-group-custom">
          <label>Location:</label>
          <input name="location" defaultValue={mascota?.location || ''} required className="input-custom-gray" />
        </div>

        <div className="form-group-custom">
          <label>Description:</label>
          <textarea name="description" defaultValue={mascota?.description || ''} required className="input-custom-gray" style={{ minHeight: '60px', resize: 'none' }} />
        </div>

        {/* selectores de estado basados en tu mockup */}
        <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
          <div className="form-group-custom" style={{ flex: 1 }}>
            <label>Active:</label>
            <select name="active" defaultValue={mascota?.active ?? 1} className="input-custom-gray" style={{ padding: '10px' }}>
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

          <div className="form-group-custom" style={{ flex: 1 }}>
            <label>Status:</label>
            <select name="status" defaultValue={mascota?.status ?? 0} className="input-custom-gray" style={{ padding: '10px' }}>
              <option value={0}>Not Adopted</option>
              <option value={1}>Adopted</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={mutationEditar.isPending} className="btn-submit-green">
          {mutationEditar.isPending ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
}