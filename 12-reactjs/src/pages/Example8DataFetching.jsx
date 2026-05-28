import BtnBack from "../components/BtnBack";

export default function Example8DataFetching() {
  function handleClick() {
    alert("¡Botón clickeado!");
  }

  return (
    <div className="container">
      <BtnBack />
      <h1>Example 8 Data Fetching</h1>
      <button onClick={handleClick}>Haz clic aquí</button>
    </div>
  );
}