import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';

const queryClient = new QueryClient();

// URL Base de tu API en Laravel
const API_URL = 'http://127.0.0.1:8000/api';

function ChallengeContent() {
  // Estados de navegación y selección
  const [vista, setVista] = useState('login');
  const [mascotaSeleccionadaId, setMascotaSeleccionadaId] = useState(null);

  const queryClientContext = useQueryClient();
  const token = localStorage.getItem('token');

  // ========================================================
  // MUTACIÓN: INICIO DE SESIÓN (POST /api/login)
  // ========================================================
  const mutationLogin = useMutation({
    mutationFn: async (credenciales) => {
      const { data } = await axios.post(`${API_URL}/login`, credenciales);
      return data; 
    },
    onSuccess: (data) => {
      // Control de credenciales erróneas (Aunque devuelva HTTP 200)
      if (data.message && data.message.includes('Invalid Credentials')) {
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'El correo electrónico o la contraseña son incorrectos.',
        });
        return; 
      }

      // Guardado de Token Exitoso
      if (data.token) {
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      }

      queryClientContext.invalidateQueries(['mascotas']);

      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Inicio de sesión correcto',
        timer: 1500,
        showConfirmButton: false
      });
      
      setVista('dashboard');
    },
    onError: () => {
      Swal.fire({
        icon: 'error',
        title: 'Error de servidor',
        text: 'No se pudo conectar con el servidor en este momento.',
      });
    }
  });

  // ========================================================
  // MUTACIÓN: CIERRE DE SESIÓN (POST /api/logout)
  // ========================================================
  const mutationLogout = useMutation({
    mutationFn: async () => {
      const currentToken = localStorage.getItem('token');
      const { data } = await axios.post(
        `${API_URL}/logout`, 
        {}, 
        { headers: { Authorization: `Bearer ${currentToken}` } }
      );
      return data;
    },
    onSuccess: (data) => {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];

      Swal.fire({
        icon: 'success',
        title: 'Sesión Cerrada',
        text: data.message || 'Has cerrado sesión correctamente.',
        timer: 1500,
        showConfirmButton: false
      });

      setVista('login');
    },
    onError: () => {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setVista('login');
    }
  });

  // ========================================================
  // MUTACIÓN: ELIMINAR MASCOTA (DELETE /api/pets/{id})
  // ========================================================
  const mutationEliminar = useMutation({
    mutationFn: async (id) => {
      const currentToken = localStorage.getItem('token');
      await axios.delete(`${API_URL}/pets/delete/${id}`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
    },
    onSuccess: () => {
      queryClientContext.invalidateQueries(['mascotas']);
      Swal.fire('Eliminado', 'La mascota ha sido removida con éxito', 'success');
    },
    onError: (err) => {
      Swal.fire('Error', `No se pudo eliminar: ${err.message}`, 'error');
    }
  });

  const handleEliminar = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) mutationEliminar.mutate(id);
    });
  };


  // ==========================================
  // VISTA 1: LOGIN 
  // ==========================================
  const VistaLogin = () => {
    const handleSubmitForm = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const credenciales = Object.fromEntries(formData);
      mutationLogin.mutate(credenciales);
    };

    return (
      <div className="vista-container login" style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', textAlign: 'center' }}>
        <div style={{ height: '50px', maxWidth: '180px', padding: '15px', margin: '0 auto' }}>
          <h2>Larapi</h2>
        </div>
        
        <h3>¡Bienvenido!</h3>
        <p>Por favor, inicia sesión.</p>
        
        <form onSubmit={handleSubmitForm} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ textAlign: 'left' }}>
            <label><strong>Correo Electrónico:</strong></label>
            <input 
              name="email" 
              type="email" 
              placeholder="ejemplo@correo.com" 
              required 
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ccc' }} 
            />
          </div>
          
          <div style={{ textAlign: 'left' }}>
            <label><strong>Password:</strong></label>
            <input 
              name="password" 
              type="password" 
              placeholder="***********" 
              required 
              style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ccc' }} 
            />
          </div>
          
          <p style={{ fontSize: '12px', cursor: 'pointer' }}>¿Olvidaste tu contraseña?</p>
          
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
              fontWeight: 'bold' 
            }}
          >
            {mutationLogin.isPending ? 'Validando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    );
  };

  // ==========================================
  // VISTA 2: DASHBOARD
  // ==========================================
  const VistaDashboard = () => {
    const { data: mascotas, isLoading, isError } = useQuery({
      queryKey: ['mascotas'],
      queryFn: async () => {
        const currentToken = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/pets/list`, {
          headers: { Authorization: `Bearer ${currentToken}` }
        });
        if (response.data && Array.isArray(response.data.Pets)) {
          return response.data.Pets;
        }
        return [];
      }
    });

    if (isLoading) return <p style={{ textAlign: 'center', color: 'white' }}>Cargando mascotas...</p>;
    if (isError) return <p style={{ textAlign: 'center', color: 'red' }}>Error al conectar con el servidor.</p>;

    return (
      <div className="vista-container dashboard" style={{ maxWidth: '400px', margin: '30px auto', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button 
            onClick={() => mutationLogout.mutate()} 
            disabled={mutationLogout.isPending}
            style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
          >
            {mutationLogout.isPending ? 'Saliendo... ⏱' : 'Logout 🚪'}
          </button>
          <h2>PET DASHBOARD</h2>
          <button onClick={() => setVista('add')} style={{ backgroundColor: '#76ba8d', border: 'none', padding: '8px 15px', borderRadius: '15px', color: 'white', cursor: 'pointer' }}>
            + Nueva Mascota
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {mascotas?.map((mascota) => {
            const rutaImagen = `http://127.0.0.1:8000/images/${mascota.image}`;

            return (
              <div key={mascota.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: '#f5f5f5', borderRadius: '10px' }}>
                <img 
                  src={rutaImagen} 
                  alt={mascota.name} 
                  style={{ width: '50px', height: '50px', borderRadius: '5px', objectFit: 'cover' }} 
                />
                <div style={{ flex: 1, marginLeft: '10px' }}>
                  <h4 style={{ margin: 0 }}>{mascota.name}</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{mascota.kind} - {mascota.breed}</p>
                </div>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button onClick={() => { setMascotaSeleccionadaId(mascota.id); setVista('view'); }} style={{ background: '#00c3ff', border: 'none', color: 'white', padding: '5px 8px', borderRadius: '5px', cursor: 'pointer' }}>👁</button>
                  <button onClick={() => handleEliminar(mascota.id)} style={{ background: '#ff4d4d', border: 'none', color: 'white', padding: '5px 8px', borderRadius: '5px', cursor: 'pointer' }}>🗑</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ==========================================
  // VISTA 3: ADICIONAR MASCOTA (POST /api/pets/store)
  // ==========================================
  const VistaAddPet = () => {
    const mutationAgregar = useMutation({
      mutationFn: async (nuevaMascota) => {
        const currentToken = localStorage.getItem('token');
        const { data } = await axios.post(
          `${API_URL}/pets/store`, 
          nuevaMascota,
          { headers: { Authorization: `Bearer ${currentToken}` } }
        );
        return data;
      },
      onSuccess: () => {
        queryClientContext.invalidateQueries(['mascotas']);
        Swal.fire({ icon: 'success', title: '¡Guardado!', text: 'Mascota adicionada correctamente', timer: 1500, showConfirmButton: false });
        setVista('dashboard');
      },
      onError: (error) => {
        const mensajeError = error.response?.data?.message || 'No se pudo guardar la mascota. Verifica los datos.';
        Swal.fire({ icon: 'error', title: 'Error al guardar', text: mensajeError });
      }
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const datosFormulario = Object.fromEntries(formData);

      const dataCompleta = {
        name: datosFormulario.name,
        kind: datosFormulario.kind,
        weight: parseFloat(datosFormulario.weight),
        age: parseInt(datosFormulario.age, 10),
        breed: datosFormulario.breed,
        location: datosFormulario.location,
        description: datosFormulario.description,
        active: 1, 
        status: 0  
      };

      mutationAgregar.mutate(dataCompleta);
    };

    return (
      <div className="vista-container add-pet" style={{ maxWidth: '400px', margin: '30px auto', padding: '20px', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '20px', textAlign: 'center' }}>
        <button onClick={() => setVista('dashboard')} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: '#333', fontWeight: 'bold' }}>↪ Volver</button>
        <div style={{ height: '50px', maxWidth: '180px', padding: '15px', margin: '0 auto' }}><h2>ADD PET</h2></div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
          <input name="name" placeholder="Name" required style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', textAlign: 'center' }} />
          <input name="kind" placeholder="Kind" required style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', textAlign: 'center' }} />
          <input name="weight" placeholder="Weight" type="number" step="0.1" required style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', textAlign: 'center' }} />
          <input name="age" placeholder="Age" type="number" required style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', textAlign: 'center' }} />
          <input name="breed" placeholder="Breed" required style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', textAlign: 'center' }} />
          <input name="location" placeholder="Location" required style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', textAlign: 'center' }} />
          <textarea name="description" placeholder="Description" required style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', textAlign: 'center', minHeight: '60px', resize: 'none' }} />

          <button type="submit" disabled={mutationAgregar.isPending} style={{ backgroundColor: mutationAgregar.isPending ? '#ccc' : '#76ba8d', color: 'white', padding: '12px', borderRadius: '20px', cursor: mutationAgregar.isPending ? 'not-allowed' : 'pointer', fontWeight: 'bold', marginTop: '10px', border: '2px solid #333' }}>
            {mutationAgregar.isPending ? 'Guardando...' : 'Adicionar Mascota'}
          </button>
        </form>
      </div>
    );
  };

  // ========================================================
  // VISTA 4: VISTA UNIFICADA (DETALLE Y EDICIÓN CONMUTABLE)
  // ========================================================
  const VistaDetalleMascota = () => {
    const [isEditing, setIsEditing] = useState(false);

    const { data: petData, isLoading, isError } = useQuery({
      queryKey: ['mascota', 'show', mascotaSeleccionadaId],
      queryFn: async () => {
        const currentToken = localStorage.getItem('token');
        const { data } = await axios.get(`${API_URL}/pets/show/${mascotaSeleccionadaId}`, {
          headers: { Authorization: `Bearer ${currentToken}` }
        });
        return data.Pet; 
      },
      enabled: !!mascotaSeleccionadaId
    });

    const mutationEditar = useMutation({
      mutationFn: async (mascotaActualizada) => {
        const currentToken = localStorage.getItem('token');
        const { data } = await axios.put(
          `${API_URL}/pets/edit/${mascotaSeleccionadaId}`, 
          mascotaActualizada,
          { headers: { Authorization: `Bearer ${currentToken}` } }
        );
        return data;
      },
      onSuccess: () => {
        queryClientContext.invalidateQueries(['mascotas']);
        queryClientContext.invalidateQueries(['mascota', 'show', mascotaSeleccionadaId]);
        Swal.fire({ icon: 'success', title: '¡Actualizado!', text: 'Cambios guardados con éxito.', timer: 1500, showConfirmButton: false });
        setIsEditing(false); 
      },
      onError: (error) => {
        const msg = error.response?.data?.message || 'Error al actualizar la mascota.';
        Swal.fire({ icon: 'error', title: 'Error', text: msg });
      }
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const datosFormulario = Object.fromEntries(formData);

      const dataCompleta = {
        name: datosFormulario.name,
        kind: datosFormulario.kind,
        weight: parseFloat(datosFormulario.weight),
        age: parseInt(datosFormulario.age, 10),
        breed: datosFormulario.breed,
        location: datosFormulario.location,
        description: datosFormulario.description,
        active: petData?.active ?? 1,
        status: petData?.status ?? 0
      };

      mutationEditar.mutate(dataCompleta);
    };

    if (isLoading) return <div style={{ textAlign: 'center', color: 'white', padding: '50px' }}><h3>Cargando información... ⏱</h3></div>;
    if (isError || !petData) return <div style={{ textAlign: 'center', color: 'white', padding: '50px' }}><h3>No se pudo obtener la información.</h3><button onClick={() => setVista('dashboard')} style={{ padding: '10px 20px', borderRadius: '10px', marginTop: '10px' }}>Volver</button></div>;

    return (
      <div className="vista-container" style={{ maxWidth: '420px', margin: '30px auto', padding: '25px', background: 'rgba(255, 255, 255, 0.95)', borderRadius: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <button onClick={() => setVista('dashboard')} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', color: '#333', fontWeight: 'bold' }}>↪ Volver</button>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} style={{ background: '#a15eff', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '15px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>✏️ Editar</button>
          )}
        </div>

        <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#333', margin: '0 0 20px 0', textTransform: 'uppercase', textAlign: 'center' }}>
          {isEditing ? 'EDIT PET' : 'VIEW PET'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontWeight: 'bold', color: '#555', fontSize: '14px', marginLeft: '10px' }}>Name:</label>
            <input name="name" defaultValue={petData.name} disabled={!isEditing} required style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', textAlign: 'center', background: isEditing ? '#fff' : '#e9ecef', color: '#333' }} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontWeight: 'bold', color: '#555', fontSize: '14px', marginLeft: '10px' }}>Kind:</label>
            <input name="kind" defaultValue={petData.kind} disabled={!isEditing} required style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', textAlign: 'center', background: isEditing ? '#fff' : '#e9ecef', color: '#333' }} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontWeight: 'bold', color: '#555', fontSize: '14px', marginLeft: '10px' }}>Weight (kg):</label>
            <input name="weight" defaultValue={petData.weight} disabled={!isEditing} type="number" step="0.01" required style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', textAlign: 'center', background: isEditing ? '#fff' : '#e9ecef', color: '#333' }} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontWeight: 'bold', color: '#555', fontSize: '14px', marginLeft: '10px' }}>Age (years):</label>
            <input name="age" defaultValue={petData.age} disabled={!isEditing} type="number" required style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', textAlign: 'center', background: isEditing ? '#fff' : '#e9ecef', color: '#333' }} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontWeight: 'bold', color: '#555', fontSize: '14px', marginLeft: '10px' }}>Breed:</label>
            <input name="breed" defaultValue={petData.breed} disabled={!isEditing} required style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', textAlign: 'center', background: isEditing ? '#fff' : '#e9ecef', color: '#333' }} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontWeight: 'bold', color: '#555', fontSize: '14px', marginLeft: '10px' }}>Location:</label>
            <input name="location" defaultValue={petData.location} disabled={!isEditing} required style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', textAlign: 'center', background: isEditing ? '#fff' : '#e9ecef', color: '#333' }} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontWeight: 'bold', color: '#555', fontSize: '14px', marginLeft: '10px' }}>Description:</label>
            <textarea name="description" defaultValue={petData.description} disabled={!isEditing} required style={{ width: '100%', padding: '10px 15px', borderRadius: '20px', border: '1px solid #ccc', textAlign: 'center', minHeight: '60px', resize: 'none', background: isEditing ? '#fff' : '#e9ecef', color: '#333' }} />
          </div>

          {isEditing && (
            <button type="submit" disabled={mutationEditar.isPending} style={{ backgroundColor: mutationEditar.isPending ? '#ccc' : '#76ba8d', color: 'white', padding: '12px', borderRadius: '20px', cursor: mutationEditar.isPending ? 'not-allowed' : 'pointer', fontWeight: 'bold', marginTop: '10px', border: '2px solid #333', fontSize: '15px' }}>
              {mutationEditar.isPending ? 'Guardando Cambios...' : 'Guardar Cambios'}
            </button>
          )}
        </form>
      </div>
    );
  };

  // Enrutador de pantallas dinámico
  return (
    <>
      {vista === 'login' && <VistaLogin />}
      {vista === 'dashboard' && <VistaDashboard />}
      {vista === 'add' && <VistaAddPet />}
      {vista === 'view' && <VistaDetalleMascota />}
    </>
  );
}

export default function Challenge() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChallengeContent />
    </QueryClientProvider>
  );
}