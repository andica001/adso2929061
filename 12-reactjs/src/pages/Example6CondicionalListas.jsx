import { useState } from 'react';
import BtnBack from '../components/BtnBack';

function Example6ConditionalLists() {
  const [pcBox, setPcBox] = useState([
    { id: 1, name: 'Pidgey', level: 3, type: 'Normal/Flying' },
    { id: 2, name: 'Rattata', level: 2, type: 'Normal' },
    { id: 3, name: 'Zubat', level: 4, type: 'Poison/Flying' },
    { id: 4, name: 'Geodude', level: 5, type: 'Rock/Ground' }
  ]);

  const [typeFilter, setTypeFilter] = useState('all');
  const [showOnlyHighLevel, setShowOnlyHighLevel] = useState(false);

  // Remove from PC
  const releasePokemon = (id) => {
    setPcBox(pcBox.filter(pokemon => pokemon.id !== id));
  };

  // Add random Pokemon
  const addPokemon = () => {
    const newPokemonList = [
      { id: Date.now(), name: 'Caterpie', level: 2, type: 'Bug' },
      { id: Date.now() + 1, name: 'Weedle', level: 2, type: 'Bug/Poison' },
      { id: Date.now() + 2, name: 'Pidgeotto', level: 8, type: 'Normal/Flying' }
    ];
    const random = newPokemonList[Math.floor(Math.random() * newPokemonList.length)];
    setPcBox([...pcBox, { ...random, id: Date.now() }]);
  };

  // Filter Logic
  const filteredPokemon = pcBox.filter(pokemon => {
    if (typeFilter !== 'all' && !pokemon.type.toLowerCase().includes(typeFilter)) {
      return false;
    }
    if (showOnlyHighLevel && pokemon.level < 4) {
      return false;
    }
    return true;
  });

  return (
    <div className="container">
      <BtnBack />
      <h2>Example 6: Conditional Rendering</h2>
      <p>Show or hide UI elements based on state.</p>
      
      <div>
        <h3>Filters:</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <select 
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)} 
            style={{ padding: '5px' }}
          >
            <option value="all">All types</option>
            <option value="normal">Normal</option>
            <option value="flying">Flying</option>
            <option value="poison">Poison</option>
            <option value="bug">Bug</option>
          </select>

          <label>
            <input 
              type="checkbox" 
              checked={showOnlyHighLevel} 
              onChange={(e) => setShowOnlyHighLevel(e.target.checked)}
              style={{ accentColor: '#72c7ee' }}
            />
            Show only level 4+
          </label>

          <button onClick={addPokemon} style={styles.buttonStyle}>
            Random Pokemon
          </button>
        </div>
      </div>

      <div style={styles.boxPokemons}>
        {filteredPokemon.length === 0 ? (
          <div>
            <h3>The box is empty</h3>
            <p>No Pokemon match the selected filters.</p>
          </div>
        ) : (
          <div>
            <p><strong>Showing {filteredPokemon.length} of {pcBox.length} Pokémon</strong></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {filteredPokemon.map((pokemon) => (
                <div key={pokemon.id} style={styles.boxPK}>
                  <h4>{pokemon.name}</h4>
                  <p>Level: {pokemon.level}</p>
                  <p>Type: {pokemon.type}</p>
                  <button onClick={() => releasePokemon(pokemon.id)} style={styles.releaseButton}>
                    Release
                  </button>
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
  buttonStyle: {
    backgroundColor: '#4fc3f7',
    color: '#000000',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  boxPokemons: {
    marginTop: '25px',
    padding: '20px',
    backgroundColor: '#575757',
    borderRadius: '10px',
    border: '1px solid #d0e8c1'
  },
  boxPK: {
    backgroundColor: '#fff',
    border: '1px solid #c8e6c9',
    borderRadius: '8px',
    padding: '12px',
    width: '140px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    color: '#000'
  },
  releaseButton: {
    backgroundColor: '#ff5252',
    color: '#000000',
    border: 'none',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '8px',
    fontSize: '0.8rem',
    width: '100%'
  }
};

export default Example6ConditionalLists;