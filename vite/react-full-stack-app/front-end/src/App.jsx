import { useEffect, useState } from "react";

const Input = () => {
  const [name, setName] = useState("");

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
    }
  };

  return (
    <input
      type="text"
      value={name}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
};

const App = () => {
  const [names, setNames] = useState([]);
  // const [newName, setNewName] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/get-names")
      .then((res) => res.json())
      .then((names) => setNames(names));
  }, [names]);

  return (
    <div>
      <Input />
      <ul>
        {names.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
};

export default App;
