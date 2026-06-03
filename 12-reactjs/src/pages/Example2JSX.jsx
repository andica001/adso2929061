import BtnBack from "../components/BtnBack";

function Example2JSX() {
  // Variable
  const pkName = 'Bulbasaur!';
  const pkType = 'Grass/Poison';
  const pkLevel = 5;
  const pkAbilities = ['Overgrow', 'Chlorophyll'];
  const pkImgUrl = "https://crocs.com.co/cdn/shop/products/10010046_200.jpg?v=1672851598";

  return (
    <>
      <BtnBack />
    <div className="container">
      <h2>Example 2: JSX</h2>
      <p>Writing HTML-Like code whitin JavaScript using curly braces {} for JS expresions.</p>
      <div style={styles.container}>
        <img src={pkImgUrl} alt={pkName} style={styles.img} />
        <h3 style={styles.title}>{pkName} (Lvl. {pkLevel})</h3>
        <p>Type: {pkType}</p>
        <p>Uppercase: {pkName.toUpperCase()}</p>
        <p>Abilities: </p>
        <ul style={styles.ul}>
          {pkAbilities.map((ability, index) => (
            <li key={index}>{ability}</li>
          ))}
        </ul>
        <p>Is it a starter? {pkLevel === 5 ? 'Yes' : 'No'}</p>
      </div>
    </div>
          </>
  );
}
// 1. AGREGA ESTO JUSTO AQUÍ ABAJO (FUERA DE LA FUNCIÓN)
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#fff', 
    borderRadius: '8px',
    color: '#000',
    textAlign: 'center',
    height: '400px',
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: '24px',
    marginBottom: '10px'
  },
  img: {
    width: '150px',
    height: '150px',
    objectFit: 'contain'
  },
  ul: {
    listStyleType: 'none',
    padding: 0
  }
};

// 2. ASEGÚRATE DE QUE ESTÉ EL EXPORT DEFAULT AL FINAL

export default Example2JSX;
