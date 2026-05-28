import BtnBack from "../components/BtnBack";
export default function Example3Props() {
  const user = {
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com'
  };
  return (
    <div className="container">
      <BtnBack /> 
      <h1>Example 3 Props</h1>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}