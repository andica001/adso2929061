import { useState, useEffect, useRef } from 'react';
import BtnBack from '../components/BtnBack';

function Example4StateHooks() {
  const [caughtPokemon, setCaughtPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [catchCounter, setCatchCounter] = useState(0);
  const [history, setHistory] = useState([]);
  const hasMounted = useRef(false);

  const pokemonList = [
    { name: 'Pikachu', img: '25.png' },
    { name: 'Charmander', img: '14.png' },
    { name: 'Squirtle', img: '7.png' }
  ];

  const catchPokemon = () => {
    setLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * pokemonList.length);
      const newPokemon = pokemonList[randomIndex];
      
      setCaughtPokemon(newPokemon);
      setCatchCounter(prev => prev + 1);
      setHistory(prev => [newPokemon, ...prev]);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      catchPokemon();
    }
  }, []);

  return (
    <div className="container">
      <BtnBack />
      <h2>Example 4: State and Hooks</h2>
      <h3>(useState, useEffect)</h3>
      <p>Manage dynamic data and side effects.</p>
      
      <div style={styles.section}>
        <button onClick={catchPokemon} disabled={loading} style={styles.button}>
          {loading ? 'Catching...' : 'Try again'}
        </button>
        
        {loading ? (
          <h3>Searching for a wild Pokémon...</h3>
        ) : (
          <div>
            {caughtPokemon && (
              <>
                <h3>You caught a {caughtPokemon.name}!</h3>
              </>
            )}
          </div>
        )}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <p><strong>Total caught:</strong> {catchCounter}</p>
        {history.length > 0 && (
          <div>
            <p><strong>Recently caught:</strong></p>
            <div style={styles.recently}>
              {history.map((poke, index) => (
                <div key={index} style={styles.history}>
                  <img src={poke.img} alt={poke.name} style={styles.img} />
                  <span style={styles.span}>{poke.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  section: {
    backgroundColor: '#f9f9f9',
    border: '1px dashed #ccc',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    margin: '20px 0'
  },
  button: {
    backgroundColor: '#ffcb05',
    color: '#3c5aa6',
    border: '2px solid #3c5aa6',
    padding: '10px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    boxShadow: '0 4px 0 #2a437e'
  },
  recently: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: '15px'
  },
  history: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  img: {
    width: '45px',
    height: '45px',
    objectFit: 'contain'
  },
  span: {
    fontSize: '0.75rem',
    color: '#555',
    marginTop: '5px',
    textAlign: 'center'
  }
};

export default Example4StateHooks;