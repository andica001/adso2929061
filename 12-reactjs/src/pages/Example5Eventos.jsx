import BtnBack from "../components/BtnBack";

export default function Example5Eventos() {
  function handleClick() {
    alert("¡Botón clickeado!");
  }

  return (
    <div className="container">
      <BtnBack /> 
      <h1>Example 5 Eventos</h1>
      <button onClick={handleClick}>Clic aquí</button>
    </div>
  );
}