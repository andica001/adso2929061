import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = 'http://127.0.0.1:8000/api';

export default function AddPet() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const token = localStorage.getItem('token');

    const mutationAgregar = useMutation({
        mutationFn: async (nuevaMascota) => {
            const { data } = await axios.post(
                `${API_URL}/pets/store`,
                nuevaMascota,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return data;
        },
        onSuccess: () => {
            // Refrescamos la lista para que la nueva mascota aparezca al volver
            queryClient.invalidateQueries(['mascotas']);
            Swal.fire({
                icon: 'success',
                title: '¡Guardado!',
                text: 'Mascota adicionada correctamente',
                timer: 1500,
                showConfirmButton: false
            });
            navigate('/dashboard'); // Regresa al listado
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

        // Estructura exacta requerida por tu API (Laravel)
        const dataCompleta = {
            name: datosFormulario.name,
            kind: datosFormulario.kind,
            weight: parseFloat(datosFormulario.weight),
            age: parseInt(datosFormulario.age, 10),
            breed: datosFormulario.breed,
            location: datosFormulario.location,
            description: datosFormulario.description,
            active: 1, // Obligatorio según tu Postman
            status: 0  // Obligatorio según tu Postman
        };

        mutationAgregar.mutate(dataCompleta);
    };

    return (
        <div className="app-card-container">
            {/* Botón Volver con la flecha curva naranja */}
            <button onClick={() => navigate('/dashboard')} className="btn-back-arrow">
                ↩
            </button>

            {/* Encabezado con logo circular */}
            <div className="app-header-logo">
                <div className="logo-circle">🩺</div>
                <h2 className="app-title">ADD PET</h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="form-group-custom">
                    <label>Name:</label>
                    <input name="name" placeholder="Firulice" required className="input-custom-gray" />
                </div>

                <div className="form-group-custom">
                    <label>Kind:</label>
                    <input name="kind" placeholder="Dog" required className="input-custom-gray" />
                </div>

                <div className="form-group-custom">
                    <label>Weight:</label>
                    <input name="weight" placeholder="10.5" type="number" step="0.1" required className="input-custom-gray" />
                </div>

                <div className="form-group-custom">
                    <label>Age (years):</label>
                    <input name="age" placeholder="9" type="number" required className="input-custom-gray" />
                </div>

                <div className="form-group-custom">
                    <label>Breed:</label>
                    <input name="breed" placeholder="Criollo" required className="input-custom-gray" />
                </div>

                <div className="form-group-custom">
                    <label>Location:</label>
                    <input name="location" placeholder="Riosucio, Caldas" required className="input-custom-gray" />
                </div>

                <div className="form-group-custom">
                    <label>Description:</label>
                    <textarea name="description" placeholder="Lo atropelló un carro" required className="input-custom-gray" style={{ minHeight: '60px', resize: 'none' }} />
                </div>

                <button type="submit" disabled={mutationAgregar.isPending} className="btn-submit-green">
                    {mutationAgregar.isPending ? 'Guardando...' : 'Adicionar Mascota'}
                </button>
            </form>
        </div>
    );
}