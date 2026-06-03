import { useState } from 'react';
import BtnBack from '../components/BtnBack';

function Example5Events() {
  const [chosenPokemon, setChosenPokemon] = useState(null);
  const [hoveredPokemon, setHoveredPokemon] = useState(null);
  const [inputRange, setInputRange] = useState(50);

  // Event Click
  const handleChoice = (name) => {
    setChosenPokemon(name);
  };

  // Event Hover MouseEnter
  const handleMouseEnter = (name) => {
    setHoveredPokemon(name);
  };

  // Event MouseLeave
  const handleMouseLeave = () => {
    setHoveredPokemon(null);
  };

  // Event Input
  const handleInput = (e) => {
    setInputRange(e.target.value);
  };

  return (
    <div className='container'>
      <BtnBack />
      <h2>Example 5: Event Handling</h2>
      <p>Respond to user interactions (click, hover, input, submit).</p>
      <div style={styles.eventContainer}>
        
        {/* Click */}
        <h3 style={styles.titleH3}>Click Event:</h3>
        <div style={styles.btnsClick}>
          <button onClick={() => handleChoice('Bulbasaur')} style={styles.buttonStyle}>
            <span style={{zoom: 2.4}}></span> Bulbasaur
          </button>
          <button onClick={() => handleChoice('Charmander')} style={styles.buttonStyle}>
            <span style={{zoom: 2.4}}></span> Charmander
          </button>
          <button onClick={() => handleChoice('Squirtle')} style={styles.buttonStyle}>
            <span style={{zoom: 2.4}}></span> Squirtle
          </button>
        </div>

        {chosenPokemon ? (
          <div style={styles.chosePokemon}>You choose {chosenPokemon}!</div>
        ) : (
          <div style={styles.chosePokemon}>Please choose a pokemon!</div>
        )}

        {/* MouseEnter/MouseLeave */}
        <h3 style={styles.titleH3}>MouseEnter/MouseLeave Event:</h3>
        <div style={styles.btnsClick}>
          <button 
            onMouseEnter={() => handleMouseEnter('Pikachu')} 
            onMouseLeave={handleMouseLeave} 
            style={styles.hoverStyle}
          >
            Hover here!
            <img style={{zoom: 0.4}} src="25.png" alt="" />
          </button>
          
          <button 
            onMouseEnter={() => handleMouseEnter('Eevee')} 
            onMouseLeave={handleMouseLeave} 
            style={styles.hoverStyle}
          >
            Hover here too!
            <img style={{zoom: 0.4}} src="133.png" alt="" />
          </button>
        </div>

        {hoveredPokemon && (
          <div style={styles.chosePokemon}>You are viewing: {hoveredPokemon}!</div>
        )}

        {/* Input */}
        <h3 style={styles.titleH3}>Input Event:</h3>
        <input 
          style={styles.rangeStyle} 
          onInput={handleInput} 
          type="range" 
          min="0" 
          max="100" 
          value={inputRange}
        />
        <span style={{display: 'block', textAlign: 'center'}}>power:</span>
        <div style={styles.outPut}>{inputRange}</div>

      </div>
    </div>
  );
}

const styles = {
  eventContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    maxWidth: '500px',
    margin: '0 auto'
  },
  titleH3: {
    fontSize: '1.1rem',
    color: '#444',
    borderBottom: '2px solid #eee',
    paddingBottom: '5px',
    marginTop: '20px'
  },
  btnsClick: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    margin: '15px 0'
  },
  buttonStyle: {
    padding: '8px 16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f8f9fa',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  chosePokemon: {
    textAlign: 'center',
    backgroundColor: '#e3f2fd',
    color: '#0d47a1',
    padding: '10px',
    borderRadius: '6px',
    fontWeight: 'bold',
    margin: '10px 0'
  },
  hoverStyle: {
    padding: '12px',
    border: '2px dashed #9c27b0',
    backgroundColor: '#faf5ff',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#6a1b9a',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  rangeStyle: {
    width: '100%',
    height: '8px',
    borderRadius: '5px',
    outline: 'none',
    margin: '15px 0'
  },
  outPut: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e91e63'
  }
};


export default Example5Events;