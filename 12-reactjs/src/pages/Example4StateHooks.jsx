import { useState } from 'react';
import BtnBack from "../components/BtnBack";

export default function Example4StateHooks() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <BtnBack /> 
      
      <h1>Example 4 State Hooks</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}