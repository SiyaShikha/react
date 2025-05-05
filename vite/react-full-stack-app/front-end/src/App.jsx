import { useEffect, useState } from "react";

const Input = ({ onSubmitName }) => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmitName(name);
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
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/get-names");
        const result = await response.json();
        setNames(result);
      } catch {
        console.error("Error fetching names");
      }
    };
    fetchData();
  }, [newName]);

  useEffect(() => {
    const addName = async (name) => {
      try {
        await fetch("http://localhost:8000/add-name", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        });
      } catch {
        console.error("Error adding name");
      }
    };
    if (newName) {
      addName(newName);
      setNewName("");
    }
  }, [newName]);

  return (
    <div>
      <Input onSubmitName={(name) => setNewName(name)} />
      <ul>
        {names.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
};

export default App;
