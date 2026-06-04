import { useState, useEffect } from "react";
import BtnBack from "../components/BtnBack";

export default function Example8DataFetching() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Consumiendo el endpoint que retorna el JSON de la imagen
    fetch("https://devsapihub.com/api-movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar las películas de la API");
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="container" style={styles.container}>
      <BtnBack />
      <h1 style={styles.title}>Example 8 Data Fetching - Películas</h1>

      {/* Manejo de estados de carga y error */}
      {loading && <p style={styles.centeredText}>Cargando catálogo...</p>}
      {error && <p style={{ ...styles.centeredText, color: "red" }}>Error: {error}</p>}

      {/* Grid de Tarjetas */}
      <div style={styles.grid}>
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            className="movie-card" 
            style={styles.card}
            onClick={() => setSelectedMovie(movie)}
          >
            <img 
              src={movie.image_url} 
              alt={movie.title} 
              style={styles.cardImage}
            />
            <div style={styles.cardBody}>
              <h3 style={styles.cardTitle}>{movie.title}</h3>
              <p style={styles.cardYear}>Año: {movie.year}</p>
              <p style={styles.cardStars}>⭐ {movie.stars.toFixed(1)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Detalle */}
      {selectedMovie && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <span style={styles.closeButton} onClick={closeModal}>&times;</span>
            
            <div style={styles.modalLayout}>
              <img 
                src={selectedMovie.image_url} 
                alt={selectedMovie.title} 
                style={styles.modalImage}
              />
              <div style={styles.modalInfo}>
                <h2 style={{ marginTop: 0 }}>{selectedMovie.title}</h2>
                <p><strong>Año:</strong> {selectedMovie.year}</p>
                <p><strong>Género:</strong> {selectedMovie.genre}</p>
                <p><strong>Calificación:</strong> ⭐ {selectedMovie.stars.toFixed(1)} / 5.0</p>
                <div style={styles.modalDescription}>
                  <strong>Descripción:</strong>
                  <p style={{ marginTop: "5px", lineHeight: "1.5" }}>{selectedMovie.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// === Objeto de Estilos Independientes ===
const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    color: "#333"
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#222"
  },
  centeredText: {
    textAlign: "center",
    fontSize: "1.2rem",
    marginTop: "40px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "25px",
    marginTop: "20px"
  },
  card: {
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    overflow: "hidden",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column"
  },
  cardImage: {
    width: "100%",
    height: "320px",
    objectFit: "cover"
  },
  cardBody: {
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1
  },
  cardTitle: {
    margin: "0 0 8px 0",
    fontSize: "1.05rem",
    fontWeight: "600",
    lineHeight: "1.3"
  },
  cardYear: {
    color: "#666",
    fontSize: "0.9rem",
    margin: "0 0 5px 0"
  },
  cardStars: {
    color: "#ffa100",
    fontSize: "0.95rem",
    margin: "5px 0 0 0",
    fontWeight: "bold"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: "20px",
    backdropFilter: "blur(3px)"
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "16px",
    maxWidth: "650px",
    width: "100%",
    position: "relative",
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)"
  },
  closeButton: {
    position: "absolute",
    top: "12px",
    right: "20px",
    fontSize: "32px",
    cursor: "pointer",
    color: "#999"
  },
  modalLayout: {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap",
    marginTop: "10px"
  },
  modalImage: {
    width: "200px",
    height: "290px",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
  },
  modalInfo: {
    flex: "1",
    minWidth: "260px"
  },
  modalDescription: {
    marginTop: "20px",
    borderTop: "1px solid #eee",
    paddingTop: "15px"
  }
};