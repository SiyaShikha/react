import { useState } from "react";

const Greet = ({ name, time }) => (
  <div>
    <h1>Hello {name}</h1>
    <h1>Good {time}</h1>
  </div>
);

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((prev) => (prev + 1))}>
      Clicked {count} times
    </button>
  );
};

const App = () => (
  <div>
    <Greet name="Shikha" time="morning" />
    <Counter />
    <Counter />
  </div>
);

export default App;
