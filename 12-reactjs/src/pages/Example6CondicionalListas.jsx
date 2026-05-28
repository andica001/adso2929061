import BtnBack from "../components/BtnBack";

export default function Example6CondicionalListas() {
  const items = ["Item 1", "Item 2", "Item 3"];
  return (
    <div className="container">
      <BtnBack />
      <h1>Example 6 Condicional Listas</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}