import BtnBack from "../components/BtnBack";

export default function Example7Routing() {
  function handleClick() {
    alert("¡Botón clickeado!");
  }

  return (
    <div  className="container">
      <BtnBack />
      <h1>Example 7 Routing</h1>
      <button onClick={handleClick}>Haz clic aquí</button>
    </div>
  );
}