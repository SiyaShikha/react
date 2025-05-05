import { useState } from "react";

const TodoItem = ({ todo, onToggle }) => (
  <div className="todo-list">
    {todo.map((item) => {
      return (
        <div className="todo-item" key={item.taskId}>
          <span
            onClick={() => onToggle(item.taskId)}
            style={{
              textDecoration: item.done ? "line-through" : "none",
            }}
          >
            {item.task}
          </span>
        </div>
      );
    })}
  </div>
);

const Input = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

const Todo = () => {
  const [todo, setTodo] = useState([]);

  const addTodo = (task) => {
    setTodo([...todo, { task, taskId: Date.now(), done: false }]);
  };

  const toggleStatus = (id) => {
    const updatedTodo = todo.map((item) => {
      if (item.taskId === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setTodo(updatedTodo);
  };

  return (
    <div>
      <h1>Todo</h1>
      <Input onSubmit={addTodo} />
      <TodoItem todo={todo} onToggle={toggleStatus} />
    </div>
  );
};

export default Todo;
