import { useEffect, useState } from "react";

const Input = ({ value, onChange, onSubmit }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onSubmit}
    />
  );
};

const App = () => {
  const [names, setNames] = useState([]);
  const [name, setName] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/get-names")
      .then((res) => res.json())
      .then((names) => setNames(names));
  }, [reload]);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (!name === "") {
        return;
      }
      setName(name);

      fetch("http://localhost:8000/add-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      setName("");
      setReload(!reload);
    }
  };

  return (
    <div>
      <Input value={name} onChange={handleChange} onSubmit={handleKeyDown} />
      <ul>
        {names.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
};

export default App;
